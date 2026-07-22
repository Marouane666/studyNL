// Shared guide catalogue, the source of truth for both the guides index
// (`app/guides/page.tsx`) and the guide detail route (`app/guides/[slug]/page.tsx`).

export type GuideSource = {
  /** Link text, e.g. "Student residence permits". */
  label: string;
  href: string;
  /** Publishing organisation, e.g. "IND". */
  org: string;
};

export type GuideSection = {
  headingKey: string;
  /** Dictionary key for a paragraph. Omit if the section is bullets-only. */
  bodyKey?: string;
  /** Dictionary keys for a bullet list. Omit if the section is prose-only. */
  bulletKeys?: string[];
};

export type Guide = {
  /** URL slug under /guides. */
  slug: string;
  catKey: string;
  titleKey: string;
  blurbKey: string;
  tabKey: string;
  /** One-sentence direct answer shown in a callout at the top of the guide. */
  answerKey: string;
  sections: GuideSection[];
  sources: GuideSource[];
};

export const GUIDES: Guide[] = [
  {
    slug: "study-route",
    catKey: "guides.g1.cat",
    titleKey: "guides.g1.title",
    blurbKey: "guides.g1.blurb",
    tabKey: "guides.tab1",
    answerKey: "guide.study-route.answer",
    sections: [
      { headingKey: "guide.study-route.s1.heading", bodyKey: "guide.study-route.s1.body" },
      {
        headingKey: "guide.study-route.s2.heading",
        bulletKeys: ["guide.study-route.s2.b1", "guide.study-route.s2.b2", "guide.study-route.s2.b3"],
      },
      {
        headingKey: "guide.study-route.s3.heading",
        bulletKeys: ["guide.study-route.s3.b1", "guide.study-route.s3.b2", "guide.study-route.s3.b3"],
      },
    ],
    sources: [],
  },
  {
    slug: "scholarships",
    catKey: "guides.g2.cat",
    titleKey: "guides.g2.title",
    blurbKey: "guides.g2.blurb",
    tabKey: "guides.tab2",
    answerKey: "guide.scholarships.answer",
    sections: [
      {
        headingKey: "guide.scholarships.s1.heading",
        bulletKeys: [
          "guide.scholarships.s1.b1",
          "guide.scholarships.s1.b2",
          "guide.scholarships.s1.b3",
          "guide.scholarships.s1.b4",
        ],
      },
      { headingKey: "guide.scholarships.s2.heading", bodyKey: "guide.scholarships.s2.body" },
      {
        headingKey: "guide.scholarships.s3.heading",
        bulletKeys: ["guide.scholarships.s3.b1", "guide.scholarships.s3.b2", "guide.scholarships.s3.b3"],
      },
    ],
    sources: [
      { label: "Student finance", href: "https://duo.nl/particulier/student-finance/", org: "DUO" },
    ],
  },
  {
    slug: "cost-of-living",
    catKey: "guides.g3.cat",
    titleKey: "guides.g3.title",
    blurbKey: "guides.g3.blurb",
    tabKey: "guides.tab2",
    answerKey: "guide.cost-of-living.answer",
    sections: [
      {
        headingKey: "guide.cost-of-living.s1.heading",
        bulletKeys: [
          "guide.cost-of-living.s1.b1",
          "guide.cost-of-living.s1.b2",
          "guide.cost-of-living.s1.b3",
          "guide.cost-of-living.s1.b4",
          "guide.cost-of-living.s1.b5",
        ],
      },
      { headingKey: "guide.cost-of-living.s2.heading", bodyKey: "guide.cost-of-living.s2.body" },
      { headingKey: "guide.cost-of-living.s3.heading", bodyKey: "guide.cost-of-living.s3.body" },
    ],
    sources: [],
  },
  {
    slug: "working-while-studying",
    catKey: "guides.g4.cat",
    titleKey: "guides.g4.title",
    blurbKey: "guides.g4.blurb",
    tabKey: "guides.tab6",
    answerKey: "guide.working-while-studying.answer",
    sections: [
      { headingKey: "guide.working-while-studying.s1.heading", bodyKey: "guide.working-while-studying.s1.body" },
      {
        headingKey: "guide.working-while-studying.s2.heading",
        bulletKeys: ["guide.working-while-studying.s2.b1", "guide.working-while-studying.s2.b2", "guide.working-while-studying.s2.b3"],
      },
      {
        headingKey: "guide.working-while-studying.s3.heading",
        bulletKeys: ["guide.working-while-studying.s3.b1", "guide.working-while-studying.s3.b2", "guide.working-while-studying.s3.b3"],
      },
    ],
    sources: [
      { label: "Working while studying", href: "https://ind.nl/en/residence-permits/study", org: "IND" },
    ],
  },
  {
    slug: "arrival-checklist",
    catKey: "guides.g5.cat",
    titleKey: "guides.g5.title",
    blurbKey: "guides.g5.blurb",
    tabKey: "guides.tab5",
    answerKey: "guide.arrival-checklist.answer",
    sections: [
      {
        headingKey: "guide.arrival-checklist.s1.heading",
        bulletKeys: [
          "guide.arrival-checklist.s1.b1",
          "guide.arrival-checklist.s1.b2",
          "guide.arrival-checklist.s1.b3",
          "guide.arrival-checklist.s1.b4",
        ],
      },
      {
        headingKey: "guide.arrival-checklist.s2.heading",
        bulletKeys: ["guide.arrival-checklist.s2.b1", "guide.arrival-checklist.s2.b2", "guide.arrival-checklist.s2.b3", "guide.arrival-checklist.s2.b4"],
      },
      { headingKey: "guide.arrival-checklist.s3.heading", bodyKey: "guide.arrival-checklist.s3.body" },
    ],
    sources: [],
  },
  {
    slug: "enrolment",
    catKey: "guides.g6.cat",
    titleKey: "guides.g6.title",
    blurbKey: "guides.g6.blurb",
    tabKey: "guides.tab1",
    answerKey: "guide.enrolment.answer",
    sections: [
      { headingKey: "guide.enrolment.s1.heading", bodyKey: "guide.enrolment.s1.body" },
      {
        headingKey: "guide.enrolment.s2.heading",
        bulletKeys: ["guide.enrolment.s2.b1", "guide.enrolment.s2.b2", "guide.enrolment.s2.b3", "guide.enrolment.s2.b4", "guide.enrolment.s2.b5"],
      },
      { headingKey: "guide.enrolment.s3.heading", bodyKey: "guide.enrolment.s3.body" },
    ],
    sources: [
      { label: "Studielink", href: "https://www.studielink.nl/", org: "Studielink" },
    ],
  },
  {
    slug: "accommodation",
    catKey: "guides.g7.cat",
    titleKey: "guides.g7.title",
    blurbKey: "guides.g7.blurb",
    tabKey: "guides.tab3",
    answerKey: "guide.accommodation.answer",
    sections: [
      {
        headingKey: "guide.accommodation.s1.heading",
        bulletKeys: ["guide.accommodation.s1.b1", "guide.accommodation.s1.b2", "guide.accommodation.s1.b3"],
      },
      {
        headingKey: "guide.accommodation.s2.heading",
        bulletKeys: ["guide.accommodation.s2.b1", "guide.accommodation.s2.b2", "guide.accommodation.s2.b3", "guide.accommodation.s2.b4"],
      },
      { headingKey: "guide.accommodation.s3.heading", bodyKey: "guide.accommodation.s3.body" },
    ],
    sources: [
      { label: "Renting a house", href: "https://www.government.nl/topics/housing/rented-housing", org: "Government of the Netherlands" },
    ],
  },
  {
    slug: "visa-residency",
    catKey: "guides.g8.cat",
    titleKey: "guides.g8.title",
    blurbKey: "guides.g8.blurb",
    tabKey: "guides.tab4",
    answerKey: "guide.visa-residency.answer",
    sections: [
      {
        headingKey: "guide.visa-residency.s1.heading",
        bulletKeys: ["guide.visa-residency.s1.b1", "guide.visa-residency.s1.b2", "guide.visa-residency.s1.b3"],
      },
      { headingKey: "guide.visa-residency.s2.heading", bodyKey: "guide.visa-residency.s2.body" },
      {
        headingKey: "guide.visa-residency.s3.heading",
        bulletKeys: ["guide.visa-residency.s3.b1", "guide.visa-residency.s3.b2", "guide.visa-residency.s3.b3"],
      },
    ],
    sources: [
      { label: "Student residence permits", href: "https://ind.nl/en/residence-permits/study", org: "IND" },
      { label: "Income requirements for study", href: "https://ind.nl/en/income-requirements-study", org: "IND" },
    ],
  },
  {
    slug: "avoid-scams",
    catKey: "guides.g9.cat",
    titleKey: "guides.g9.title",
    blurbKey: "guides.g9.blurb",
    tabKey: "guides.tab3",
    answerKey: "guide.avoid-scams.answer",
    sections: [
      {
        headingKey: "guide.avoid-scams.s1.heading",
        bulletKeys: ["guide.avoid-scams.s1.b1", "guide.avoid-scams.s1.b2", "guide.avoid-scams.s1.b3", "guide.avoid-scams.s1.b4", "guide.avoid-scams.s1.b5"],
      },
      {
        headingKey: "guide.avoid-scams.s4.heading",
        bulletKeys: ["guide.avoid-scams.s4.b1", "guide.avoid-scams.s4.b2", "guide.avoid-scams.s4.b3", "guide.avoid-scams.s4.b4", "guide.avoid-scams.s4.b5"],
      },
      {
        headingKey: "guide.avoid-scams.s2.heading",
        bulletKeys: ["guide.avoid-scams.s2.b1", "guide.avoid-scams.s2.b2", "guide.avoid-scams.s2.b3", "guide.avoid-scams.s2.b4"],
      },
      { headingKey: "guide.avoid-scams.s3.heading", bodyKey: "guide.avoid-scams.s3.body" },
    ],
    sources: [
      { label: "Renting a house", href: "https://www.government.nl/topics/housing/rented-housing", org: "Government of the Netherlands" },
    ],
  },
  {
    slug: "student-associations",
    catKey: "guides.g10.cat",
    titleKey: "guides.g10.title",
    blurbKey: "guides.g10.blurb",
    tabKey: "guides.tab6",
    answerKey: "guide.student-associations.answer",
    sections: [
      { headingKey: "guide.student-associations.s1.heading", bodyKey: "guide.student-associations.s1.body" },
      {
        headingKey: "guide.student-associations.s2.heading",
        bulletKeys: ["guide.student-associations.s2.b1", "guide.student-associations.s2.b2", "guide.student-associations.s2.b3", "guide.student-associations.s2.b4"],
      },
      {
        headingKey: "guide.student-associations.s3.heading",
        bulletKeys: ["guide.student-associations.s3.b1", "guide.student-associations.s3.b2", "guide.student-associations.s3.b3", "guide.student-associations.s3.b4"],
      },
    ],
    sources: [],
  },
  {
    slug: "student-finance",
    catKey: "guides.g11.cat",
    titleKey: "guides.g11.title",
    blurbKey: "guides.g11.blurb",
    tabKey: "guides.tab2",
    answerKey: "guide.student-finance.answer",
    sections: [
      {
        headingKey: "guide.student-finance.s1.heading",
        bulletKeys: ["guide.student-finance.s1.b1", "guide.student-finance.s1.b2"],
      },
      {
        headingKey: "guide.student-finance.s2.heading",
        bulletKeys: ["guide.student-finance.s2.b1", "guide.student-finance.s2.b2", "guide.student-finance.s2.b3"],
      },
      { headingKey: "guide.student-finance.s3.heading", bodyKey: "guide.student-finance.s3.body" },
    ],
    sources: [
      { label: "Student finance eligibility", href: "https://duo.nl/particulier/student-finance/", org: "DUO" },
      { label: "Tuition fees", href: "https://www.duo.nl/particulier/collegegeld.jsp", org: "DUO" },
    ],
  },
  {
    slug: "open-days",
    catKey: "guides.g12.cat",
    titleKey: "guides.g12.title",
    blurbKey: "guides.g12.blurb",
    tabKey: "guides.tab1",
    answerKey: "guide.open-days.answer",
    sections: [
      {
        headingKey: "guide.open-days.s1.heading",
        bulletKeys: ["guide.open-days.s1.b1", "guide.open-days.s1.b2", "guide.open-days.s1.b3", "guide.open-days.s1.b4"],
      },
      {
        headingKey: "guide.open-days.s2.heading",
        bulletKeys: ["guide.open-days.s2.b1", "guide.open-days.s2.b2", "guide.open-days.s2.b3", "guide.open-days.s2.b4"],
      },
      { headingKey: "guide.open-days.s3.heading", bodyKey: "guide.open-days.s3.body" },
    ],
    sources: [],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/** All valid guide slugs, for `generateStaticParams`. */
export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);
