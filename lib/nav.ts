// The seven routes, in nav order, exactly as design_handoff_atlas_docs/PROMPT.md
// specifies. The nav label for 02 is "Our Data"; the page h1 is "The Data" —
// both kept as written (see navLabel vs title).

export type SubSection = { id: string; title: string };

export type DocPage = {
  slug: string; // "" for the root page
  href: string;
  num: string; // "01".."07"
  navLabel: string;
  title: string;
  subs: SubSection[];
};

export const PAGES: DocPage[] = [
  {
    slug: "",
    href: "/",
    num: "01",
    navLabel: "Overview",
    title: "Overview",
    subs: [
      { id: "ov-why", title: "Why We Built It" },
      { id: "ov-what", title: "What Atlas Is" },
      { id: "ov-built", title: "Built Directly, by Rule" },
      { id: "ov-history", title: "Much of It Cannot Be Collected Again" },
    ],
  },
  {
    slug: "data",
    href: "/data",
    num: "02",
    navLabel: "Our Data",
    title: "The Data",
    subs: [
      { id: "da-people", title: "People and Places" },
      { id: "da-infra", title: "Infrastructure" },
      { id: "da-signals", title: "Signals" },
    ],
  },
  {
    slug: "coverage",
    href: "/coverage",
    num: "03",
    navLabel: "Coverage",
    title: "Coverage",
    subs: [
      { id: "co-open", title: "How a Market Opens" },
      { id: "co-where", title: "Where Atlas Operates" },
      { id: "co-community", title: "The Community Layer" },
      { id: "co-baseline", title: "The National Baseline" },
      { id: "co-new", title: "How a New Geography Gets Built" },
    ],
  },
  {
    slug: "how-atlas-works",
    href: "/how-atlas-works",
    num: "04",
    navLabel: "How Atlas Works",
    title: "How Atlas Works",
    subs: [
      { id: "hw-disc", title: "Discovery and Acquisition" },
      { id: "hw-runner", title: "The Runner Framework" },
      { id: "hw-tiers", title: "Verification and the Four Tiers" },
      { id: "hw-refuse", title: "Where the Engine Refuses to Guess" },
      { id: "hw-self", title: "Self-Correction" },
      { id: "hw-limits", title: "Limits, Stated Once" },
    ],
  },
  {
    slug: "products",
    href: "/products",
    num: "05",
    navLabel: "Products",
    title: "Products",
    subs: [
      { id: "pr-signal", title: "Signal" },
      { id: "pr-dc", title: "The Data Center Product" },
      { id: "pr-sun", title: "SunScope" },
      { id: "pr-cost", title: "What a New Product Costs to Build" },
    ],
  },
  {
    slug: "licensing",
    href: "/licensing",
    num: "06",
    navLabel: "Licensing",
    title: "Licensing",
    subs: [
      { id: "li-scope", title: "How a License Is Scoped" },
      { id: "li-incl", title: "What a License Includes" },
      { id: "li-new", title: "Licensing a Geography We Have Not Built Yet" },
      { id: "li-who", title: "Who We License To" },
    ],
  },
  {
    slug: "how-we-build",
    href: "/how-we-build",
    num: "07",
    navLabel: "How We Build and Where We Are Going",
    title: "How We Build and Where We Are Going",
    subs: [
      { id: "bu-why", title: "Why It Holds Together" },
      { id: "bu-depth", title: "Depth Before Breadth" },
      { id: "bu-deeper", title: "Deeper Intelligence" },
      { id: "bu-scale", title: "Scale" },
      { id: "bu-pos", title: "The Position" },
    ],
  },
];

export function pageIndex(href: string): number {
  return PAGES.findIndex((p) => p.href === href);
}

export function neighbors(href: string): { prev: DocPage | null; next: DocPage | null } {
  const i = pageIndex(href);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? PAGES[i - 1] : null,
    next: i < PAGES.length - 1 ? PAGES[i + 1] : null,
  };
}
