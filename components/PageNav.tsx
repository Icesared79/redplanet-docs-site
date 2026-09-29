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
      className="mt-20 grid grid-cols-1 gap-px border-t border-rule sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/${prev.slug}`}
          rel="prev"
          className="group py-7 pr-6 transition-colors duration-fast ease-out"
        >
          <span className="block font-mono text-label text-fg-3">
            ← Previous · {prev.short}
          </span>
          <span
            className="mt-3 block text-[19px] leading-[1.3] tracking-[-0.015em]
                       text-fg-2 transition-colors duration-fast ease-out
                       group-hover:text-fg"
          >
            {prev.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={`/${next.slug}`}
          rel="next"
          className="group py-7 sm:border-l sm:border-rule sm:pl-6 sm:text-right"
        >
          <span className="block font-mono text-label text-fg-3">
            Next · {next.short} →
          </span>
          <span
            className="mt-3 block text-[19px] leading-[1.3] tracking-[-0.015em]
                       text-fg-2 transition-colors duration-fast ease-out
                       group-hover:text-fg"
          >
            {next.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden className="hidden sm:block" />
      )}
    </nav>
  );
}
