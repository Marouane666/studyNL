// Shared guide catalogue — the source of truth for both the guides index
// (`app/guides/page.tsx`) and the guide detail route (`app/guides/[slug]/page.tsx`).

export type Guide = {
  /** URL slug under /guides. */
  slug: string;
  catKey: string;
  titleKey: string;
  blurbKey: string;
  tabKey: string;
};

export const GUIDES: Guide[] = [
  { slug: "study-route", catKey: "guides.g1.cat", titleKey: "guides.g1.title", blurbKey: "guides.g1.blurb", tabKey: "guides.tab1" },
  { slug: "scholarships", catKey: "guides.g2.cat", titleKey: "guides.g2.title", blurbKey: "guides.g2.blurb", tabKey: "guides.tab2" },
  { slug: "cost-of-living", catKey: "guides.g3.cat", titleKey: "guides.g3.title", blurbKey: "guides.g3.blurb", tabKey: "guides.tab2" },
  { slug: "working-while-studying", catKey: "guides.g4.cat", titleKey: "guides.g4.title", blurbKey: "guides.g4.blurb", tabKey: "guides.tab6" },
  { slug: "arrival-checklist", catKey: "guides.g5.cat", titleKey: "guides.g5.title", blurbKey: "guides.g5.blurb", tabKey: "guides.tab5" },
  { slug: "enrolment", catKey: "guides.g6.cat", titleKey: "guides.g6.title", blurbKey: "guides.g6.blurb", tabKey: "guides.tab1" },
  { slug: "accommodation", catKey: "guides.g7.cat", titleKey: "guides.g7.title", blurbKey: "guides.g7.blurb", tabKey: "guides.tab3" },
  { slug: "visa-residency", catKey: "guides.g8.cat", titleKey: "guides.g8.title", blurbKey: "guides.g8.blurb", tabKey: "guides.tab4" },
  { slug: "avoid-scams", catKey: "guides.g9.cat", titleKey: "guides.g9.title", blurbKey: "guides.g9.blurb", tabKey: "guides.tab3" },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/** All valid guide slugs, for `generateStaticParams`. */
export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);
