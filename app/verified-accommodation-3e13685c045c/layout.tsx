import type { Metadata } from "next";

// Verified Accommodation preview. Unlisted on purpose: nothing on the site links
// here, it isn't in site search (app/search/searchIndex.ts is hand-written),
// and search engines are told not to index it, so only people given the link
// find it. That keeps it private from casual visitors, but it is not access
// control: anyone holding the URL can open it.

export const metadata: Metadata = {
  title: "Verified Accommodation | StudyNL",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function AccommodationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
