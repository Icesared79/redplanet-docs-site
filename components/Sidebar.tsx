"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { sections } from "@/lib/sections";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        aria-label="Toggle navigation"
        onClick={() => setOpen((v) => !v)}
        className="fixed top-3 left-3 z-50 md:hidden rounded-md border border-border bg-surface px-3 py-2 text-text"
      >
        {open ? "✕" : "☰"}
      </button>

      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-bg",
          "transform transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          "flex flex-col",
        ].join(" ")}
      >
        <div className="px-6 pt-6 pb-4">
          <Link
            href="/"
            className="block font-display font-bold text-lg tracking-tight text-text"
            onClick={() => setOpen(false)}
          >
            <span className="text-brand">Red Planet</span>
            <span className="block text-xs font-mono uppercase tracking-[0.18em] text-muted mt-1">
              Documentation
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 pb-6 overflow-y-auto">
          <ul className="space-y-1">
            {sections.map((s) => {
              const href = `/${s.slug}`;
              const active = pathname === href;
              return (
                <li key={s.slug}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={[
                      "group flex items-start gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-surface text-text border-l-2 border-brand pl-[10px]"
                        : "text-muted hover:bg-surface/60 hover:text-text",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "font-mono text-[11px] mt-0.5 tabular-nums",
                        active ? "text-brand" : "text-muted",
                      ].join(" ")}
                    >
                      {s.short}
                    </span>
                    <span className="font-body leading-snug">{s.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-border px-6 py-4 text-[11px] text-muted font-mono uppercase tracking-[0.16em]">
          v1 · 2026
        </div>
      </aside>

      {/* Backdrop on mobile when sidebar is open */}
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
        />
      )}
    </>
  );
}
