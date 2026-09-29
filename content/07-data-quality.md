# Data Quality and Verification

At the scale Atlas operates, quality is an operational requirement rather than a feature. A record that cannot be trusted is worse than no record, because it will be acted on.

## The Four Tiers

Every record in the parcel layer carries a quality classification, assigned at ingestion and re-evaluated continuously as corroborating data arrives.

```figure
tiers
```

| Tier | What It Means |
|---|---|
| Verified | Confirmed across independent sources, and the foundation of any signal or score |
| Usable | Reliable single-source records that passed internal consistency checks |
| Review | Ingested but not fully validated. Accessible, flagged, and excluded from signal generation |
| Unreliable | Failed consistency checks or could not be corroborated. Excluded from primary queries, retained for audit |

The distribution is not flattering and we publish it anyway. Fewer than a quarter of classified parcel records reach the top tier. A provider reporting near-total verification is either measuring something easier or not measuring at all.

## Source Reliability Weighting

Not all sources are equal. Atlas tracks the historical reliability of every source, including how often it produces clean records, how frequently its format changes, and how well it corroborates against others. That history feeds tier assignment directly, so a record from a consistently reliable source starts with a higher baseline than one from a newly discovered or historically inconsistent source.

## Continuous Re-evaluation

Classification is not a one-time event. As new transactions, filings, and ownership records arrive, existing records are re-evaluated against the expanded dataset. A Usable record is promoted when a second independent source corroborates it. A record that looked clean is demoted when contradictory data surfaces.

This is what keeps a rapidly growing dataset from degrading as it grows. Without it, scale and quality trade against each other, and scale always wins that argument.

## Document-Level Verification

The tier system governs records. The community layer is governed by a stricter rule, because a wrong entry about what a county adopted can move a land decision.

An entry there is verified only when the primary document is stored alongside it with its cryptographic hash. An adoption is recorded only on a second reading, final hearing, or resolution vote, enforced by a database constraint. An entry supported only by news coverage is carried as unverified and labeled as such.

We hold this line because public trackers and press coverage are frequently wrong in the same direction, reporting proposals as decisions.

## What This Means Downstream

Signal generation and scoring run only against Verified and Usable records, enforced in the pipeline rather than by convention.

The same principle governs how scores are published. The Florida site suitability score is active, and in every other state it runs degraded because the underlying siting layers do not clear the confidence threshold. We publish the Florida score and withhold the others rather than shipping a number that looks the same and means less.

## Where We Are Honest About Gaps

Three limits are worth stating plainly, because they are the ones that would otherwise be discovered later.

**Coverage is uneven and cadence varies.** Sources run nightly, weekly, quarterly, or on demand. A number of registered sources have not returned data recently and are being worked through. The completion figure describes run outcomes rather than freshness of every layer.

**Distress is county-level, not statewide.** In Florida, lis pendens reaches 12 of 67 counties. In North Carolina and South Carolina the distress layer is metro-concentrated. We build the vectors that exist in a jurisdiction rather than interpolating a uniform national layer.

**The public testimony layer is early.** Meeting transcripts and recordings are captured against a small fraction of the meetings we track. It is a working pilot rather than a covered layer, and we describe it that way until it is one.
