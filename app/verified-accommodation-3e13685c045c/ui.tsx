"use client";

// Shared pieces of the Verified Accommodation preview: badges, the save heart,
// locked Hub Plus fields, the upgrade panel and photo placeholders.

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useAuth } from "../auth/AuthProvider";
import { AuthPanel } from "../forum/components/AuthPanel";
import { isPremium } from "@/lib/plan";
import { GOLD, GOLD_LIGHT, GOLD_SOFT, GOLD_TEXT, NAVY_DEEP } from "../hub-plus/dashboard/ui";
import type { Listing } from "./data";

export const NAVY = "#092A4D";
export const ORANGE = "#fd7933";
export const BASE = "/verified-accommodation-3e13685c045c";
export { GOLD, GOLD_LIGHT, GOLD_SOFT, GOLD_TEXT, NAVY_DEEP };

/** True when this viewer may see everything on a listing. */
export function useUnlocked(listing: Pick<Listing, "tier">) {
  const { user } = useAuth();
  return listing.tier === "verified" || isPremium(user);
}

// Enquiry and referral measurement. Goes to Google Analytics as an event when
// analytics is configured and consented (see app/analytics); a server-side
// record (per listing, per provider) belongs in the database once it exists.
export function recordEvent(name: string, params: Record<string, string>) {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", name, params);
}

// ---------------------------------------------------------------------------
// Saved listings
//
// Kept per account in this browser for the preview. Moves to a saved_listings
// table (user_id, listing_id, saved_at) when listings live in the database, so
// saves follow the member across devices.

const SAVED_EVENT = "saved-listings-change";
const PENDING_KEY = "saved-listings-pending";
const savedKey = (userId: string) => `saved-listings:${userId}`;

