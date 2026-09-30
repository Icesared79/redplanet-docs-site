import { notFound } from "next/navigation";

// The old markdown-driven content model (content/*.md, lib/sections.ts,
// lib/content.ts) is superseded by the seven static routes under app/ built
// from design_handoff_atlas_docs. This catch-all just 404s instead of
// serving stale content; Next.js resolves the new static routes (/data,
// /coverage, ...) before ever reaching a dynamic segment, so this only
// fires for a slug that no longer exists.
export default function LegacySlugPage() {
  notFound();
}
