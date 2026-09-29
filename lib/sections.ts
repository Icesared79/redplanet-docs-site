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
    title: "The problem",
    short: "01",
  },
  {
    slug: "what-atlas-is",
    file: "02-atlas-and-intelligence-layer.md",
    title: "What Atlas is",
    short: "02",
  },
  {
    slug: "the-data-asset",
    file: "03-the-data-asset.md",
    title: "The data asset",
    short: "03",
  },
  {
    slug: "markets-and-coverage",
    file: "04-markets-and-coverage.md",
    title: "Markets and coverage",
    short: "04",
  },
  {
    slug: "the-platform",
    file: "05-platform-and-products.md",
    title: "The platform and what we build on it",
    short: "05",
  },
  {
    slug: "how-it-works",
    file: "06-pipeline-and-self-correction.md",
    title: "How the pipeline works",
    short: "06",
  },
  {
    slug: "data-quality",
    file: "07-data-quality.md",
    title: "Data quality and verification",
    short: "07",
  },
  {
    slug: "development-model",
    file: "08-development-model.md",
    title: "The development model",
    short: "08",
  },
  {
    slug: "where-were-going",
    file: "09-where-were-going.md",
    title: "Where we are going",
    short: "09",
  },
];

export function findSection(slug: string): Section | undefined {
  return sections.find((s) => s.slug === slug);
}
