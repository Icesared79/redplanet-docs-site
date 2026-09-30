"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/rp/primitives";
import { useReveal } from "./useReveal";

const STAGES = [
  { num: "01", name: "Discovery.", desc: "New sources identified and queued.", sub: "hw-disc" },
  { num: "02", name: "Acquisition.", desc: "Runners fetch under our own identity.", sub: "hw-disc" },
  { num: "03", name: "Normalization.", desc: "Every format converted to one schema.", sub: "hw-runner" },
  { num: "04", name: "Verification.", desc: "Corroborated, tiered, document-hashed.", sub: "hw-tiers" },
  { num: "05", name: "Signals.", desc: "Derived indicators written.", sub: "hw-tiers" },
  {
    num: "06",
    name: "Reconciliation.",
    desc: "The night's numbers checked against the previous baseline before anything is published.",
    sub: "hw-refuse",
  },
];
const STEP_MS = 520;

function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 40, behavior: "smooth" });
}

export default function NightlyPipeline() {
  const { ref, armed, reduced, replay } = useReveal<HTMLElement>();
  const [step, setStep] = useState(-1);
  const timer = useRef<ReturnType<typeof setInterval>>();

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = undefined;
  };

  useEffect(() => {
    if (armed === 0) return;
    stop();
    if (reduced) {
      setStep(6);
      return stop;
    }
    setStep(0);
    timer.current = setInterval(() => {
      setStep((s) => {
        if (s >= 6) {
          stop();
          return s;
        }
        return s + 1;
      });
    }, STEP_MS);
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed]);

  const published = step >= 6;

  return (
    <figure
      ref={ref as React.RefObject<HTMLElement>}
      data-surface="forest"
      style={{
        margin: "16px 0 8px",
        background: "var(--bg)",
        color: "var(--fg-1)",
        borderRadius: "var(--radius-lg)",
        padding: "28px 36px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 28,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <span style={{ font: "400 13px/1.3 var(--font-mono)", color: "var(--fg-2)" }}>Nightly</span>
        <Button variant="secondary" size="sm" onClick={replay}>
          Replay
        </Button>
      </div>
      <div className="rp-hscroll">
        <div style={{ minWidth: 960, paddingBottom: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,minmax(0,1fr)) 128px" }}>
            {STAGES.map((s, i) => {
              const reached = step >= i;
              const fill = step > i ? 1 : 0;
              const nodeBg = reached ? "var(--fg-1)" : "var(--bg)";
              const nodeBorder = reached ? "var(--fg-1)" : "var(--rule-strong)";
              const nameColor = reached ? "var(--fg-1)" : "var(--fg-2)";
              return (
                <button
                  key={s.num}
                  onClick={() => jumpTo(s.sub)}
                  title="Read more"
                  className="rp-pipe-stage"
                  style={{
                    all: "unset",
                    boxSizing: "border-box",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    paddingRight: 24,
                    minWidth: 0,
                    whiteSpace: "normal",
                  }}
                >
                  <span style={{ position: "relative", display: "flex", alignItems: "center", height: 16 }}>
                    <span style={{ position: "absolute", left: 8, right: -24, top: 7.5, height: 1, background: "var(--rule-strong)" }} />
                    <span
                      style={{
                        position: "absolute",
                        left: 8,
                        right: -24,
                        top: 7.5,
                        height: 1,
                        background: "var(--fg-1)",
                        transformOrigin: "left",
                        transform: `scaleX(${fill})`,
                        transition: "transform 360ms linear",
                      }}
                    />
                    <span
                      style={{
                        position: "relative",
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        boxSizing: "border-box",
                        border: `1px solid ${nodeBorder}`,
                        background: nodeBg,
                        transition: "background 200ms cubic-bezier(.2,.7,.2,1), border-color 200ms cubic-bezier(.2,.7,.2,1)",
                      }}
                    />
                  </span>
                  <span style={{ font: "400 12px/1 var(--font-mono)", color: "var(--fg-3)" }}>{s.num}</span>
                  <span
                    className="rp-pipe-name"
                    style={{
                      font: "400 18px/1.2 var(--font-sans)",
                      letterSpacing: "-0.015em",
                      color: nameColor,
                      textUnderlineOffset: 4,
                    }}
                  >
                    {s.name}
                  </span>
                  <span style={{ font: "400 14px/1.45 var(--font-sans)", color: "var(--fg-2)" }}>{s.desc}</span>
                  <span style={{ marginTop: "auto", marginLeft: 7.5, width: 0, height: 28, borderLeft: "1px dashed var(--rule-strong)" }} />
                </button>
              );
            })}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingLeft: 4 }}>
              <span style={{ display: "flex", alignItems: "center", height: 16 }}>
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    boxSizing: "border-box",
                    border: `1px solid ${published ? "var(--positive)" : "var(--rule-strong)"}`,
                    background: published ? "var(--positive)" : "var(--bg)",
                    transition: "background 240ms cubic-bezier(.2,.7,.2,1), border-color 240ms cubic-bezier(.2,.7,.2,1)",
                  }}
                />
              </span>
              <span style={{ height: 12 }} />
              <span
                style={{
                  font: "400 18px/1.2 var(--font-sans)",
                  letterSpacing: "-0.015em",
                  color: published ? "var(--fg-1)" : "var(--fg-3)",
                  transition: "color 240ms cubic-bezier(.2,.7,.2,1)",
                }}
              >
                Published
              </span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,minmax(0,1fr)) 128px" }}>
            <span style={{ gridColumn: "1 / 6", margin: "0 -8px 0 7.5px", borderTop: "1px dashed var(--rule-strong)" }} />
          </div>
          <div style={{ margin: "12px 0 0 7.5px", maxWidth: 640, whiteSpace: "normal", font: "400 12px/1.4 var(--font-mono)", color: "var(--fg-3)" }}>
            a stage that cannot verify its own output stops rather than publishing a number it does not trust
          </div>
        </div>
      </div>
    </figure>
  );
}
