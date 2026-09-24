"use client";

// Verified Accommodation: search, filters and results (sections 1, 2, 9, 15,
// 16 and 17 of the brief). The in-page menu switches between the search, the
// Hub Plus premium listings, saved listings and Rent Safely via ?view=.
//
// Preview only: English copy, sample listings from ./data. Not linked from the
// rest of the site (see ./layout.tsx).

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import {
  LISTINGS,
  type Listing,
  type PropertyType,
  TYPE_LABEL,
  UNIVERSITIES,
  bedroomsLabel,
  euro,
  FURNISHED_LABEL,
  nearestUniversity,
  statusLabel,
  UTILITIES_LABEL,
} from "./data";
import {
  BASE,
  GOLD,
  HeartButton,
  HubPlusBadge,
  Locked,
  NAVY,
  NAVY_DEEP,
  ORANGE,
  Photo,
  StatusPill,
  SubNav,
  VerifiedBadge,
  useSaved,
  useUnlocked,
} from "./ui";

type Sort = "recommended" | "newest" | "priceAsc" | "priceDesc" | "soonest" | "distance";

type Filters = {
  q: string;
  minRent: string;
  maxRent: string;
  types: PropertyType[];
  bedrooms: "" | "0" | "1" | "2" | "3" | "4";
  bathrooms: "" | "1" | "2" | "3";
  bathroom: "" | "private" | "shared";
  kitchen: "" | "private" | "shared";
  furnished: "" | Listing["furnished"];
  utilities: "" | Listing["utilities"];
  availability: "" | "now" | "date";
  moveIn: string;
  registration: boolean;
  university: string;
  sort: Sort;
};

const NO_FILTERS: Filters = {
  q: "",
  minRent: "",
  maxRent: "",
  types: [],
  bedrooms: "",
  bathrooms: "",
  bathroom: "",
  kitchen: "",
  furnished: "",
  utilities: "",
  availability: "",
  moveIn: "",
  registration: false,
  university: "",
  sort: "recommended",
};

export default function AccommodationPage() {
  return (
    <Suspense fallback={null}>
      <AccommodationView />
    </Suspense>
  );
}

