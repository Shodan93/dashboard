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
- Empfohlene Umsetzung: eigener Cloudflare Worker (analog `orbit-api`),
  erreichbar unter `https://cockpit-api.mumelter.org`. Verifiziert das
  Supabase-Access-Token wie `worker.js` in ORBIT.

## Authentifizierung

Jeder Request trägt den Header `X-Supabase-Token: <access_token>`
(gleiches Muster wie orbit-api). Backend verifiziert gegen
`/auth/v1/user` und leitet daraus die `user_id` ab. 401 bei ungültigem Token.

## Die vier Endpunkte

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
Frontend zeigt „Neu verbinden").

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

## Verifikation „keine persönlichen IDs"

Muss in `public/index.html` (und allem, was deployed wird) **ohne Treffer** sein:

```bash
grep -riE "svenja|d3883d4e|f20e5649|39bb7b65|@gmail|@googlemail|calendar-id|notion_(db|database)" public/
```

Bewusst erlaubt (öffentliche Infrastruktur, keine Personen-Daten):
Supabase-Projekt-Ref `eqrzazmdamiplqiizrat` + Publishable Key, `orbit.mumelter.org`,
`cockpit-api.mumelter.org`.
