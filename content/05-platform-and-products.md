# The platform and what we build on it.

Atlas is infrastructure. It is not a product with a fixed interface, a fixed dataset, or a fixed use case. It is the layer every Red Planet product consumes, and it is the layer a client can consume directly.

This inverts how legacy providers operate. CoStar, ATTOM, and CoreLogic deliver a product: you use their interface, on their terms, in their data model, and if it does not fit your question you change the question. Atlas sits underneath instead, and the application layer is where the specificity lives.

## Why the model wins

Legacy providers built vertically — they own the data, the interface, and the relationship. That creates lock-in, and it also creates a ceiling: their product is only ever as good as their roadmap.

Atlas is horizontal. The asset grows nightly and the verification layer improves continuously, so anything built on top inherits those improvements without being rebuilt. The marginal cost of the next product on existing infrastructure is low, and that is the commercial leverage of owning the platform rather than the product.

## What we have built on it

### TeleAcre

The data center jurisdiction record, built for insurers, investors, and the development side of the market.

For each jurisdiction, TeleAcre publishes what that jurisdiction's own documents establish: its data center posture verified against the adopted ordinance, its hearing calendar, candidate parcels near transmission, land assemblies with buyer identity, permits and land-use changes in review, utility plans, and a site suitability score. Every consequential entry carries the stored source document and its hash.

Florida is the prototype and the deliverable is a repeatable system that applies to any state. Rollout runs Florida first, then North Carolina, Georgia, Ohio, Texas, and Virginia; Connecticut is the policy state. It is sold to firms as an annual license scoped by county — to insurers, investors, developers, brokers, land-use law firms, site selection consultants, funds, utilities, and economic development organizations.

The site suitability score is currently active for Florida only. In every other state it runs degraded, because the underlying siting layers do not yet support the confidence threshold, and a score we do not trust is not a score we publish.

### Signal

Residential distress intelligence, sold to brokerages and investors, covering Connecticut, Florida, North Carolina, New York City, and the two upstate New York counties where the distress layer is real.

Signal also carries the New York City office-to-residential conversion view, built on a universe of **1,683** Manhattan office and loft buildings assembled from recorded instruments, zoning, permits, and building-level vacancy indicators. The view presents facts about each building. It does not present a composite score or a tier label, by deliberate decision — the underlying scoring exists as an internal operator tool, and we do not put a number on a building's future and call it intelligence.

### SunScope

A solar and roofing field-sales tool for installers, currently Connecticut only with one beta client. Properties are surfaced by roof characteristics, solar potential, utility rates, and incentive eligibility across **1,274,322** scored parcels.

## How this is sold

Licenses go to organizations, never to individuals. We do not charge per lead, per lookup, or per credit, and there is no self-serve signup or trial on the flagship. Access is granted as a plan — a product plus its geographic scope — assigned to a firm, and every change to it is recorded in an append-only audit log.

We also build no outreach machinery. No phone or email append, no skip tracing, no bulk contact export, no campaign tooling aimed at landowners. The product is the record, not a list to work.

## Product velocity

The platform has a second consequence that matters as much as the first.

Traditional data product development requires assembling the data, cleaning it, normalizing it, building the storage and query infrastructure, and only then building the application. That is months of work and significant capital before the first line of product code is written.

With Atlas that phase is already done. The data exists, it is normalized, it is queryable, and it is improving on its own. Development starts at the application layer — which, with AI-assisted tooling, means a working product can exist within days of identifying a use case rather than quarters.

The bottleneck is no longer engineering capacity. It is identifying the right market and the right question, and that is a judgment problem, not a technology one.

## What this means for a new market

Every market Atlas enters unlocks products on top of it without rebuilding anything underneath. A new scoring model, a new signal family, a new endpoint — and a product exists. The asset compounds: every improvement to Atlas makes everything built on it better, and every product validates the platform for the next one.

---

*Figures are live counts taken on 2026-09-29.*
