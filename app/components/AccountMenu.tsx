"use client";

// Navbar account control: a log-in icon for visitors (opening the existing
// AuthPanel inline, so signing in never costs a page load) and the member's
// avatar once they're signed in, with their account links behind it.

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useT } from "../i18n/I18nProvider";
import { AuthPanel } from "../forum/components/AuthPanel";
import { isAdminRole } from "@/lib/roles";
import { isPremium } from "@/lib/plan";

const NAVY = "#03294f";
const ORANGE = "#fd7933";

export function AccountMenu() {
  const t = useT();
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Every link inside closes the menu on click, so there's no navigation
  // effect here; signing in simply swaps the panel's contents in place.
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

  // Render nothing until the session is known, so the icon doesn't flip from
  // "log in" to an avatar a moment after the page paints.
  if (loading) return <span className="size-10" aria-hidden="true" />;

  const premium = isPremium(user);

  return (
    // Static on phones so the panel below anchors to the sticky header (and can
    // span its full width) instead of hanging off the left of a narrow screen.
    <div ref={wrapperRef} className="static sm:relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={user ? t("nav.account") : t("auth.login.title")}
        className="inline-flex size-10 items-center justify-center rounded-full bg-white text-[#03294f] shadow-[0_1px_3px_rgba(3,41,79,0.06)] transition-colors hover:bg-[#f5f7fa]"
      >
        {user ? (
          <span
            className="grid size-8 place-items-center rounded-full text-xs font-bold text-white"
            style={{
              background: premium
                ? `linear-gradient(135deg, ${NAVY}, ${ORANGE})`
                : NAVY,
            }}
          >
            {user.displayName.trim().charAt(0).toUpperCase() || "?"}
          </span>
        ) : (
          <UserIcon />
        )}
      </button>

      {open && (
        <div className="absolute inset-x-4 top-full z-50 mt-2 sm:inset-x-auto sm:end-0 sm:w-[21rem] sm:max-w-[calc(100vw-2rem)]">
          {user ? (
            <div className="overflow-hidden rounded-2xl bg-white py-2 shadow-[0_8px_28px_rgba(3,41,79,0.18)] ring-1 ring-[#03294f]/10">
              <div className="border-b border-[#03294f]/8 px-4 pb-3 pt-2">
                <p className="text-[11px] font-semibold" style={{ color: `${NAVY}99` }}>
                  {t("auth.loggedInAs")}
                </p>
                <p className="mt-0.5 truncate text-sm font-bold" style={{ color: NAVY }}>
                  {user.displayName}
                </p>
                <p className="truncate text-xs" style={{ color: `${NAVY}99` }}>
                  {user.email}
                </p>
                {premium && (
                  <span
                    className="mt-2 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                    style={{ color: ORANGE, backgroundColor: `${ORANGE}1a` }}
                  >
                    {t("hubplus.badge")}
                  </span>
                )}
              </div>

              <nav className="py-1">
                {premium ? (
                  <MenuLink href="/hub-plus/dashboard" onNavigate={() => setOpen(false)}>
                    {t("nav.myHubPlus")}
                  </MenuLink>
                ) : (
                  <MenuLink href="/hub-plus/join" accent onNavigate={() => setOpen(false)}>
                    {t("hubplus.getStarted")}
                  </MenuLink>
                )}
                <MenuLink href="/start" onNavigate={() => setOpen(false)}>
                  {t("nav.startMove")}
                </MenuLink>
                <MenuLink href="/forum" onNavigate={() => setOpen(false)}>
                  {t("nav.forum")}
                </MenuLink>
                {isAdminRole(user.role) && (
                  <MenuLink href="/ps-admin" onNavigate={() => setOpen(false)}>
                    {t("nav.dashboard")}
                  </MenuLink>
                )}
              </nav>

              <div className="border-t border-[#03294f]/8 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="w-full px-4 py-2.5 text-start text-sm font-semibold transition-colors hover:bg-[#f5f7fa]"
                  style={{ color: `${NAVY}99` }}
                >
                  {t("auth.logout")}
                </button>
              </div>
            </div>
          ) : (
            <div className="shadow-[0_8px_28px_rgba(3,41,79,0.18)] rounded-2xl">
              <AuthPanel />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MenuLink({
  href,
  accent,
  onNavigate,
  children,
}: {
  href: string;
  accent?: boolean;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="block px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-[#f5f7fa]"
      style={{ color: accent ? ORANGE : NAVY }}
    >
      {children}
    </Link>
  );
}

function UserIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
