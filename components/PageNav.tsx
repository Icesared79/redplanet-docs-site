import Link from "next/link";
import { sections } from "@/lib/sections";

export default function PageNav({ slug }: { slug: string }) {
  const idx = sections.findIndex((s) => s.slug === slug);
  if (idx < 0) return null;

  const prev = idx > 0 ? sections[idx - 1] : null;
  const next = idx < sections.length - 1 ? sections[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Page navigation"
      className="mt-16 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {prev ? (
        <Link
          href={`/${prev.slug}`}
          rel="prev"
          className="group sm:col-start-1 rounded-md border border-border bg-bg/40 px-5 py-4
                     transition-colors hover:border-brand hover:bg-surface/60"
        >
          <span
            className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted
                       transition-colors group-hover:text-brand"
          >
            ← Previous
          </span>
          <span
            className="mt-2 block font-display text-base text-text leading-snug
                       transition-colors group-hover:text-brand"
          >
            {prev.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden className="hidden sm:block sm:col-start-1" />
      )}

      {next ? (
        <Link
          href={`/${next.slug}`}
          rel="next"
          className="group sm:col-start-2 rounded-md border border-border bg-bg/40 px-5 py-4 text-right
                     transition-colors hover:border-brand hover:bg-surface/60"
        >
          <span
            className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted
                       transition-colors group-hover:text-brand"
          >
            Next →
          </span>
          <span
            className="mt-2 block font-display text-base text-text leading-snug
                       transition-colors group-hover:text-brand"
          >
            {next.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden className="hidden sm:block sm:col-start-2" />
      )}
    </nav>
  );
}
