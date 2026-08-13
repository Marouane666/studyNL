"use client";

// Decides whether a route gets the public site's chrome. The Hub Plus dashboard
// brings its own full-height shell (sidebar + topbar), so the site navbar,
// footer and newsletter popup are left out there rather than stacked on top of it.

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { NewsletterPopup } from "./NewsletterPopup";

const BARE_ROUTES = ["/hub-plus/dashboard"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (bare) return <>{children}</>;

  return (
    <>
      <NewsletterPopup />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
