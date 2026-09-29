"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ReactNode } from "react";

// The design system keys dark mode off [data-theme="dark"], so next-themes
// writes that attribute rather than a class. Every token in app/tokens
// adapts from it without any per-component dark styling.
export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
