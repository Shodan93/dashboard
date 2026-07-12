/* =====================================================================
 * COCKPIT — Cloudflare Worker (dashboard.mumelter.org)
 * ---------------------------------------------------------------------
 * Ein Worker, drei Aufgaben:
 *   1. Static Assets (public/) — die Dashboard-Seite selbst
 *   2. /api/*  — Integrations-Backend (Vertrag: INTEGRATIONS.md)
 *      OAuth-Handshake + Token-Storage laufen NUR hier, pro Nutzer.
 *   3. /mcp    — Multi-User-Remote-MCP: Claude (auch per Sprache) steuert
 *      die Orbit-Boards des Nutzers, dem das Token gehört.
 *
 * Nutzer-Identität: Supabase-Access-Token (Header X-Supabase-Token) wird
 * gegen /auth/v1/user verifiziert -> user_id. Provider-Tokens liegen im
 * KV-Namespace COCKPIT_KV unter int:<uid>:<provider> — das Frontend sieht
 * sie nie.
 *
 * Vars (wrangler.jsonc):   SUPABASE_URL, SUPABASE_ANON_KEY, SITE_URL
 * Secrets (Cloudflare -> dashboard -> Settings -> Variables and Secrets):
 *   GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET   (OAuth-App, siehe INTEGRATIONS.md)
 *   NOTION_CLIENT_ID / NOTION_CLIENT_SECRET   (Public Integration)
 *   SUPABASE_SERVICE_KEY                      (nur für /mcp-Board-Zugriff)
 * ===================================================================== */

const NOTION_VERSION = "2022-06-28";
const PROTO_FALLBACK = "2025-06-18";
const SERVER_INFO = { name: "cockpit", version: "1.0.0" };

/* ---------- Helfer ---------- */
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, X-Supabase-Token, Authorization" };
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { "Content-Type": "application/json", ...CORS } });
const uid = () => crypto.randomUUID().replace(/-/g, "").slice(0, 13);
const today = () => new Date().toISOString().slice(0, 10);
const randToken = () => { const b = new Uint8Array(24); crypto.getRandomValues(b); return Array.from(b, x => x.toString(16).padStart(2, "0")).join(""); };

// Datum eines Zeitpunkts in deutscher Zeitzone als YYYY-MM-DD (DST-sicher)
const dayInBerlin = (iso) => new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Berlin", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));
const hhmmInBerlin = (iso) => new Intl.DateTimeFormat("de-DE", { timeZone: "Europe/Berlin", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(iso));

/* ---------- Supabase: Nutzer aus Access-Token ---------- */
async function verifyUser(request, env) {
  const tok = request.headers.get("X-Supabase-Token") || "";
  if (!tok || !env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) return null;
  try {
    const r = await fetch(env.SUPABASE_URL.replace(/\/$/, "") + "/auth/v1/user", {
      headers: { Authorization: "Bearer " + tok, apikey: env.SUPABASE_ANON_KEY },
    });
    if (!r.ok) return null;
    const u = await r.json();
    return u && u.id ? { id: u.id, email: u.email || "" } : null;
  } catch (e) { return null; }
}

/* ---------- KV: Verbindungsdaten pro Nutzer ---------- */
const intKey = (uidv, provider) => "int:" + uidv + ":" + provider;
async function getConn(env, uidv, provider) {
  const raw = await env.COCKPIT_KV.get(intKey(uidv, provider));
  return raw ? JSON.parse(raw) : null;
}
async function putConn(env, uidv, provider, data) {
  await env.COCKPIT_KV.put(intKey(uidv, provider), JSON.stringify(data));
}

/* ---------- Provider-Konfiguration ---------- */
function redirectUri(env, provider) {
  return (env.SITE_URL || "https://dashboard.mumelter.org").replace(/\/$/, "") + "/api/oauth/" + provider + "/callback";
}
function authUrl(env, provider, state) {
  if (provider === "google-calendar") {
    const p = new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID, redirect_uri: redirectUri(env, provider),
      response_type: "code", scope: "https://www.googleapis.com/auth/calendar.readonly",
      access_type: "offline", prompt: "consent", state,
    });
    return "https://accounts.google.com/o/oauth2/v2/auth?" + p;
  }
  if (provider === "notion") {
    const p = new URLSearchParams({
      client_id: env.NOTION_CLIENT_ID, redirect_uri: redirectUri(env, provider),
      response_type: "code", owner: "user", state,
    });
    return "https://api.notion.com/v1/oauth/authorize?" + p;
  }
  return null;
}
function providerReady(env, provider) {
  if (provider === "google-calendar") return !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET);
  if (provider === "notion") return !!(env.NOTION_CLIENT_ID && env.NOTION_CLIENT_SECRET);
  return false;
}

