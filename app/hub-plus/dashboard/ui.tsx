"use client";

// Shared look and navigation for every Hub Plus dashboard route, so the sidebar,
// the bottom bar and the topbar title all read from one list of pages.

export const NAVY = "#092A4D";
export const NAVY_DEEP = "#061b33";
export const ORANGE = "#fd7933";
export const PAGE = "#f4f7fb";

export type DashPage = {
  href: string;
  labelKey: string;
  icon: string;
  /**
   * Shown in the mobile bottom bar. Its five columns are ~70px wide, so those
   * pages carry a short label; the sidebar always uses the full one.
   */
  shortKey?: string;
};

/** Order matters: it's the sidebar's "member space" section, top to bottom. */
export const DASH_PAGES: DashPage[] = [
  {
    href: "/hub-plus/dashboard",
    labelKey: "hubDash.nav.overview",
    shortKey: "hubDash.nav.overview",
    icon: "⌂",
  },
  {
    href: "/hub-plus/dashboard/plan",
    labelKey: "hubDash.nav.plan",
    shortKey: "hubDash.short.plan",
    icon: "✓",
  },
  {
    href: "/hub-plus/dashboard/resources",
    labelKey: "hubDash.nav.resources",
    shortKey: "hubDash.short.resources",
    icon: "▤",
  },
  {
    href: "/hub-plus/dashboard/support",
    labelKey: "hubDash.nav.support",
    shortKey: "hubDash.short.support",
    icon: "?",
  },
  { href: "/hub-plus/dashboard/community", labelKey: "hubDash.nav.community", icon: "◍" },
];

/** The "account" section, kept separate so the sidebar can label it. */
export const ACCOUNT_PAGES: DashPage[] = [
  {
    href: "/hub-plus/dashboard/membership",
    labelKey: "hubDash.membership.title",
    shortKey: "hubDash.short.membership",
    icon: "◉",
  },
];

export const ALL_PAGES = [...DASH_PAGES, ...ACCOUNT_PAGES];

/** Exact match for the index route, prefix match for the rest. */
export function isCurrent(pathname: string, href: string): boolean {
  return href === "/hub-plus/dashboard"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function Panel({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`rounded-3xl border border-[#dfe8f1] bg-white shadow-[0_10px_30px_rgba(6,27,51,0.05)] ${className}`}
    >
      {children}
    </article>
  );
}

export function PageIntro({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-5 px-0.5">
      <h1
        className="break-words text-[clamp(1.4rem,3vw,2rem)] font-extrabold leading-tight tracking-tight"
        style={{ color: NAVY }}
      >
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
        {subtitle}
      </p>
    </header>
  );
}
