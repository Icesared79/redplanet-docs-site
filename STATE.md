# redplanet-docs-site — state

## Current phase

COFOUNDER-1 (2026-10-09): six Atlas data visuals added across five pages, and
the dead headline counts fixed. Live at docs.redplanetdata.com on
`751b912` / `dpl_3xDAMP289wByW2DNtUYuiJwe5pF9`.

Before that: rebuilt from `design_handoff_atlas_docs` (commit `6ac4b0c`, 2026-09-29, pushed
and live at docs.redplanetdata.com). Replaces the prior 9-section
markdown-driven site with the seven pages, five animated figures, dark mode
and live-count wiring the handoff specifies.

## What was completed

- Seven server-rendered routes: `/`, `/data`, `/coverage`, `/how-atlas-works`,
  `/products`, `/licensing`, `/how-we-build`. Copy is verbatim from
  `reference/Red Planet Docs.dc.html` (the authoritative source per the
  handoff's own README).
- Fixed sidebar nav with scroll-spy subnav, prev/next footer, mobile
  collapse to a top bar + drawer below 900px (`components/Sidebar.tsx`,
  `app/design-system/docs-site.css`).
- Five figures ported with matching timings/easing (`components/figures/`):
  StatBlock (count-up), FilingHistory, MarketGate (NYC row intentionally
  excluded per operator, data modeled as an array so it's a one-line add),
  NightlyPipeline, QualityTiers. Shared reveal/replay mechanics in
  `useReveal.ts` (IntersectionObserver 0.35 threshold, 1800ms fallback,
  `prefers-reduced-motion` → immediate final state).
- Dark mode via `next-themes`, `localStorage["rp-docs-theme"]`, system
  default, no-flash. Sage/paper figures stay light-inked in dark mode
  (project-specific override in `docs-site.css`, not in the vendored DS).
- Mobile Coverage page: table becomes stacked cards below 900px, matching
  `reference/Red Planet Docs Coverage Mobile.dc.html`.
- Design tokens/fonts ported from the CANONICAL system at
  `C:\Users\Atlas\design\red-planet` (self-hosted Geist + Fragment Mono) —
  not the handoff's bundled `reference/_ds/`, which `C:\Inbox\DEPRECATED.txt`
  (CARD-3.1) marks superseded.
- Live counts (`lib/metrics.ts`): verified records mirrors atlas's canonical
  query (`atlas_verified_record_counts` WHERE `table_class='external_ingest'`)
  and renders "metrics unavailable" on failure — never a fallback number —
  per the NON-NEGOTIABLE single-source-of-truth doctrine
  (`Levelpie/atlas/docs/cc-rules-reference.md`). Active sources, classified
  parcels, distress filings read their own tables directly and fall back to
  the README's documented figures with a logged reason.

## COFOUNDER-1 — the visuals, and the snapshot they read

Six visuals, each framed as an application window, built from real Atlas data:

| Page | Visual | Behind it |
|---|---|---|
| `/` | Atlas at a glance | canonical `records_held` / `records_live` / `records_stored`, `atlas_stats_cache['active_sources_total']`, nightly window from `atlas_sync_log` |
| `/data` | One property's retained filing history | `atlas_fl_auction_events` + `atlas_fl_auction_status_history`, FL case `2023CA006124000000` |
| `/coverage` | The five live markets | spine sizes from `atlas_verified_record_counts`, jurisdictions `count(DISTINCT)` per spine |
| `/how-atlas-works` | The most recent nightly run | `atlas_sync_log` window + canonical `overnight_new_rows` |
| `/products` | Signal distress view | `atlas_fl_auction_events`, upcoming sales by judgment |
| `/products` | Data center jurisdiction record | `atlas_fl_jurisdiction_dc_status` + `atlas_fl_jurisdictions`, verified rows |

`scripts/build_atlas_snapshot.py` runs every query and writes
`data/atlas-snapshot.json`; the components import that file and **the site
never queries the database**. To refresh: run the script, commit, push.
`data/atlas-snapshot.provenance.json` records the query behind each figure and
is deliberately imported by nothing, so no internal table name can reach a
rendered page. The publishing rules (masked street numbers, no personal names,
no vendor/storage/table names, no WIP counts) live in the script, not in the
components.

## Fixed — the headline counts were dead to every visitor

`NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` were never set on the
Vercel project, so the live site showed **"metrics unavailable"** for verified
records (three times on `/`) and a **0** for active sources, classified parcels
and distress. `lib/metrics.ts` now reads the same committed snapshot as the
visuals, which removes the credential requirement entirely — those env vars are
no longer needed and should not be added. Verified records still renders
"metrics unavailable" rather than a fallback number if the snapshot lacks it,
per the canonical-metrics doctrine.

## Two published coverage numbers were stale

The `/coverage` table disagreed with the live spines, which would have
contradicted the new grid directly above it. Corrected in place: Connecticut
1,352,834 -> **1,272,905** (the October 2026 re-key dedupe removed the
duplicates) and South Carolina 1,469,961 -> **1,227,144**.

**Still stale, left alone (not in scope, flagged for a follow-up):** `/data`
says "a further 14,092,473 rows we track but never present as coverage"; the
canonical `internal_ops_records` is **13,220,883** as of 2026-10-09.

## COFOUNDER-1b (2026-10-09) — LeanCRE, and the sidebar toggle

`/products` gained a "Licensed by Other Companies" section (`pr-leancre`, also
added to `lib/nav.ts` so the scroll-spy subnav lists it). **LeanCRE is a
separate company, not a Red Planet product** — operator decision this session,
consistent with the global rule and with leancre.com's own footer ("Property
data provided by Red Planet Data"). It is described as a licensee; no LeanCRE
mark or brand colour appears on any Red Planet surface, and the page still says
three products run on Atlas, because that is still true.

SunScope's scored-parcel figure was stale: 1,274,322 -> **1,224,996**, the
current size of the Connecticut solar scoring layer.

Sidebar footer: the domain string (163px) and the theme pill (77px) needed
252px where the footer has 223px of inner width, so the pill hung 29px past the
column and sat on the divider. The row now wraps and the pill is `flex: none`.
Verified live at 1440px (pill 146px inside the column) and at 390px (inside the
drawer, 25px clear; the sidebar itself is `display: none` at that width).

Shipped as `344bc0a` / `dpl_` of 2026-10-09 12:04, alias docs.redplanetdata.com.

## Left in place, unreferenced (not deleted — destructive-delete was blocked)

`content/*.md`, `lib/sections.ts`, `lib/content.ts`, `app/tokens/*.css`,
`components/PageNav.tsx`, `components/TopBar.tsx`, `components/Figure.tsx`,
`components/MarkdownImage.tsx`. None are imported by anything live.
`app/[slug]/page.tsx` now just 404s. Safe to delete in a follow-up pass.

## Verified — COFOUNDER-1 (2026-10-09)

- `npm run build` succeeds; all seven routes still prerender as static (`○`).
  The six visuals are server components, so they add **no client JavaScript**
  (`/products` First Load JS is unchanged at 94.2 kB).
- Deployment `dpl_3xDAMP289wByW2DNtUYuiJwe5pF9` from `751b912` reached
  `READY`, target `production`, alias list includes `docs.redplanetdata.com`.
- Live browser check (headless chromium 1223) of all five changed pages at
  **1440px and 390px**: every visual renders, every figure on the page matches
  `data/atlas-snapshot.json` value for value, every visual carries its "Atlas
  data as of" caption, no sideways scroll, no visual overflow, no empty or
  zero placeholder, no page error. "metrics unavailable" no longer appears on
  any page except `/how-atlas-works`, where it is quoted prose explaining the
  canonical-metrics doctrine.
- Rendered HTML of all five pages contains no vendor or storage-provider name,
  no `atlas_*` table name, no "public records"/"public data" phrasing, no
  work-in-progress count, and no unmasked street number.

## Verified earlier (the 2026-09-29 rebuild)

- `npm run build` succeeds, all seven routes prerender as static (`○`).
- Deployment `dpl_6D4wU99ojzFTLgMtp7F3bTPebkw3` reached `READY`, target
  `production`, aliased to `docs.redplanetdata.com` (confirmed via a live
  curl of `/coverage` and `/how-we-build` returning 200 with content unique
  to this commit, not just trusting the deploy JSON's alias array).
- Lighthouse (headless chromium 1223) against the live `/coverage`:
  accessibility **100**. Performance **71** (desktop preset) / **41**
  (mobile/simulated-throttle preset) — both measured on a machine running
  AdGuard as a system-wide proxy, which injected two extra requests (382KB +
  1.7MB) into every page load in the network trace; that's the dominant
  drag on the score, not the page itself (real page weight is a handful of
  small JS/CSS chunks + 3 font files, server TTFB 50ms). Did not disable
  AdGuard to get a clean number — that's a call for the operator, not this
  session. **The ">95 performance" deliverable is not confirmed clean.**

## Immediate next step

1. ~~Set `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` on the Vercel
   project.~~ **No longer needed, and should not be done.** COFOUNDER-1 moved
   every figure onto the committed snapshot, so the site holds no database
   credential at all. Refresh the numbers with
   `python scripts/build_atlas_snapshot.py`, then commit and push.
2. Correct the `/data` internal-ops figure (14,092,473 -> the canonical
   `internal_ops_records`, 13,220,883 on 2026-10-09), or drop the sentence.
3. Re-run Lighthouse from a machine/profile without AdGuard's system proxy
   to get a trustworthy performance number; optimize from there if still
   short of 95 (candidates already visible: unused JS in the shared chunk,
   render-blocking CSS).
3. Optional cleanup: delete the unreferenced legacy files listed above.
