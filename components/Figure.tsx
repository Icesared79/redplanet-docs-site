import type { ReactNode } from "react";

// Documentation figures, drawn as inline SVG so they inherit the design-system
// tokens and adapt to light and dark without a second asset.
//
// Chart rules follow the design system: one series, no gridlines, no legends,
// no axes beyond start and end labels, flat with no shadows, mono tabular
// figures, and red reserved for a single flagged datum. Every value is labeled
// directly on its mark, so identity never rests on color alone.

const MONO = "var(--font-mono)";
const SANS = "var(--font-sans)";

function Frame({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-10">
      <div className="rounded-md bg-bg-subtle px-6 py-7 md:px-8 md:py-8">
        {children}
      </div>
      <figcaption
        className="mt-3 text-caption text-fg-3"
        style={{ fontFamily: SANS }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------- */
/* Scale — a stat row. Four headline figures, no plot.               */
/* ---------------------------------------------------------------- */

const SCALE = [
  { value: "515,121,435", label: "Verified records" },
  { value: "304", label: "Active sources" },
  { value: "22,850,817", label: "Classified parcels" },
  { value: "235,691", label: "Distress filings" },
];

function ScaleFigure() {
  return (
    <Frame caption="Atlas at current scale. Figures are live counts, updated nightly.">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
        {SCALE.map((s) => (
          <div key={s.label}>
            <dd
              className="text-fg"
              style={{
                fontFamily: MONO,
                fontSize: "clamp(22px, 2.6vw, 30px)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {s.value}
            </dd>
            <dt
              className="mt-3 border-t border-rule pt-3 text-fg-3"
              style={{ fontFamily: MONO, fontSize: 12, lineHeight: 1.3 }}
            >
              {s.label}
            </dt>
          </div>
        ))}
      </dl>
    </Frame>
  );
}

/* ---------------------------------------------------------------- */
/* Tiers — ordered magnitudes, one hue stepped light to dark.        */
/* ---------------------------------------------------------------- */

const TIERS = [
  { name: "Verified", value: 4738116, ink: 1 },
  { name: "Usable", value: 9040244, ink: 0.72 },
  { name: "Review", value: 7946678, ink: 0.46 },
  { name: "Unreliable", value: 1125778, ink: 0.24 },
];

function TiersFigure() {
  const max = Math.max(...TIERS.map((t) => t.value));
  const rowH = 58;
  const barH = 18;
  const labelW = 104;
  const valueW = 92;
  const w = 720;
  const plotW = w - labelW - valueW - 16;
  const h = TIERS.length * rowH;

  return (
    <Frame caption="Quality tiers across 22,850,817 classified parcel records. Signal generation runs only against the Verified and Usable tiers.">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        role="img"
        aria-label="Quality tier distribution: Verified 4,738,116; Usable 9,040,244; Review 7,946,678; Unreliable 1,125,778."
        style={{ display: "block", overflow: "visible" }}
      >
        {TIERS.map((t, i) => {
          const y = i * rowH;
          const bw = Math.max(2, (t.value / max) * plotW);
          return (
            <g key={t.name}>
              <text
                x={0}
                y={y + barH}
                fill="var(--fg-1)"
                style={{ font: `400 14px ${SANS}` }}
              >
                {t.name}
              </text>
              {/* Rounded data-end, anchored square to the baseline. */}
              <rect
                x={labelW}
                y={y + 4}
                width={bw}
                height={barH}
                rx={3}
                fill="var(--fg-1)"
                opacity={t.ink}
              />
              <text
                x={labelW + bw + 12}
                y={y + barH}
                fill="var(--fg-2)"
                style={{
                  font: `400 13px ${MONO}`,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {t.value.toLocaleString("en-US")}
              </text>
              <line
                x1={0}
                x2={w}
                y1={y + rowH - 14}
                y2={y + rowH - 14}
                stroke="var(--rule)"
                strokeWidth={1}
              />
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ---------------------------------------------------------------- */
/* Versioning — what a county system keeps versus what Atlas keeps.  */
/* ---------------------------------------------------------------- */

const EVENTS = [
  { label: "Tax lien", live: false },
  { label: "Lis pendens", live: false },
  { label: "Foreclosure", live: false },
  { label: "Withdrawal", live: false },
  { label: "Deed transfer", live: true },
];

function VersioningFigure() {
  const w = 720;
  // Inset the track so the first and last event labels stay inside the card.
  const padX = 58;
  const step = (w - padX * 2) / (EVENTS.length - 1);
  const atlasY = 64;
  const countyY = 152;
  const last = EVENTS.length - 1;
  const anchorFor = (i: number) =>
    i === 0 ? "start" : i === last ? "end" : "middle";
  const labelX = (x: number, i: number) =>
    i === 0 ? x - 6 : i === last ? x + 6 : x;

  return (
    <Frame caption="A single property's filing history. The county system shows the current state; Atlas holds each version as it was captured.">
      <svg
        viewBox={`0 0 ${w} 200`}
        width="100%"
        role="img"
        aria-label="Atlas retains all five filings on a property. The county system retains only the most recent, the deed transfer."
        style={{ display: "block", overflow: "visible" }}
      >
        <text
          x={0}
          y={12}
          fill="var(--fg-3)"
          style={{ font: `400 12px ${MONO}` }}
        >
          Held by Atlas
        </text>
        <line
          x1={padX}
          x2={w - padX}
          y1={atlasY}
          y2={atlasY}
          stroke="var(--fg-1)"
          strokeWidth={1.5}
        />
        {EVENTS.map((e, i) => {
          const x = padX + i * step;
          return (
            <g key={`a-${e.label}`}>
              <circle cx={x} cy={atlasY} r={5} fill="var(--fg-1)" />
              <text
                x={labelX(x, i)}
                y={atlasY - 18}
                textAnchor={anchorFor(i)}
                fill="var(--fg-2)"
                style={{ font: `400 12px ${SANS}` }}
              >
                {e.label}
              </text>
            </g>
          );
        })}

        <text
          x={0}
          y={countyY - 30}
          fill="var(--fg-3)"
          style={{ font: `400 12px ${MONO}` }}
        >
          Still visible at the county
        </text>
        <line
          x1={padX}
          x2={w - padX}
          y1={countyY}
          y2={countyY}
          stroke="var(--rule-strong)"
          strokeWidth={1}
          strokeDasharray="3 4"
        />
        {EVENTS.map((e, i) => {
          const x = padX + i * step;
          return e.live ? (
            <circle key={`c-${e.label}`} cx={x} cy={countyY} r={5} fill="var(--fg-1)" />
          ) : (
            // Overwritten at the source: the one flagged datum, so the one red.
            <g key={`c-${e.label}`}>
              <line
                x1={x - 4.5}
                x2={x + 4.5}
                y1={countyY - 4.5}
                y2={countyY + 4.5}
                stroke="var(--accent-fg)"
                strokeWidth={1.5}
              />
              <line
                x1={x - 4.5}
                x2={x + 4.5}
                y1={countyY + 4.5}
                y2={countyY - 4.5}
                stroke="var(--accent-fg)"
                strokeWidth={1.5}
              />
            </g>
          );
        })}
        <text
          x={padX}
          y={countyY + 30}
          fill="var(--fg-3)"
          style={{ font: `400 12px ${SANS}` }}
        >
          × overwritten or removed at the source
        </text>
      </svg>
    </Frame>
  );
}

/* ---------------------------------------------------------------- */
/* Ladder — the three layers a market clears before it is open.      */
/* ---------------------------------------------------------------- */

const LAYERS = [
  {
    n: "Layer 0",
    name: "Parcel spine",
    body: "Statewide parcel records with ownership, assessment and geography.",
  },
  {
    n: "Layer 1",
    name: "Transactions",
    body: "Sale records joined to the spine, with consideration where the state discloses it.",
  },
  {
    n: "Layer 2",
    name: "Distress",
    body: "At least three independent distress vectors joined to the spine.",
  },
];

function LadderFigure() {
  return (
    <Frame caption="A market is open only when all three layers clear the bar. Several markets are built to Layer 0 or Layer 1 and remain closed.">
      <ol className="grid gap-px md:grid-cols-3">
        {LAYERS.map((l, i) => (
          <li
            key={l.n}
            className={[
              "pt-5",
              i > 0 ? "md:border-l md:border-rule md:pl-6" : "",
              i < LAYERS.length - 1 ? "md:pr-6" : "",
            ].join(" ")}
            style={{ borderTop: "1px solid var(--rule-ink)" }}
          >
            <span
              className="block text-fg-3"
              style={{ fontFamily: MONO, fontSize: 12 }}
            >
              {l.n}
            </span>
            <span
              className="mt-2 block text-fg"
              style={{ fontFamily: SANS, fontSize: 17, letterSpacing: "-0.01em" }}
            >
              {l.name}
            </span>
            <span
              className="mt-2 block text-fg-2"
              style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.5 }}
            >
              {l.body}
            </span>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

/* ---------------------------------------------------------------- */
/* Pipeline — the nightly cycle, stage by stage.                     */
/* ---------------------------------------------------------------- */

const STAGES = [
  ["Discovery", "New sources identified and queued"],
  ["Acquisition", "Runners fetch under our own identity"],
  ["Normalization", "Every format converted to one schema"],
  ["Verification", "Corroborated, tiered, document-hashed"],
  ["Signals", "Derived indicators written"],
  ["Reconciliation", "Night's numbers checked against baseline"],
];

function PipelineFigure() {
  return (
    <Frame caption="The nightly cycle. A stage that cannot verify its own output stops rather than publishing a number it does not trust.">
      <ol>
        {STAGES.map(([name, body], i) => (
          <li key={name} className="flex gap-5 pb-6 last:pb-0">
            <div className="flex flex-col items-center">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-pill"
                style={{
                  border: "1px solid var(--rule-strong)",
                  fontFamily: MONO,
                  fontSize: 11,
                  color: "var(--fg-2)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {i < STAGES.length - 1 && (
                <span
                  aria-hidden
                  className="mt-1 w-px flex-1"
                  style={{ background: "var(--rule)" }}
                />
              )}
            </div>
            <div className="pt-1">
              <span
                className="block text-fg"
                style={{ fontFamily: SANS, fontSize: 17, letterSpacing: "-0.01em" }}
              >
                {name}
              </span>
              <span
                className="mt-1 block text-fg-2"
                style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.5 }}
              >
                {body}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

/* ---------------------------------------------------------------- */

const FIGURES: Record<string, () => JSX.Element> = {
  scale: ScaleFigure,
  tiers: TiersFigure,
  versioning: VersioningFigure,
  ladder: LadderFigure,
  pipeline: PipelineFigure,
};

export default function Figure({ name }: { name: string }) {
  const Component = FIGURES[name];
  if (!Component) return null;
  return <Component />;
}
