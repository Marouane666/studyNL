"use client";

// The Hub Plus member shell: a sticky full-height sidebar with the site's own
// navbar and footer left out (see app/components/SiteChrome.tsx), so this reads
// as a private app rather than another page of the public site. Every route
// under /hub-plus/dashboard renders into the right-hand pane.
//
// The membership gate lives here, once, rather than in each page.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../auth/AuthProvider";
import { useT } from "../../i18n/I18nProvider";
import { AuthPanel } from "../../forum/components/AuthPanel";
import { isLapsed, isPremium } from "@/lib/plan";
import {
  ACCOUNT_PAGES,
  ALL_PAGES,
  DASH_PAGES,
  NAVY,
  NAVY_DEEP,
  GOLD,
  GOLD_LIGHT,
  GOLD_SOFT,
  GOLD_TEXT,
  ORANGE,
  PAGE,
  type DashPage,
  isCurrent,
} from "./ui";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ backgroundColor: PAGE, minHeight: "100vh" }} />;

  if (!user || !isPremium(user)) {
    return (
      <div className="min-h-screen px-4 py-10 sm:px-6" style={{ backgroundColor: PAGE }}>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight"
            aria-label="StudyNL"
          >
            <span style={{ color: NAVY }}>Study</span>
            <span style={{ color: ORANGE }}>NL</span>
          </Link>
          <Gate />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen lg:grid lg:grid-cols-[250px_minmax(0,1fr)]"
      style={{ backgroundColor: PAGE }}
    >
      <Sidebar />

      <div className="min-w-0">
        <Topbar name={user.displayName} />
        <main className="mx-auto max-w-[1480px] px-4 pb-28 pt-6 sm:px-8 sm:pt-8 lg:pb-14">
          {children}
        </main>
      </div>

      <BottomNav />
    </div>
  );
}

function Gate() {
  const t = useT();
  const { user } = useAuth();
  const lapsed = isLapsed(user);

  return (
    <div className="mt-6 rounded-3xl bg-white p-8 shadow-[0_2px_14px_rgba(9,42,77,0.06)] sm:p-10">
      <span
        className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide"
        style={{ color: GOLD_TEXT, backgroundColor: GOLD_SOFT }}
      >
        {t("hubplus.badge")}
      </span>
      <h1
        className="mt-5 max-w-2xl break-words text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-[1.1] tracking-tight"
        style={{ color: NAVY }}
      >
        {user ? (lapsed ? t("hubDash.lapsed.title") : t("hubDash.locked.title")) : t("hubDash.login.title")}
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: `${NAVY}99` }}>
        {user ? (lapsed ? t("hubDash.lapsed.body") : t("hubDash.locked.body")) : t("hubDash.login.body")}
      </p>

      {user ? (
        <div className="mt-6">
          <Link
            href="/hub-plus/join"
            className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold shadow-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: GOLD, color: NAVY_DEEP }}
          >
            {lapsed ? t("hubDash.lapsed.cta") : t("hubDash.locked.join")}
          </Link>
        </div>
      ) : (
        <div className="mt-6 max-w-md">
          <AuthPanel loginSubtitle={t("hubDash.login.subtitle")} />
        </div>
      )}
    </div>
  );
}

