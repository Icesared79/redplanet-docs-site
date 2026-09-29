# Data quality and verification.

At the scale Atlas operates, quality is not a feature — it is the operational requirement. A record that cannot be trusted is worse than no record, because it will be acted on. Atlas is built around that from the ground up.

## The four tiers

Every record in the parcel layer carries a quality classification, assigned at ingestion and re-evaluated continuously as corroborating data arrives.

| Tier | Records | What it means |
|---|---|---|
| Verified | **4,738,116** | Confirmed across independent sources. The foundation of any signal or score |
| Usable | **9,040,244** | Reliable single-source records that passed internal consistency checks |
| Review | **7,946,678** | Ingested but not fully validated. Accessible, flagged, and excluded from signal generation |
| Unreliable | **1,125,778** | Failed consistency checks or could not be corroborated. Excluded from primary queries, retained for audit |

**22,850,817** classified records in total. The distribution is not flattering and we publish it anyway: fewer than a quarter of classified parcel records reach the top tier. That is what honest classification looks like at this scale, and a provider reporting near-total verification is either measuring something easier or not measuring at all.

## Source reliability weighting

Not all sources are equal. Atlas tracks the historical reliability of every source — how often it produces clean records, how frequently its format changes, how well it corroborates against others — and that history feeds tier assignment directly. A record from a consistently reliable source starts with a higher baseline than one from a newly discovered or historically inconsistent source.

## Continuous re-evaluation

Classification is not a one-time event. As new transactions, filings, and ownership records arrive, existing records are re-evaluated against the expanded dataset. A Usable record is promoted when a second independent source corroborates it. A record that looked clean is demoted when contradictory data surfaces.

This is what keeps a rapidly growing dataset from degrading as it grows. Without it, scale and quality trade against each other, and scale always wins that argument.

## Document-level verification

The tier system governs records. The community layer is governed by a stricter rule, because its claims are consequential in a different way: a wrong entry about what a county adopted can move a land decision.

An entry in that layer is verified only when the primary document is stored alongside it with its cryptographic hash. An adoption is recorded only on a second reading, final hearing, or resolution vote, enforced by a database constraint. An entry supported only by news coverage is carried as unverified and labeled as such.

We hold this line because public trackers and press coverage are frequently wrong in the same direction — they report proposals as decisions. The record has to be built from the jurisdiction's own documents or it is not a record.

## What this means downstream

Signal generation and scoring run only against Verified and Usable records, enforced in the pipeline rather than by convention. The intelligence Atlas produces is only as good as the data underneath it, and the floor is structural.

The same principle governs how scores are published. The Florida site suitability score is active; in every other state it runs degraded because the underlying siting layers do not clear the confidence threshold. We publish the Florida score and withhold the others rather than shipping a number that looks the same and means less.

## Where we are honest about gaps

Three limits are worth stating plainly, because they are the ones that would otherwise be discovered later.

**Coverage is uneven and cadence varies.** Sources run nightly, weekly, quarterly, or on demand. A meaningful number of registered sources have not returned data recently and are being worked through. The 30-day completion figure describes run outcomes, not freshness of every layer.

**Distress is county-level, not statewide.** In Florida, lis pendens reaches 12 of 67 counties. In North Carolina and South Carolina the distress layer is metro-concentrated. We build the vectors that exist in a jurisdiction rather than interpolating a uniform national layer.

**The public testimony layer is early.** Meeting transcripts and recordings are captured against a small fraction of the meetings we track. It is a working pilot, not a covered layer, and we describe it that way until it is one.

---

*Figures are live counts taken on 2026-09-29.*
