# Cockpit — Integrations-Vertrag (Frontend ⇄ Backend)

Dies ist der verbindliche Vertrag zwischen dem Cockpit-Frontend und dem
(noch zu bauenden) Integrations-Backend. Das Frontend ist vollständig
gegen diesen Vertrag gebaut und **enthält keine persönlichen IDs** mehr
(keine Notion-Datenbank-IDs, keine Kalender-IDs, keine E-Mail-Adressen).

## Scope-Grenze (wichtig)

**OAuth-Handshake und Token-Storage sind Backend, nicht dieses Projekt.**

- Das Frontend kennt nur: Provider-Status, eine vom Backend gelieferte
  Autorisierungs-URL (öffnet sie im Browser) und normalisierte Daten.
- Tokens, Refresh-Logik, Provider-Ressourcen-IDs (welche Notion-DB, welcher
  Kalender) liegen ausschließlich beim Backend, gespeichert **pro Nutzer**
  (Supabase-`user_id` aus dem verifizierten Token).
- Umsetzung: **`worker.js` in diesem Repo** — derselbe Cloudflare Worker
  (`dashboard`), der auch die Seite ausliefert. `/api/*` und `/mcp*` gehen an
  den Worker (`run_worker_first`), alles andere an die Static Assets.
  Basis-URL für das Frontend ist deshalb same-origin: **`/api`**.
  Token-Storage: KV-Namespace `COCKPIT_KV` (`cockpit-integrations`,
  id `4a3f64853aec4ba9926417dc84c2ef31`), Schlüssel `int:<user_id>:<provider>`.

## Authentifizierung

Jeder Request trägt den Header `X-Supabase-Token: <access_token>`
(gleiches Muster wie orbit-api). Backend verifiziert gegen
`/auth/v1/user` und leitet daraus die `user_id` ab. 401 bei ungültigem Token.

## Die vier Endpunkte

Alle Pfade relativ zur Seite selbst (`https://dashboard.mumelter.org/api/…`).

### 1. `GET /integrations`
Status aller Provider des angemeldeten Nutzers.

