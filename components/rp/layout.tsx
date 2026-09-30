import type { ReactNode } from "react";
import Link from "next/link";
import { Eyebrow } from "./primitives";
import { neighbors, type DocPage } from "@/lib/nav";

export function PageHeader({ page, h1Style }: { page: DocPage; h1Style?: React.CSSProperties }) {
  return (
    <header style={{ display: "flex", flexDirection: "column", gap: 28, paddingBottom: 12 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          borderBottom: "1px solid var(--rule-ink)",
          paddingBottom: 12,
        }}
      >
        <Eyebrow index={Number(page.num)} tone="accent">
          Documentation
        </Eyebrow>
        <span style={{ font: "400 12px/1 var(--font-mono)", color: "var(--fg-3)" }}>
          {page.num} / 07
        </span>
      </div>
      <h1 className="rp-display-l" style={h1Style}>
        {page.title}
      </h1>
    </header>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="rp-body-l" style={{ color: "var(--fg-1)", maxWidth: 760 }}>
      {children}
    </p>
  );
}

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="rp-title-l"
      style={{ marginTop: 36, paddingTop: 28, borderTop: "1px solid var(--rule)" }}
    >
      {children}
    </h2>
  );
}

export function Body({ children, maxWidth = 720 }: { children: ReactNode; maxWidth?: number }) {
  return (
    <p className="rp-body" style={{ color: "var(--fg-2)", maxWidth }}>
      {children}
    </p>
  );
}

export function DefList({ children, columns = 200 }: { children: ReactNode; columns?: number }) {
  return <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>;
}

export function DefRow({
  term,
  children,
  columns = 200,
}: {
  term: string;
  children: ReactNode;
  columns?: number;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${columns}px minmax(0,1fr)`,
        gap: 32,
        padding: "22px 0",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <h3 style={{ margin: 0, font: "500 16px/1.5 var(--font-sans)", letterSpacing: "-0.01em" }}>
        {term}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
        {children}
      </div>
    </div>
  );
}

export function TableWrap({
  children,
  maxWidth,
  style,
  className = "",
}: {
  children: ReactNode;
  maxWidth?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div className={("rp-table-wrap " + className).trim()} style={{ maxWidth, ...style }}>
      {children}
    </div>
  );
}

export function ContactCard({ children }: { children: ReactNode }) {
  return (
    <div
      data-surface="sage"
      style={{
        marginTop: 20,
        background: "var(--bg)",
        color: "var(--fg-1)",
        borderRadius: "var(--radius-md)",
        padding: 32,
      }}
    >
      <p className="rp-title-l" style={{ maxWidth: 720, textWrap: "pretty" }}>
        {children}
      </p>
    </div>
  );
}

export function PageFooter({ page }: { page: DocPage }) {
  const { prev, next } = neighbors(page.href);
  return (
    <footer style={{ marginTop: 72, display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 16,
          borderTop: "1px solid var(--rule-ink)",
          paddingTop: 14,
        }}
      >
        <span style={{ font: "400 13px/1.3 var(--font-mono)", color: "var(--fg-2)" }}>
          Figures marked{" "}
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--positive)",
              verticalAlign: "middle",
              margin: "0 2px 2px",
            }}
          />{" "}
          are live counts, updated nightly. Written 9/2026.
        </span>
        <span style={{ font: "400 12px/1.3 var(--font-mono)", color: "var(--fg-3)" }}>
          docs.redplanetdata.com
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 8 }}>
        <div style={{ display: "flex" }}>
          {prev && (
            <Link
              href={prev.href}
              rel="prev"
              className="rp-nextprev"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: "20px 24px",
                background: "var(--bg-subtle)",
                borderRadius: "var(--radius-md)",
                textDecoration: "none",
                color: "var(--fg-1)",
              }}
            >
              <span style={{ font: "400 12px/1 var(--font-mono)", color: "var(--fg-3)" }}>
                Previous
              </span>
              <span style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                <span style={{ font: "400 13px/1 var(--font-mono)", color: "var(--fg-3)" }}>
                  {prev.num}
                </span>
                <span style={{ font: "400 19px/1.25 var(--font-sans)", letterSpacing: "-0.01em" }}>
                  {prev.navLabel}
                </span>
              </span>
            </Link>
          )}
        </div>
        <div style={{ display: "flex" }}>
          {next && (
            <Link
              href={next.href}
              rel="next"
              className="rp-nextprev"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                textAlign: "right",
                gap: 10,
                padding: "20px 24px",
                background: "var(--bg-subtle)",
                borderRadius: "var(--radius-md)",
                textDecoration: "none",
                color: "var(--fg-1)",
              }}
            >
              <span style={{ font: "400 12px/1 var(--font-mono)", color: "var(--fg-3)" }}>
                Next
              </span>
              <span style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                <span style={{ font: "400 13px/1 var(--font-mono)", color: "var(--fg-3)" }}>
                  {next.num}
                </span>
                <span style={{ font: "400 19px/1.25 var(--font-sans)", letterSpacing: "-0.01em" }}>
                  {next.navLabel}
                </span>
              </span>
            </Link>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          paddingTop: 28,
          font: "400 12px/1.3 var(--font-mono)",
          color: "var(--fg-3)",
        }}
      >
        <span>Red Planet Data</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
}
