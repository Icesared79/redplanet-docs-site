import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { sections, findSection } from "@/lib/sections";
import { readMarkdown } from "@/lib/content";
import PageNav from "@/components/PageNav";
import MarkdownImage from "@/components/MarkdownImage";

export function generateStaticParams() {
  return sections.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const section = findSection(params.slug);
  if (!section) return { title: "Not found — Red Planet Docs" };
  return {
    title: `${section.title} — Red Planet Docs`,
  };
}

export default function SectionPage({
  params,
}: {
  params: { slug: string };
}) {
  const section = findSection(params.slug);
  if (!section) notFound();

  const md = readMarkdown(section.file);

  return (
    <>
      {/* The section eyebrow — the one place red appears on the page body. */}
      <p className="rp-eyebrow mb-7">
        <span>§ {section.short}</span>
        <span aria-hidden>—</span>
        <span>{section.title}</span>
      </p>

      <article className="prose-rp">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            img: ({ node, ...props }) => <MarkdownImage {...props} />,
            // Bold carries two jobs in this content: a figure (set in mono,
            // tabular, per the design system) and an ordinary prose lead-in
            // (set in sans). Decide by what the span actually contains.
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            strong: ({ node, children, ...props }) => {
              const text = String(
                Array.isArray(children) ? children.join("") : children ?? "",
              );
              const isFigure = /^[\d][\d,.\s%-]*$/.test(text.trim());
              return (
                <strong {...props} className={isFigure ? "rp-fig" : undefined}>
                  {children}
                </strong>
              );
            },
          }}
        >
          {md}
        </ReactMarkdown>
      </article>

      <PageNav slug={params.slug} />
    </>
  );
}
