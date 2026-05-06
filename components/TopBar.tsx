import Link from "next/link";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
      <div className="flex items-center justify-between px-6 md:px-10 h-14">
        <Link
          href="/"
          className="font-display font-bold text-base tracking-tight text-text"
        >
          <span className="text-brand">Red Planet</span>
          <span className="ml-2 text-xs font-mono uppercase tracking-[0.18em] text-muted">
            Atlas
          </span>
        </Link>
        <a
          href="https://redplanetdata.com"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-mono uppercase tracking-[0.18em] text-muted hover:text-text transition-colors"
        >
          redplanetdata.com →
        </a>
      </div>
    </header>
  );
}
