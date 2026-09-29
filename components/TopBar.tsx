import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-bg/90 backdrop-blur">
      <div className="flex h-14 items-center justify-end gap-6 px-5 md:px-12">
        <a
          href="https://www.redplanetdata.com"
          className="hidden font-mono text-label text-fg-3 transition-colors
                     duration-fast ease-out hover:text-fg sm:inline"
        >
          redplanetdata.com ↗
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
