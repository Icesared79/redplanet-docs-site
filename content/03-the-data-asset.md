# The Data Asset

The most valuable data is the data nobody else has. Not aggregated feeds or licensed vendor content, but records sourced, normalized, and maintained by the engine itself. Atlas currently holds **515,121,435** verified records drawn from **304** active sources.

## What "Verified Records" Counts

That number counts records Atlas ingested from an external source. It excludes the engine's own operational rows, which amount to a further **14,092,473** rows we track but never present as data coverage.

We make that split because the alternative is a headline number inflated by our own bookkeeping. One number, one definition, every surface reading the same source.

## The Layers

### Property and Parcel

Parcel-level ownership, assessed value, land use classification, building characteristics, and geographic identifiers. This is the anchor layer, and everything else in Atlas joins back to a parcel.

| Market | Parcels |
|---|---|
| Florida, all 67 counties | **10,998,001** |
| North Carolina, 99 counties | **5,817,111** |
| Connecticut, statewide | **1,352,834** |

Coverage extends across 18 states in total. What varies is depth, and the next section says exactly where.

### Transaction

Sales history, transfer dates, consideration amounts, and deed types, tracked continuously. Florida alone carries **2,950,728** sale records joined to the statewide parcel spine. Transaction history is what turns a static record into a dynamic one, showing how a market moves, where capital is flowing, and which assets are changing hands.

### Distress and Filings

**235,691** filings across tax delinquency, foreclosure and lis pendens activity, recorded liens, estate proxies, and code enforcement. Distress coverage is county-level and uneven by design, because we build the vectors that exist in a given jurisdiction rather than claiming a uniform national layer.

### Signals

Computed indicators layered over the records: distress, equity and debt, market velocity, ownership patterns, and agenda-item signals, generated automatically as new data arrives.

### Community and Governance

Jurisdiction registries, governing body composition, hearing calendars, agenda items, stored agendas and minutes, ordinance and action ledgers, point-in-time posture snapshots, and public testimony. Built for Florida, Connecticut, and Ohio.

Every consequential entry here is held to two rules. An adoption is recorded only on a second reading, final hearing, or resolution vote, enforced by a database constraint rather than a convention. And an entry counts as verified only when the source document is stored alongside it with its cryptographic hash. News coverage alone leaves an entry unverified, because trackers and press releases are frequently wrong and the record has to come from the jurisdiction's own documents.

### Infrastructure and Siting

The layer that makes land-use questions answerable: **94,619** transmission lines, **75,327** substations, **39,692** generators, **18,194** interconnection queue positions, utility capital plans, and state-level large-load tariff rules.

We publish distance to transmission, planned upgrades, and utility site lists. We do not publish available megawatts or substation headroom, because those are not knowable from the sourced record.

### Environmental Constraints

**16,207,097** parcel flood zone determinations, national wetlands inventory, consumptive-use water permits across five Florida water management districts, conservation easements, and air permits.

### Commercial and Permits

Building permits, commercial fundamentals, CMBS loan-level data, non-ad-valorem assessments, condo and HOA records, and debt intelligence derived from recorded mortgages and satisfactions.

## Quality Classification

Not all records are equal, and pretending otherwise is how a large dataset becomes an unusable one. Every record in the parcel layer carries a quality tier, assigned automatically at ingestion and re-evaluated as corroborating data arrives.

```figure
tiers
```

Signal generation runs only against Verified and Usable records, and that floor is enforced in code rather than left to whoever is writing a query.
