# What Atlas is.

Atlas is not a database, a vendor feed, or a scraper. It is an autonomous engine that finds, acquires, normalizes, verifies, and improves its own data asset, and it runs whether or not anyone is watching it.

The distinction is operational, not rhetorical. A database holds what you put in it. Atlas decides what it needs, goes and gets it, checks it against the document it came from, and makes it queryable. It identifies gaps in its own coverage, queues new sources to fill them, and monitors its own health continuously.

## The shape of it, as of 2026-09-29

| | |
|---|---|
| Verified records | **515,121,435** |
| Active sources | **304** |
| Source executions, last 30 days | **4,695**, of which **4,418** completed |
| Parcel records under quality classification | **22,850,817** |
| Distress filings tracked | **235,691** |

Every figure on this page is a live count from the engine, not a marketing round number. They move nightly.

## Autonomous by design

Atlas runs continuously. Each source has a runner responsible for reaching it, extracting what changed, normalizing it to a common schema, and writing it into the asset. Over the thirty days to 2026-09-29, **250** distinct sources executed and **94.1%** of **4,695** runs completed.

That figure describes run outcomes, not coverage. Some sources run nightly, others weekly, quarterly, or on demand, and a meaningful number of registered sources have not returned data recently and are being worked through. We publish the completion rate because it is measurable, and we say what it does not cover because a single percentage is easy to mistake for a guarantee.

## Proprietary by necessity

We do not buy from ATTOM, CoreLogic, DataTree, Black Knight, or any aggregator that resells someone else's collection. This is a standing rule, not a budget decision. A data asset assembled from the same vendors as everyone else's is not an asset — it is a subscription, and it can be cancelled.

What Atlas holds instead is the product of going to each jurisdiction and system directly: hundreds of source relationships, thousands of normalization decisions, and a verification layer that ties consequential claims back to the document that supports them. That cannot be bought, which is the point.

## Much of it cannot be collected again

This is the part that is easiest to miss and hardest to replicate.

Most county and city systems show only the current version of a record. When a filing is satisfied, withdrawn, or superseded, the earlier version is overwritten or removed — not archived, not versioned, simply gone. The system is built for administration, not history, and administration only needs to know what is true today.

Atlas captures records every night and keeps each version. So the asset holds a history of what a record said over time, including states that no longer exist anywhere the public can reach.

Take a single Hartford, Connecticut property: tax liens, a lis pendens, a foreclosure withdrawal, and a deed transfer, each captured when it was filed. Several of those filings are no longer visible on the county's own systems. The sequence — a lien, then a foreclosure, then a withdrawal, then a transfer — is the thing that tells you what happened to the owner. Nobody can go back and assemble it now.

A competitor with more capital can buy a parcel file tomorrow. Nobody can buy the last two years of overwritten filings, because they were not retained. That gap widens every night we run and it cannot be closed retroactively.

## From records to intelligence

A parcel identifier, an assessed value, a deed transfer — individually these are facts. Connecting them, placing them in context, and deriving something decision-relevant from them is what turns a data asset into intelligence. Most providers stop at the record.

### What a signal is

A signal is a derived indicator computed from one or more underlying records. Where a record says what exists, a signal says what it may mean. Signals are generated as new data flows through the pipeline, with no manual analysis step.

Current signal families include:

- Distress indicators derived from filing activity, tax delinquency, and ownership patterns
- Equity and debt indicators computed from assessed value, transaction history, and recorded instruments
- Market velocity derived from transaction frequency and price movement within a geography
- Ownership pattern flags derived from entity registrations, LLC activity, and transfer sequences
- Agenda-item signals derived from what a jurisdiction has actually placed on a meeting agenda

### Distress

Distress is among the most time-sensitive categories we hold, and among the most valuable. Atlas tracks **235,691** filings across tax delinquency, foreclosure and lis pendens activity, recorded liens, and related court records, and converts them into signals as new filing activity is detected.

One principle has been earned the hard way and is now written down: administrative distress outranks foreclosure. Tax delinquency, code enforcement, and vacancy registries are evaluated with equal or greater priority than foreclosure vectors, because foreclosure data repeatedly failed on contact with real records while the administrative signals held.

### The community layer

The newest and most differentiated layer covers what a jurisdiction is actually doing: its governing body, its hearing calendar, its ordinances, its agenda items, and the public testimony given at the podium. In Florida alone Atlas tracks **478** jurisdictions — 67 counties and 411 municipalities — across **9,992** meetings and **144,592** agenda items, with the same layer built for Connecticut and Ohio.

This is the layer that answers the question a parcel record cannot: not what the land is, but what the people who govern it are about to decide.

## Why it matters commercially

Raw data is a commodity. It can be licensed, aggregated, or approximated. Intelligence derived from an asset that was assembled directly, and verified against source documents, cannot be replicated without repeating the assembly. That is the moat, and it is the only kind that compounds.

---

*Figures are live counts taken on 2026-09-29. Atlas ingests new data and generates new signals nightly.*
