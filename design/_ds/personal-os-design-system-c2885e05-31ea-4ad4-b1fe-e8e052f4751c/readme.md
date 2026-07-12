# Personal OS — Design System

A cosmic, glass-morphic **personal life-operating-system** dashboard. Personal OS unifies a person's day into one "mission control": tasks (Orbit board), calendar, habits, goals, health, investments, smart-home and an AI brain — all floating as frosted-glass panels over a deep-space nebula. The product voice is German; the aesthetic is calm, premium, night-sky.

This design system was extracted from the attached Figma file **"Personal OS — Final.fig"** (page `FINAL-07-Export`, frame *"07 Layout Integrity and Feedback Fixes — FINAL"*, 1536×1024). All token values, component specs, type and imagery are transcribed verbatim from that file — it is the source of truth.

> **No logo file exists in the source.** The brand mark is a small CSS-drawn "planet" (a ringed circle with a moon dot) built from shapes in the Figma header, paired with the wordmark **PERSONAL OS** set in Rajdhani. There is no raster logo to ship; wordmarks render in type. See `guidelines/brand-logo.card.html`.

---

## Sources

- **Figma:** Personal OS — Final.fig → page `FINAL-07-Export` → frame node `110:96`. Component families read from `/METADATA.md`. Materialized tokens (6 collections, 64 variables), 15 component families, 4 image assets.
- No codebase or slide decks were provided.

## Index / manifest

- **`styles.css`** — global CSS entry point (import manifest only).
- **`tokens/`** — `fig-tokens.css` (colors, spacing, radius, stroke, blur from Figma Variables), `fonts.css` (Inter + Rajdhani), `aliases.css` (shadow/gradient/glass composites), `typography.css` (text-style classes).
- **`components/`** — 15 reusable React primitives across `buttons/`, `forms/`, `navigation/`, `cards/`, `data/`.
- **`ui_kits/dashboard/`** — full interactive recreation of the Personal OS home.
- **`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand).
- **`assets/`** — `cosmic-bg.png`, `planet.png`, `ai-orb.png`, `ai-brain-network.png`.
- **`SKILL.md`** — Agent-Skill wrapper.

### Components

`buttons/` — **PrimaryButton**, **SecondaryButton**, **AISendButton**
`forms/` — **SearchField**, **Toggle**
`navigation/` — **SidebarNavItem**, **SidebarNavigationItem**, **TopNavigationAction**
`cards/` — **BaseCard**, **SectionCard**, **KPICard**
`data/` — **StatusChip**, **ProgressIndicator**, **ListRow**, **IconContainer**

### UI kits

`ui_kits/dashboard/` — **Personal OS Dashboard**: sidebar rail, header (greeting/search/quick-create/avatar), KPI row, Orbit kanban board, AI Morning Briefing, calendar, goals, journal, AI brain, smart-home. Interactive: switch rail tabs, check tasks, toggle devices, type into search/AI.

---

## CONTENT FUNDAMENTALS

- **Language: German**, with English kept for product/technical nouns. UI mixes the two naturally: "Kalender – Heute", "Quick Create", "Deep Work Session", "AI Morning Briefing", "Neue Aufgabe". Don't fully translate — the bilingual mix *is* the voice.
- **Address: informal "du"** ("Frag deine AI …", "Suche in deinem OS …", "Du hast heute 6 offene Aufgaben"). Warm, personal, first-name ("Guten Morgen, David").
- **Casing:** Section titles in **Title Case / sentence case** (Rajdhani): "Orbit – Project Board", "Goals – Monatsziele". Micro-labels, actions, KPIs and nav in **ALL-CAPS** with wide tracking: "GOOGLE CALENDAR", "ALLE →", "ZUM ORBIT TOOL →", "DAILY TASKS", "AI BRAIN".
- **Action links** are terse, all-caps, and end with a right arrow: "ALLE →", "ÖFFNEN →", "ALLE GERÄTE →", "Alle Termine anzeigen →". Add buttons use "+ Neue Aufgabe" / "+ Neue Karte".
- **Numbers & meta** are compact, middle-dot separated: "Heute, 08:15 · 0:45", "2 offen · 1 aktiv · 3 fertig", "Dockt · 100%", "Samstag, 11. Juli 2026 · KW 28".
- **Tone:** calm, competent, quietly futuristic — a personal mission control, never loud or salesy. Status is factual ("Gym-Habit ist noch offen"), encouragement is understated ("Guter Fokus-Tag für Deep Work").
- **No emoji.** Meaning is carried by icons, chips and the "·" separator.

## VISUAL FOUNDATIONS

- **Overall vibe:** deep-space "mission control". A real nebula photograph fills the whole canvas; frosted-glass cards float above it with soft violet glows. Premium, nocturnal, focused.
- **Color:** a single dominant **violet** family (`#C4B5FD → #6D28D9`, primary `#8B5CF6`) over near-black **space** neutrals (`#060410 → #1B1438`). Semantic accents are used sparingly: success `#4ADE80`, warning `#FBBF24`, danger `#FB7185`, info `#38BDF8`. Text is a cool off-white ramp (`#F2F0FA → #8682A4`) plus violet `#C4B5FD` for accent labels/links.
- **Backgrounds:** full-bleed **`cosmic-bg.png`** nebula, layered with a radial ambient violet glow (top-right), a faded **`planet.png`** bleeding off the top-right corner, and a subtle radial "readability" darkening behind content. The base under everything is the `--gradient-deep-space` vertical gradient. No flat solid backgrounds; no busy patterns beyond the photo.
- **Cards:** rounded **16px** frosted glass. Fills are translucent violet-black (`rgba(21,16,39,0.68–0.86)`) with `backdrop-filter: blur(20–24px)`. Four elevation treatments (see `BaseCard`): `card` (hairline + soft drop), `glow` (accent-violet inset ring + violet bloom — used for hero modules like AI Briefing and the Orbit board), `elevated` (brighter violet inset ring — KPI tiles), `soft` (faint white hairline — Journal, Goals). Inner tiles/columns drop to 12–14px radius on `rgba(11,8,26,0.6)` insets.
- **Borders:** almost always **1px inset box-shadow hairlines**, not real borders — `rgba(255,255,255,0.08)` for neutral, `rgba(139,92,246,0.35)` for accent, plus a `rgba(255,255,255,0.13)` top-edge highlight on glass. Focus ring is a 2px `rgba(191,173,255,0.95)` halo.
- **Shadow system:** layered — an inset hairline ring + inset top highlight + a colored violet bloom (`0 0 14px rgba(143,112,255,0.15)`) + a deep ambient drop (`0 14px 34px rgba(0,0,0,0.35)`). Tokenized as `--shadow-card / -glow / -elevated / -soft`.
- **Radii:** sm 8 · md 12 · lg 16 · xl 20 · full 999. Buttons 11–12, cards 16, sidebar 20, pills/chips/avatars 999.
- **Type:** two families. **Rajdhani** (condensed, techy) for display, titles, KPIs and all-caps labels; **Inter** for body, meta and inputs. Tight line-heights, generous letter-spacing on caps (0.3–2px).
- **Buttons:** primary is the `--gradient-accent` violet gradient (90°, `#7D5CFF → #9E80FF`), all-caps Rajdhani. Hover brightens the gradient + adds a violet drop-glow; pressed darkens; disabled goes muted grey.
- **Toggles / switches:** on = solid accent-glow violet with the knob right; off = inset dark with hairline, knob left. Device tiles use the compact `sm` variant.
- **Transparency & blur** are core, not decorative: every card is translucent glass so the nebula shows through. Ambient/glass blur tokens: 20–24px.
- **Animation:** subtle and functional — 140–160ms ease transitions on hover/press/toggle; knob slides on a `cubic-bezier(0.4,0,0.2,1)`. No bounces, no infinite loops on content. Glows are static.
- **Hover states:** nav items lift to `rgba(255,255,255,0.06)`; buttons brighten; links/chips rely on the accent violet. **Press states:** buttons darken the gradient (no shrink).
- **Imagery vibe:** cool, violet-tinted, high-contrast astrophotography and 3D-rendered planets/orbs with violet rim-light. Assets are dropped in as glowing focal accents at reduced opacity (0.6–0.8), never as flat photos.
- **Layout rules:** fixed 16px outer margin; 88px left rail; 24px gutter between modules; content is a main column (~940px) + a right column. Everything sits on one non-scrolling 1536×1024 "screen".

