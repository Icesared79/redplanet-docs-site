"use client";

import { useEffect, useState } from "react";
import { useReveal, fmt } from "./useReveal";

const TIERS = [
  {
    name: "Verified",
    count: 4738116,
    bg: "var(--ink-900)",
    fg: "var(--paper-50)",
    desc: "Confirmed across independent sources, and the foundation of any signal or score",
  },
  {
    name: "Usable",
    count: 9040244,
    bg: "var(--ink-500)",
    fg: "var(--paper-50)",
    desc: "Reliable single-source records that passed internal consistency checks",
  },
  {
    name: "Review",
    count: 7946678,
    bg: "var(--sage-300)",
    fg: "var(--ink-900)",
    desc: "Ingested but not fully validated. Accessible, flagged, and excluded from signal generation",
  },
  {
    name: "Unreliable",
    count: 1125778,
    bg: "var(--paper-100)",
    fg: "var(--ink-900)",
    desc: "Failed consistency checks or could not be corroborated. Excluded from primary queries, retained for audit",
  },
];
const SIGNAL_TOTAL = TIERS[0].count + TIERS[1].count; // 13,778,360
const EXCLUDED_TOTAL = TIERS[2].count + TIERS[3].count; // 9,072,456
const TOTAL_PARCELS = TIERS.reduce((s, t) => s + t.count, 0);

export default function QualityTiers() {
  const { ref, armed } = useReveal<HTMLElement>();
  const [hover, setHover] = useState<number | null>(null);
  const revealed = armed > 0;

  return (
    <>
      <figure
        ref={ref as React.RefObject<HTMLElement>}
        data-surface="paper"
        style={{
          margin: "16px 0 0",
          background: "var(--bg)",
          color: "var(--fg-1)",
          borderRadius: "var(--radius-md)",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 2,
            opacity: revealed ? 1 : 0,
            transition: "opacity 300ms cubic-bezier(.2,.7,.2,1) 800ms",
          }}
        >
          <div style={{ flex: `${SIGNAL_TOTAL} 1 0`, minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ font: "400 12px/1.2 var(--font-mono)", color: "var(--fg-1)" }}>Signal generation</span>
            <span style={{ height: 10, border: "1px solid var(--rule-ink)", borderBottom: 0 }} />
          </div>
          <div style={{ flex: `${EXCLUDED_TOTAL} 1 0`, minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            <span
              style={{
                font: "400 12px/1.2 var(--font-mono)",
                color: "var(--fg-3)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Excluded from signal generation
            </span>
            <span style={{ height: 10, border: "1px dashed var(--rule-strong)", borderBottom: 0 }} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 2,
            height: 112,
            clipPath: `inset(0 ${revealed ? 0 : 100}% 0 0)`,
            transition: "clip-path 1100ms cubic-bezier(.2,.7,.2,1)",
          }}
        >
          {TIERS.map((t, i) => {
            const isUnreliable = i === 3;
            return (
              <div
                key={t.name}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{
                  flex: `${t.count} 1 0`,
                  minWidth: 0,
                  boxSizing: "border-box",
                  background: t.bg,
                  border: isUnreliable ? "1px solid var(--rule-strong)" : "0",
                  borderRadius: 2,
                  color: t.fg,
                  opacity: hover == null || hover === i ? 1 : 0.3,
                  transition: "opacity 200ms cubic-bezier(.2,.7,.2,1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 12,
                  overflow: "hidden",
                  cursor: "default",
                }}
              >
                <span
                  style={{
                    font: "500 14px/1.2 var(--font-sans)",
                    whiteSpace: "nowrap",
                    opacity: isUnreliable ? 0 : 1,
                  }}
                >
                  {t.name}
                </span>
                <span
                  style={{
                    font: "400 clamp(13px,1.6vw,22px)/1 var(--font-mono)",
                    letterSpacing: "-0.01em",
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                    opacity: isUnreliable ? 0 : 1,
                  }}
                >
                  {fmt(t.count)}
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span
            style={{
              display: "flex",
              gap: 10,
              alignItems: "baseline",
              opacity: revealed ? (hover == null || hover === 3 ? 1 : 0.3) : 0,
              transition: "opacity 200ms cubic-bezier(.2,.7,.2,1)",
            }}
          >
            <span style={{ font: "500 13px/1.2 var(--font-sans)" }}>Unreliable</span>
            <span style={{ font: "400 13px/1 var(--font-mono)", color: "var(--fg-3)" }}>
              {fmt(TIERS[3].count)}
            </span>
          </span>
        </div>
      </figure>

      <div className="rp-table-wrap" style={{ marginTop: 12 }}>
        <table className="rp-table" style={{ fontSize: 14 }}>
          <thead>
            <tr>
              <th style={{ width: 150 }}>Tier</th>
              <th className="is-right" style={{ width: 130, paddingRight: 40 }}>
                Parcels
              </th>
              <th>What it means</th>
            </tr>
          </thead>
          <tbody>
            {TIERS.map((t, i) => (
              <tr
                key={t.name}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{ background: hover === i ? "var(--bg-hover)" : "transparent" }}
              >
                <td style={{ height: "auto", padding: "14px 0", verticalAlign: "top" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 500 }}>
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 1,
                        boxSizing: "border-box",
                        background: t.bg,
                        border: i === 3 ? "1px solid var(--rule-strong)" : "0",
                        flex: "none",
                      }}
                    />
                    {t.name}
                  </span>
                </td>
                <td className="is-right is-mono" style={{ height: "auto", padding: "14px 40px 14px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>
                  {fmt(t.count)}
                </td>
                <td style={{ height: "auto", padding: "14px 0", verticalAlign: "top", color: "var(--fg-2)", lineHeight: 1.5 }}>
                  {t.desc}
                </td>
              </tr>
            ))}
          </tbody>
          <caption>
            Quality tiers across {fmt(TOTAL_PARCELS)} classified parcel records. Signal generation
            runs only against the Verified and Usable tiers.
          </caption>
        </table>
      </div>
    </>
  );
}
