// Mapping between URL slugs, source markdown filenames, and page titles.
// The order here is also the navigation order shown in the sidebar.

export type Section = {
  slug: string;
  file: string;
  title: string;
  short: string;
};

export const sections: Section[] = [
  {
    slug: "the-problem",
    file: "01-the-problem.md",
    title: "The Problem",
    short: "01",
  },
  {
    slug: "what-atlas-is",
    file: "02-atlas-and-intelligence-layer.md",
    title: "What Atlas Is & The Intelligence Layer",
    short: "02",
  },
  {
    slug: "the-data-asset",
    file: "03-the-data-asset.md",
    title: "The Data Asset",
    short: "03",
  },
  {
    slug: "the-platform",
    file: "04-platform-and-velocity.md",
    title: "The Platform Model & Product Velocity",
    short: "04",
  },
  {
    slug: "how-it-works",
    file: "05-pipeline-and-self-correction.md",
    title: "How the Pipeline Works",
    short: "05",
  },
  {
    slug: "development-model",
    file: "06-development-model.md",
    title: "The Development Model",
    short: "06",
  },
  {
    slug: "data-quality",
    file: "07-data-quality-and-where-were-going.md",
    title: "Data Quality & Where We're Going",
    short: "07",
  },
];

export function findSection(slug: string): Section | undefined {
  return sections.find((s) => s.slug === slug);
}