/* ---------- OAuth: Code gegen Tokens tauschen ---------- */
async function exchangeCode(env, provider, code) {
  if (provider === "google-calendar") {
    const r = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code, client_id: env.GOOGLE_CLIENT_ID, client_secret: env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri(env, provider), grant_type: "authorization_code",
      }),
    });
    if (!r.ok) throw new Error("Google-Token-Tausch: " + r.status + " " + (await r.text()).slice(0, 200));
    const t = await r.json();
    // Konto-Label (E-Mail) über tokeninfo — best effort
    let account = "";
    try {
      const ir = await fetch("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + encodeURIComponent(t.access_token));
      if (ir.ok) account = (await ir.json()).email || "";
    } catch (e) { /* Label ist optional */ }
    return { access_token: t.access_token, refresh_token: t.refresh_token || null,
      expiry: Date.now() + (t.expires_in || 3600) * 1000, account, connectedAt: new Date().toISOString() };
  }
  if (provider === "notion") {
    const basic = btoa(env.NOTION_CLIENT_ID + ":" + env.NOTION_CLIENT_SECRET);
    const r = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: "Basic " + basic },
      body: JSON.stringify({ grant_type: "authorization_code", code, redirect_uri: redirectUri(env, provider) }),
    });
    if (!r.ok) throw new Error("Notion-Token-Tausch: " + r.status + " " + (await r.text()).slice(0, 200));
    const t = await r.json();
    return { access_token: t.access_token, workspace: t.workspace_name || "",
      account: t.workspace_name || (t.owner && t.owner.user && t.owner.user.name) || "",
      connectedAt: new Date().toISOString() };
  }
  throw new Error("Unbekannter Provider: " + provider);
}

/* ---------- Google: Access-Token auffrischen ---------- */
async function googleAccessToken(env, uidv) {
  const conn = await getConn(env, uidv, "google-calendar");
  if (!conn) return null;
  if (conn.expiry && conn.expiry - 60000 > Date.now()) return conn.access_token;
  if (!conn.refresh_token) return conn.access_token; // kein Refresh möglich — versuchen
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: conn.refresh_token, client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET, grant_type: "refresh_token",
    }),
  });
  if (!r.ok) { // Refresh abgelehnt (widerrufen) -> Status error
    conn.error = "refresh_failed";
    await putConn(env, uidv, "google-calendar", conn);
    return null;
  }
  const t = await r.json();
  conn.access_token = t.access_token;
  conn.expiry = Date.now() + (t.expires_in || 3600) * 1000;
  delete conn.error;
  await putConn(env, uidv, "google-calendar", conn);
  return conn.access_token;
}

