// Shared partner catalogue — single source of truth for the homepage
// marquee (app/components/ApprovedPartners.tsx) and the full disclosure
// page (app/partners/page.tsx), so the two lists can't silently drift apart.

export type Partner = {
  slug: string;
  name: string;
  logoSrc: string;
  categoryKey: string;
  descriptionKey: string;
};

export const PARTNERS: Partner[] = [
  {
    slug: "studielink",
    name: "Studielink",
    logoSrc: "/logos/studielink.svg",
    categoryKey: "partnersPage.studielink.cat",
    descriptionKey: "partnersPage.studielink.desc",
  },
  {
    slug: "feather",
    name: "Feather",
    logoSrc: "/logos/feather.svg",
    categoryKey: "partnersPage.feather.cat",
    descriptionKey: "partnersPage.feather.desc",
  },
  {
    slug: "hays",
    name: "Hays",
    logoSrc: "/logos/hays.svg",
    categoryKey: "partnersPage.hays.cat",
    descriptionKey: "partnersPage.hays.desc",
  },
  {
    slug: "babbel",
    name: "Babbel",
    logoSrc: "/logos/babbel.svg",
    categoryKey: "partnersPage.babbel.cat",
    descriptionKey: "partnersPage.babbel.desc",
  },
  {
    slug: "revolut",
    name: "Revolut",
    logoSrc: "/logos/revolut.svg",
    categoryKey: "partnersPage.revolut.cat",
    descriptionKey: "partnersPage.revolut.desc",
  },
  {
    slug: "utility-direct",
    name: "Utility Direct",
    logoSrc: "/logos/utility.svg",
    categoryKey: "partnersPage.utility.cat",
    descriptionKey: "partnersPage.utility.desc",
  },
];