function AccommodationView() {
  const view = useSearchParams().get("view");

  return (
    <section className="bg-white" style={{ color: NAVY }}>
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-8">
        <SubNav
          active={view === "premium" ? "premium" : view === "saved" ? "saved" : view === "safety" ? "safety" : "find"}
        />
        {view === "saved" ? (
          <SavedView />
        ) : view === "safety" ? (
          <RentSafely />
        ) : (
          <SearchView premiumOnly={view === "premium"} />
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Search

function SearchView({ premiumOnly }: { premiumOnly: boolean }) {
  const [f, setF] = useState<Filters>(NO_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => setF((prev) => ({ ...prev, [key]: value }));

  const results = useMemo(() => search(f, premiumOnly), [f, premiumOnly]);
  const activeCount = countActive(f);

  return (
    <>
      {premiumOnly ? (
        <div
          className="mt-6 rounded-3xl p-8 text-white sm:p-12"
          style={{ background: `radial-gradient(circle at 85% 10%, rgba(201,164,92,.22), transparent 45%), linear-gradient(135deg, ${NAVY_DEEP}, #0d3a68)` }}
        >
          <HubPlusBadge className="border border-[#c9a45c]/40" />
          <h1 className="mt-5 max-w-3xl text-[clamp(1.9rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight">
            Premium accommodation. Exclusive opportunities. Direct access.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            Discover a curated selection of accommodation opportunities available through StudyNL Hub Plus, including
            premium listings, exclusive properties and enhanced access to landlords and letting agents.
          </p>
          <SearchBar value={f.q} onChange={(q) => set("q", q)} dark />
        </div>
      ) : (
        <div className="mt-6 rounded-3xl bg-[#eaf2fa] p-8 sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: ORANGE }}>
            StudyNL Verified Accommodation
          </p>
          <h1 className="mt-3 max-w-3xl text-[clamp(1.9rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight">
            Find your home in the Netherlands.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: `${NAVY}B3` }}>
            Verified accommodation providers, the full cost of every property up front, and the details international
            students need before they sign.
          </p>
          <SearchBar value={f.q} onChange={(q) => set("q", q)} />
        </div>
      )}

      {/* Toolbar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          aria-expanded={showFilters}
          className="inline-flex items-center gap-2 rounded-full border border-[#092A4D]/15 px-4 py-2.5 text-sm font-bold hover:bg-[#092A4D]/5"
        >
          <FilterIcon /> Filters
          {activeCount > 0 && (
            <span className="grid size-5 place-items-center rounded-full text-[11px] text-white" style={{ backgroundColor: ORANGE }}>
              {activeCount}
            </span>
          )}
        </button>
        <div className="flex items-center gap-3">
          <p className="text-sm" style={{ color: `${NAVY}99` }}>
            {results.length} {results.length === 1 ? "property" : "properties"}
          </p>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <span className="sr-only sm:not-sr-only">Sort</span>
            <select
              value={f.sort}
              onChange={(e) => set("sort", e.target.value as Sort)}
              className="rounded-full border border-[#092A4D]/15 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#fd7933]"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="soonest">Available Soonest</option>
              <option value="distance">Distance from University</option>
            </select>
          </label>
        </div>
      </div>

      {showFilters && <FilterPanel f={f} set={set} onReset={() => setF({ ...NO_FILTERS, q: f.q, sort: f.sort })} />}

      {results.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-[#f6f8fb] p-10 text-center">
          <p className="text-lg font-bold">No properties match these filters.</p>
          <button type="button" onClick={() => setF(NO_FILTERS)} className="mt-3 text-sm font-bold underline" style={{ color: ORANGE }}>
            Clear all filters
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((l) => (
            <li key={l.id}>
              <ListingCard listing={l} university={f.university} />
            </li>
          ))}
        </ul>
      )}

      {!premiumOnly && (
        <Link
          href={`${BASE}?view=safety`}
          className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#fff4ec] px-6 py-5"
        >
          <span>
            <span className="block text-sm font-extrabold">Rent safely</span>
            <span className="mt-0.5 block text-sm" style={{ color: `${NAVY}B3` }}>
              The precautions to take before you sign anything or send money.
            </span>
          </span>
          <span className="text-sm font-bold" style={{ color: ORANGE }}>
            Read the checklist →
          </span>
        </Link>
      )}
    </>
  );
}

function SearchBar({ value, onChange, dark }: { value: string; onChange: (q: string) => void; dark?: boolean }) {
  return (
    <label className="mt-7 flex max-w-2xl items-center gap-3 rounded-full bg-white px-5 py-3.5 shadow-[0_10px_30px_rgba(9,42,77,0.12)]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dark ? GOLD : ORANGE} strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <span className="sr-only">Search by city, area, university, property name or postcode</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Where would you like to live?"
        className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[#092A4D]/45"
        style={{ color: NAVY }}
      />
    </label>
  );
}

function FilterPanel({
  f,
  set,
  onReset,
}: {
  f: Filters;
  set: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  onReset: () => void;
}) {
  const types = Object.keys(TYPE_LABEL) as PropertyType[];
  return (
    <div className="mt-4 rounded-3xl border border-[#092A4D]/10 bg-[#f9fbfd] p-5 sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Monthly rent">
          <div className="flex items-center gap-2">
            <NumberInput placeholder="Min €" value={f.minRent} onChange={(v) => set("minRent", v)} />
            <span aria-hidden="true">–</span>
            <NumberInput placeholder="Max €" value={f.maxRent} onChange={(v) => set("maxRent", v)} />
          </div>
        </Field>
        <Select label="Bedrooms" value={f.bedrooms} onChange={(v) => set("bedrooms", v as Filters["bedrooms"])} options={[["", "Any"], ["0", "Studio"], ["1", "1 bedroom"], ["2", "2 bedrooms"], ["3", "3 bedrooms"], ["4", "4+ bedrooms"]]} />
        <Select label="Bathrooms" value={f.bathrooms} onChange={(v) => set("bathrooms", v as Filters["bathrooms"])} options={[["", "Any"], ["1", "1"], ["2", "2"], ["3", "3+"]]} />
        <Select label="Bathroom type" value={f.bathroom} onChange={(v) => set("bathroom", v as Filters["bathroom"])} options={[["", "Any"], ["private", "Private"], ["shared", "Shared"]]} />
        <Select label="Kitchen" value={f.kitchen} onChange={(v) => set("kitchen", v as Filters["kitchen"])} options={[["", "Any"], ["private", "Private kitchen"], ["shared", "Shared kitchen"]]} />
        <Select label="Furnished" value={f.furnished} onChange={(v) => set("furnished", v as Filters["furnished"])} options={[["", "Any"], ["furnished", "Furnished"], ["part", "Part-furnished"], ["unfurnished", "Unfurnished"]]} />
        <Select label="Utilities" value={f.utilities} onChange={(v) => set("utilities", v as Filters["utilities"])} options={[["", "Any"], ["included", "Utilities included"], ["excluded", "Utilities not included"], ["partial", "Partially included"]]} />
        <Select label="University" value={f.university} onChange={(v) => set("university", v)} options={[["", "Any university"], ...UNIVERSITIES.map((u) => [u, u] as [string, string])]} />
        <Field label="Availability">
          <div className="flex flex-col gap-2">
            <select
              value={f.availability}
              onChange={(e) => set("availability", e.target.value as Filters["availability"])}
              className="rounded-xl border border-[#092A4D]/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#fd7933]"
            >
              <option value="">Any time</option>
              <option value="now">Available now</option>
              <option value="date">Select preferred move-in date</option>
            </select>
            {f.availability === "date" && (
              <input
                type="date"
                value={f.moveIn}
                onChange={(e) => set("moveIn", e.target.value)}
                className="rounded-xl border border-[#092A4D]/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#fd7933]"
              />
            )}
          </div>
        </Field>
        <Field label="Registration">
          <label className="flex min-h-[42px] cursor-pointer items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={f.registration}
              onChange={(e) => set("registration", e.target.checked)}
              className="size-4 accent-[#fd7933]"
            />
            Municipal registration possible
          </label>
        </Field>
      </div>

      <Field label="Property type" className="mt-5">
        <div className="flex flex-wrap gap-2">
          {types.map((type) => {
            const on = f.types.includes(type);
            return (
              <button
                key={type}
                type="button"
                aria-pressed={on}
                onClick={() => set("types", on ? f.types.filter((x) => x !== type) : [...f.types, type])}
                className={`rounded-full px-3.5 py-2 text-xs font-bold ring-1 transition-colors ${on ? "text-white ring-transparent" : "bg-white ring-[#092A4D]/15 hover:bg-[#092A4D]/5"}`}
                style={on ? { backgroundColor: NAVY } : undefined}
              >
                {TYPE_LABEL[type]}
              </button>
            );
          })}
        </div>
      </Field>

      <button type="button" onClick={onReset} className="mt-5 text-sm font-bold underline" style={{ color: ORANGE }}>
        Reset filters
      </button>
    </div>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="mb-1.5 text-xs font-bold uppercase tracking-wide" style={{ color: `${NAVY}99` }}>
        {label}
      </p>
      {children}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <Field label={label}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#092A4D]/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#fd7933]"
      >
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
    </Field>
  );
}

function NumberInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <input
      type="number"
      inputMode="numeric"
      min={0}
      step={50}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full min-w-0 rounded-xl border border-[#092A4D]/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#fd7933]"
    />
  );
}

// ---------------------------------------------------------------------------
// Filtering and sorting

function search(f: Filters, premiumOnly: boolean): Listing[] {
  const q = f.q.trim().toLowerCase();
  const today = new Date().toISOString().slice(0, 10);
  const min = f.minRent ? Number(f.minRent) : null;
  const max = f.maxRent ? Number(f.maxRent) : null;

  const matches = LISTINGS.filter((l) => {
    // Let properties leave search; saved ones stay reachable from Saved Listings.
    if (l.status === "let") return false;
    if (premiumOnly && l.tier !== "hubplus") return false;
    if (q) {
      const haystack = [l.title, l.city, l.area, l.postcode, ...l.universities.map((u) => u.university)].join(" ").toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (min !== null && l.rent < min) return false;
    if (max !== null && l.rent > max) return false;
    if (f.types.length && !f.types.includes(l.type)) return false;
    if (f.bedrooms && (f.bedrooms === "4" ? l.bedrooms < 4 : l.bedrooms !== Number(f.bedrooms))) return false;
    if (f.bathrooms && (f.bathrooms === "3" ? l.bathrooms < 3 : l.bathrooms !== Number(f.bathrooms))) return false;
    if (f.bathroom && l.bathroom !== f.bathroom) return false;
    if (f.kitchen && l.kitchen !== f.kitchen) return false;
    if (f.furnished && l.furnished !== f.furnished) return false;
    if (f.utilities && l.utilities !== f.utilities) return false;
    if (f.availability === "now" && (l.status !== "available" || (l.availableFrom ?? today) > today)) return false;
    if (f.availability === "date" && f.moveIn && (l.availableFrom ?? today) > f.moveIn) return false;
    if (f.registration && !l.registrationPossible) return false;
    if (f.university && !l.universities.some((u) => u.university === f.university)) return false;
    return true;
  });

  const distance = (l: Listing) => nearestUniversity(l, f.university || undefined)?.km ?? Infinity;
  const available = (l: Listing) => l.availableFrom ?? today;

  return [...matches].sort((a, b) => {
    switch (f.sort) {
      case "newest":
        return b.listedAt.localeCompare(a.listedAt);
      case "priceAsc":
        return a.rent - b.rent;
      case "priceDesc":
        return b.rent - a.rent;
      case "soonest":
        return available(a).localeCompare(available(b));
      case "distance":
        return distance(a) - distance(b);
      default:
        // Recommended: bookable before reserved, then closest to the chosen
        // university when one is picked, then newest.
        return (
          Number(a.status !== "available") - Number(b.status !== "available") ||
          (f.university ? distance(a) - distance(b) : 0) ||
          b.listedAt.localeCompare(a.listedAt)
        );
    }
  });
}

function countActive(f: Filters) {
  return [
    f.minRent,
    f.maxRent,
    f.types.length,
    f.bedrooms,
    f.bathrooms,
    f.bathroom,
    f.kitchen,
    f.furnished,
    f.utilities,
    f.availability,
    f.registration,
    f.university,
  ].filter(Boolean).length;
}

// ---------------------------------------------------------------------------
// Result card (section 2), with the locked non-member variant (section 10)

function ListingCard({ listing: l, university }: { listing: Listing; university?: string }) {
  const unlocked = useUnlocked(l);
  const premium = l.tier === "hubplus";
  const uni = nearestUniversity(l, university || undefined);
  const status = statusLabel(l);

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl bg-white transition-shadow hover:shadow-[0_16px_40px_rgba(9,42,77,0.14)] ${
        premium ? "ring-2 ring-[#c9a45c]/70" : "ring-1 ring-[#092A4D]/10"
      }`}
    >
      {/* Stretched link: the whole card opens the listing, while the heart and
          badge buttons above it stay separately clickable. */}
      <Link href={`${BASE}/${l.id}`} className="absolute inset-0 z-0" aria-label={`View ${l.title}`} />

      <div className="relative">
        <Photo listing={l} index={0} className="aspect-[4/3] w-full" />
        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
          {premium && <HubPlusBadge />}
        </div>
        <HeartButton id={l.id} className="absolute right-3 top-3 z-10" />
      </div>

      <div className={`flex flex-1 flex-col p-5 ${premium ? "bg-gradient-to-b from-[#fbf8f1] to-white" : ""}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-base font-extrabold leading-snug">{l.title}</h2>
            <p className="mt-0.5 text-sm" style={{ color: `${NAVY}99` }}>
              {l.city} · {l.area}
            </p>
          </div>
          <p className="shrink-0 text-right">
            <span className="block text-lg font-extrabold">{euro(l.rent)}</span>
            <span className="block text-[11px]" style={{ color: `${NAVY}80` }}>
              per month
            </span>
          </p>
        </div>

        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-xs" style={{ color: `${NAVY}B3` }}>
          <li className="font-semibold" style={{ color: NAVY }}>
            {TYPE_LABEL[l.type]}
          </li>
          {unlocked ? (
            <>
              <li>{bedroomsLabel(l)}</li>
              <li>
                {l.bathrooms} bath{l.bathrooms > 1 ? "s" : ""}
              </li>
              <li>{l.sizeM2} m²</li>
              <li>{FURNISHED_LABEL[l.furnished]}</li>
              <li>{UTILITIES_LABEL[l.utilities]}</li>
            </>
          ) : (
            <>
              <li className="relative z-10 flex items-center gap-1">
                Bedrooms <Locked />
              </li>
              <li className="relative z-10 flex items-center gap-1">
                Details <Locked />
              </li>
            </>
          )}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          {unlocked ? <StatusPill label={status} /> : (
            <span className="relative z-10 flex items-center gap-1 text-xs" style={{ color: `${NAVY}99` }}>
              Availability <Locked />
            </span>
          )}
          <span className="relative z-10">
            <VerifiedBadge />
          </span>
        </div>

        {unlocked && uni && (
          <p className="mt-3 border-t border-[#092A4D]/8 pt-3 text-xs" style={{ color: `${NAVY}99` }}>
            <span className="font-semibold" style={{ color: NAVY }}>
              {uni.university}
            </span>{" "}
            · {uni.km.toLocaleString("en-GB")} km
          </p>
        )}
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Saved listings (sections 8 and 17)

function SavedView() {
  const saved = useSaved();
  const listings = saved.ids.map((id) => LISTINGS.find((l) => l.id === id)).filter((l): l is Listing => Boolean(l));

  return (
    <div className="mt-8">
      <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: ORANGE }}>
        My Account
      </p>
      <h1 className="mt-2 text-[clamp(1.7rem,3.5vw,2.5rem)] font-extrabold tracking-tight">Saved Listings</h1>

      {!saved.loggedIn ? (
        <p className="mt-4 max-w-xl text-sm leading-relaxed" style={{ color: `${NAVY}B3` }}>
          Log in to see the properties you’ve saved. Tap the ❤️ on any listing to save it.
        </p>
      ) : listings.length === 0 ? (
        <div className="mt-6 rounded-3xl bg-[#f6f8fb] p-10 text-center">
          <p className="text-lg font-bold">No saved properties yet.</p>
          <p className="mt-1 text-sm" style={{ color: `${NAVY}99` }}>
            Tap the ❤️ on a listing to keep it here.
          </p>
          <Link href={BASE} className="mt-4 inline-flex rounded-full px-5 py-2.5 text-sm font-bold text-white" style={{ backgroundColor: ORANGE }}>
            Find accommodation
          </Link>
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {listings.map((l) => (
            <li key={l.id}>
              <SavedRow listing={l} onRemove={() => saved.toggle(l.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SavedRow({ listing: l, onRemove }: { listing: Listing; onRemove: () => void }) {
  const unlocked = useUnlocked(l);
  const gone = l.status === "let";
  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl bg-white p-3 sm:flex-row sm:items-center ${
        l.tier === "hubplus" ? "ring-2 ring-[#c9a45c]/60" : "ring-1 ring-[#092A4D]/10"
      } ${gone ? "opacity-75" : ""}`}
    >
      <Photo listing={l} index={0} className="aspect-[4/3] w-full shrink-0 rounded-xl sm:w-40" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {l.tier === "hubplus" ? <HubPlusBadge /> : <VerifiedBadge />}
          {gone ? (
            <StatusPill label="No longer available" />
          ) : unlocked ? (
            <StatusPill label={statusLabel(l)} />
          ) : (
            <span className="flex items-center gap-1 text-xs" style={{ color: `${NAVY}99` }}>
              Availability <Locked />
            </span>
          )}
        </div>
        <h2 className="mt-2 font-extrabold">{l.title}</h2>
        <p className="text-sm" style={{ color: `${NAVY}99` }}>
          {l.city} · <span className="font-bold" style={{ color: NAVY }}>{euro(l.rent)}</span> per month
        </p>
      </div>
      <div className="flex shrink-0 gap-2 sm:flex-col">
        <Link href={`${BASE}/${l.id}`} className="rounded-full px-4 py-2 text-center text-xs font-bold text-white" style={{ backgroundColor: NAVY }}>
          View Listing
        </Link>
        <button type="button" onClick={onRemove} className="rounded-full px-4 py-2 text-xs font-bold ring-1 ring-[#092A4D]/15 hover:bg-[#092A4D]/5">
          Remove from Saved
        </button>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Rent Safely (section 16)

const PRECAUTIONS = [
  ["See it before you pay", "View the property in person, or on a live video call where you choose what to see. Never pay to “reserve” a place you haven’t seen."],
  ["Get a written contract first", "Read the full tenancy agreement before paying anything. It should name the landlord, the address, the rent, the deposit and the notice period."],
  ["Check who can rent it out", "Ask for proof that the person you deal with owns the property or is authorised to let it. The Kadaster (land registry) shows who owns an address."],
  ["Confirm you can register", "Ask whether municipal registration (inschrijving) at the address is possible. You need it for your BSN, and some rooms don’t allow it."],
  ["Know the limits on costs", "For most tenancies the deposit can be at most two months’ basic rent, and an agent working for the landlord can’t also charge you agency fees."],
  ["Pay safely", "Pay by bank transfer to an account in the landlord’s or agency’s name. Be wary of cash, crypto, gift cards or money-transfer services."],
  ["Protect your documents", "Don’t send copies of your passport before you have a contract, and cover your photo and BSN on any copy you do share."],
  ["Trust the warning signs", "A price far below the area’s average, pressure to decide today or a landlord who is “abroad” and can’t show the property are common signs of fraud."],
] as const;

function RentSafely() {
  return (
    <div className="mt-8">
      <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: ORANGE }}>
        Rent Safely
      </p>
      <h1 className="mt-2 max-w-3xl text-[clamp(1.7rem,3.5vw,2.5rem)] font-extrabold leading-tight tracking-tight">
        Before you sign or send money
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: `${NAVY}B3` }}>
        Rental scams target students who are searching from abroad. These precautions apply to every property, including
        those listed on StudyNL.
      </p>
      <ol className="mt-7 grid gap-3 sm:grid-cols-2">
        {PRECAUTIONS.map(([title, body], i) => (
          <li key={title} className="flex gap-4 rounded-2xl bg-[#f6f8fb] p-5">
            <span className="grid size-8 shrink-0 place-items-center rounded-full text-sm font-extrabold text-white" style={{ backgroundColor: ORANGE }}>
              {i + 1}
            </span>
            <span>
              <span className="block font-extrabold">{title}</span>
              <span className="mt-1 block text-sm leading-relaxed" style={{ color: `${NAVY}B3` }}>
                {body}
              </span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed" style={{ color: `${NAVY}B3` }}>
        Something feel wrong about a listing on StudyNL? Use <strong>Report this listing</strong> on the property page.
        If you’ve already lost money, report it to the police and the{" "}
        <a href="https://www.fraudehelpdesk.nl/" target="_blank" rel="noopener noreferrer" className="font-semibold underline">
          Fraudehelpdesk
        </a>
        .
      </p>
      <Link href="/guides/avoid-scams" className="mt-4 inline-flex text-sm font-bold underline underline-offset-4" style={{ color: ORANGE }}>
        Read the full guide to avoiding scams →
      </Link>
    </div>
  );
}

function FilterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