/* ---------- Daten: Google Calendar ---------- */
async function calendarEvents(env, uidv, date) {
  const tok = await googleAccessToken(env, uidv);
  if (!tok) throw httpErr(409, "google-calendar nicht verbunden");
  // Fenster großzügig in UTC, dann exakt auf den Tag in Europe/Berlin filtern
  const from = new Date(date + "T00:00:00Z"); from.setUTCHours(from.getUTCHours() - 14);
  const to = new Date(date + "T23:59:59Z"); to.setUTCHours(to.getUTCHours() + 14);
  const p = new URLSearchParams({
    timeMin: from.toISOString(), timeMax: to.toISOString(),
    singleEvents: "true", orderBy: "startTime", maxResults: "50",
  });
  const r = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?" + p, {
    headers: { Authorization: "Bearer " + tok },
  });
  if (r.status === 401 || r.status === 403) throw httpErr(409, "google-calendar Token ungültig");
  if (!r.ok) throw httpErr(502, "Google Calendar: " + r.status);
  const data = await r.json();
  const events = [];
  for (const ev of data.items || []) {
    if (ev.status === "cancelled") continue;
    const startIso = ev.start && (ev.start.dateTime || ev.start.date);
    if (!startIso) continue;
    const allDay = !(ev.start && ev.start.dateTime);
    const evDay = allDay ? ev.start.date : dayInBerlin(startIso);
    if (evDay !== date) continue;
    let durationMin = null;
    if (!allDay && ev.end && ev.end.dateTime) durationMin = Math.max(0, Math.round((new Date(ev.end.dateTime) - new Date(ev.start.dateTime)) / 60000));
    events.push({ start: allDay ? "Tag" : hhmmInBerlin(startIso), title: ev.summary || "(ohne Titel)", durationMin, allDay });
  }
  return { events };
}

/* ---------- Daten: Notion-Journal ---------- */
async function notionHeaders(conn) {
  return { Authorization: "Bearer " + conn.access_token, "Notion-Version": NOTION_VERSION, "Content-Type": "application/json" };
}
// Journal-Datenbank des Nutzers finden (einmal suchen, dann in KV merken)
async function journalDbId(env, uidv, conn) {
  if (conn.journalDb) return conn.journalDb;
  const r = await fetch("https://api.notion.com/v1/search", {
    method: "POST", headers: await notionHeaders(conn),
    body: JSON.stringify({ query: "Journal", filter: { property: "object", value: "database" }, page_size: 10 }),
  });
  if (!r.ok) throw httpErr(502, "Notion-Suche: " + r.status);
  const data = await r.json();
  const db = (data.results || []).find(d => {
    const t = ((d.title || [])[0] && d.title[0].plain_text || "").trim().toLowerCase();
    return t === "journal";
  });
  if (!db) throw httpErr(409, "Keine Notion-Datenbank namens \"Journal\" freigegeben. Bei der Notion-Autorisierung die Seite \"Personal OS\" (mit Journal) auswählen.");
  conn.journalDb = db.id;
  await putConn(env, uidv, "notion", conn);
  return db.id;
}
const rich = (arr) => (arr || []).map(x => x.plain_text || "").join("");
async function journalEntries(env, uidv, limit) {
  const conn = await getConn(env, uidv, "notion");
  if (!conn) throw httpErr(409, "notion nicht verbunden");
  const dbId = await journalDbId(env, uidv, conn);
  const r = await fetch("https://api.notion.com/v1/databases/" + dbId + "/query", {
    method: "POST", headers: await notionHeaders(conn),
    body: JSON.stringify({ sorts: [{ property: "Datum", direction: "descending" }], page_size: Math.min(limit || 7, 25) }),
  });
  if (r.status === 401) throw httpErr(409, "notion Token ungültig");
  if (!r.ok) throw httpErr(502, "Notion-Query: " + r.status);
  const data = await r.json();
  const entries = (data.results || []).map(pg => {
    const pr = pg.properties || {};
    return {
      titel: rich(pr.Titel && pr.Titel.title),
      datum: (pr.Datum && pr.Datum.date && pr.Datum.date.start) || "",
      zusammenfassung: rich(pr.Zusammenfassung && pr.Zusammenfassung.rich_text),
      stimmung: (pr.Stimmung && pr.Stimmung.select && pr.Stimmung.select.name) || null,
      energie: (pr.Energie && typeof pr.Energie.number === "number") ? pr.Energie.number : null,
      quelle: (pr.Quelle && pr.Quelle.select && pr.Quelle.select.name) || null,
    };
  });
  return { entries };
}

/* ---------- HTTP-Fehler mit Status ---------- */
function httpErr(status, message) { const e = new Error(message); e.status = status; return e; }

