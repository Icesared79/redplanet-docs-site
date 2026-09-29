# What Atlas Is

Atlas is an engine that finds, acquires, normalizes, verifies, and improves its own data asset, and it runs whether or not anyone is watching it.

The distinction from a database is operational. A database holds what you put in it. Atlas decides what it needs, goes and gets it, checks it against the document it came from, and makes it queryable. It identifies gaps in its own coverage, queues new sources to fill them, and monitors its own health.

```figure
scale
```

## Autonomous by Design

Atlas runs continuously. Each source has a runner responsible for reaching it, extracting what changed, normalizing it to a common schema, and writing it into the asset. Across a recent thirty-day window, **250** distinct sources executed and **4,418** of **4,695** runs completed.

That figure describes run outcomes rather than coverage. Some sources run nightly, others weekly, quarterly, or on demand, and a number of registered sources have not returned data recently and are being worked through. We publish the completion rate because it is measurable, and we say what it leaves out because a single percentage is easy to mistake for a guarantee.

## Proprietary by Necessity

We do not buy from ATTOM, CoreLogic, DataTree, Black Knight, or any aggregator that resells someone else's collection. This is a standing rule rather than a budget decision. A data asset assembled from the same vendors as everyone else's is a subscription, and it can be cancelled.

What Atlas holds instead comes from going to each jurisdiction and system directly: hundreds of source relationships, thousands of normalization decisions, and a verification layer that ties consequential claims back to the document supporting them.

## Much of It Cannot Be Collected Again

This is the part that is easiest to miss and hardest to replicate.

Most county and city systems show only the current version of a record. When a filing is satisfied, withdrawn, or superseded, the earlier version is overwritten or removed rather than archived. The system is built for administration, and administration only needs to know what is true today.

Atlas captures records every night and keeps each version, so the asset holds a history of what a record said over time, including states that no longer exist anywhere a buyer can reach.

```figure
versioning
```

Take a single Hartford property. A lien, then a foreclosure, then a withdrawal, then a transfer. Several of those filings are no longer visible on the county's own systems, and the sequence is the thing that tells you what happened to the owner.

A competitor with more capital can buy a parcel file tomorrow. Nobody can buy the last two years of overwritten filings, because they were not retained. That gap widens every night we run.

## From Records to Intelligence

A parcel identifier, an assessed value, a deed transfer. Individually these are facts. Connecting them, placing them in context, and deriving something decision-relevant from them is what turns a data asset into intelligence. Most providers stop at the record.

### What a Signal Is

A signal is a derived indicator computed from one or more underlying records. Where a record says what exists, a signal says what it may mean. Signals are generated as new data flows through the pipeline, with no manual analysis step.

Current signal families include:

- Distress indicators derived from filing activity, tax delinquency, and ownership patterns
- Equity and debt indicators computed from assessed value, transaction history, and recorded instruments
- Market velocity derived from transaction frequency and price movement within a geography
- Ownership pattern flags derived from entity registrations, LLC activity, and transfer sequences
- Agenda-item signals derived from what a jurisdiction has placed on a meeting agenda

### Distress

Distress is among the most time-sensitive categories we hold, and among the most valuable. Atlas tracks **235,691** filings across tax delinquency, foreclosure and lis pendens activity, recorded liens, and related court records, converting them into signals as new filing activity is detected.

One principle here was earned the hard way and is now written down: administrative distress outranks foreclosure. Tax delinquency, code enforcement, and vacancy registries are evaluated with equal or greater priority than foreclosure vectors, because foreclosure data repeatedly failed on contact with real records while the administrative signals held.

### The Community Layer

The newest and most differentiated layer covers what a jurisdiction is doing: its governing body, its hearing calendar, its ordinances, its agenda items, and the public testimony given at the podium. In Florida alone Atlas tracks **478** jurisdictions across **9,992** meetings and **144,592** agenda items, with the same layer built for Connecticut and Ohio.

This layer answers the question a parcel record cannot. Not what the land is, but what the people who govern it are about to decide.

## Why It Matters Commercially

Raw data is a commodity. It can be licensed, aggregated, or approximated. Intelligence derived from an asset that was assembled directly, and verified against source documents, cannot be replicated without repeating the assembly.