## ICONOGRAPHY

- The source draws icons as **thin single-stroke line glyphs** (~1.2–1.5px, rounded caps/joins) inside 18–20px boxes — a Lucide/Feather-family look. There is **no bundled icon font** and no emoji anywhere.
- The original Figma vectors are per-node outline paths; rather than copy hundreds of tiny fragmented SVGs, this system ships a small hand-built **Lucide-style stroke set** in `ui_kits/dashboard/icons.jsx` (`window.POSIcons`: home, orbit, calendar, habits, goals, health, invest, smart, brain, settings, chevrons, bell, bulb, robot, sun, thermo, doc, coins) matching the source's stroke weight and rounded style. **Substitution flagged:** these are re-drawn to match, not the exact source vectors. If you need pixel-identical glyphs, re-materialize them from the .fig or drop in [Lucide](https://lucide.dev) (same visual family) via CDN.
- **Raster/brand imagery IS copied verbatim** from the file into `assets/` (nebula, planet, AI orb, AI-brain network) — these are never redrawn.
- Icons inherit `currentColor`, so wrap in `IconContainer` or set `color` to tint (accent violet for active, muted for idle).

## Intentional additions

- **StatusChip `tone` variants** (success/warning/danger/info/neutral) extend the source's single accent chip to cover the priority/status colors the tickets already used (MEDIUM/LOW/DONE). Values come from the file's semantic tokens.
- **Icon set** (`POSIcons`) — see ICONOGRAPHY; added because the source's fragmented vector icons aren't reusable as-is.

## Known caveats / substitutions

- **Fonts** load from the Google Fonts CDN (Inter, Rajdhani are the real families) rather than self-hosted binaries — swap in `@font-face` files for offline/production.
- **Icons** are a matched Lucide-style set, not the exact source vectors (see ICONOGRAPHY).
- The Figma file defines **no named text styles**; the `pos-*` type classes in `typography.css` are distilled from observed usage.
