import Link from "next/link";
import { PageHeader, Lead, H2, Body, DefRow, TableWrap, PageFooter } from "@/components/rp/layout";
import { LiveFigure, InlineFigure } from "@/components/rp/primitives";
import { PAGES } from "@/lib/nav";
import { getAtlasMetrics } from "@/lib/metrics";

export const revalidate = 86400;

export default async function DataPage() {
  const page = PAGES[1];
  const metrics = await getAtlasMetrics();

  return (
    <article style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PageHeader page={page} />
      <Lead>
        Atlas holds <LiveFigure value={metrics.verifiedRecords.value} live={metrics.verifiedRecords.live} /> verified
        records drawn from <InlineFigure>{metrics.activeSources.value}</InlineFigure> active sources. That number counts
        records ingested from an external source. It excludes the engine&apos;s own operational
        rows, a further <InlineFigure>14,092,473</InlineFigure> rows we track but never present as
        coverage, because the alternative is a headline inflated by our own bookkeeping. One
        number, one definition, every surface reading the same source.
      </Lead>
      <Body>
        The layers fall into two groups. The first describes people and places: who owns
        what, what it is worth, what is changing hands, who is in trouble, and what the
        people who govern a place are about to decide. The second describes
        infrastructure: what a site can physically support, what constrains it, and what
        the utility and the state have planned around it. The first group is the deepest
        build today. The second is being built out for the data center market and improves
        everything on top of it.
      </Body>

      <H2 id="da-people">People and Places</H2>
      <div className="rp-def-row" style={{ display: "flex", flexDirection: "column" }}>
        <DefRow term="Property and parcel.">
          <p className="rp-body" style={{ color: "var(--fg-2)" }}>
            Parcel-level ownership, assessed value, land use classification, building
            characteristics and geographic identifiers. This is the anchor layer, and
            everything else in Atlas joins back to a parcel.
          </p>
          <TableWrap maxWidth={520}>
            <table className="rp-table" style={{ fontSize: 14 }}>
              <thead>
                <tr>
                  <th>Market</th>
                  <th className="is-right">Parcels</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Florida, all 67 counties</td>
                  <td className="is-right is-mono">10,998,001</td>
                </tr>
                <tr>
                  <td>North Carolina, 99 counties</td>
                  <td className="is-right is-mono">5,817,111</td>
                </tr>
                <tr>
                  <td>Connecticut, statewide</td>
                  <td className="is-right is-mono">1,352,834</td>
                </tr>
              </tbody>
            </table>
          </TableWrap>
          <p className="rp-body" style={{ color: "var(--fg-2)" }}>
            Coverage extends across 18 states in total. What varies is depth, and the
            Coverage section says exactly where.
          </p>
        </DefRow>

        <DefRow term="Transaction.">
          <p className="rp-body" style={{ color: "var(--fg-2)" }}>
            Sales history, transfer dates, consideration amounts and deed types, tracked
            continuously. Florida alone carries <InlineFigure>2,950,728</InlineFigure> sale
            records joined to the statewide parcel spine. Transaction history is what turns
            a static record into a moving one: how a market moves, where capital is
            flowing, which assets are changing hands.
          </p>
        </DefRow>

        <DefRow term="Distress and filings.">
          <p className="rp-body" style={{ color: "var(--fg-2)" }}>
            <InlineFigure>{metrics.distressFilings.value}</InlineFigure> filings across tax
            delinquency, foreclosure and lis pendens activity, recorded liens, estate proxies
            and code enforcement. Distress coverage is county-level and uneven by design,
            because we build the vectors that exist in a given jurisdiction rather than
            claiming a uniform national layer. One principle here was earned the hard way:
            administrative distress outranks foreclosure. Tax delinquency, code enforcement
            and vacancy registries are evaluated with equal or greater priority than
            foreclosure vectors, because foreclosure data repeatedly failed on contact with
            real records while the administrative signals held.
          </p>
        </DefRow>

        <DefRow term="Community and governance.">
          <p className="rp-body" style={{ color: "var(--fg-2)" }}>
            Jurisdiction registries, governing body composition, hearing calendars, agenda
            items, stored agendas and minutes, ordinance and action ledgers, point-in-time
            posture snapshots, and testimony given at the podium. Built for Florida,
            Connecticut and Ohio. In Florida alone Atlas tracks <InlineFigure>478</InlineFigure>{" "}
            jurisdictions across <InlineFigure>9,992</InlineFigure> meetings and{" "}
            <InlineFigure>144,592</InlineFigure> agenda items. This layer answers the
            question a parcel record cannot: not what the land is, but what the people who
            govern it are about to decide.
          </p>
          <p className="rp-body" style={{ color: "var(--fg-2)" }}>
            Every consequential entry here is held to two rules. An adoption is recorded
            only on a second reading, final hearing or resolution vote, enforced by a
            database constraint rather than a convention. And an entry counts as verified
            only when the source document is stored alongside it with its cryptographic
            hash. News coverage alone leaves an entry unverified, because trackers and press
            releases are frequently wrong and the record has to come from the
            jurisdiction&apos;s own documents.
          </p>
        </DefRow>

        <DefRow term="Commercial and permits.">
          <p className="rp-body" style={{ color: "var(--fg-2)" }}>
            Building permits, commercial fundamentals, CMBS loan-level data, non-ad-valorem
            assessments, condo and HOA records, and debt intelligence derived from recorded
            mortgages and satisfactions.
          </p>
        </DefRow>
      </div>

      <H2 id="da-infra">Infrastructure</H2>
      <div className="rp-def-row" style={{ display: "flex", flexDirection: "column" }}>
        <DefRow term="Siting and power.">
          <p className="rp-body" style={{ color: "var(--fg-2)" }}>
            <InlineFigure>94,619</InlineFigure> transmission lines, <InlineFigure>75,327</InlineFigure>{" "}
            substations, <InlineFigure>39,692</InlineFigure> generators,{" "}
            <InlineFigure>18,194</InlineFigure> interconnection queue positions, utility
            capital plans, and state-level large-load tariff rules. We publish distance to
            transmission, planned upgrades and utility site lists. We do not publish
            available megawatts or substation headroom, because those are not knowable from
            the sourced record.
          </p>
        </DefRow>
        <DefRow term="Environmental constraints.">
          <p className="rp-body" style={{ color: "var(--fg-2)" }}>
            <InlineFigure>16,207,097</InlineFigure> parcel flood zone determinations, national
            wetlands inventory, consumptive-use water permits across five Florida water
            management districts, conservation easements, and air permits.
          </p>
        </DefRow>
        <DefRow term="Policy posture.">
          <p className="rp-body" style={{ color: "var(--fg-2)" }}>
            A 50-state record of data center policy posture: moratorium status, incentive
            status and regulatory docket detail, at the depth each state supports. The
            Coverage section says how deep that record goes in each state.
          </p>
        </DefRow>
      </div>

      <H2 id="da-signals">Signals</H2>
      <Body>
        A parcel identifier, an assessed value and a deed transfer are facts. Connecting
        them and deriving something decision-relevant from them is what turns records into
        intelligence, and most providers stop at the record. A signal is a derived
        indicator computed from one or more underlying records, generated as new data
        flows through the pipeline with no manual analysis step. Current signal families:
      </Body>
      <ol
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          maxWidth: 720,
          borderTop: "1px solid var(--rule-ink)",
        }}
      >
        {[
          "Distress indicators derived from filing activity, tax delinquency and ownership patterns",
          "Equity and debt indicators computed from assessed value, transaction history and recorded instruments",
          "Market velocity derived from transaction frequency and price movement within a geography",
          "Ownership pattern flags derived from entity registrations, LLC activity and transfer sequences",
          "Agenda-item signals derived from what a jurisdiction has placed on a meeting agenda",
        ].map((text, i) => (
          <li
            key={i}
            className="rp-body"
            style={{
              display: "grid",
              gridTemplateColumns: "36px minmax(0,1fr)",
              padding: "12px 0",
              borderBottom: "1px solid var(--rule)",
              color: "var(--fg-2)",
            }}
          >
            <span style={{ font: "400 12px/26px var(--font-mono)", color: "var(--fg-3)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{text}</span>
          </li>
        ))}
      </ol>
      <Body>
        Signal generation runs only against the Verified and Usable quality tiers,
        enforced in code rather than left to whoever is writing a query. The tiers are
        described under{" "}
        <Link href="/how-atlas-works#hw-tiers" className="rp-underline-link">
          How Atlas Works
        </Link>
        .
      </Body>

      <PageFooter page={page} />
    </article>
  );
}
