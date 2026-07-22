// Source of truth for site-wide search.
//
// Each entry maps a destination route to the dictionary keys whose translated
// text should be matched. Because the searchable text is pulled from the i18n
// dictionary at query time (via `t(key)`), search works in every language for
// free, see `useSiteSearch`.

export type SearchEntry = {
  /** Stable id, used for React keys and keyboard navigation. */
  id: string;
  /** Destination route. */
  href: string;
  /** Dictionary key for the result's primary label (weighted highest). */
  titleKey: string;
  /** Dictionary key for the page/group this result belongs to (a `nav.*` key). */
  sectionKey: string;
  /** Extra dictionary keys whose text is searchable but not shown as the title. */
  bodyKeys?: string[];
};

export const SEARCH_INDEX: SearchEntry[] = [
  // Top-level pages
  {
    id: "page-home",
    href: "/",
    titleKey: "hero.title",
    sectionKey: "nav.home",
    bodyKeys: ["hero.subtitle", "moveplan.title", "moveplan.subtitle"],
  },
  {
    id: "page-start-here",
    href: "/start-here",
    titleKey: "start.title",
    sectionKey: "nav.startHere",
    bodyKeys: [
      "start.subtitle",
      "start.s1.title",
      "start.s2.title",
      "start.s3.title",
      "start.s4.title",
    ],
  },
  {
    id: "page-about",
    href: "/about",
    titleKey: "about.title",
    sectionKey: "nav.about",
    bodyKeys: ["about.subtitle"],
  },
  {
    id: "page-guides",
    href: "/guides",
    titleKey: "guides.title",
    sectionKey: "nav.guides",
    bodyKeys: ["guides.subtitle"],
  },
  {
    id: "page-hub-plus",
    href: "/hub-plus",
    titleKey: "hubplus.title",
    sectionKey: "nav.hubPlus",
    bodyKeys: [
      "hubplus.subtitle",
      "hubplus.f1.title",
      "hubplus.f2.title",
      "hubplus.f3.title",
    ],
  },
  {
    id: "page-help-centre",
    href: "/help-centre",
    titleKey: "helpc.title",
    sectionKey: "nav.helpCentre",
    bodyKeys: ["help.subtitle"],
  },
  {
    id: "page-forum",
    href: "/forum",
    titleKey: "nav.forum",
    sectionKey: "nav.forum",
  },

  // Individual guides (kept in sync with app/guides/page.tsx)
  {
    id: "guide-study-route",
    href: "/guides/study-route",
    titleKey: "guides.g1.title",
    sectionKey: "nav.guides",
    bodyKeys: ["guides.g1.blurb", "guides.g1.cat"],
  },
  {
    id: "guide-scholarships",
    href: "/guides/scholarships",
    titleKey: "guides.g2.title",
    sectionKey: "nav.guides",
    bodyKeys: ["guides.g2.blurb", "guides.g2.cat"],
  },
  {
    id: "guide-cost-of-living",
    href: "/guides/cost-of-living",
    titleKey: "guides.g3.title",
    sectionKey: "nav.guides",
    bodyKeys: ["guides.g3.blurb", "guides.g3.cat"],
  },
  {
    id: "guide-working-while-studying",
    href: "/guides/working-while-studying",
    titleKey: "guides.g4.title",
    sectionKey: "nav.guides",
    bodyKeys: ["guides.g4.blurb", "guides.g4.cat"],
  },
  {
    id: "guide-arrival-checklist",
    href: "/guides/arrival-checklist",
    titleKey: "guides.g5.title",
    sectionKey: "nav.guides",
    bodyKeys: ["guides.g5.blurb", "guides.g5.cat"],
  },
  {
    id: "guide-enrolment",
    href: "/guides/enrolment",
    titleKey: "guides.g6.title",
    sectionKey: "nav.guides",
    bodyKeys: ["guides.g6.blurb", "guides.g6.cat"],
  },
  {
    id: "guide-accommodation",
    href: "/guides/accommodation",
    titleKey: "guides.g7.title",
    sectionKey: "nav.guides",
    bodyKeys: ["guides.g7.blurb", "guides.g7.cat"],
  },
  {
    id: "guide-visa-residency",
    href: "/guides/visa-residency",
    titleKey: "guides.g8.title",
    sectionKey: "nav.guides",
    bodyKeys: ["guides.g8.blurb", "guides.g8.cat"],
  },
  {
    id: "guide-avoid-scams",
    href: "/guides/avoid-scams",
    titleKey: "guides.g9.title",
    sectionKey: "nav.guides",
    bodyKeys: ["guides.g9.blurb", "guides.g9.cat"],
  },
  {
    id: "guide-student-associations",
    href: "/guides/student-associations",
    titleKey: "guides.g10.title",
    sectionKey: "nav.guides",
    bodyKeys: ["guides.g10.blurb", "guides.g10.cat"],
  },
  {
    id: "guide-student-finance",
    href: "/guides/student-finance",
    titleKey: "guides.g11.title",
    sectionKey: "nav.guides",
    bodyKeys: ["guides.g11.blurb", "guides.g11.cat"],
  },
  {
    id: "guide-open-days",
    href: "/guides/open-days",
    titleKey: "guides.g12.title",
    sectionKey: "nav.guides",
    bodyKeys: ["guides.g12.blurb", "guides.g12.cat"],
  },

  // New sections (Start planner, Cities, Universities, Partners, Contact, Legal)
  {
    id: "page-start-plan",
    href: "/start",
    titleKey: "startPlan.title",
    sectionKey: "startPlan.badge",
    bodyKeys: ["startPlan.subtitle"],
  },
  {
    id: "page-cities",
    href: "/cities",
    titleKey: "cities.title",
    sectionKey: "cities.badge",
    bodyKeys: ["cities.subtitle"],
  },
  {
    id: "city-amsterdam",
    href: "/cities/amsterdam",
    titleKey: "city.amsterdam.name",
    sectionKey: "cities.badge",
    bodyKeys: ["city.amsterdam.positioning", "city.amsterdam.summary"],
  },
  {
    id: "city-rotterdam",
    href: "/cities/rotterdam",
    titleKey: "city.rotterdam.name",
    sectionKey: "cities.badge",
    bodyKeys: ["city.rotterdam.positioning", "city.rotterdam.summary"],
  },
  {
    id: "city-groningen",
    href: "/cities/groningen",
    titleKey: "city.groningen.name",
    sectionKey: "cities.badge",
    bodyKeys: ["city.groningen.positioning", "city.groningen.summary"],
  },
  {
    id: "city-eindhoven",
    href: "/cities/eindhoven",
    titleKey: "city.eindhoven.name",
    sectionKey: "cities.badge",
    bodyKeys: ["city.eindhoven.positioning", "city.eindhoven.summary"],
  },
  {
    id: "page-universities",
    href: "/universities",
    titleKey: "universities.title",
    sectionKey: "universities.badge",
    bodyKeys: ["universities.subtitle"],
  },
  {
    id: "page-partners",
    href: "/partners",
    titleKey: "partnersPage.title",
    sectionKey: "partnersPage.badge",
    bodyKeys: ["partnersPage.subtitle"],
  },
  {
    id: "page-contact",
    href: "/contact",
    titleKey: "contactPage.title",
    sectionKey: "contactPage.badge",
    bodyKeys: ["contactPage.subtitle"],
  },
  {
    id: "page-legal",
    href: "/legal",
    titleKey: "legalPage.title",
    sectionKey: "legalPage.badge",
    bodyKeys: ["legalPage.subtitle"],
  },

  // Help centre questions (surface on /help-centre)
  {
    id: "help-q1",
    href: "/help-centre",
    titleKey: "helpc.q1",
    sectionKey: "nav.helpCentre",
  },
  {
    id: "help-q2",
    href: "/help-centre",
    titleKey: "helpc.q2",
    sectionKey: "nav.helpCentre",
  },
  {
    id: "help-q3",
    href: "/help-centre",
    titleKey: "helpc.q3",
    sectionKey: "nav.helpCentre",
  },
  {
    id: "help-q4",
    href: "/help-centre",
    titleKey: "helpc.q4",
    sectionKey: "nav.helpCentre",
  },
  {
    id: "help-q5",
    href: "/help-centre",
    titleKey: "helpc.q5",
    sectionKey: "nav.helpCentre",
  },
  {
    id: "help-q6",
    href: "/help-centre",
    titleKey: "helpc.q6",
    sectionKey: "nav.helpCentre",
  },
];
