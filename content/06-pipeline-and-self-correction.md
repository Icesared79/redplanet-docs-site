# How the pipeline works.

Atlas is a continuous ingestion and enrichment engine. At any moment runners are executing across dozens of source categories — pulling, normalizing, verifying, and storing — without a person in the loop. How that works is most of what the data asset actually is.

## Source discovery

Atlas does not run from a fixed hand-curated list. A discovery layer continuously identifies new sources across government portals, court record systems, county assessor databases, state entity registries, and jurisdiction meeting platforms. Identified sources are added to the registry, categorized, and queued for runner development.

The registry currently holds **2,046** source records, of which **304** are active and ingesting. The remainder are in discovery, in development, paused, or retired — sources do go away, and we keep the record of the ones that did.

## How we acquire

One rule governs every fetch, and it constrains the engine more than any technical limit does.

Atlas identifies itself honestly and takes what a jurisdiction publishes to anyone. We use no false identities, no proxy or IP rotation, no rotating user agents, and we do not defeat CAPTCHAs or bot walls. A real browser under our own identity at a polite rate is allowed and used routinely. When a source blocks us, we record the block and the official alternative — a records request, a bulk file, an agency contact — rather than working around it.

This costs us sources. A projected South Carolina distress vector was abandoned when the portal turned out to be gated, and it was never counted. We consider that the correct outcome. An asset assembled by evading the people who publish the data is not defensible, and a business built on it is one policy change from zero.

## The runner framework

Each source has a dedicated runner that connects, extracts, normalizes to the Atlas schema, and writes. Runners are standardized in structure and customized per source, handling authentication, pagination, rate limiting, and error recovery independently.

Every execution is logged with status, records processed, errors, and timing. Over the thirty days to 2026-09-29 that log recorded **4,695** runs across **250** distinct sources, of which **4,418** completed — **94.1%**.

## Ingestion and normalization

Raw data arrives as HTML, XML, CSV, JSON, PDF, scanned images, and API responses. The normalization layer converts all of it to a consistent schema before anything lands. Parcel identifiers are standardized, addresses parsed and validated, dates normalized, and duplicates detected and resolved before the write.

Scanned documents are processed locally. Optical character recognition runs on local tooling only, never through a paid model, and that constraint is enforced in code rather than left to discipline.

## Verification and quality tiering

Normalized records are evaluated for quality against source reliability, corroboration across independent sources, and internal consistency, and assigned one of four tiers. Classification is automatic and continuous: a record promoted when a second source corroborates it, demoted when contradictory data surfaces.

For the community layer the bar is higher and different. An entry is verified only when the source document is stored with its hash, and an adoption is recorded only on a second reading, final hearing, or resolution vote. A first reading is not an adoption, and the database refuses to record one as such.

## Signal generation

After ingestion and verification, signal generation runs against new and updated records, evaluating them against defined criteria and writing derived indicators into the signal layer. It runs only against Verified and Usable tier records. That floor is enforced in the pipeline, so intelligence cannot quietly be derived from data we do not trust.

## The nightly cycle

The full pipeline runs nightly on dedicated hardware we control. Source runners execute concurrently, followed by gap discovery, quality evaluation, signal generation, and a reconciliation pass that checks the night's numbers against the previous baseline before anything is published.

## Self-correction

A platform that needs constant human intervention does not scale. Atlas detects, diagnoses, and recovers from routine failures on its own.

Every runner execution is monitored. Failures, silent sources, and quality regressions are identified automatically and routed. Detection is not purely reactive — degradation patterns are flagged before a source goes fully dark, so investigation starts before the data stops.

When a problem is detected, recovery is attempted automatically. What can be resolved programmatically is. What cannot is escalated with full diagnostic context, so a person intervenes with the whole picture rather than diagnosing from scratch.

### Where the engine refuses to guess

The most important behavior in the pipeline is what it does when it cannot trust itself.

Headline metrics come from one canonical module, and every surface reads it rather than computing its own version. When the underlying recount coverage is incomplete, that module refuses to emit a number at all — the dashboard and the morning brief read "metrics unavailable" instead of a confident wrong figure. A number that is quietly wrong is worse than a number that is visibly missing, because only one of them gets caught.

The same instinct governs rebuilds. A job that replaces a live table builds into a staging table, validates it against what it is replacing, and swaps in a single transaction only if validation passes. On failure the live table is untouched. This rule was written after a hand-run job truncated a live table before its replacement existed, and it now applies to every job that rebuilds anything.

## Source health and gap discovery

Every source carries a health status that updates from its execution history, so the state of the whole source ecosystem is known at any moment — what is performing, what is degrading, what needs attention.

Beyond monitoring what exists, Atlas identifies what is missing: geographies, categories, and asset classes where coverage is thin or absent. Gaps are scored by priority and queued for source development. The platform does not wait to be told where it is incomplete.

---

*Figures are live counts taken on 2026-09-29.*