```json
{ "integrations": [
  { "provider": "google-calendar", "status": "connected",
    "account": "…@gmail.com", "connectedAt": "2026-07-12T18:00:00Z" },
  { "provider": "notion", "status": "disconnected" }
] }
```
`status`: `connected` | `disconnected` | `error` (Token abgelaufen/widerrufen —
Frontend zeigt „Neu verbinden"). Zusätzlich enthält die Antwort
`"mcp": { "active": true|false }` — ob der Nutzer eine aktive
Claude-Sprachsteuerungs-URL hat (siehe unten).

### 2. `POST /integrations/{provider}/connect`
Startet den OAuth-Flow. Antwort:

```json
{ "url": "https://accounts.google.com/o/oauth2/…" }
```
Das Frontend öffnet `url` im Browser. Callback/Token-Tausch macht das
Backend; danach `redirect` zurück auf `https://dashboard.mumelter.org`.

### 3. `DELETE /integrations/{provider}`
Trennt die Verbindung (Token löschen, ggf. revoken). Antwort `{ "ok": true }`.

### 4. `GET /data/{provider}/{resource}`
Normalisierte Daten, provider-spezifische Ressourcen:

- `GET /data/google-calendar/events?date=YYYY-MM-DD`
  ```json
  { "events": [ { "start": "09:00", "title": "Team Standup", "durationMin": 30 } ] }
  ```
- `GET /data/notion/journal?limit=7` — Einträge absteigend nach Datum:
  ```json
  { "entries": [ { "titel": "Guter Fokus-Tag", "datum": "2026-07-12",
      "zusammenfassung": "…", "stimmung": "gut", "energie": 4, "quelle": "Sprache" } ] }
  ```

Fehlerfälle: `401` nicht angemeldet · `409` Provider nicht verbunden ·
`502` Provider-API-Fehler. Frontend fällt bei jedem Fehler auf den
Nicht-verbunden-Zustand der Kachel zurück.

## Provider (Stand heute)

| Provider-ID       | Kacheln            | Verbinden über |
|---|---|---|
| `orbit`           | Orbit-Board, Daily Tasks | implizit (Supabase-Login) — kein OAuth |
| `google-calendar` | Kalender           | OAuth via Backend |
| `notion`          | Journal (später AI Brain) | OAuth via Backend |

## Journal-Datenvertrag (Notion → Dashboard)

Quelle: Notion-Datenbank „Journal" unter `🪐 Personal OS` — **welche** Datenbank,
weiß nur das Backend (pro Nutzer gespeichert). Ein Eintrag pro Tag:

| Feld | Typ | Bedeutung |
|---|---|---|
| `titel` | string | Kurze Überschrift des Tages, z. B. „Guter Fokus-Tag" |
| `datum` | `YYYY-MM-DD` | Tag des Eintrags |
| `zusammenfassung` | string | 1–2 Sätze — **das zeigt die Journal-Kachel** |
| `stimmung` | `sehr gut` \| `gut` \| `neutral` \| `schwer` \| `sehr schwer` | Grundstimmung |
| `energie` | number 1–5 | Energielevel |
| `quelle` | `Sprache` \| `Text` | Wie der Eintrag entstand (Dashboard behandelt beide gleich) |

Der Fließtext liegt im Notion-Seiteninhalt und wird von der Kachel nicht geladen.

## OAuth-Flow im Detail

1. Frontend: `POST /api/integrations/{provider}/connect` → Backend erzeugt
   `state` (KV, 10 min TTL, gebunden an `user_id`) und liefert die Auth-URL.
2. Browser öffnet die URL, Nutzer stimmt zu.
3. Provider ruft `GET /api/oauth/{provider}/callback?code&state` auf → Backend
   validiert `state`, tauscht `code` gegen Tokens (Client-Secret nur hier),
   speichert sie in KV und leitet auf `/?connected={provider}` zurück.
4. Frontend zeigt Erfolg und lädt die Kachel-Daten neu.

Scopes: Google `calendar.readonly` (nur lesen) · Notion: Zugriff nur auf die
Seiten, die der Nutzer bei der Autorisierung freigibt (dort muss die Seite
mit der „Journal"-Datenbank dabei sein — das Backend findet sie per Suche
nach dem Datenbank-Titel „Journal" und merkt sich die ID pro Nutzer).

## Claude-Sprachsteuerung (Multi-User-MCP)

Jeder Nutzer kann sein Orbit-Board per Claude steuern (in der Claude-App auch
per Sprache). Dafür stellt derselbe Worker unter **`/mcp`** einen
Remote-MCP-Server bereit — Multi-User-Variante des ORBIT-MCP:

- `POST /api/mcp/token` (angemeldet) → erzeugt/rotiert die persönliche URL
  `https://dashboard.mumelter.org/mcp?key=<token>`; `DELETE /api/mcp/token`
  deaktiviert sie. Token → `user_id` liegt in KV (`mcptok:<token>`).
- Alle Board-Zugriffe filtern serverseitig hart `owner = <user_id des Tokens>`
  — man sieht und ändert nur die eigenen Boards.
- Tools: `list_boards`, `list_statuses`, `list_tickets`, `get_ticket`,
  `create_ticket`, `update_ticket`, `move_ticket`, `delete_ticket`.
- Einrichtung (macht jeder Nutzer selbst, UI unter Integrationen → „Claude —
  Sprache"): Claude-App → Settings → Connectors → benutzerdefinierter
  Connector → URL einfügen, OAuth-Felder leer lassen.

ORBIT selbst bleibt unangetastet — sein Single-User-MCP unter
`orbit.mumelter.org/mcp` funktioniert unabhängig weiter.

## Einmalige Einrichtung (Betreiber)

Der Worker `dashboard` braucht diese **Secrets** (Cloudflare → Workers &
Pages → dashboard → Settings → Variables and Secrets, Typ „Secret"; sie
überleben Deployments):

| Secret | Woher |
|---|---|
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google Cloud Console → APIs & Services → Credentials → „OAuth client ID" (Web application). **Authorized redirect URI:** `https://dashboard.mumelter.org/api/oauth/google-calendar/callback`. Google Calendar API aktivieren. Scope `calendar.readonly` beim Consent Screen. |
| `NOTION_CLIENT_ID` / `NOTION_CLIENT_SECRET` | notion.so/my-integrations → neue Integration, Typ **Public**. **Redirect URI:** `https://dashboard.mumelter.org/api/oauth/notion/callback`. |
| `SUPABASE_SERVICE_KEY` | Supabase → Project Settings → API → `service_role` (nur für `/mcp`-Board-Zugriff; liegt nie im Repo/Frontend). |

Ohne die Secrets antwortet `POST …/connect` mit `501` und der
Integrationen-Screen zeigt einen Hinweis; die Seite selbst läuft normal.

## Verifikation „keine persönlichen IDs"

Muss in allem, was deployed wird (`public/`, `worker.js`, `wrangler.jsonc`),
**ohne Treffer** sein:

```bash
grep -riE "svenja|d3883d4e|f20e5649|39bb7b65|@gmail|@googlemail|calendar-id|notion_(db|database)" public/ worker.js wrangler.jsonc
```

Bewusst erlaubt (öffentliche Infrastruktur, keine Personen-Daten):
Supabase-Projekt-Ref `eqrzazmdamiplqiizrat` + Publishable Key,
`orbit.mumelter.org`, `dashboard.mumelter.org`, KV-Namespace-ID.