function Sidebar() {
  const t = useT();
  const pathname = usePathname();

  return (
    <aside
      className="sticky top-0 hidden h-screen flex-col overflow-y-auto p-6 text-white lg:flex"
      style={{
        background: `radial-gradient(circle at 0 15%, rgba(201,164,92,.16), transparent 35%), linear-gradient(180deg, ${NAVY_DEEP} 0%, #092f56 100%)`,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <Link href="/hub-plus/dashboard" className="text-[25px] font-extrabold tracking-tight">
          Study<span style={{ color: ORANGE }}>NL</span>
        </Link>
        <span className="rounded-full border border-[#c9a45c]/45 px-2 py-1.5 text-[10px] font-extrabold tracking-[0.12em] text-[#e6cf9a]">
          HUB PLUS
        </span>
      </div>

      <p className="mt-8 px-3 text-[10px] font-extrabold uppercase tracking-[0.13em] text-white/45">
        {t("hubDash.nav.section")}
      </p>
      <nav className="mt-2 flex flex-col gap-0.5">
        {DASH_PAGES.map((page) => (
          <SideLink key={page.href} page={page} active={isCurrent(pathname, page.href)} />
        ))}
      </nav>

      <p className="mt-5 px-3 text-[10px] font-extrabold uppercase tracking-[0.13em] text-white/45">
        {t("hubDash.nav.accountSection")}
      </p>
      <nav className="mt-2 flex flex-col gap-0.5">
        {ACCOUNT_PAGES.map((page) => (
          <SideLink key={page.href} page={page} active={isCurrent(pathname, page.href)} />
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
          <p className="text-[13px] font-bold">{t("hubDash.help.title")}</p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-white/60">{t("hubDash.help.body")}</p>
          <Link
            href="/contact"
            className="mt-3 flex w-full items-center justify-center rounded-xl px-3 py-2.5 text-[11px] font-extrabold transition-opacity hover:opacity-90"
            style={{ backgroundColor: GOLD, color: NAVY_DEEP }}
          >
            {t("hubDash.help.cta")}
          </Link>
        </div>

        {/* The site navbar is hidden in here, so this is the way back out. */}
        <Link
          href="/"
          className="mt-3 flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-white/55 transition-colors hover:text-white"
        >
          <span aria-hidden="true">←</span>
          {t("hubDash.back")}
        </Link>
      </div>
    </aside>
  );
}

function SideLink({ page, active }: { page: DashPage; active: boolean }) {
  const t = useT();
  return (
    <Link
      href={page.href}
      aria-current={active ? "page" : undefined}
      className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
        active
          ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]"
          : "text-white/70 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span
        className={`grid size-6 shrink-0 place-items-center rounded-lg text-[11px] ${
          active ? "bg-[#c9a45c]/20 text-[#e6cf9a]" : "bg-white/10"
        }`}
        aria-hidden="true"
      >
        {page.icon}
      </span>
      {t(page.labelKey)}
    </Link>
  );
}

function Topbar({ name }: { name: string }) {
  const t = useT();
  const pathname = usePathname();
  const { logout } = useAuth();
  const current = ALL_PAGES.find((p) => isCurrent(pathname, p.href));

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-[#c9a45c]/20 bg-white/85 px-4 backdrop-blur-xl sm:h-[78px] sm:px-8">
      {/* On phones the sidebar is gone, so the wordmark doubles as the way back
          to the public site; the eyebrow + page title take over from sm up. */}
      <Link href="/" className="text-xl font-bold tracking-tight sm:hidden">
        <span style={{ color: NAVY }}>Study</span>
        <span style={{ color: ORANGE }}>NL</span>
      </Link>

      <div className="hidden min-w-0 sm:block">
        <p
          className="truncate text-[10px] font-bold uppercase tracking-[0.08em] sm:text-[11px]"
          style={{ color: `${NAVY}80` }}
        >
          {t("hubDash.eyebrow")}
        </p>
        <p className="truncate text-sm font-extrabold sm:text-[15px]" style={{ color: NAVY }}>
          {current ? t(current.labelKey) : t("hubDash.topTitle")}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
        <span className="hidden items-center gap-2 rounded-full bg-[#e9faf6] px-3 py-2 text-[11px] font-extrabold text-[#1a6b5e] sm:inline-flex">
          <span className="size-[7px] rounded-full bg-[#2caa91]" aria-hidden="true" />
          {t("hubDash.status.active")}
        </span>
        <button
          type="button"
          onClick={() => logout()}
          className="rounded-full px-3 py-2 text-[11px] font-bold transition-colors hover:bg-[#0a2847]/5"
          style={{ color: `${NAVY}99` }}
        >
          {t("auth.logout")}
        </button>
        <span
          className="grid size-9 shrink-0 place-items-center rounded-xl text-sm font-extrabold text-white sm:size-[38px]"
          style={{ background: `linear-gradient(135deg, ${NAVY_DEEP}, ${GOLD})` }}
          aria-hidden="true"
        >
          {name.trim().charAt(0).toUpperCase() || "?"}
        </span>
      </div>
    </header>
  );
}

function BottomNav() {
  const t = useT();
  const pathname = usePathname();
  const pages = ALL_PAGES.filter((p) => p.shortKey);

  return (
    <nav
      aria-label={t("hubDash.nav.section")}
      className="fixed inset-x-2.5 bottom-2.5 z-30 grid h-16 grid-cols-5 items-center rounded-[21px] border border-white/10 backdrop-blur-xl lg:hidden"
      style={{ backgroundColor: "rgba(6,27,51,.94)", boxShadow: "0 15px 40px rgba(6,27,51,.28)" }}
    >
      {pages.map((page) => {
        const active = isCurrent(pathname, page.href);
        return (
          <Link
            key={page.href}
            href={page.href}
            aria-current={active ? "page" : undefined}
            className={`grid h-full place-items-center gap-0.5 px-1 text-[8px] font-semibold ${
              active ? "text-white" : "text-white/60"
            }`}
          >
            <span className="text-[15px]" style={active ? { color: GOLD_LIGHT } : undefined} aria-hidden="true">
              {page.icon}
            </span>
            <span className="w-full truncate text-center">{t(page.shortKey ?? page.labelKey)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