function readList(key: string): string[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function writeList(key: string, ids: string[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    // Storage blocked: the save lasts for this page view only.
  }
  window.dispatchEvent(new Event(SAVED_EVENT));
}

function subscribeSaved(onChange: () => void) {
  window.addEventListener(SAVED_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(SAVED_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

const EMPTY = "[]";

export function useSaved() {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  // A JSON string snapshot, so the store returns a stable value between reads.
  const raw = useSyncExternalStore(
    subscribeSaved,
    () => (userId ? JSON.stringify(readList(savedKey(userId))) : EMPTY),
    () => EMPTY,
  );
  const ids: string[] = JSON.parse(raw);

  // A heart tapped while logged out is remembered and saved once they log in.
  useEffect(() => {
    if (!userId) return;
    const pending = window.localStorage.getItem(PENDING_KEY);
    if (!pending) return;
    window.localStorage.removeItem(PENDING_KEY);
    const list = readList(savedKey(userId));
    if (!list.includes(pending)) writeList(savedKey(userId), [pending, ...list]);
  }, [userId]);

  return {
    ids,
    loggedIn: userId !== null,
    isSaved: (id: string) => ids.includes(id),
    toggle(id: string) {
      if (!userId) return;
      const list = readList(savedKey(userId));
      writeList(savedKey(userId), list.includes(id) ? list.filter((x) => x !== id) : [id, ...list]);
    },
    remember(id: string) {
      window.localStorage.setItem(PENDING_KEY, id);
    },
  };
}

export function HeartButton({ id, className = "" }: { id: string; className?: string }) {
  const saved = useSaved();
  const [asking, setAsking] = useState(false);
  const active = saved.isSaved(id);

  return (
    <>
      <button
        type="button"
        aria-pressed={active}
        aria-label={active ? "Remove from saved" : "Save property"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (saved.loggedIn) {
            saved.toggle(id);
          } else {
            saved.remember(id);
            setAsking(true);
          }
        }}
        className={`grid size-10 place-items-center rounded-full bg-white/95 shadow-[0_4px_14px_rgba(9,42,77,0.15)] transition-transform hover:scale-105 ${className}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? "#e5484d" : "none"} stroke={active ? "#e5484d" : NAVY} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </button>

      {asking && !saved.loggedIn && (
        <Modal onClose={() => setAsking(false)}>
          <h2 className="text-lg font-extrabold" style={{ color: NAVY }}>
            Save this property
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed" style={{ color: `${NAVY}A6` }}>
            Create a free StudyNL account or log in to save properties you’re interested in and return to them later.
          </p>
          <div className="mt-4">
            <AuthPanel initialMode="signup" onSuccess={() => setAsking(false)} />
          </div>
        </Modal>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Badges

export function VerifiedBadge() {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="inline-flex items-center gap-1 rounded-full bg-[#e9faf6] px-2.5 py-1 text-[11px] font-extrabold text-[#1a6b5e]"
      >
        <span aria-hidden="true">✓</span> StudyNL Verified
      </button>
      {open && (
        // Worded to match what StudyNL actually checks, and never as a
        // guarantee: see section 6 of the brief. Update it if the checks change.
        <span
          role="tooltip"
          className="absolute left-0 top-full z-20 mt-2 w-72 rounded-xl bg-white p-4 text-left text-xs font-normal leading-relaxed shadow-[0_14px_40px_rgba(9,42,77,0.2)] ring-1 ring-[#092A4D]/10"
          style={{ color: `${NAVY}CC` }}
        >
          <span className="block text-sm font-extrabold" style={{ color: NAVY }}>
            StudyNL Verified
          </span>
          <span className="mt-1.5 block">
            This accommodation provider has completed StudyNL’s verification process. Verification may include
            identity, business and property-related checks designed to provide students with greater confidence when
            searching for accommodation.
          </span>
          <span className="mt-1.5 block font-semibold">
            Verification is not a guarantee of the landlord, the property or the tenancy.
          </span>
        </span>
      )}
    </span>
  );
}

export function HubPlusBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-extrabold ${className}`}
      style={{ backgroundColor: NAVY_DEEP, color: GOLD_LIGHT }}
    >
      <span aria-hidden="true">✦</span> Hub Plus Exclusive
    </span>
  );
}

export function StatusPill({ label }: { label: string }) {
  const tone =
    label === "No longer available"
      ? "bg-[#fdecec] text-[#b42318]"
      : label === "Reserved"
        ? "bg-[#fff4e5] text-[#9a5b00]"
        : "bg-[#eef5fb] text-[#1d5d91]";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${tone}`}>{label}</span>;
}

/** A value hidden from non-members on Hub Plus listings. */
export function Locked({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.();
      }}
      className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-extrabold"
      style={{ backgroundColor: GOLD_SOFT, color: GOLD_TEXT }}
    >
      <LockIcon /> Hub Plus
    </button>
  );
}

export function LockIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Upgrade panel (section 11 of the brief)

export function UpgradePanel({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`rounded-3xl text-white ${compact ? "p-6" : "p-7 sm:p-9"}`}
      style={{ background: `radial-gradient(circle at 85% 15%, rgba(201,164,92,.25), transparent 45%), linear-gradient(135deg, ${NAVY_DEEP}, #0d3a68)` }}
    >
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a45c]/40 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide" style={{ color: GOLD_LIGHT }}>
        <span aria-hidden="true">✦</span> Hub Plus Exclusive
      </span>
      <h2 className="mt-4 text-2xl font-extrabold tracking-tight">Unlock this property</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/75">
        This accommodation opportunity is available exclusively through Hub Plus.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-white/75">
        Become a Hub Plus member to unlock the complete listing, additional property information and direct contact
        details for the landlord or letting agent.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Link
          href="/hub-plus/join"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition-opacity hover:opacity-90"
          style={{ backgroundColor: GOLD, color: NAVY_DEEP }}
        >
          <LockIcon size={13} /> Unlock with Hub Plus
        </Link>
        <Link href="/hub-plus" className="text-sm font-bold underline underline-offset-4" style={{ color: GOLD_LIGHT }}>
          Discover all Hub Plus benefits
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Photos. Placeholders until real photography is uploaded.

const VERIFIED_TONES = ["#dbe7f3", "#e6eef7", "#d3e2f0", "#e9f0f8"];
const HUBPLUS_TONES = ["#1a3556", "#233f63", "#132b49", "#2a466b"];

export function Photo({
  listing,
  index,
  className = "",
  blurred = false,
}: {
  listing: Pick<Listing, "tier" | "title" | "photos">;
  index: number;
  className?: string;
  blurred?: boolean;
}) {
  const premium = listing.tier === "hubplus";
  const tones = premium ? HUBPLUS_TONES : VERIFIED_TONES;
  const bg = tones[index % tones.length];
  return (
    <div
      role="img"
      aria-label={`${listing.title}, photo ${index + 1} of ${listing.photos}`}
      className={`relative grid place-items-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${bg}, ${premium ? "#0b223e" : "#f4f8fc"})` }}
    >
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={premium ? GOLD : "#8aa6c1"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={blurred ? "blur-sm" : ""}>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M10 21v-6h4v6" />
      </svg>
      <span className={`absolute bottom-2 right-2 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${premium ? "bg-black/30 text-white/80" : "bg-white/70 text-[#54718c]"}`}>
        Photo {index + 1}/{listing.photos}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------

export function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#061b33]/55 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md rounded-3xl bg-[#f6f8fb] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid size-8 place-items-center rounded-full text-lg hover:bg-[#092A4D]/5"
          style={{ color: NAVY }}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

/** The in-page menu standing in for the "Accommodation" nav item in the brief. */
export function SubNav({ active }: { active: "find" | "premium" | "saved" | "safety" | null }) {
  const items = [
    { key: "find", label: "Find Accommodation", href: BASE },
    { key: "premium", label: "Hub Plus Premium Listings", href: `${BASE}?view=premium` },
    { key: "saved", label: "Saved Listings", href: `${BASE}?view=saved` },
    // The existing public guide, rather than a copy of it in here.
    { key: "renting", label: "Renting in the Netherlands", href: "/guides/accommodation" },
    { key: "safety", label: "Rent Safely", href: `${BASE}?view=safety` },
  ] as const;
  return (
    <nav aria-label="Accommodation" className="-mx-6 overflow-x-auto px-6">
      <ul className="flex w-max gap-1.5">
        {items.map((item) => {
          const on = item.key === active;
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                aria-current={on ? "page" : undefined}
                className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                  on ? "text-white" : "bg-[#f6f8fb] hover:bg-[#eef1f6]"
                }`}
                style={on ? { backgroundColor: item.key === "premium" ? NAVY_DEEP : NAVY } : { color: NAVY }}
              >
                {item.key === "premium" && <span className="mr-1" style={{ color: on ? GOLD_LIGHT : GOLD_TEXT }}>✦</span>}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
