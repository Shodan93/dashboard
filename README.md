# Cockpit — Personal OS Dashboard

Dashboard unter **https://dashboard.mumelter.org** (Arbeitstitel „Cockpit").
Design: Figma-Export „Personal OS" (liegt als Referenz unter [`design/`](design/)).

## Was Schritt 1 kann

- **Login mit dem Orbit-Konto** — gleiches Supabase-Projekt wie
  [orbit.mumelter.org](https://orbit.mumelter.org), also dieselben Nutzer,
  E-Mails und Passwörter (inkl. Passwort-Reset und Einladungs-Links).
- **Design 1:1 aus Figma** — Deep-Space-Look, KPI-Reihe, Orbit-Board,
  AI-Briefing, Kalender, Goals, Journal, AI Brain, Smart Home; voll responsiv
  (Desktop-Rail → Tablet-Drawer → Mobile Bottom-Nav).
- **Orbit live verbunden** — das Orbit-Widget zeigt die echten Boards des
  angemeldeten Nutzers (RLS: nur eigene/beigetretene Boards). Über das
  Zahnrad in der Orbit-Karte wählt man, **welche Boards angezeigt werden**;
  die Auswahl wird pro Nutzer in Supabase gespeichert (`cockpit_prefs`).
  Board-Änderungen in Orbit erscheinen per Realtime sofort im Cockpit.
- **Alle übrigen Widgets: Dummy-Daten** — Kalender, Health, Habits, Invest,
  Journal, AI Brain, Smart Home sind Platzhalter im finalen Design und werden
  in späteren Schritten angebunden.

**Wichtig:** ORBIT bleibt ein Standalone-Projekt und wird nicht verändert.
Das Cockpit liest nur (Boards via bestehende RLS) und hat eigene Tabellen
mit Präfix `cockpit_` im selben Supabase-Projekt.

## Architektur

| Schicht  | Technik |
|---|---|
| Frontend | Eine `public/index.html` (CSS+JS inline, kein Build-Step) — gleiche Philosophie wie ORBIT |
| Hosting  | Cloudflare Worker `dashboard` mit Static Assets, Custom Domain `dashboard.mumelter.org` |
| Auth + Daten | Supabase-Projekt **Orbit** (`eqrzazmdamiplqiizrat`): gemeinsame Auth, `boards` lesend, eigene Tabelle `cockpit_prefs` |
| Design   | Tokens/Komponenten aus dem Figma-Design-System, transkribiert nach CSS (Quelle: `design/_ds/`) |

## Deploy

```bash
npm install          # holt wrangler
npx wrangler deploy  # deployt Worker "dashboard" + legt dashboard.mumelter.org als Custom Domain an
```

Voraussetzung: `wrangler login` bzw. `CLOUDFLARE_API_TOKEN` mit Workers-Rechten
für den Account, in dem die Zone `mumelter.org` liegt (gleicher Account wie der
`orbit`-Worker). Es sind **keine Secrets/Variablen** nötig — das Frontend nutzt
nur den öffentlichen Supabase-Publishable-Key.

Lokal testen: `npm run dev` → http://localhost:8787

## Supabase

Schema siehe [`supabase.sql`](supabase.sql) — bereits als Migration
`cockpit_prefs` im Projekt angewendet. In der Supabase-Auth-Konfiguration
sollte `https://dashboard.mumelter.org` zu den **Redirect URLs** hinzugefügt
werden, damit Passwort-Reset-Links aufs Cockpit zeigen können
(Dashboard → Authentication → URL Configuration).

## Integrationen (Multi-User)

Das Frontend ist gegen den Vertrag in [`INTEGRATIONS.md`](INTEGRATIONS.md)
gebaut: Integrationen-Screen mit Verbinden-States (Verbunden / Nicht
verbunden / Fehler / Wartet auf Backend), Kalender- und Journal-Kachel
laden echte Daten **nur** über die Provider-Schicht — es stehen keine
persönlichen IDs (Notion-DBs, Kalender, E-Mails) im Code. **OAuth-Handshake
und Token-Storage sind Backend-Aufgaben** (`cockpit-api`, noch zu bauen) —
bis dahin zeigen die Kacheln Beispieldaten.

## Nächste Schritte (geplant)

1. Backend `cockpit-api` (Cloudflare Worker, analog `orbit-api`) mit den vier Endpunkten aus `INTEGRATIONS.md`
2. Quick Create legt echte Orbit-Tickets an (per RPC, ohne ORBIT-Frontend anzufassen)
3. Health, Habits, Goals mit echten Daten; AI-Briefing über den Worker-Proxy
