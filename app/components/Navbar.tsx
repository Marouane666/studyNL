"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LANGUAGES } from "../i18n/dictionary";
import { useI18n } from "../i18n/I18nProvider";
import { GlobalSearch } from "./GlobalSearch";

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

  return (
    <header className="sticky top-0 z-30 w-full">
      {/* Top utility strip */}
      <div className="bg-[#03294f] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <p className="truncate text-[10px] font-medium uppercase tracking-[0.18em] text-white/75 sm:text-[11px]">
            <span className="hidden sm:inline">{t("nav.tagline.prefix")} </span>
            <span className="font-bold text-white">{t("nav.tagline.suffix")}</span>
          </p>
          <LanguagePicker />
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
            {NAV_ITEMS.map((item) => {
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
        items={NAV_ITEMS}
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
            {t("nav.tagline.prefix")}{" "}
            <span className="font-bold text-[#03294f]">{t("nav.tagline.suffix")}</span>
          </p>
        </div>
      </aside>
    </>
  );
}

function LanguagePicker() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const selected = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("nav.changeLanguage")}
        className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-white/20 sm:px-3"
      >
        <GlobeIcon />
        <span className="hidden sm:inline">{selected.label}</span>
        <span className="sm:hidden">{selected.short}</span>
        <ChevronDownIcon
          className={open ? "rotate-180 transition-transform" : "transition-transform"}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 max-h-[70vh] w-48 overflow-y-auto rounded-2xl bg-white py-1.5 shadow-[0_8px_28px_rgba(3,41,79,0.18)] ring-1 ring-[#03294f]/10"
        >
          {LANGUAGES.map((l) => {
            const active = l.code === lang;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2 text-start text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#eef1f6] text-[#03294f]"
                      : "text-[#03294f] hover:bg-[#f5f7fa]"
                  }`}
                >
                  <span>{l.label}</span>
                  <span className="text-[10px] font-bold tracking-wide text-[#03294f]/50">
                    {l.short}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
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
