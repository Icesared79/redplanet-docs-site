import Link from "next/link";
import { PageHeader, Lead, H2, Body, PageFooter } from "@/components/rp/layout";
import { LiveFigure, InlineFigure } from "@/components/rp/primitives";
import { PAGES } from "@/lib/nav";
import { getAtlasMetrics } from "@/lib/metrics";

export const revalidate = 86400;

export default async function HowWeBuildPage() {
  const page = PAGES[6];
  const metrics = await getAtlasMetrics();

  return (
    <article style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PageHeader page={page} h1Style={{ maxWidth: 820 }} />
      <Lead>
        Atlas is built using AI as the primary development tool, which is why a platform of
        this scale exists without a traditional engineering organization behind it.
        Development runs through Claude Code, Anthropic&apos;s coding agent, operating as a
        full development environment that reads and writes files, executes commands,
        queries the database and ships end to end. Architecture and strategy are human
        decisions: what to build, why, in what order, and what not to build. Execution
        happens at the agent level. A new ingestion runner is built and deployed in a
        single session, and schema changes, pipeline modifications and new signal
        generators are specified, built, tested and deployed without the coordination
        overhead a team structure requires.
      </Lead>

      <H2 id="bu-why">Why It Holds Together</H2>
      <Body>
        Velocity without constraints produces a mess quickly, so what matters in this model
        is what keeps the speed from being destructive. The engine operates under written
        doctrine enforced in code rather than in review: headline metrics come from one
        canonical module and refuse to emit a number they cannot trust, jobs that rebuild
        live tables must stage, validate and swap in a single transaction, quality floors
        gate signal generation, acquisition runs under our own identity, and adoption
        records are constrained at the database level. Each of those rules exists because
        something went wrong once, and the rule is what remains after the failure. The
        system accumulates judgment rather than depending on anyone remembering it.
      </Body>
      <Body>
        This is not a claim that the work is unsupervised. Every consequential change is
        specified by a person, and every published figure traces to a query someone can
        re-run. The model is intentionally lean, and as the team grows it grows with it.
        The goal is a small, high-output technical team operating at a velocity a
        conventionally structured organization many times its size could not match.
      </Body>

      <H2 id="bu-depth">Depth Before Breadth</H2>
      <Body>
        The instinct in this business is to add states. We are doing the opposite first.
        Florida is the deepest market and the template, with statewide parcel and
        transaction coverage, a community layer across <InlineFigure>478</InlineFigure>{" "}
        jurisdictions, siting and environmental constraints, and a site suitability score
        that is active there and nowhere else. Finishing that pattern is worth more than
        starting it in ten more places, because the second state costs a fraction of the
        first and an unfinished state is worth close to nothing. The next markets follow
        the order the data center work sets: North Carolina, then Georgia, Ohio, Texas and
        Virginia, with Connecticut as the policy state. Beyond that, the on-demand model
        described under{" "}
        <Link href="/coverage" className="rp-underline-link">
          Coverage
        </Link>{" "}
        means the map grows where customers are rather than in the order a roadmap
        predicted.
      </Body>

      <H2 id="bu-deeper">Deeper Intelligence</H2>
      <Body>
        The signal layer is still early relative to what the underlying asset can support.
        As the record deepens, the intelligence derivable from it expands more than
        proportionally, because signals compound across layers. The direction is
        entity-level: connecting ownership patterns across markets and asset classes,
        tying a land assembly to the buyer behind the LLC, and linking what a jurisdiction
        is about to decide to the parcels it will affect. The value is in the join, and the
        join only becomes possible once the layers underneath are deep enough to support
        it.
      </Body>
      <Body>
        On the infrastructure side, the aim is every category that improves the evaluation
        of a site: fiber, pipelines, rail, highways, incentive zones and tariffs alongside
        the power and environmental layers already held. Turning the testimony pilot into a
        covered layer is the highest-value expansion in the community layer, because what
        residents say at the podium is often the earliest signal of a decision.
      </Body>

      <H2 id="bu-scale">Scale</H2>
      <Body>
        Atlas holds{" "}
        <LiveFigure value={metrics.verifiedRecords.value} live={metrics.verifiedRecords.live} />{" "}
        verified records today, and growth is driven by expanding source coverage rather
        than by re-counting what is already there. We are deliberately not publishing a
        headline record-count target. A record-count milestone is easy to hit by ingesting
        large, low-value datasets, and optimizing for it would make the asset worse. The
        figures that matter are verified coverage in named markets and the share of the
        asset that clears the top quality tier.
      </Body>

      <H2 id="bu-pos">The Position</H2>
      <Body>
        Legacy providers are expensive, rigid and slow to change, built on infrastructure
        and business models designed for a world before autonomous data engineering
        existed. The position we hold is narrower and more durable than being cheaper.
        Three things compound in our favor. The asset is assembled directly rather than
        licensed, so it cannot be cancelled. Much of what it holds was overwritten at the
        source and cannot be collected again by anyone at any price. And the development
        model builds a product, or a new geography, faster than a traditional organization
        can decide to.
      </Body>

      <PageFooter page={page} />
    </article>
  );
}
