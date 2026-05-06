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
      <article className="prose-rp">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            img: ({ node, ...props }) => (
              // MarkdownImage is a client component that wraps the <img> with
              // an on-click lightbox. It renders a normal img inline and a
              // fixed-position overlay when expanded.
              <MarkdownImage {...props} />
            ),
          }}
        >
          {md}
        </ReactMarkdown>
      </article>
      <PageNav slug={params.slug} />
    </>
  );
}
