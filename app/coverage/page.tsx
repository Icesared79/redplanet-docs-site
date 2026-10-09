import { PageHeader, Lead, H2, Body, TableWrap, PageFooter } from "@/components/rp/layout";
import { InlineFigure } from "@/components/rp/primitives";
import MarketGate from "@/components/figures/MarketGate";
import BaselineStrip from "@/components/figures/BaselineStrip";
import CoverageGrid from "@/components/visuals/CoverageGrid";
import { PAGES } from "@/lib/nav";

export const revalidate = 86400;

const OPERATES = [
  {
    market: "Connecticut",
    status: "live" as const,
    label: "Open, template market",
    parcels: "1,272,905",
    desc: "Full stack. Statewide sales, propensity scoring, governance layer across all 178 jurisdictions",
  },
  {
    market: "Florida",
    status: "live" as const,
    label: "Open",
    parcels: "10,998,001",
    desc: (
      <>
        All 67 counties. <InlineFigure>2,950,728</InlineFigure> sales statewide. Distress is
        not statewide, and lis pendens reaches 12 of 67 counties
      </>
    ),
  },
  {
    market: "North Carolina",
    status: "live" as const,
    label: "Open",
    parcels: "5,817,111",
    desc: (
      <>
        99 counties. <InlineFigure>5,027,052</InlineFigure> recorded transfers across 68
        counties. Distress is metro-concentrated
      </>
    ),
  },
  {
    market: "South Carolina",
    status: "live" as const,
    label: "Open",
    parcels: "1,227,144",
    desc: "Metro-concentrated across four metros, never statewide. Native sale price in eight counties",
  },
  {
    market: "New York City",
    status: "live" as const,
    label: "Live, deepening",
    parcels: (
      <>
        859,510 <span style={{ color: "var(--fg-3)" }}>lots</span>
      </>
    ),
    desc: "Full recorded-instrument history. Staten Island is absent from the source entirely",
  },
  {
    market: "New York State",
    status: "dormant" as const,
    label: "Not open",
    parcels: "4,641,680",
    desc: "Parcel spine across all 62 counties, but no reachable transaction layer. Distress is Erie and Niagara only",
  },
  {
    market: "Georgia",
    status: "dormant" as const,
    label: "Not open",
    parcels: "2,112,950",
    desc: "Strong parcel spine, thin transaction coverage, only two genuine distress vectors",
  },
  {
    market: "Tennessee",
    status: "dormant" as const,
    label: "Not open",
    parcels: "2,817,868",
    desc: "Broad spine, but Memphis and Knoxville are dark and distress reaches two metros",
  },
  {
    market: "Ohio",
    status: "dormant" as const,
    label: "Governance only",
    parcels: "—",
    desc: "Community layer built, no property stack",
  },
];

