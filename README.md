# Smartwatch Solutions website

Marketing site for Smartwatch Solutions, a Kampala-based fleet and mobile asset management company.
Visual design and layout from the Claude Design project "Smartwatch website redesign" (the exported
`Smartwatch Site.html`); copy migrated from the client's live site.

## Stack

- Vite 8, React 19, TypeScript, bun
- `react-router-dom` for routing
- CSS Modules per component; design tokens in `src/index.css` (the brand manual's swatches in sRGB, not its
  printed hex: green #4a8f42 leads and fills the bands, navy #1b2845 for headings; primaries and green shades only)
- GSAP (ScrollTrigger) + Lenis for scroll effects and smooth scrolling
- vitest + Testing Library for behaviour tests (animation libraries are mocked in tests)

## Commands

```bash
bun install        # once
bun run dev        # http://localhost:5173
bun run test       # vitest, single run
bun run lint       # oxlint
bun run build      # type-check + production build into dist/
bun run preview    # serve dist/
```

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/products`, `/products/:slug` | Products index and six product pages |
| `/solutions`, `/solutions/:slug` | Solutions index and fourteen industry pages |
| `/hardware` | Hardware & accessories |
| `/platforms` | Platform logins |
| `/about` (`/company` redirects) | Company |
| `/contact` | Contact, support, offices, demo form |
| `/privacy-policy`, `/terms` (`/terms-and-conditions` redirects) | Legal |

## Where things live

- `src/data/` — all copy and lists. `solutions/` and `products/` hold one file per page; `hardware.ts`,
  `about.ts`, `platforms.ts`, `legal.ts` the rest; `site.ts` has routes, anchors, offices, stats and the
  platform portals; `nav.ts` builds the menus. Edit text here, not in components.
- `src/data/types.ts` — the `DetailPage` / `Section` types every page is written against.
- `src/pages/DetailPage.tsx` + `src/components/sections/` — the single template that renders any page.
- `src/components/home/` — the homepage sections; `CargoSpotlight.tsx` fronts Cargo Tracking, copy in `cargoFeature`
  (`src/data/content.ts`).
- `docs/video/flow-prompts.md` — Google Flow (Veo 3) prompt sets for the brand videos (hero, cargo, e-lock, dash cam).
- `src/components/Header.tsx` — transparent colour-inverting header (VengeanceUI mega-menu-navbar), mega
  menus, contact popover, drawer; `AnnouncementBar.tsx` sits above it.
- `src/motion/` and `src/components/Reveal.tsx` — GSAP setup, reveal-on-scroll, hero entrances.
- `src/lib/leads.ts` — `submitLead()`, the single place to wire the demo and contact forms to a backend.
- `public/images/` — the client's approved imagery (WebP).
- `design/build-logo.py` then `design/brand-colours.py` — rebuild the logo from the brand PDF, then convert its CMYK
  to the manual's colours in sRGB (macOS, uses `sips`; the P3 story is in the script and the 2026-09-28 spec).

## Responsive conventions

- Breakpoints, widest first: `1240px` (tighter header and menu spacing), `1100px` (contact link and the
  menu promo tile go), `900px` (drawer replaces the nav, two-column sections stack, the WhatsApp card
  folds into its badge), `680px` (the platform tabs and the bento cards become sideways-scrolling
  strips), `520px` (single-column grids, phone padding), `400px` (display type floors).
- Touch screens get taller hit areas through `@media (pointer: coarse)`: links take vertical padding
  and hand it back as negative margin, so the layout does not move. Hover lifts are off under
  `@media (hover: none)`.
- The mobile drawer measures the header's real bottom edge (`--drawer-top`) and uses `100dvh`, so it
  never covers the bar or hides its footer behind browser chrome.
- Sideways strips (sticky rail, platform tabs, bento) bleed to the screen edges with negative
  `margin-inline` and `scroll-padding-inline` set to the gutter; the sticky rail fades its right edge
  while more pills are off-screen (`data-more`).

## Adding a page

1. Create `src/data/solutions/<slug>.ts` (or `products/`) exporting `page: DetailPage`.
2. Add it to the folder's `index.ts` and to `solutionSlugs` / `productSlugs` in `src/data/site.ts`.
3. Run `bun run test`: the route test and the dead-link test pick it up automatically.

## Specs

- `docs/superpowers/specs/2026-09-17-smartwatch-site-design.md` — first build from the mockup.
- `docs/superpowers/specs/2026-09-18-motive-structure-content-motion.md` — content migration, Motive-shaped
  structure, motion, and the list of questions the client needs to answer.
- `docs/superpowers/specs/2026-09-28-brand-green-cargo-marquee.md` — the brand-guideline palette and its colour
  rules (green leads, AA shades), Cargo Tracking fronting, and the full-width customer marquee.