/* ---------- /api-Router ---------- */
async function handleApi(request, env, url) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  const path = url.pathname.replace(/^\/api/, "");

  // --- OAuth-Callback: kommt vom Browser-Redirect, Nutzer steckt im state ---
  const cbMatch = path.match(/^\/oauth\/([a-z-]+)\/callback$/);
  if (cbMatch) {
    const provider = cbMatch[1];
    const state = url.searchParams.get("state") || "";
    const code = url.searchParams.get("code") || "";
    const home = (env.SITE_URL || "https://dashboard.mumelter.org") + "/";
    const stRaw = state && await env.COCKPIT_KV.get("oauth-state:" + state);
    if (!stRaw) return Response.redirect(home + "?connect_error=state", 302);
    await env.COCKPIT_KV.delete("oauth-state:" + state);
    const st = JSON.parse(stRaw);
    if (st.provider !== provider) return Response.redirect(home + "?connect_error=provider", 302);
    if (!code) return Response.redirect(home + "?connect_error=denied", 302);
    try {
      const conn = await exchangeCode(env, provider, code);
      await putConn(env, st.uid, provider, conn);
      return Response.redirect(home + "?connected=" + provider, 302);
    } catch (e) {
      return Response.redirect(home + "?connect_error=exchange", 302);
    }
  }

  // --- Alles Weitere braucht einen angemeldeten Nutzer ---
  const user = await verifyUser(request, env);
  if (!user) return json({ error: "Nicht angemeldet" }, 401);

  try {
    // GET /api/integrations
    if (path === "/integrations" && request.method === "GET") {
      const out = [];
      for (const provider of ["google-calendar", "notion"]) {
        const conn = await getConn(env, user.id, provider);
        if (!providerReady(env, provider)) out.push({ provider, status: "disconnected", reason: "provider_not_configured" });
        else if (!conn) out.push({ provider, status: "disconnected" });
        else if (conn.error) out.push({ provider, status: "error", account: conn.account || "" });
        else out.push({ provider, status: "connected", account: conn.account || "", connectedAt: conn.connectedAt });
      }
      const mcpTok = await env.COCKPIT_KV.get("mcptok-of:" + user.id);
      return json({ integrations: out, mcp: { active: !!mcpTok } });
    }

    // POST /api/integrations/{provider}/connect
    let m = path.match(/^\/integrations\/([a-z-]+)\/connect$/);
    if (m && request.method === "POST") {
      const provider = m[1];
      if (!providerReady(env, provider)) return json({ error: "Provider auf dem Server nicht konfiguriert (Secrets fehlen — siehe INTEGRATIONS.md)" }, 501);
      const state = randToken();
      await env.COCKPIT_KV.put("oauth-state:" + state, JSON.stringify({ uid: user.id, provider }), { expirationTtl: 600 });
      const u = authUrl(env, provider, state);
      if (!u) return json({ error: "Unbekannter Provider" }, 404);
      return json({ url: u });
    }

    // DELETE /api/integrations/{provider}
    m = path.match(/^\/integrations\/([a-z-]+)$/);
    if (m && request.method === "DELETE") {
      await env.COCKPIT_KV.delete(intKey(user.id, m[1]));
      return json({ ok: true });
    }

    // GET /api/data/google-calendar/events?date=YYYY-MM-DD
    if (path === "/data/google-calendar/events" && request.method === "GET") {
      const date = url.searchParams.get("date") || today();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return json({ error: "date muss YYYY-MM-DD sein" }, 400);
      return json(await calendarEvents(env, user.id, date));
    }

    // GET /api/data/notion/journal?limit=N
    if (path === "/data/notion/journal" && request.method === "GET") {
      const limit = parseInt(url.searchParams.get("limit") || "7", 10);
      return json(await journalEntries(env, user.id, limit));
    }

    // POST /api/mcp/token — persönliche MCP-URL erzeugen/rotieren
    if (path === "/mcp/token" && request.method === "POST") {
      const old = await env.COCKPIT_KV.get("mcptok-of:" + user.id);
      if (old) await env.COCKPIT_KV.delete("mcptok:" + old);
      const tok = randToken();
      await env.COCKPIT_KV.put("mcptok:" + tok, user.id);
      await env.COCKPIT_KV.put("mcptok-of:" + user.id, tok);
      const base = (env.SITE_URL || "https://dashboard.mumelter.org").replace(/\/$/, "");
      return json({ url: base + "/mcp?key=" + tok, note: "Alte URL ist ab jetzt ungültig." });
    }
    // DELETE /api/mcp/token — Sprachzugang deaktivieren
    if (path === "/mcp/token" && request.method === "DELETE") {
      const old = await env.COCKPIT_KV.get("mcptok-of:" + user.id);
      if (old) { await env.COCKPIT_KV.delete("mcptok:" + old); await env.COCKPIT_KV.delete("mcptok-of:" + user.id); }
      return json({ ok: true });
    }

    return json({ error: "Unbekannter Endpunkt" }, 404);
  } catch (e) {
    return json({ error: e.message || "Serverfehler" }, e.status || 500);
  }
}