export default function CoveragePage() {
  const page = PAGES[2];

  return (
    <article style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PageHeader page={page} />
      <Lead>
        Coverage claims are where data companies are least honest, so this page is written
        to be checked. Atlas operates in specific places to specific depths. Where a layer
        is thin we say it is thin, and where a market is not ready we say it is not ready.
        We do not claim national coverage of property data, and we never claim 50-state
        coverage. Every jurisdiction we track is named in the record, so if you want to know
        whether a specific county is covered, the answer is a name in a table rather than a
        percentage.
      </Lead>

      <H2 id="co-open">How a Market Opens</H2>
      <Body>
        A market moves through three layers before we will sell anything built on it, and a
        market is open only when all three clear the bar. Markets that fail stay closed even
        after we have built them, and several have.
      </Body>

      <MarketGate />

      <H2 id="co-where">Where Atlas Operates</H2>

      <CoverageGrid />

      <TableWrap className="rp-coverage-table">
        <table className="rp-table" style={{ fontSize: 14, minWidth: 780 }}>
          <thead>
            <tr>
              <th style={{ width: 150, paddingRight: 20 }}>Market</th>
              <th style={{ width: 196, paddingRight: 20 }}>Status</th>
              <th className="is-right" style={{ width: 120, paddingRight: 32 }}>
                Parcels
              </th>
              <th>What is actually there</th>
            </tr>
          </thead>
          <tbody>
            {OPERATES.map((row) => (
              <tr key={row.market}>
                <td style={{ height: "auto", padding: "14px 20px 14px 0", verticalAlign: "top", fontWeight: 500 }}>
                  {row.market}
                </td>
                <td style={{ height: "auto", padding: "14px 20px 14px 0", verticalAlign: "top" }}>
                  <span className={"rp-status rp-status--" + row.status}>
                    <span className="rp-status__dot" />
                    <span className="rp-status__label">{row.label}</span>
                  </span>
                </td>
                <td className="is-right is-mono" style={{ height: "auto", padding: "14px 32px 14px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>
                  {row.parcels}
                </td>
                <td style={{ height: "auto", padding: "14px 0", verticalAlign: "top", color: "var(--fg-2)", lineHeight: 1.5 }}>
                  {row.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>

      <div
        className="rp-coverage-cards"
        role="table"
        aria-label="Where Atlas operates"
        style={{ flexDirection: "column", borderTop: "1px solid var(--rule-ink)" }}
      >
        <div
          role="row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0",
            borderBottom: "1px solid var(--rule)",
            font: "400 12px/1 var(--font-mono)",
            color: "var(--fg-3)",
          }}
        >
          <span role="columnheader">Market · Status</span>
          <span role="columnheader">Parcels</span>
        </div>
        {OPERATES.map((row) => (
          <div
            key={row.market}
            role="row"
            style={{ display: "flex", flexDirection: "column", gap: 10, padding: "16px 0", borderBottom: "1px solid var(--rule)" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
              <span role="cell" style={{ font: "500 16px/1.3 var(--font-sans)", letterSpacing: "-0.01em" }}>
                {row.market}
              </span>
              <span role="cell" style={{ font: "400 14px/1.3 var(--font-mono)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                {row.parcels}
              </span>
            </div>
            <span role="cell" className={"rp-status rp-status--" + row.status}>
              <span className="rp-status__dot" />
              <span className="rp-status__label">{row.label}</span>
            </span>
            <span role="cell" className="rp-small" style={{ color: "var(--fg-2)" }}>
              {row.desc}
            </span>
          </div>
        ))}
      </div>

      <Body>
        Georgia and Tennessee show that the bar is real. Both have substantial parcel
        coverage sitting in Atlas right now, and neither is open. In Georgia the pre-sale
        foreclosure notice is never filed with any government body. In Tennessee the two
        largest metros do not publish the spine.
      </Body>
      <Body>
        <span style={{ fontWeight: 500, color: "var(--fg-1)" }}>Markets we have excluded.</span>{" "}
        Pennsylvania, Illinois statewide, and every non-disclosure state are excluded
        permanently. Their transaction layer exists only through private aggregators, and we
        do not buy resold data. This is structural, and it will not change when we are
        larger, because the underlying record still will not exist.
      </Body>

      <H2 id="co-community">The Community Layer</H2>
      <TableWrap maxWidth={720}>
        <table className="rp-table" style={{ fontSize: 14 }}>
          <thead>
            <tr>
              <th></th>
              <th className="is-right">Jurisdictions</th>
              <th className="is-right">Meetings</th>
              <th className="is-right">Agenda items</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 500 }}>Florida</td>
              <td className="is-right is-mono">478</td>
              <td className="is-right is-mono">9,992</td>
              <td className="is-right is-mono">144,592</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 500 }}>Connecticut</td>
              <td className="is-right is-mono">178</td>
              <td className="is-right is-mono" style={{ color: "var(--fg-3)" }}>—</td>
              <td className="is-right is-mono" style={{ color: "var(--fg-3)" }}>—</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 500 }}>Ohio</td>
              <td className="is-right is-mono">
                337 <span style={{ color: "var(--fg-3)" }}>registered</span>
              </td>
              <td className="is-right is-mono" style={{ color: "var(--fg-3)" }}>—</td>
              <td className="is-right is-mono" style={{ color: "var(--fg-3)" }}>—</td>
            </tr>
          </tbody>
        </table>
      </TableWrap>
      <Body>
        Florida is the deepest and the prototype for the rest. Jurisdiction records
        carrying a stored source document behind every consequential entry currently number{" "}
        <InlineFigure>24</InlineFigure> published jurisdictions and <InlineFigure>46</InlineFigure>{" "}
        verified actions. That number is small on purpose, because an entry becomes
        verified when the document is in hand rather than when a press release says so.
      </Body>

      <H2 id="co-baseline">The National Baseline</H2>
      <Body>
        Atlas holds a 50-state record of data center policy posture, plus interconnection
        queue positions, generators, transmission and substations nationally. This is a
        reference layer rather than coverage, and the difference matters. Depth across
        those 50 states is uneven and we measure it. Three states carry a full verified
        record, five are partial, and the remaining 42 are national-level only. Moratorium
        status is populated for roughly half the states, incentive status for fewer, and
        regulatory docket detail for fewer still.
      </Body>
      <BaselineStrip />
      <Body>
        So the honest statement is this. We can tell you the posture of every state at a
        national level, and we can tell you what a specific county decided and show you the
        document, in Florida, Connecticut and Ohio.
      </Body>

      <H2 id="co-new">How a New Geography Gets Built</H2>
      <Body>
        The national baseline is the framework. Depth is built where a customer needs it.
        When a firm licenses a geography Atlas does not yet hold at full depth, we build
        that depth out for them, in days rather than quarters, because the sourcing
        method, the schema and the verification layer already exist and only the local
        sources have to be connected. With the methodology in place, bringing a state&apos;s
        spine online takes about a week; Florida was the proof.
      </Body>
      <Body>
        This is a deliberate choice. We do not store and pay to maintain deep records for
        places nobody is using. We hold the baseline everywhere, keep what is not in active
        use in low-cost storage where it can be recalled on demand, and fill in depth when
        a customer arrives. A firm in a county we have not built can be working with its
        data in days, which is fast relative to anything else on the market.
      </Body>

      <PageFooter page={page} />
    </article>
  );
}
