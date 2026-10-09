import { PageHeader, Lead, H2, Body, PageFooter } from "@/components/rp/layout";
import { InlineFigure } from "@/components/rp/primitives";
import DistressView from "@/components/visuals/DistressView";
import DataCenterDecisions from "@/components/visuals/DataCenterDecisions";
import { PAGES } from "@/lib/nav";

export const revalidate = 86400;

export default function ProductsPage() {
  const page = PAGES[4];

  return (
    <article style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PageHeader page={page} />
      <Lead>
        Atlas is the layer every Red Planet product consumes, and the layer a firm can
        license directly. Legacy providers built vertically, owning the data, the
        interface and the relationship, so you use their product on their terms and in
        their data model, and if it does not fit your question you change the question.
        Atlas sits underneath instead. The asset grows nightly and the verification layer
        improves continuously, so every product built on it inherits those improvements
        without being rebuilt, and the products share one account, one license agreement
        and one billing relationship.
      </Lead>
      <Body>Three products run on Atlas today.</Body>

      <H2 id="pr-signal">Signal</H2>
      <Body>
        Residential distress intelligence for brokerages and investment firms. Signal
        surfaces properties whose owners are under pressure, drawn from tax delinquency,
        foreclosure and lis pendens filings, recorded liens, code enforcement and estate
        proxies, joined to ownership, assessed value and transaction history so a firm sees
        the whole picture of a property rather than a single filing.
      </Body>
      <Body>
        What sets Signal apart is speed to the actual filing. Atlas reads court and clerk
        documents as they are recorded, so a licensee sees a filing within days, carrying
        the real filing date rather than the date a vendor happened to ingest it. Signal
        covers Connecticut, Florida, North Carolina, New York City, and the two upstate New
        York counties where the distress layer is real.
      </Body>
      <Body>
        Signal also carries the New York City office-to-residential conversion view, built
        on a universe of <InlineFigure>1,683</InlineFigure> Manhattan office and loft
        buildings assembled from recorded instruments, zoning, permits and building-level
        vacancy indicators. The view presents facts about each building rather than a
        composite score or a tier label, by deliberate decision. We do not put a number on
        a building&apos;s future and call it intelligence.
      </Body>

      <DistressView />

      <H2 id="pr-dc">The Data Center Product</H2>
      <Body>
        The jurisdiction record for data center development, built for the finance,
        insurance and development sides of the market: insurers, investors, developers,
        brokers, land-use law firms, site selection consultants, funds, utilities and
        economic development organizations.
      </Body>
      <Body>
        For each jurisdiction it publishes what that jurisdiction&apos;s own documents
        establish: data center posture verified against the adopted ordinance, the hearing
        calendar, candidate parcels near transmission, land assemblies with buyer identity,
        permits and land-use changes in review, utility plans, and a site suitability
        score. Every consequential entry carries the stored source document and its hash.
        Local opposition is what kills data center projects today, and this is the record
        of that opposition and of the decisions it produces, taken from the
        jurisdiction&apos;s own documents rather than from press coverage.
      </Body>
      <Body>
        Florida is the prototype, and the deliverable is a repeatable system that applies
        to any state. The site suitability score is active for Florida only. In every
        other state it runs degraded, because the underlying siting layers do not yet
        support the confidence threshold, and a score we do not trust is not a score we
        publish. Rollout beyond Florida runs North Carolina, Georgia, Ohio, Texas and
        Virginia, with Connecticut as the policy state.
      </Body>

      <DataCenterDecisions />

      <H2 id="pr-sun">SunScope</H2>
      <Body>
        A solar and roofing field-sales tool for installers, currently Connecticut only
        with one beta client. Properties are surfaced by roof characteristics, solar
        potential, utility rates and incentive eligibility across{" "}
        <InlineFigure>1,224,996</InlineFigure> scored parcels.
      </Body>

      <H2 id="pr-leancre">Licensed by Other Companies</H2>
      <Body>
        Atlas is also licensed by companies Red Planet does not own, which build their
        own businesses on the records rather than reselling them. These are customers,
        not products, and Red Planet is the author of the records they license and
        nothing else they publish.
      </Body>
      <Body>
        <span style={{ fontWeight: 500, color: "var(--fg-1)" }}>LeanCRE.</span> A separate
        company that sources and underwrites commercial real estate loans for banks,
        private lenders and family offices. It licenses Atlas for the record behind each
        property it presents, the surroundings of that property and its owner, and for
        surveillance of collateral and borrowers through maturity. Its reports carry
        &quot;Property data provided by Red Planet Data&quot; and nothing further;
        LeanCRE is a service provider that does not lend its own capital, and it holds
        its own customer relationships.
      </Body>

      <H2 id="pr-cost">What a New Product Costs to Build</H2>
      <Body>
        Traditional data product development means assembling the data, cleaning it,
        normalizing it, building the storage and query infrastructure, and only then
        building the application. That is months of work and significant capital before
        the first line of product code is written. With Atlas that phase is already done.
        The data exists, it is normalized, it is queryable, and it is improving on its
        own. Development starts at the application layer, which means a working product
        can exist within days of identifying a use case rather than quarters. The
        bottleneck is no longer engineering capacity. It is identifying the right market
        and the right question.
      </Body>

      <PageFooter page={page} />
    </article>
  );
}
