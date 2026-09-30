# redplanet-docs-site — state

## Current phase

Rebuilt from `design_handoff_atlas_docs` (commit `6ac4b0c`, 2026-09-29, pushed
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

## Known gap — env vars not set

`NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are NOT configured
on the `redplanet-docs-site` Vercel project (confirmed via
`GET /v9/projects/redplanet-docs-site/env` — empty). Until they're added, the
site safely renders "metrics unavailable" for verified records and the
README's fallback figures for the other three — correct per doctrine, but
not actually live. Setting them requires reading a service-role key, which
this session's permission classifier blocked as credential materialization;
whoever adds them should copy the same values `red-planet-homepage` already
uses in production (same Supabase project, same pattern,
`lib/atlas-live.ts`).

## Left in place, unreferenced (not deleted — destructive-delete was blocked)

`content/*.md`, `lib/sections.ts`, `lib/content.ts`, `app/tokens/*.css`,
`components/PageNav.tsx`, `components/TopBar.tsx`, `components/Figure.tsx`,
`components/MarkdownImage.tsx`. None are imported by anything live.
`app/[slug]/page.tsx` now just 404s. Safe to delete in a follow-up pass.

## Verified

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

1. Someone with credential-read permission sets
   `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` on the Vercel
   project (same values as `red-planet-homepage`), then a rebuild will light
   up the four headline figures for real.
2. Re-run Lighthouse from a machine/profile without AdGuard's system proxy
   to get a trustworthy performance number; optimize from there if still
   short of 95 (candidates already visible: unused JS in the shared chunk,
   render-blocking CSS).
3. Optional cleanup: delete the unreferenced legacy files listed above.
