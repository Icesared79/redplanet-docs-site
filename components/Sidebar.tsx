"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PAGES } from "@/lib/nav";
import ThemeToggle from "./ThemeToggle";

const Mark = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true" style={{ display: "block", flex: "none" }}>
    <path d="M60 60 L60 0 A60 60 0 1 1 20.9 14.4 Z" fill="var(--accent)" />
  </svg>
);

function useActiveSub(subIds: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (subIds.length === 0) return;
    const onScroll = () => {
      let a: string | null = null;
      for (const id of subIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 160) a = id;
      }
      setActive(a);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // subIds is derived from the current route and stable per page view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subIds.join("|")]);
  return active;
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const current = PAGES.find((p) => p.href === pathname) ?? null;
  const activeSub = useActiveSub(current?.subs.map((s) => s.id) ?? []);

  return (
    <nav
      aria-label="Sections"
      style={{ flex: 1, overflowY: "auto", padding: "4px 12px 24px", display: "flex", flexDirection: "column", gap: 2 }}
    >
      {PAGES.map((page) => {
        const active = page.href === pathname;
        return (
          <div key={page.href} style={{ display: "flex", flexDirection: "column" }}>
            <Link
              href={page.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={active ? undefined : "rp-nav-link"}
              style={{
                display: "grid",
                gridTemplateColumns: "28px minmax(0,1fr)",
                alignItems: "baseline",
                padding: "9px 12px",
                borderRadius: "var(--radius-xs)",
                background: active ? "var(--bg-selected)" : undefined,
                textDecoration: "none",
                color: active ? "var(--fg-1)" : "var(--fg-2)",
              }}
            >
              <span style={{ font: "400 12px/1.3 var(--font-mono)", color: active ? "var(--fg-1)" : "var(--fg-3)" }}>
                {page.num}
              </span>
              <span
                style={{
                  font: `${active ? 500 : 400} 14px/1.35 var(--font-sans)`,
                  letterSpacing: "-0.005em",
                }}
              >
                {page.navLabel}
              </span>
            </Link>
            {active && page.subs.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "6px 0 10px 51px",
                  borderLeft: "1px solid var(--rule)",
                }}
              >
                {page.subs.map((s) => {
                  const subActive = activeSub === s.id;
                  return (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate?.();
                        const el = document.getElementById(s.id);
                        if (el) {
                          window.scrollTo({
                            top: el.getBoundingClientRect().top + window.scrollY - 40,
                            behavior: "smooth",
                          });
                        }
                      }}
                      className={subActive ? undefined : "rp-subnav-link"}
                      style={{
                        display: "block",
                        marginLeft: subActive ? -1 : 0,
                        padding: "6px 0 6px 14px",
                        borderLeft: subActive ? "1px solid var(--rule-ink)" : "none",
                        font: "400 13px/1.35 var(--font-sans)",
                        color: subActive ? "var(--fg-1)" : "var(--fg-3)",
                        textDecoration: "none",
                      }}
                    >
                      {s.title}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

function Footer() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--rule)",
        padding: "18px 24px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <a
        href="https://redplanetdata.com"
        target="_blank"
        rel="noopener"
        className="rp-underline-link"
        style={{ font: "400 14px/1.3 var(--font-sans)", color: "var(--fg-1)", textUnderlineOffset: 4 }}
      >
        redplanetdata.com ↗
      </a>
      {/* The domain (163px) and the toggle (77px) need 252px side by side, but
          the sidebar footer only has 223px of inner width, so the pill used to
          hang 29px past the column and sit on the divider. Wrapping drops it to
          its own line when it cannot fit, and flex-none keeps it from being
          squashed into an ellipsis on the line it shares. */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px 12px",
          marginTop: 6,
        }}
      >
        <span style={{ font: "400 12px/1.3 var(--font-mono)", color: "var(--fg-3)" }}>
          docs.redplanetdata.com
        </span>
        <ThemeToggle />
      </div>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const logo = (
    <Link
      href="/"
      onClick={() => setOpen(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "28px 24px 24px",
        textDecoration: "none",
        color: "var(--fg-1)",
      }}
    >
      <Mark />
      <span style={{ font: "500 16px/1 var(--font-sans)", letterSpacing: "-0.015em" }}>
        Red Planet<span style={{ color: "var(--accent)" }}>.</span>
      </span>
      <span style={{ font: "400 12px/1 var(--font-mono)", color: "var(--fg-3)", marginLeft: "auto" }}>
        Documentation
      </span>
    </Link>
  );

  const closeButton = (
    <button
      type="button"
      aria-label="Close navigation"
      onClick={() => setOpen(false)}
      className="rp-theme-toggle"
      style={{
        margin: "22px 24px 0 0",
        padding: "6px 14px",
        border: "1px solid var(--rule-strong)",
        borderRadius: "var(--radius-pill)",
        background: "transparent",
        color: "var(--fg-2)",
        font: "400 12px/1 var(--font-mono)",
        cursor: "pointer",
      }}
    >
      Close
    </button>
  );

  return (
    <>
      <header
        className="rp-mobile-bar"
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
          borderBottom: "1px solid var(--rule)",
          background: "var(--bg)",
          position: "sticky",
          top: 0,
          zIndex: 30,
          display: open ? "none" : undefined,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--fg-1)" }}>
          <Mark size={18} />
          <span style={{ font: "500 15px/1 var(--font-sans)", letterSpacing: "-0.015em" }}>
            Red Planet<span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </Link>
        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rp-theme-toggle"
          style={{
            padding: "6px 14px",
            border: "1px solid var(--rule-strong)",
            borderRadius: "var(--radius-pill)",
            background: "transparent",
            color: "var(--fg-2)",
            font: "400 12px/1 var(--font-mono)",
            cursor: "pointer",
          }}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <aside
        className={"rp-sidebar" + (open ? " rp-sidebar--open" : "")}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          flexDirection: "column",
          borderRight: "1px solid var(--rule)",
          background: "var(--bg)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 0 }}>{logo}</div>
          {open && closeButton}
        </div>
        <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
        <Footer />
      </aside>
    </>
  );
}
