"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "../i18n/I18nProvider";
import { useAuth } from "../auth/AuthProvider";
import { isAdminRole } from "@/lib/roles";
import { isPremium } from "@/lib/plan";
import { AccountMenu } from "./AccountMenu";
import { GlobalSearch } from "./GlobalSearch";
import { LanguagePicker } from "./LanguagePicker";

type NavItem = { href: string; tKey: string };

const NAV_ITEMS: NavItem[] = [
  { href: "/", tKey: "nav.home" },
  { href: "/start-here", tKey: "nav.startHere" },
  { href: "/about", tKey: "nav.about" },
  { href: "/guides", tKey: "nav.guides" },
  { href: "/hub-plus", tKey: "nav.hubPlus" },
  { href: "/help-centre", tKey: "nav.helpCentre" },
  { href: "/forum", tKey: "nav.forum" },
];

export function Navbar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  // Hub Plus is the members' own space, so only a member lands on it: everyone
  // else goes straight to checkout, which is where the offer is presented.
  const items = NAV_ITEMS.map((item) =>
    item.href === "/hub-plus" && !isPremium(user)
      ? { ...item, href: "/hub-plus/join" }
      : item,
  );

  return (
    <header className="sticky top-0 z-30 w-full">
      {/* Top utility strip */}
      <div className="bg-[#03294f] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
          {/* Tighter tracking on phones so the full line fits beside the
              language picker; on the narrowest screens it breaks between the
              two phrases instead of cutting either one off. */}
          <p className="min-w-0 text-[10px] font-medium uppercase leading-snug tracking-[0.08em] text-white/75 min-[400px]:tracking-[0.12em] sm:text-[11px] sm:tracking-[0.18em]">
            <span className="whitespace-nowrap">POWERED BY GRADUATES</span>{" "}
            <span className="whitespace-nowrap font-bold text-white">FOR STUDENTS</span>
          </p>
          <div className="flex shrink-0 items-center gap-2">
            {isAdminRole(user?.role) && (
              <Link
                href="/ps-admin"
                className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-white/20 sm:px-3"
              >
                {t("nav.dashboard")}
              </Link>
            )}
            <LanguagePicker />
          </div>
        </div>
      </div>

      {/* Main nav row */}
      <div className="border-b border-[#03294f]/5 bg-[#eaf2fa]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <Link
            href="/"
            className="shrink-0 text-2xl font-bold leading-none tracking-tight"
          >
            <span className="text-[#03294f]">Study</span>
            <span className="text-[#fd7933]">NL</span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-colors xl:px-4 xl:text-sm ${
                    active
                      ? "bg-white text-[#03294f] shadow-[0_2px_8px_rgba(3,41,79,0.08)]"
                      : "text-[#03294f]/75 hover:bg-white hover:text-[#03294f]"
                  }`}
                >
                  {t(item.tKey)}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <GlobalSearch />

            <AccountMenu />

            <Link
              href="/start"
              className="hidden whitespace-nowrap items-center rounded-full bg-[#fd7933] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#e96a25] sm:inline-flex"
            >
              {t("nav.startMove")}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t("nav.menu")}
              aria-expanded={mobileOpen}
              className="inline-flex size-10 items-center justify-center rounded-full bg-white text-[#03294f] shadow-[0_1px_3px_rgba(3,41,79,0.06)] lg:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={items}
        isActive={isActive}
      />
    </header>
  );
}

function MobileDrawer({
  open,
  onClose,
  items,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  isActive: (href: string) => boolean;
}) {
  const { t } = useI18n();

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-[#03294f]/50 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t("nav.menu")}
        className={`fixed inset-y-0 right-0 z-50 flex w-[82%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#03294f]/10 px-5 py-4">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-[#03294f]">Study</span>
            <span className="text-[#fd7933]">NL</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("nav.close")}
            className="inline-flex size-10 items-center justify-center rounded-full bg-[#eef1f6] text-[#03294f]"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-2xl px-4 py-3 text-base font-semibold transition-colors ${
                      active
                        ? "bg-[#eef1f6] text-[#03294f]"
                        : "text-[#03294f] hover:bg-[#f5f7fa]"
                    }`}
                  >
                    {t(item.tKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-[#03294f]/10 p-4">
          <Link
            href="/start"
            onClick={onClose}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#fd7933] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#e96a25]"
          >
            {t("nav.startMove")}
          </Link>
          <p className="text-center text-[10px] font-medium uppercase tracking-[0.18em] text-[#03294f]/60">
            POWERED BY GRADUATES{" "}
            <span className="font-bold text-[#03294f]">FOR STUDENTS</span>
          </p>
        </div>
      </aside>
    </>
  );
}

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6l-12 12" />
    </svg>
  );
}
