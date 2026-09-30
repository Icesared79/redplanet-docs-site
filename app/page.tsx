import { PageHeader, Lead, H2, Body, PageFooter } from "@/components/rp/layout";
import { LiveFigure, InlineFigure } from "@/components/rp/primitives";
import StatBlock from "@/components/figures/StatBlock";
import FilingHistory from "@/components/figures/FilingHistory";
import { PAGES } from "@/lib/nav";
import { getAtlasMetrics } from "@/lib/metrics";

export const revalidate = 86400;

export default async function OverviewPage() {
  const page = PAGES[0];
  const metrics = await getAtlasMetrics();

  return (
    <article style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PageHeader page={page} />
      <Lead>
        Red Planet Data built and operates Atlas, a data engine that sources, normalizes,
        verifies and continuously improves its own record of property, transactions,
        distress, jurisdictional decisions and infrastructure. Every Red Planet product
        runs on it, and firms can license the data directly.
      </Lead>

      <H2 id="ov-why">Why We Built It</H2>
      <Body>
        Real estate and the infrastructure being built on top of it are among the largest
        asset classes in the world, and the data underneath them is fragmented, expensive
        and sourced the way it was twenty years ago. Parcel records, transaction history,
        distress filings, entity ownership, permits and utility plans live in separate
        systems sold by separate vendors in formats that do not join. The largest providers
        price for the largest institutions, deliver fixed formats for fixed questions, and
        refresh monthly or quarterly.
      </Body>
      <Body>
        There is a second gap underneath that one. The decisions that determine what a
        piece of land is worth are made in a county commission meeting, an ordinance
        amendment, a comprehensive plan update or a utility&apos;s capital plan. That record
        exists in the jurisdiction&apos;s own documents, but it is scattered across hundreds of
        agenda portals and minutes archives and reconciled by nobody. So the market runs on
        secondhand reports: a tracker says a county passed a moratorium when the county
        passed a first reading of a draft that later died in committee. Anyone underwriting
        against that is underwriting against hearsay.
      </Body>
      <Body>
        Atlas closes both gaps. It holds{" "}
        <LiveFigure value={metrics.verifiedRecords.value} live={metrics.verifiedRecords.live} />{" "}
        verified records drawn from <InlineFigure>{metrics.activeSources.value}</InlineFigure> active
        sources, and every consequential claim in the jurisdictional record is tied to the
        document it came from.
      </Body>

      <H2 id="ov-what">What Atlas Is</H2>
      <Body>
        Atlas is an engine rather than a database. A database holds what you put in it.
        Atlas decides what it needs, goes and gets it, checks it against the document it
        came from, and makes it queryable. It identifies gaps in its own coverage, queues
        new sources to fill them, and monitors its own health. It runs every night whether
        or not anyone is watching.
      </Body>

      <StatBlock metrics={metrics} />

      <H2 id="ov-built">Built Directly, by Rule</H2>
      <Body>
        We do not buy from ATTOM, CoreLogic, DataTree, Black Knight or any aggregator that
        resells someone else&apos;s collection, and we do not buy third-party vendor datasets.
        This is a standing rule rather than a budget decision. A data asset assembled from
        the same vendors as everyone else&apos;s is a subscription, and a subscription can be
        cancelled. What Atlas holds instead comes from going to each jurisdiction and system
        directly: hundreds of source relationships, thousands of normalization decisions,
        and a verification layer that ties consequential claims back to the supporting
        document.
      </Body>

      <H2 id="ov-history">Much of It Cannot Be Collected Again</H2>
      <Body>
        Most county and city systems show only the current version of a record. When a
        filing is satisfied, withdrawn or superseded, the earlier version is overwritten
        rather than archived, because administration only needs to know what is true
        today. Atlas captures records every night and keeps each version, so the asset
        holds a history of what a record said over time, including states that no longer
        exist anywhere a buyer can reach.
      </Body>

      <FilingHistory />

      <Body>
        Take a single Hartford property. A lien, then a foreclosure, then a withdrawal,
        then a transfer. Several of those filings are no longer visible on the county&apos;s
        own systems, and the sequence is what tells you what happened to the owner. A
        competitor with more capital can buy a parcel file tomorrow. Nobody can buy the
        last two years of overwritten filings, because they were not retained. That gap
        widens every night we run.
      </Body>

      <PageFooter page={page} />
    </article>
  );
}
