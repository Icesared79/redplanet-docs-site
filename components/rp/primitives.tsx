// Thin ports of the Red Planet design system's React primitives
// (C:\Users\Atlas\design\red-planet\components\...), typed for this repo.
// Kept tiny and dependency-free rather than importing the DS's own bundle,
// per the handoff: "recreate with the repo's equivalents, do not ship
// _ds_bundle.js."
import type { ReactNode, ElementType } from "react";

export function Eyebrow({
  index,
  children,
  tone = "auto",
  as: Tag = "p",
  className = "",
}: {
  index?: number;
  children: ReactNode;
  tone?: "auto" | "accent" | "muted";
  as?: ElementType;
  className?: string;
}) {
  const cls =
    "rp-eyebrow" + (tone !== "auto" ? ` rp-eyebrow--${tone}` : "") + " " + className;
  return (
    <Tag className={cls}>
      {index != null && <span>§ {String(index).padStart(2, "0")} —</span>}
      <span>{children}</span>
    </Tag>
  );
}

const STATUS_LABELS: Record<string, string> = {
  live: "Live",
  dormant: "Dormant",
  activating: "Activating",
  stale: "Stale",
  failed: "Failed",
};

export function StatusIndicator({
  status = "live",
  label,
  size = "md",
}: {
  status?: "live" | "dormant" | "activating" | "stale" | "failed";
  label?: string;
  size?: "md" | "sm" | "lg";
}) {
  const text = label ?? STATUS_LABELS[status] ?? status;
  return (
    <span
      className={"rp-status rp-status--" + status + (size !== "md" ? " rp-status--" + size : "")}
      role="status"
    >
      <span className="rp-status__dot" />
      <span className="rp-status__label">{text}</span>
    </span>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  className = "",
  title,
}: {
  variant?: "primary" | "accent" | "secondary" | "ghost" | "danger" | "link";
  size?: "md" | "sm" | "lg";
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  title?: string;
}) {
  const cls = ["rp-btn", `rp-btn--${variant}`, size !== "md" && `rp-btn--${size}`, className]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={cls} onClick={onClick} title={title}>
      {children}
    </button>
  );
}

// Static (non-live) inline figure: mono, tabular, ink-1, 0.9em, per README
// "Inline figures in prose".
export function InlineFigure({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.9em",
        color: "var(--fg-1)",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {children}
    </span>
  );
}

// Live-count inline figure: same as InlineFigure, plus a leading 6px green
// dot and a tooltip, per README "Live-count figures" (three occurrences:
// pages 01, 02, 07).
export function LiveFigure({ value, live }: { value: number | null; live: boolean }) {
  // Verified records is governed by atlas's canonical-metrics doctrine: a
  // failed fetch renders "metrics unavailable", never a fallback number.
  if (value == null) {
    return (
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9em", color: "var(--fg-3)" }}>
        metrics unavailable
      </span>
    );
  }
  return (
    <span
      title={live ? "Live count from Atlas, updated nightly" : "Atlas metrics unavailable — showing last published figure"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-mono)",
        fontSize: "0.9em",
        color: "var(--fg-1)",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: live ? "var(--positive)" : "var(--fg-4)",
          flex: "none",
        }}
      />
      {value.toLocaleString("en-US")}
    </span>
  );
}
