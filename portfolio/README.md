# portfolio.mumelter.org

Portfolio-Seite mit den Arbeitsproben von Svenja Mumelter.

Statische Seite, ausgeliefert als Cloudflare Worker mit Static Assets — gleiches
Muster wie `dashboard.mumelter.org`.

## Aufbau

```
public/
  index.html                                   Die komplette Seite (Styles inline)
  assets/royalshrimp-logo.jpg                  Logo, aus der Original-Slide extrahiert
  assets/royalshrimp-qr.png                    QR-Code, aus der Original-Slide extrahiert
  Arbeitsprobe_1_RoyalShrimp_Svenja_Mumelter.pdf
  Arbeitsprobe_2_Cuply_Svenja_Mumelter.pdf     (noch zu ergänzen)
wrangler.jsonc                                 Worker-Konfiguration + Custom Domain
```

Der Kopfbereich der Seite bildet die Original-Slide „Arbeitsprobe RoyalShrimp.de"
in Code nach: Farben, Schriftgrößen und Rasterabstände sind aus der PDF ausgelesen
und entsprechen bei 1440 px Viewportbreite exakt den Werten der Slide. Darunter
liegt die zweite Arbeitsprobe (Cuply) in derselben Gestaltung.

## Dateinamen

Die Download-Buttons zeigen exakt auf diese beiden Dateinamen. Nicht umbenennen,
sonst brechen die Links:

- `Arbeitsprobe_1_RoyalShrimp_Svenja_Mumelter.pdf`
- `Arbeitsprobe_2_Cuply_Svenja_Mumelter.pdf`

Fehlt eine der beiden PDFs auf dem Server, schaltet die Seite den zugehörigen
Button automatisch auf „folgt in Kürze", statt ins Leere zu verlinken.

**Wichtig:** Cloudflare erlaubt maximal 25 MiB pro einzelner Asset-Datei. Größere
PDFs vorher komprimieren.

## Lokal ansehen

```sh
npm install
npm run dev
```

## Deployen

Der Deploy läuft über die Git-Integration von Cloudflare Workers: Ein Push auf
`main` baut und veröffentlicht automatisch.

Manuell geht es mit einem Cloudflare-API-Token:

```sh
npx wrangler deploy
```
