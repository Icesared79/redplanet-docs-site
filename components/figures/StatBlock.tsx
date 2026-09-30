"use client";

import { useEffect, useState } from "react";
import { StatusIndicator } from "@/components/rp/primitives";
import { useReveal, fmt } from "./useReveal";
import type { AtlasMetrics } from "@/lib/metrics";

const DURATION = 1400;
const TICK = 40;

export default function StatBlock({ metrics }: { metrics: AtlasMetrics }) {
  const { ref, armed, reduced } = useReveal<HTMLElement>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (armed === 0) return;
    if (reduced) {
      setProgress(1);
      return;
    }
    setProgress(0);
    const t0 = performance.now();
    const id = setInterval(() => {
      const p = Math.min(1, (performance.now() - t0) / DURATION);
      setProgress(p);
      if (p >= 1) clearInterval(id);
    }, TICK);
    return () => clearInterval(id);
  }, [armed, reduced]);

  const ease = 1 - Math.pow(1 - progress, 3);
  const at = (final: number) => fmt(progress >= 1 ? final : Math.round(final * ease));

  const records = metrics.verifiedRecords;
  const subs = [
    { label: "Active sources", value: metrics.activeSources.value ?? 0 },
    { label: "Classified parcels", value: metrics.classifiedParcels.value ?? 0 },
    { label: "Distress filings", value: metrics.distressFilings.value ?? 0 },
  ];

  return (
    <figure
      ref={ref as React.RefObject<HTMLElement>}
      data-surface="forest"
      style={{
        margin: "16px 0 8px",
        background: "var(--bg)",
        color: "var(--fg-1)",
        borderRadius: "var(--radius-lg)",
        padding: "40px 40px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 40,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18, minWidth: 0 }}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            font: "400 13px/1.3 var(--font-mono)",
            color: "var(--fg-2)",
          }}
        >
          <StatusIndicator status="live" />
          Verified records · live count
        </span>
        {records.value == null ? (
          <span
            style={{
              font: "400 clamp(28px,3.4vw,44px)/1.1 var(--font-mono)",
              color: "var(--fg-3)",
            }}
          >
            metrics unavailable
          </span>
        ) : (
          <span
            style={{
              font: "400 clamp(44px,6.6vw,96px)/0.95 var(--font-mono)",
              letterSpacing: "-0.035em",
              fontVariantNumeric: "tabular-nums",
              whiteSpace: "nowrap",
            }}
          >
            {at(records.value)}
          </span>
        )}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "28px 32px",
        }}
      >
        {subs.map((s) => (
          <div
            key={s.label}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              borderTop: "1px solid var(--rule-strong)",
              paddingTop: 16,
            }}
          >
            <span style={{ font: "400 13px/1.3 var(--font-mono)", color: "var(--fg-2)" }}>
              {s.label}
            </span>
            <span
              style={{
                font: "400 clamp(28px,2.8vw,38px)/1 var(--font-mono)",
                letterSpacing: "-0.02em",
                fontVariantNumeric: "tabular-nums",
                whiteSpace: "nowrap",
              }}
            >
              {at(s.value)}
            </span>
          </div>
        ))}
      </div>
      <figcaption style={{ font: "400 13px/1.4 var(--font-mono)", color: "var(--fg-3)" }}>
        These counts are read from Atlas and update every night as the record grows. They will be
        higher when you read this than when this page was written.
      </figcaption>
    </figure>
  );
}
