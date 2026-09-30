import { PageHeader, Lead, H2, Body, PageFooter } from "@/components/rp/layout";
import { InlineFigure } from "@/components/rp/primitives";
import NightlyPipeline from "@/components/figures/NightlyPipeline";
import QualityTiers from "@/components/figures/QualityTiers";
import { PAGES } from "@/lib/nav";

export const revalidate = 86400;

export default function HowAtlasWorksPage() {
  const page = PAGES[3];

  return (
    <article style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PageHeader page={page} />
      <Lead>
        Atlas is a continuous ingestion and enrichment engine. At any moment runners are
        executing across dozens of source categories, pulling, normalizing, verifying and
        storing without a person in the loop. The full pipeline runs nightly on dedicated
        hardware we control, and a stage that cannot verify its own output stops rather
        than publishing a number it does not trust.
      </Lead>

      <NightlyPipeline />

      <H2 id="hw-disc">Discovery and Acquisition</H2>
      <Body>
        Atlas does not run from a fixed hand-curated list. A discovery layer continuously
        identifies new sources across government portals, court record systems, county
        assessor databases, state entity registries and jurisdiction meeting platforms. The
        registry currently holds <InlineFigure>2,046</InlineFigure> source records, of which{" "}
        <InlineFigure>304</InlineFigure> are active and ingesting. The remainder are in
        discovery, in development, paused or retired. Beyond monitoring what exists, Atlas
        identifies what is missing: geographies, categories and asset classes where
        coverage is thin or absent, scored by priority and queued for source development.
      </Body>
      <Body>
        One rule governs every fetch. Atlas identifies itself honestly and takes what a
        jurisdiction publishes to anyone. Official bulk files, APIs and SFTP drops come
        first; a real browser under our own identity at a polite rate is used on sites that
        require one. When a source blocks us, we record the block and the official
        alternative, whether a records request, a bulk file, a purchase or an agency
        contact. This costs us sources, and we accept that, because an asset assembled by
        working around the people who publish the data is one policy change from zero.
      </Body>

      <H2 id="hw-runner">The Runner Framework</H2>
      <Body>
        Each source has a dedicated runner that connects, extracts, normalizes to the Atlas
        schema and writes. Runners are standardized in structure and customized per source,
        handling authentication, pagination, rate limiting and error recovery
        independently. Every execution is logged with status, records processed, errors and
        timing. Across a recent thirty-day window that log recorded{" "}
        <InlineFigure>4,695</InlineFigure> runs across <InlineFigure>250</InlineFigure> distinct
        sources, of which <InlineFigure>4,418</InlineFigure> completed.
      </Body>
      <Body>
        That figure describes run outcomes rather than coverage. Some sources run nightly,
        others weekly, quarterly or on demand, and a number of registered sources have not
        returned data recently and are being worked through. We publish the completion rate
        because it is measurable, and we say what it leaves out because a single percentage
        is easy to mistake for a guarantee.
      </Body>
      <Body>
        Raw data arrives as HTML, XML, CSV, JSON, PDF, scanned images and API responses.
        The normalization layer converts all of it to a consistent schema before anything
        lands. Parcel identifiers are standardized, addresses parsed and validated, dates
        normalized, and duplicates detected and resolved before the write. Scanned
        documents are read with local OCR tooling, never through a paid model, and that
        constraint is enforced in code.
      </Body>

      <H2 id="hw-tiers">Verification and the Four Tiers</H2>
      <Body>
        Every record in the parcel layer carries a quality classification, assigned at
        ingestion and re-evaluated continuously as corroborating data arrives.
        Classification is automatic, so a record is promoted when a second source
        corroborates it and demoted when contradictory data surfaces. Source history feeds
        the assignment directly: Atlas tracks how often each source produces clean
        records, how frequently its format changes, and how well it corroborates against
        others, so a record from a consistently reliable source starts with a higher
        baseline than one from a newly discovered source.
      </Body>

      <QualityTiers />

      <Body>
        The distribution is not flattering and we publish it anyway. Fewer than a quarter
        of classified parcel records reach the top tier. A provider reporting near-total
        verification is either measuring something easier or not measuring at all.
      </Body>
      <Body>
        The community layer is governed by a stricter rule, because a wrong entry about
        what a county adopted can move a land decision. An entry there is verified only
        when the primary document is stored alongside it with its cryptographic hash. An
        adoption is recorded only on a second reading, final hearing or resolution vote,
        enforced by a database constraint, so a first reading cannot be recorded as a
        decision. An entry supported only by news coverage is carried as unverified and
        labeled as such, because third-party trackers and press coverage are frequently
        wrong in the same direction, reporting proposals as decisions.
      </Body>

      <H2 id="hw-refuse">Where the Engine Refuses to Guess</H2>
      <Body>
        The most important behavior in the pipeline is what it does when it cannot trust
        itself. Headline metrics come from one canonical module, and every surface reads it
        rather than computing its own version. When the underlying recount coverage is
        incomplete, that module refuses to emit a number at all, and the dashboard reads
        &quot;metrics unavailable&quot; instead of a confident wrong figure. A number that is
        quietly wrong is worse than one that is visibly missing, because only one of them
        gets caught.
      </Body>
      <Body>
        The same instinct governs rebuilds. A job that replaces a live table builds into a
        staging table, validates it against what it is replacing, and swaps in a single
        transaction only if validation passes. On failure the live table is untouched. It
        also governs scores: the Florida site suitability score is active, and in every
        other state it runs degraded because the underlying siting layers do not clear the
        confidence threshold. We publish the Florida score and withhold the others rather
        than shipping a number that looks the same and means less.
      </Body>

      <H2 id="hw-self">Self-Correction</H2>
      <Body>
        Every runner execution is monitored. Failures, silent sources and quality
        regressions are identified automatically and routed, and degradation patterns are
        flagged before a source goes fully dark, so investigation starts before the data
        stops. What can be resolved programmatically is resolved. What cannot is escalated
        with full diagnostic context, so a person intervenes with the whole picture rather
        than diagnosing from scratch. Every source carries a health status updated from its
        execution history, so the state of the whole source ecosystem is known at any
        moment.
      </Body>

      <H2 id="hw-limits">Limits, Stated Once</H2>
      <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--rule-ink)" }}>
        {[
          {
            term: "Coverage is uneven and cadence varies.",
            body: "Sources run nightly, weekly, quarterly or on demand, and the completion figure describes run outcomes rather than freshness of every layer.",
          },
          {
            term: "Distress is county-level, not statewide.",
            body: "In Florida, lis pendens reaches 12 of 67 counties. In North Carolina and South Carolina the distress layer is metro-concentrated. We build the vectors that exist in a jurisdiction rather than interpolating a uniform national layer.",
          },
          {
            term: "The testimony layer is early.",
            body: "Meeting transcripts and recordings are captured against a small fraction of the meetings we track. It is a working pilot rather than a covered layer, and we describe it that way until it is one.",
          },
        ].map((row) => (
          <div
            key={row.term}
            className="rp-def-row"
            style={{
              display: "grid",
              gridTemplateColumns: "260px minmax(0,1fr)",
              gap: 32,
              padding: "20px 0",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <h3 style={{ margin: 0, font: "500 16px/1.5 var(--font-sans)", letterSpacing: "-0.01em" }}>
              {row.term}
            </h3>
            <p className="rp-body" style={{ color: "var(--fg-2)" }}>
              {row.body}
            </p>
          </div>
        ))}
      </div>

      <PageFooter page={page} />
    </article>
  );
}
