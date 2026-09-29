"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { sections } from "@/lib/sections";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer on route change so a tap-through on mobile lands on the
  // page rather than behind the panel.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Mobile toggle. Pill control, comfortable density. */}
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed top-3 left-4 z-50 md:hidden inline-flex h-9 items-center rounded-pill
                   border border-rule bg-bg-raised px-4 font-mono text-label text-fg-2"
      >
        {open ? "Close" : "Menu"}
      </button>

      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 w-[272px] bg-bg",
          "border-r border-rule flex flex-col",
          "transition-transform duration-slow ease-out",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
        ].join(" ")}
      >
        <div className="px-7 pt-7 pb-6">
          <Link href="/" className="inline-flex items-baseline gap-[10px]">
            {/* The mark is the one red element the nav carries. */}
            <svg
              viewBox="0 0 240 240"
              aria-hidden
              className="h-[13px] w-[13px] shrink-0 translate-y-[1px]"
            >
              <path
                d="M120 0A120 120 0 1 1 35.147 35.147L120 120Z"
                fill="var(--accent-fg)"
              />
            </svg>
            <span className="text-[17px] tracking-[-0.015em] text-fg">
              Red Planet
            </span>
          </Link>
          <span className="mt-2 block font-mono text-label text-fg-3">
            Documentation
          </span>
        </div>

        <nav aria-label="Sections" className="flex-1 overflow-y-auto px-4 pb-6">
          <ul>
            {sections.map((s) => {
              const href = `/${s.slug}`;
              const active = pathname === href;
              return (
                <li key={s.slug}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "relative flex items-baseline gap-4 rounded-sm py-[10px] pl-4 pr-3",
                      "transition-colors duration-fast ease-out",
                      active
                        ? "bg-bg-selected text-fg"
                        : "text-fg-2 hover:bg-bg-hover hover:text-fg",
                    ].join(" ")}
                  >
                    {/* Selected state is ink, never red. */}
                    {active && (
                      <span
                        aria-hidden
                        className="absolute left-0 top-[10px] bottom-[10px] w-[2px] rounded-pill bg-rule-ink"
                      />
                    )}
                    <span
                      className={[
                        "font-mono text-[12px] tabular-nums shrink-0",
                        active ? "text-fg-2" : "text-fg-4",
                      ].join(" ")}
                    >
                      {s.short}
                    </span>
                    <span className="text-[15px] leading-[1.35]">{s.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-rule px-7 py-5">
          <a
            href="https://www.redplanetdata.com"
            className="font-mono text-label text-fg-3 transition-colors duration-fast
                       ease-out hover:text-fg"
          >
            redplanetdata.com ↗
          </a>
        </div>
      </aside>

      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 md:hidden animate-fade-in"
          style={{ background: "var(--scrim)" }}
        />
      )}
    </>
  );
}