/* =====================================================================
 * /mcp — Multi-User-MCP (portiert aus Orbit mcp-worker.js, owner = Token-
 * Nutzer statt fester ORBIT_OWNER_ID). Claude-Connector-URL pro Nutzer:
 *   https://dashboard.mumelter.org/mcp?key=<persönliches Token>
 * ===================================================================== */
const ORBIT_SITE = "https://orbit.mumelter.org/";
const TASKS_SCHEMA = { type: "array", description: "Checklisten-Aufgaben im Ticket",
  items: { type: "object", properties: { text: { type: "string" }, done: { type: "boolean" } }, required: ["text"], additionalProperties: false } };
const BOARD_ID = { type: "string", description: "Board-id aus list_boards. Ohne board_id/board wird das zuletzt geänderte Board genutzt." };
const BOARD_NAME = { type: "string", description: "Board-Name statt id (z. B. \"Life\"), alternativ zu board_id." };
const TOOLS = [
  { name: "list_boards", description: "Listet ALLE deine Orbit-Boards (id + Titel). ZUERST aufrufen.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false } },
  { name: "list_statuses", description: "Spalten/Status eines Boards in Reihenfolge.",
    inputSchema: { type: "object", properties: { board_id: BOARD_ID, board: BOARD_NAME }, additionalProperties: false } },
  { name: "list_tickets", description: "Listet Tickets eines Boards. Mit board_id ODER board (Name) wählen; sonst zuletzt geändertes.",
    inputSchema: { type: "object", properties: { board_id: BOARD_ID, board: BOARD_NAME, status: { type: "string" }, query: { type: "string" }, include_done: { type: "boolean" } }, additionalProperties: false } },
  { name: "get_ticket", description: "Einzelnes Ticket per id.",
    inputSchema: { type: "object", properties: { id: { type: "string" }, board_id: BOARD_ID, board: BOARD_NAME }, required: ["id"], additionalProperties: false } },
  { name: "create_ticket", description: "Neues Ticket anlegen. status muss eine Spalte sein (list_statuses).",
    inputSchema: { type: "object", properties: {
      title: { type: "string" }, status: { type: "string" },
      prio: { type: "integer", minimum: 1, maximum: 4, description: "1 = kritisch … 4 = niedrig" },
      deadline: { type: "string", description: "YYYY-MM-DD" },
      desc: { type: "string" }, cats: { type: "array", items: { type: "string" } },
      tasks: TASKS_SCHEMA, board_id: BOARD_ID, board: BOARD_NAME }, required: ["title"], additionalProperties: false } },
  { name: "update_ticket", description: "Felder eines Tickets ändern (nur gesetzte werden überschrieben).",
    inputSchema: { type: "object", properties: {
      id: { type: "string" }, title: { type: "string" }, status: { type: "string" },
      prio: { type: "integer", minimum: 1, maximum: 4 }, deadline: { type: "string" },
      desc: { type: "string" }, cats: { type: "array", items: { type: "string" } },
      tasks: TASKS_SCHEMA, board_id: BOARD_ID, board: BOARD_NAME }, required: ["id"], additionalProperties: false } },
  { name: "move_ticket", description: "Ticket in eine andere Spalte (Status) verschieben.",
    inputSchema: { type: "object", properties: { id: { type: "string" }, status: { type: "string" }, board_id: BOARD_ID, board: BOARD_NAME }, required: ["id", "status"], additionalProperties: false } },
  { name: "delete_ticket", description: "Ticket löschen.",
    inputSchema: { type: "object", properties: { id: { type: "string" }, board_id: BOARD_ID, board: BOARD_NAME }, required: ["id"], additionalProperties: false } },
];
function normPrio(p) {
  if (p === "Hoch") return 1; if (p === "Mittel") return 3; if (p === "Niedrig") return 4;
  const n = parseInt(p, 10);
  if (n === 5) return 4;
  return (n >= 1 && n <= 4) ? n : null;
}
function normTasks(arr) {
  if (arr === undefined) return undefined;
  if (typeof arr === "string") { try { arr = JSON.parse(arr); } catch (e) { return undefined; } }
  if (!Array.isArray(arr)) return undefined;
  return arr.map(x => {
    if (typeof x === "string") return { text: x.trim(), done: false };
    const text = String((x && (x.text ?? x.title ?? x.name ?? x.label)) ?? "").trim();
    return { text, done: !!(x && (x.done === true || x.checked === true || x.completed === true)) };
  }).filter(x => x.text);
}
const rpcOk = (id, result) => ({ jsonrpc: "2.0", id, result });
const rpcErr = (id, code, message) => ({ jsonrpc: "2.0", id, error: { code, message } });

function sbHeaders(env) {
  return { apikey: env.SUPABASE_SERVICE_KEY, Authorization: "Bearer " + env.SUPABASE_SERVICE_KEY, "Content-Type": "application/json" };
}
async function sbGet(env, qs) {
  const r = await fetch(env.SUPABASE_URL + "/rest/v1/boards?" + qs, { headers: sbHeaders(env) });
  if (!r.ok) throw new Error("Supabase " + r.status + ": " + (await r.text()).slice(0, 200));
  return r.json();
}
async function listBoards(env, owner) {
  return sbGet(env, "select=id,title,updated_at&owner=eq." + encodeURIComponent(owner) + "&order=updated_at.desc");
}
async function loadBoard(env, owner, boardId, boardName) {
  const o = encodeURIComponent(owner);
  let rows;
  if (boardId) {
    rows = await sbGet(env, "select=id,title,data&owner=eq." + o + "&id=eq." + encodeURIComponent(boardId));
    if (!rows.length) throw new Error('Kein Board mit id "' + boardId + '" gefunden, das dir gehört.');
  } else if (boardName) {
    const all = await sbGet(env, "select=id,title,data&owner=eq." + o);
    const t = String(boardName).trim().toLowerCase();
    const mm = all.find(b => (b.title || "").toLowerCase() === t) || all.find(b => (b.title || "").toLowerCase().includes(t));
    if (!mm) throw new Error('Kein Board namens "' + boardName + '" gefunden. Verfügbar: ' + all.map(b => b.title).join(", "));
    rows = [mm];
  } else {
    rows = await sbGet(env, "select=id,title,data&owner=eq." + o + "&order=updated_at.desc&limit=1");
    if (!rows.length) throw new Error("Kein Board gefunden, das dir gehört.");
  }
  const b = rows[0];
  b.data = b.data || {};
  b.data.tickets = Array.isArray(b.data.tickets) ? b.data.tickets : [];
  return b;
}
async function saveData(env, owner, id, data) {
  const r = await fetch(env.SUPABASE_URL + "/rest/v1/boards?id=eq." + encodeURIComponent(id) + "&owner=eq." + encodeURIComponent(owner), {
    method: "PATCH", headers: { ...sbHeaders(env), Prefer: "return=minimal" },
    body: JSON.stringify({ data, updated_at: new Date().toISOString() }),
  });
  if (!r.ok) throw new Error("Supabase update " + r.status + ": " + (await r.text()).slice(0, 200));
}
const statusesOf = b => { const st = b.data?.settings?.statuses; return Array.isArray(st) && st.length ? st : ["Themenspeicher", "Geplant", "In Arbeit", "Review", "Erledigt"]; };
const doneOf = b => { const d = b.data?.settings?.doneStatuses; return Array.isArray(d) && d.length ? d : [statusesOf(b).slice(-1)[0]]; };
const pub = t => ({ id: t.id, url: ORBIT_SITE + "#t=" + encodeURIComponent(t.id),
  title: t.title, status: t.status, prio: t.prio, deadline: t.deadline,
  desc: t.desc || "", cats: t.cats || [],
  tasks: (t.tasks || []).map(x => ({ text: x.text, done: !!x.done })),
  createdAt: t.createdAt, completedAt: t.completedAt || null });

async function callTool(name, a, env, owner) {
  if (name === "list_boards") return JSON.stringify(await listBoards(env, owner), null, 2);
  if (name === "list_statuses") return JSON.stringify(statusesOf(await loadBoard(env, owner, a.board_id, a.board)), null, 2);
  if (name === "list_tickets") {
    const b = await loadBoard(env, owner, a.board_id, a.board), done = doneOf(b);
    let t = b.data.tickets.slice();
    if (a.status) t = t.filter(x => x.status === a.status);
    else if (!a.include_done) t = t.filter(x => !done.includes(x.status));
    if (a.query) { const q = String(a.query).toLowerCase(); t = t.filter(x => (x.title || "").toLowerCase().includes(q) || (x.desc || "").toLowerCase().includes(q)); }
    return JSON.stringify({ board: b.title, count: t.length, tickets: t.map(pub) }, null, 2);
  }
  if (name === "get_ticket") {
    const b = await loadBoard(env, owner, a.board_id, a.board), t = b.data.tickets.find(x => x.id === a.id);
    if (!t) throw new Error("Ticket nicht gefunden: " + a.id);
    return JSON.stringify(pub(t), null, 2);
  }
  if (name === "create_ticket") {
    if (!a.title) throw new Error("title fehlt.");
    const b = await loadBoard(env, owner, a.board_id, a.board), st = statusesOf(b);
    const useStatus = a.status && st.includes(a.status) ? a.status : st[0];
    const prio = a.prio === undefined ? 3 : normPrio(a.prio);
    if (prio === null) throw new Error("prio muss 1-4 sein (1 = kritisch).");
    const ticket = { id: uid(), title: a.title, status: useStatus, prio,
      deadline: a.deadline || today(), desc: a.desc || "", note: "", cats: a.cats || [], imgs: [], tasks: normTasks(a.tasks) || [], recur: null, createdAt: today() };
    b.data.tickets = [...b.data.tickets, ticket];
    await saveData(env, owner, b.id, b.data);
    return JSON.stringify({ created: ticket.id, url: ORBIT_SITE + "#t=" + ticket.id, status: useStatus, board: b.title }, null, 2);
  }
  if (name === "update_ticket") {
    const b = await loadBoard(env, owner, a.board_id, a.board), t = b.data.tickets.find(x => x.id === a.id);
    if (!t) throw new Error("Ticket nicht gefunden: " + a.id);
    if (a.status && !statusesOf(b).includes(a.status)) throw new Error("Unbekannter Status: " + a.status);
    if (a.prio !== undefined) { const np = normPrio(a.prio); if (np === null) throw new Error("prio muss 1-4 sein."); a.prio = np; }
    for (const k of ["title", "status", "prio", "deadline", "desc", "cats"]) if (a[k] !== undefined) t[k] = a[k];
    if (a.tasks !== undefined) t.tasks = normTasks(a.tasks) || [];
    const done = doneOf(b);
    if (done.includes(t.status) && !t.completedAt) t.completedAt = today();
    if (!done.includes(t.status)) delete t.completedAt;
    await saveData(env, owner, b.id, b.data);
    return JSON.stringify(pub(t), null, 2);
  }
  if (name === "move_ticket") {
    const b = await loadBoard(env, owner, a.board_id, a.board);
    if (!statusesOf(b).includes(a.status)) throw new Error("Unbekannter Status: " + a.status);
    const t = b.data.tickets.find(x => x.id === a.id);
    if (!t) throw new Error("Ticket nicht gefunden: " + a.id);
    t.status = a.status;
    const done = doneOf(b);
    if (done.includes(a.status)) { if (!t.completedAt) t.completedAt = today(); } else delete t.completedAt;
    await saveData(env, owner, b.id, b.data);
    return JSON.stringify({ moved: a.id, status: a.status }, null, 2);
  }
  if (name === "delete_ticket") {
    const b = await loadBoard(env, owner, a.board_id, a.board), before = b.data.tickets.length;
    b.data.tickets = b.data.tickets.filter(x => x.id !== a.id);
    if (b.data.tickets.length === before) throw new Error("Ticket nicht gefunden: " + a.id);
    await saveData(env, owner, b.id, b.data);
    return JSON.stringify({ deleted: a.id }, null, 2);
  }
  throw new Error("Unbekanntes Tool: " + name);
}

async function handleRpc(msg, env, owner) {
  const { id, method, params } = msg || {};
  if (method === "initialize")
    return rpcOk(id, { protocolVersion: params?.protocolVersion || PROTO_FALLBACK, capabilities: { tools: { listChanged: false } }, serverInfo: SERVER_INFO });
  if (method && method.startsWith("notifications/")) return null;
  if (method === "ping") return rpcOk(id, {});
  if (method === "tools/list") return rpcOk(id, { tools: TOOLS });
  if (method === "tools/call") {
    const nm = params?.name, args = params?.arguments || {};
    try { return rpcOk(id, { content: [{ type: "text", text: await callTool(nm, args, env, owner) }] }); }
    catch (e) { return rpcOk(id, { content: [{ type: "text", text: "Fehler: " + e.message }], isError: true }); }
  }
  return rpcErr(id ?? null, -32601, "Methode nicht gefunden: " + method);
}
function sse(messages) {
  const body = messages.map(m => "event: message\ndata: " + JSON.stringify(m) + "\n\n").join("");
  return new Response(body, { status: 200, headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache, no-transform", ...CORS } });
}
async function handleMcp(request, env, url) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  // Token: ?key=…, Authorization: Bearer … oder Pfad /mcp/<token>
  let token = url.searchParams.get("key") || "";
  const authHdr = request.headers.get("Authorization") || "";
  if (!token && authHdr.startsWith("Bearer ")) token = authHdr.slice(7);
  if (!token && url.pathname.length > 5) token = decodeURIComponent(url.pathname.slice(5));
  const owner = token && await env.COCKPIT_KV.get("mcptok:" + token);
  if (!owner) return json({ error: "Forbidden" }, 403);
  if (!env.SUPABASE_SERVICE_KEY) return json({ error: "SUPABASE_SERVICE_KEY fehlt (Worker-Secret)" }, 500);

  if (request.method === "GET") return json({ ok: true, server: SERVER_INFO.name, transport: "streamable-http" });
  if (request.method !== "POST") return json({ error: "Methode nicht erlaubt" }, 405);
  let body;
  try { body = await request.json(); } catch (e) { return json(rpcErr(null, -32700, "Ungültiges JSON"), 400); }
  const msgs = Array.isArray(body) ? body : [body];
  const replies = [];
  for (const m of msgs) { const r = await handleRpc(m, env, owner); if (r) replies.push(r); }
  if (!replies.length) return new Response(null, { status: 202, headers: CORS });
  const accept = request.headers.get("Accept") || "";
  if (accept.includes("text/event-stream")) return sse(replies);
  return json(Array.isArray(body) ? replies : replies[0]);
}

/* ---------- Einstieg ---------- */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/mcp" || url.pathname.startsWith("/mcp/")) return handleMcp(request, env, url);
    if (url.pathname.startsWith("/api/")) return handleApi(request, env, url);
    return env.ASSETS.fetch(request);
  },
};
