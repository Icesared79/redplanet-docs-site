"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes resolves the active theme on the client, so the server render
  // is an inert placeholder of the same size to avoid a hydration mismatch.
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span aria-hidden className="inline-block h-9 w-[76px]" />;
  }

  const isDark = resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="inline-flex h-9 items-center rounded-pill border border-rule px-4
                 font-mono text-label text-fg-3 transition-colors duration-fast
                 ease-out hover:border-rule-strong hover:text-fg"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
