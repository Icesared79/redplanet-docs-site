import type { Config } from "tailwindcss";

// Colors, spacing and radii are design-system tokens (app/tokens/*.css).
// Tailwind maps names onto those CSS variables rather than restating values,
// so a token change in the design system flows through without edits here.
const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx,js,jsx,md,mdx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-raised": "var(--bg-raised)",
        "bg-sunken": "var(--bg-sunken)",
        "bg-subtle": "var(--bg-subtle)",
        "bg-hover": "var(--bg-hover)",
        "bg-selected": "var(--bg-selected)",
        fg: "var(--fg-1)",
        "fg-2": "var(--fg-2)",
        "fg-3": "var(--fg-3)",
        "fg-4": "var(--fg-4)",
        rule: "var(--rule)",
        "rule-strong": "var(--rule-strong)",
        "rule-ink": "var(--rule-ink)",
        accent: "var(--accent)",
        "accent-fg": "var(--accent-fg)",
        positive: "var(--positive)",
        caution: "var(--caution)",
        attention: "var(--attention)",
        dormant: "var(--dormant)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        label: ["var(--fs-label)", { lineHeight: "1.3" }],
        caption: ["var(--fs-caption)", { lineHeight: "1.45" }],
        small: ["var(--fs-small)", { lineHeight: "1.5" }],
        ui: ["var(--fs-ui)", { lineHeight: "var(--lh-ui)" }],
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
      },
      maxWidth: {
        prose: "72ch",
        page: "var(--page-max)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.98)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in var(--dur-base) var(--ease-out)",
        "scale-in": "scale-in var(--dur-slow) var(--ease-out)",
      },
    },
  },
  plugins: [],
};

export default config;
