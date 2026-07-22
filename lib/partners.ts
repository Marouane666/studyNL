// Shared partner catalogue, single source of truth for the homepage
// marquee (app/components/ApprovedPartners.tsx) and the full disclosure
// page (app/partners/page.tsx), so the two lists can't silently drift apart.

export type Partner = {
  slug: string;
  name: string;
  logoSrc: string;
  categoryKey: string;
  descriptionKey: string;
  // Outbound link. For commercial partners (affiliate: true) replace this with
  // your AFFILIATE / TRACKING URL from that partner's programme (it carries your
  // publisher ID, which is what earns the commission). The values below are
  // plain homepages as placeholders until the real tracking links are in.
  url: string;
  // true  = commercial affiliate link -> rendered with rel="sponsored"
  // false = official/non-commercial resource -> normal external link
  affiliate: boolean;
};

export const PARTNERS: Partner[] = [
  {
    slug: "studielink",
    name: "Studielink",
    logoSrc: "/logos/studielink.svg",
    categoryKey: "partnersPage.studielink.cat",
    descriptionKey: "partnersPage.studielink.desc",
    url: "https://www.studielink.nl/",
    affiliate: false,
  },
  {
    slug: "feather",
    name: "Feather",
    logoSrc: "/logos/feather.svg",
    categoryKey: "partnersPage.feather.cat",
    descriptionKey: "partnersPage.feather.desc",
    url: "https://feather-insurance.com/",
    affiliate: true,
  },
  {
    slug: "hays",
    name: "Hays",
    logoSrc: "/logos/hays.svg",
    categoryKey: "partnersPage.hays.cat",
    descriptionKey: "partnersPage.hays.desc",
    url: "https://www.hays.nl/",
    affiliate: true,
  },
  {
    slug: "babbel",
    name: "Babbel",
    logoSrc: "/logos/babbel.svg",
    categoryKey: "partnersPage.babbel.cat",
    descriptionKey: "partnersPage.babbel.desc",
    url: "https://www.babbel.com/",
    affiliate: true,
  },
  {
    slug: "revolut",
    name: "Revolut",
    logoSrc: "/logos/revolut.svg",
    categoryKey: "partnersPage.revolut.cat",
    descriptionKey: "partnersPage.revolut.desc",
    url: "https://www.revolut.com/",
    affiliate: true,
  },
  {
    slug: "utility-direct",
    name: "Utility Direct",
    logoSrc: "/logos/utility.svg",
    categoryKey: "partnersPage.utility.cat",
    descriptionKey: "partnersPage.utility.desc",
    url: "https://www.utilitydirect.nl/",
    affiliate: true,
  },
];
