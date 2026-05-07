import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
      <div className="flex items-center justify-between px-6 md:px-10 h-14">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Red Planet — Atlas documentation"
        >
          <img
            src="/brand/lockup-horizontal-light.svg"
            alt="Red Planet"
            className="block h-[27px] w-auto dark:hidden"
          />
          <img
            src="/brand/lockup-horizontal.svg"
            alt="Red Planet"
            className="hidden h-[27px] w-auto dark:block"
          />
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-muted">
            Atlas
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <a
            href="https://redplanetdata.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline text-xs font-mono uppercase tracking-[0.18em] text-muted hover:text-text transition-colors"
          >
            redplanetdata.com →
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
