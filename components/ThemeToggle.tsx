"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// Sidebar footer pill: "Light" or "Dark" is the CURRENT theme (not the
// target), with a leading 10px half-filled circle glyph, per README
// "Sidebar > Footer".
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span aria-hidden className="inline-block h-[26px] w-[70px]" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="rp-theme-toggle"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 10px",
        border: "1px solid var(--rule-strong)",
        borderRadius: "var(--radius-pill)",
        background: "transparent",
        color: "var(--fg-2)",
        font: "400 12px/1 var(--font-mono)",
        cursor: "pointer",
        flex: "none",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          border: "1.5px solid currentColor",
          background: "linear-gradient(90deg, currentColor 50%, transparent 50%)",
        }}
      />
      {isDark ? "Dark" : "Light"}
    </button>
  );
}
