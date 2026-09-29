# Markets and coverage.

Coverage claims are where data companies are least honest, so this page is written to be checked. Atlas operates in specific places to specific depths. Where a layer is thin we say it is thin, and where a market is not ready we say it is not ready.

We do not claim national coverage. We never claim 50-state coverage of property data. A national reference layer exists for one narrow purpose, described at the end of this page, and it is not coverage.

## How we decide a market is open

A market moves through three layers before we will sell anything built on it.

1. **Layer 0 — the parcel spine.** Statewide parcel records with ownership, assessment, and geography.
2. **Layer 1 — transactions.** Sale records joined to the spine, with consideration amounts where the state discloses them.
3. **Layer 2 — distress.** At least three independent distress vectors joined to the spine.

A market is **open** only when all three clear the bar. Markets that fail the bar stay closed even after we have built them, and several have.

## Where Atlas operates

| Market | Status | Parcels | What is actually there |
|---|---|---|---|
| Connecticut | Open, template market | **1,352,834** | Full stack. Statewide sales, propensity scoring, governance layer across all 178 jurisdictions |
| Florida | Open since 2026-07-07 | **10,998,001** | All 67 counties. **2,950,728** sales statewide. Distress is not statewide — lis pendens reaches 12 of 67 counties |
| North Carolina | Open since 2026-07-12 | **5,817,111** | 99 counties. **5,027,052** recorded transfers across 68 counties. Distress is metro-concentrated |
| South Carolina | Open since 2026-07-31 | **1,469,961** | Metro-concentrated across four metros, never statewide. Native sale price in eight counties |
| New York City | Live, deepening | **859,510** lots | Full recorded-instrument history. Staten Island is absent from the source entirely |
| New York State | **Not open** | **4,641,680** | Parcel spine across all 62 counties, but no reachable transaction layer. Distress coverage is Erie and Niagara only |
| Georgia | **Not open** | **2,112,950** | Strong parcel spine, thin transaction coverage, only two genuine distress vectors |
| Tennessee | **Not open** | **2,817,868** | Broad spine, but Memphis and Knoxville are dark and distress reaches two metros |
| Ohio | Governance only | — | Community layer built; no property stack |

### Markets we have excluded

Pennsylvania, Illinois statewide, and every non-disclosure state are excluded permanently. Their transaction layer exists only through private aggregators, and we do not buy resold data. This is structural. It will not change when we are larger, because the underlying record still will not exist.

Georgia and Tennessee are the clearest illustration that the bar is real. Both have substantial parcel coverage sitting in Atlas right now. Neither is open, because in Georgia the pre-sale foreclosure notice is never filed with any government body, and in Tennessee the two largest metros do not publish the spine. Building a market and declining to sell it is the bar working.

## The community layer

| | Jurisdictions | Meetings | Agenda items |
|---|---|---|---|
| Florida | **478** | **9,992** | **144,592** |
| Connecticut | **178** | — | — |
| Ohio | **337** registered | — | — |

Florida is the deepest and the prototype for the rest. Verified jurisdiction records — those with a stored source document and hash behind every consequential entry — currently number **24** published jurisdictions and **46** verified actions. That number is small on purpose: an entry becomes verified when the document is in hand, not when a press release says so.

## The national policy reference

Atlas holds a 50-state record of data center policy posture, plus interconnection queue positions, generators, transmission, and substations nationally. This is a **reference layer**, not coverage, and the difference matters.

Depth across those 50 states is uneven and we measure it: three states carry a full verified record, five are partial, and the remaining 42 are national-level only. Moratorium status is populated for roughly half the states, incentive status for fewer, and regulatory docket detail for fewer still.

So the honest statement is this: we can tell you the posture of every state at a national level, and we can tell you what a specific county decided and show you the document — in Florida, Connecticut, and Ohio. Anyone describing that as 50-state coverage is describing something we do not have.

## A note on how coverage is counted

Every jurisdiction we track is named in the record. No percentage stands in for a list. If you want to know whether a specific county is covered, the answer is a name in a table, not a coverage statistic — and the table is the product.

---

*Figures are live counts taken on 2026-09-29.*
