"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/rp/primitives";
import { useReveal } from "./useReveal";

const FILINGS = ["Tax lien", "Lis pendens", "Foreclosure", "Withdrawal", "Deed transfer"];
const OVERWRITTEN = [true, true, true, false, false];
const STEP_MS = 1100;

export default function FilingHistory() {
  const { ref, armed, reduced, replay } = useReveal<HTMLElement>();
  const [step, setStep] = useState(-1);
  const timer = useRef<ReturnType<typeof setInterval>>();

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = undefined;
  };

  const play = () => {
    stop();
    if (reduced) {
      setStep(4);
      return;
    }
    setStep(0);
    timer.current = setInterval(() => {
      setStep((s) => {
        if (s >= 4) {
          stop();
          return s;
        }
        return s + 1;
      });
    }, STEP_MS);
  };

  useEffect(() => {
    if (armed === 0) return;
    play();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed]);

  const jump = (i: number) => {
    stop();
    setStep(i);
  };

  let county = 0;
  const cols = FILINGS.map((name, i) => {
    const isReached = i <= step;
    const ghost = OVERWRITTEN[i] && step > i;
    if (isReached && !ghost) county++;
    return { name, i, reached: isReached, ghost };
  });
  const atlasCount = Math.max(0, step + 1);

  return (
    <figure
      ref={ref as React.RefObject<HTMLElement>}
      data-surface="forest"
      style={{
        margin: "16px 0 8px",
        background: "var(--bg)",
        color: "var(--fg-1)",
        borderRadius: "var(--radius-lg)",
        padding: "28px 32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <span style={{ font: "400 13px/1.3 var(--font-mono)", color: "var(--fg-2)" }}>
          Select a filing to step through the sequence.
        </span>
        <Button variant="secondary" size="sm" onClick={replay}>
          Replay
        </Button>
      </div>
      <div className="rp-hscroll">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "112px repeat(5,minmax(0,1fr)) 92px",
            minWidth: 820,
            columnGap: 8,
            paddingBottom: 4,
          }}
        >
          <div style={{ display: "grid", gridTemplateRows: "76px 92px 92px", rowGap: 10 }}>
            <span />
            <span style={{ alignSelf: "center", font: "500 14px/1.3 var(--font-sans)", color: "var(--fg-2)" }}>
              County system
            </span>
            <span style={{ alignSelf: "center", font: "500 14px/1.3 var(--font-sans)" }}>Atlas</span>
          </div>
          {cols.map((c) => {
            const headColor = c.reached ? "var(--fg-1)" : "var(--fg-3)";
            const nodeBg = c.reached ? "var(--fg-1)" : "var(--bg)";
            const fill = c.i < step ? 1 : 0;
            const lineOp = c.i < FILINGS.length - 1 ? 1 : 0;
            const cSolidOp = c.reached && !c.ghost ? 1 : 0;
            const cGhostOp = c.ghost ? 1 : 0;
            const cY = c.reached ? "0px" : "8px";
            const aOp = c.reached ? 1 : 0;
            const aY = c.reached ? "0px" : "8px";
            const keptOp = c.ghost ? 1 : 0;
            return (
              <div key={c.name} style={{ display: "grid", gridTemplateRows: "76px 92px 92px", rowGap: 10, minWidth: 0 }}>
                <button
                  onClick={() => jump(c.i)}
                  style={{
                    all: "unset",
                    boxSizing: "border-box",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    gap: 10,
                    paddingBottom: 6,
                  }}
                >
                  <span style={{ font: "400 12px/1 var(--font-mono)", color: "var(--fg-3)" }}>
                    0{c.i + 1}
                  </span>
                  <span
                    style={{
                      font: "400 15px/1.2 var(--font-sans)",
                      letterSpacing: "-0.01em",
                      color: headColor,
                      transition: "color 200ms cubic-bezier(.2,.7,.2,1)",
                    }}
                  >
                    {c.name}
                  </span>
                  <span style={{ position: "relative", display: "flex", alignItems: "center", height: 12 }}>
                    <span
                      style={{
                        position: "absolute",
                        left: 6,
                        right: -8,
                        top: 6,
                        height: 1,
                        background: "var(--rule-strong)",
                        opacity: lineOp,
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        left: 6,
                        right: -8,
                        top: 6,
                        height: 1,
                        background: "var(--fg-1)",
                        transformOrigin: "left",
                        transform: `scaleX(${fill})`,
                        opacity: lineOp,
                        transition: "transform 700ms cubic-bezier(.2,.7,.2,1)",
                      }}
                    />
                    <span
                      style={{
                        position: "relative",
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        boxSizing: "border-box",
                        border: "1px solid var(--fg-1)",
                        background: nodeBg,
                        transition: "background 200ms cubic-bezier(.2,.7,.2,1)",
                      }}
                    />
                  </span>
                </button>
                <div style={{ position: "relative", border: "1px dashed var(--rule)", borderRadius: "var(--radius-xs)" }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: 8,
                      padding: 12,
                      borderRadius: "var(--radius-xs)",
                      transition: "opacity 320ms cubic-bezier(.2,.7,.2,1), transform 320ms cubic-bezier(.2,.7,.2,1)",
                      background: "var(--bg-raised)",
                      border: "1px solid var(--rule)",
                      opacity: cSolidOp,
                      transform: `translateY(${cY})`,
                    }}
                  >
                    <span style={{ font: "400 14px/1.3 var(--font-sans)" }}>{c.name}</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: 8,
                      padding: 12,
                      borderRadius: "var(--radius-xs)",
                      transition: "opacity 320ms cubic-bezier(.2,.7,.2,1), transform 320ms cubic-bezier(.2,.7,.2,1)",
                      border: "1px dashed var(--rule-strong)",
                      opacity: cGhostOp,
                    }}
                  >
                    <span style={{ font: "400 14px/1.3 var(--font-sans)", color: "var(--fg-4)", textDecoration: "line-through" }}>
                      {c.name}
                    </span>
                    <span style={{ font: "400 12px/1 var(--font-mono)", color: "var(--fg-3)" }}>Overwritten</span>
                  </div>
                </div>
                <div style={{ position: "relative", border: "1px dashed var(--rule)", borderRadius: "var(--radius-xs)" }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: 8,
                      padding: 12,
                      borderRadius: "var(--radius-xs)",
                      transition: "opacity 320ms cubic-bezier(.2,.7,.2,1), transform 320ms cubic-bezier(.2,.7,.2,1)",
                      background: "var(--bg-raised)",
                      border: "1px solid var(--rule-strong)",
                      opacity: aOp,
                      transform: `translateY(${aY})`,
                    }}
                  >
                    <span style={{ font: "400 14px/1.3 var(--font-sans)" }}>{c.name}</span>
                    <span
                      style={{
                        font: "400 12px/1 var(--font-mono)",
                        color: "var(--accent-fg)",
                        opacity: keptOp,
                        transition: "opacity 320ms cubic-bezier(.2,.7,.2,1) 200ms",
                      }}
                    >
                      kept
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <div
            style={{
              display: "grid",
              gridTemplateRows: "76px 92px 92px",
              rowGap: 10,
              paddingLeft: 16,
              borderLeft: "1px solid var(--rule)",
            }}
          >
            <span style={{ alignSelf: "end", paddingBottom: 6, font: "400 12px/1 var(--font-mono)", color: "var(--fg-3)" }}>
              Filings
            </span>
            <span style={{ alignSelf: "center", font: "400 40px/1 var(--font-mono)", fontVariantNumeric: "tabular-nums", color: "var(--fg-2)" }}>
              {county}
            </span>
            <span style={{ alignSelf: "center", font: "400 40px/1 var(--font-mono)", fontVariantNumeric: "tabular-nums" }}>
              {atlasCount}
            </span>
          </div>
        </div>
      </div>
      <figcaption
        style={{
          font: "400 13px/1.45 var(--font-mono)",
          color: "var(--fg-3)",
          borderTop: "1px solid var(--rule)",
          paddingTop: 14,
          maxWidth: 760,
        }}
      >
        A single property&apos;s filing history. The county system shows the current state; Atlas
        holds each version as it was captured.
      </figcaption>
    </figure>
  );
}
