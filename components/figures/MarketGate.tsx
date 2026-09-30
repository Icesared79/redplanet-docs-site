"use client";

import { useState } from "react";
import { StatusIndicator } from "@/components/rp/primitives";
import { useReveal } from "./useReveal";

type Cell = "clear" | "thin" | "fail" | "none";
type Row = {
  name: string;
  cells: Cell[];
  reasons: (string | null)[];
  status: "live" | "dormant";
  label: string;
};

// Open item from the client, not yet resolved: whether New York City (live,
// deepening; listed in the Coverage table) should be added as a row. Kept as
// a data array, per README, so a row is a one-line add — intentionally left
// out until confirmed.
const GATE: Row[] = [
  { name: "Connecticut", cells: ["clear", "clear", "clear"], reasons: [], status: "live", label: "Open, template market" },
  { name: "Florida", cells: ["clear", "clear", "clear"], reasons: [], status: "live", label: "Open" },
  { name: "North Carolina", cells: ["clear", "clear", "clear"], reasons: [], status: "live", label: "Open" },
  { name: "South Carolina", cells: ["clear", "clear", "clear"], reasons: [], status: "live", label: "Open" },
  { name: "New York State", cells: ["clear", "fail", "none"], reasons: [null, "no reachable transaction layer"], status: "dormant", label: "Not open" },
  { name: "Georgia", cells: ["clear", "thin", "fail"], reasons: [null, null, "only two genuine distress vectors"], status: "dormant", label: "Not open" },
  { name: "Tennessee", cells: ["fail", "none", "none"], reasons: ["Memphis and Knoxville are dark"], status: "dormant", label: "Not open" },
  { name: "Ohio", cells: ["fail", "none", "none"], reasons: ["no property stack"], status: "dormant", label: "Governance only" },
];

const LAYERS = [
  { num: "01", name: "Layer 0, parcel spine.", desc: "Statewide parcel records with ownership, assessment and geography." },
  { num: "02", name: "Layer 1, transactions.", desc: "Sale records joined to the spine, with consideration where the state discloses it." },
  { num: "03", name: "Layer 2, distress.", desc: "At least three independent distress vectors joined to the spine." },
];

export default function MarketGate() {
  const { ref, armed } = useReveal<HTMLElement>();
  const [hover, setHover] = useState<number | null>(null);
  const gateOn = armed > 0;

  return (
    <figure
      ref={ref as React.RefObject<HTMLElement>}
      data-surface="sage"
      style={{
        margin: "16px 0 8px",
        background: "var(--bg)",
        color: "var(--fg-1)",
        borderRadius: "var(--radius-lg)",
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div className="rp-hscroll">
        <div style={{ minWidth: 840, display: "flex", flexDirection: "column", paddingBottom: 4 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px repeat(3,minmax(0,1fr)) 170px",
              borderBottom: "1px solid var(--rule-ink)",
            }}
          >
            <span style={{ alignSelf: "end", paddingBottom: 14, font: "400 12px/1 var(--font-mono)", color: "var(--fg-3)" }}>
              Market
            </span>
            {LAYERS.map((l) => (
              <div
                key={l.num}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  padding: "0 20px 14px 14px",
                  borderLeft: "1px solid var(--rule-ink)",
                }}
              >
                <span style={{ font: "400 12px/1 var(--font-mono)", color: "var(--fg-3)" }}>{l.num}</span>
                <span style={{ font: "500 15px/1.3 var(--font-sans)", letterSpacing: "-0.01em" }}>{l.name}</span>
                <span style={{ font: "400 13px/1.45 var(--font-sans)", color: "var(--fg-2)" }}>{l.desc}</span>
              </div>
            ))}
            <span
              style={{
                alignSelf: "end",
                padding: "0 0 14px 20px",
                borderLeft: "1px solid var(--rule-ink)",
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "flex-end",
                font: "400 12px/1 var(--font-mono)",
                color: "var(--fg-3)",
              }}
            >
              Status
            </span>
          </div>
          {GATE.map((row, ri) => (
            <div
              key={row.name}
              onMouseEnter={() => setHover(ri)}
              onMouseLeave={() => setHover(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "140px repeat(3,minmax(0,1fr)) 170px",
                minHeight: 56,
                borderBottom: "1px solid var(--rule)",
                opacity: hover == null || hover === ri ? 1 : 0.4,
                transition: "opacity 200ms cubic-bezier(.2,.7,.2,1)",
              }}
            >
              <span style={{ alignSelf: "center", font: "500 14px/1.3 var(--font-sans)", paddingRight: 12 }}>
                {row.name}
              </span>
              {row.cells.map((cell, ci) => {
                const scale = gateOn && (cell === "clear" || cell === "thin") ? 1 : 0;
                const delay = `${ri * 70 + ci * 240}ms`;
                const failOp = gateOn && cell === "fail" ? 1 : 0;
                const failDelay = `${ri * 70 + ci * 240 + 260}ms`;
                const bg = cell === "thin" ? "var(--fg-4)" : "var(--fg-1)";
                return (
                  <div
                    key={ci}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      minWidth: 0,
                      borderLeft: "1px solid var(--rule-ink)",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: "50%",
                        height: 12,
                        marginTop: -6,
                        background: bg,
                        transformOrigin: "left",
                        transform: `scaleX(${scale})`,
                        transition: "transform 520ms cubic-bezier(.2,.7,.2,1)",
                        transitionDelay: delay,
                      }}
                    />
                    <span
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 12px 8px 0",
                        marginLeft: -6,
                        opacity: failOp,
                        transition: "opacity 260ms cubic-bezier(.2,.7,.2,1)",
                        transitionDelay: failDelay,
                      }}
                    >
                      <span
                        style={{
                          flex: "none",
                          width: 11,
                          height: 11,
                          borderRadius: "50%",
                          boxSizing: "border-box",
                          border: "1.5px solid var(--fg-1)",
                          background: "var(--bg)",
                        }}
                      />
                      <span style={{ font: "400 12px/1.35 var(--font-mono)", color: "var(--fg-1)" }}>
                        {row.reasons[ci] ?? ""}
                      </span>
                    </span>
                  </div>
                );
              })}
              <span style={{ display: "flex", alignItems: "center", paddingLeft: 20, borderLeft: "1px solid var(--rule-ink)" }}>
                <StatusIndicator status={row.status} label={row.label} />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 28px", font: "400 12px/1.3 var(--font-mono)", color: "var(--fg-2)" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 18, height: 10, background: "var(--fg-1)" }} />
          Clears the bar
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 18, height: 10, background: "var(--fg-4)" }} />
          Thin
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", boxSizing: "border-box", border: "1.5px solid var(--fg-1)" }} />
          Does not clear
        </span>
      </div>
    </figure>
  );
}
