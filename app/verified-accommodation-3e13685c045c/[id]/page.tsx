"use client";

// A single property (sections 3–8 and 10–16 of the brief). Hub Plus listings
// show a limited preview to non-members, with the rest locked behind the
// upgrade panel, and unlock completely for an active member.

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  type Listing,
  FURNISHED_LABEL,
  TYPE_LABEL,
  bedroomsLabel,
  euro,
  formatDate,
  getListing,
  statusLabel,
} from "../data";
import {
  BASE,
  GOLD,
  GOLD_SOFT,
  GOLD_TEXT,
  HeartButton,
  HubPlusBadge,
  Locked,
  LockIcon,
  Modal,
  NAVY,
  NAVY_DEEP,
  ORANGE,
  Photo,
  StatusPill,
  SubNav,
  UpgradePanel,
  VerifiedBadge,
  recordEvent,
  useUnlocked,
} from "../ui";

export default function ListingPage() {
  const { id } = useParams<{ id: string }>();
  const listing = getListing(id);

  if (!listing) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-20 text-center" style={{ color: NAVY }}>
        <h1 className="text-2xl font-extrabold">This property can’t be found.</h1>
        <Link href={BASE} className="mt-4 inline-flex text-sm font-bold underline" style={{ color: ORANGE }}>
          Back to Verified Accommodation
        </Link>
      </section>
    );
  }
  return <ListingView listing={listing} />;
}

function ListingView({ listing: l }: { listing: Listing }) {
  const unlocked = useUnlocked(l);
  const premium = l.tier === "hubplus";
  const gone = l.status === "let";
  const [upgrade, setUpgrade] = useState(false);
  const lock = () => setUpgrade(true);

  return (
    <section className={premium ? "bg-[#fbf9f5]" : "bg-white"} style={{ color: NAVY }}>
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-8">
        <SubNav active={null} />
        <Link
          href={premium ? `${BASE}?view=premium` : BASE}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold"
          style={{ color: `${NAVY}99` }}
        >
          ← Back to results
        </Link>

        {gone && (
          <div className="mt-4 rounded-2xl bg-[#fdecec] px-5 py-4 text-sm font-semibold text-[#b42318]">
            No Longer Available. This property has been let and can no longer be enquired about.
          </div>
        )}

        <Gallery listing={l} unlocked={unlocked} onLocked={lock} />

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            {/* Title block */}
            <div className="flex flex-wrap items-center gap-2">
              {premium && <HubPlusBadge />}
              <VerifiedBadge />
              {unlocked && <StatusPill label={statusLabel(l)} />}
            </div>
            <div className="mt-3 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-extrabold leading-tight tracking-tight">{l.title}</h1>
                <p className="mt-1 text-sm sm:text-base" style={{ color: `${NAVY}99` }}>
                  {TYPE_LABEL[l.type]} · {l.city}, {l.area}
                  {unlocked && ` · ${l.postcode}`}
                </p>
              </div>
              <HeartButton id={l.id} className="shrink-0 ring-1 ring-[#092A4D]/10" />
            </div>

            {/* Essential information */}
            <Section title="Essential information">
              <dl className="grid gap-x-8 sm:grid-cols-2">
                <Row label="Monthly rent" value={euro(l.rent)} strong />
                <Row label="Deposit" value={euro(l.deposit)} locked={!unlocked} onLocked={lock} />
                <Row label="Property type" value={TYPE_LABEL[l.type]} />
                <Row label="Bedrooms" value={bedroomsLabel(l)} locked={!unlocked} onLocked={lock} />
                <Row label="Bathrooms" value={String(l.bathrooms)} locked={!unlocked} onLocked={lock} />
                <Row label="Bathroom" value={cap(l.bathroom)} locked={!unlocked} onLocked={lock} />
                <Row label="Kitchen" value={cap(l.kitchen)} locked={!unlocked} onLocked={lock} />
                <Row
                  label="Property size"
                  value={`${l.sizeM2} m² / ${Math.round(l.sizeM2 * 10.764)} sq ft`}
                  locked={!unlocked}
                  onLocked={lock}
                />
                <Row label="Furnished" value={FURNISHED_LABEL[l.furnished]} locked={!unlocked} onLocked={lock} />
                <Row label="Utilities" value={utilitiesText(l)} locked={!unlocked} onLocked={lock} />
                <Row
                  label="Available from"
                  value={l.availableFrom ? formatDate(l.availableFrom) : "Available now"}
                  locked={!unlocked}
                  onLocked={lock}
                />
                <Row label="Minimum tenancy" value={`${l.minTenancyMonths} months`} locked={!unlocked} onLocked={lock} />
                <Row
                  label="Municipal registration"
                  value={l.registrationPossible ? "Possible" : "Not possible"}
                  locked={!unlocked}
                  onLocked={lock}
                  warn={!l.registrationPossible}
                />
                <Row label="Guarantor required" value={l.guarantorRequired ? "Yes" : "No"} locked={!unlocked} onLocked={lock} />
                <Row label="Additional fees" value={l.adminFees ? euro(l.adminFees) : "None"} locked={!unlocked} onLocked={lock} />
              </dl>
            </Section>

            {/* Costs */}
            <Section title="What you’ll pay">
              {unlocked ? <Costs listing={l} /> : <LockedBlock label="Full price information" onClick={lock} />}
            </Section>

            {/* Description */}
            <Section title="About this property">
              {unlocked ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  {l.description.map((block) => (
                    <div key={block.heading}>
                      <h3 className="text-sm font-extrabold">{block.heading}</h3>
                      <ul className="mt-2 flex flex-col gap-1.5 text-sm leading-relaxed" style={{ color: `${NAVY}B3` }}>
                        {block.points.map((point) => (
                          <li key={point} className="flex gap-2">
                            <span aria-hidden="true" style={{ color: premium ? GOLD : ORANGE }}>•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-sm leading-relaxed" style={{ color: `${NAVY}B3` }}>
                    {l.description[0]?.points[0]}
                  </p>
                  <LockedBlock label="Full property details" onClick={lock} className="mt-4" />
                </>
              )}
            </Section>

            {/* House rules */}
            {unlocked && <Rules listing={l} />}

            {/* Location */}
            <Section title="Location & universities">
              {unlocked ? <Location listing={l} /> : <LockedBlock label="Exact location" onClick={lock} />}
            </Section>

            <ReportListing listing={l} />
          </div>

          {/* Contact column */}
          <aside className="lg:sticky lg:top-6 lg:self-start">
            {premium && !unlocked ? (
              <UpgradePanel compact />
            ) : (
              <ContactCard listing={l} disabled={gone} />
            )}
            <Link
              href={`${BASE}?view=safety`}
              className="mt-4 block rounded-2xl bg-[#fff4ec] px-5 py-4 text-sm"
            >
              <span className="block font-extrabold">Rent safely</span>
              <span className="mt-0.5 block" style={{ color: `${NAVY}B3` }}>
                Never pay before you’ve seen the property and signed a written contract.
              </span>
            </Link>
          </aside>
        </div>
      </div>

      {upgrade && (
        <Modal onClose={() => setUpgrade(false)}>
          <div className="-m-6">
            <UpgradePanel />
          </div>
        </Modal>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------

function Gallery({ listing: l, unlocked, onLocked }: { listing: Listing; unlocked: boolean; onLocked: () => void }) {
  const [current, setCurrent] = useState(0);
  const media = [l.floorPlan && "Floor plan", l.videoTour && "Video tour", l.virtualTour && "Virtual tour"].filter(
    (m): m is string => Boolean(m),
  );

  return (
    <div className="mt-5">
      <div className="relative overflow-hidden rounded-3xl">
        <Photo listing={l} index={current} className="aspect-[16/9] w-full sm:aspect-[21/9]" />
        {unlocked && l.photos > 1 && (
          <>
            <GalleryArrow side="left" onClick={() => setCurrent((c) => (c - 1 + l.photos) % l.photos)} />
            <GalleryArrow side="right" onClick={() => setCurrent((c) => (c + 1) % l.photos)} />
          </>
        )}
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {Array.from({ length: l.photos }, (_, i) =>
          unlocked || i === 0 ? (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={current === i}
              className={`shrink-0 overflow-hidden rounded-xl ring-2 ${current === i ? "ring-[#fd7933]" : "ring-transparent"}`}
            >
              <Photo listing={l} index={i} className="h-16 w-24" />
            </button>
          ) : (
            <button
              key={i}
              type="button"
              onClick={onLocked}
              aria-label="Full gallery: Hub Plus"
              className="relative shrink-0 overflow-hidden rounded-xl"
            >
              <Photo listing={l} index={i} className="h-16 w-24" blurred />
              <span className="absolute inset-0 grid place-items-center bg-[#061b33]/55 text-white">
                <LockIcon size={14} />
              </span>
            </button>
          ),
        )}
      </div>

      {media.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {media.map((m) =>
            unlocked ? (
              <span key={m} className="rounded-full bg-[#eef5fb] px-3 py-1.5 text-xs font-bold text-[#1d5d91]">
                {m}
              </span>
            ) : (
              <button
                key={m}
                type="button"
                onClick={onLocked}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
                style={{ backgroundColor: GOLD_SOFT, color: GOLD_TEXT }}
              >
                <LockIcon /> {m}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}

function GalleryArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-lg font-bold shadow ${side === "left" ? "left-3" : "right-3"}`}
      style={{ color: NAVY }}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <h2 className="text-lg font-extrabold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Row({
  label,
  value,
  locked,
  onLocked,
  strong,
  warn,
}: {
  label: string;
  value: string;
  locked?: boolean;
  onLocked?: () => void;
  strong?: boolean;
  warn?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#092A4D]/8 py-2.5 text-sm">
      <dt style={{ color: `${NAVY}99` }}>{label}</dt>
      <dd className={`text-right ${strong ? "text-base font-extrabold" : "font-semibold"} ${warn ? "text-[#b42318]" : ""}`}>
        {locked ? <Locked onClick={onLocked} /> : value}
      </dd>
    </div>
  );
}

function LockedBlock({ label, onClick, className = "" }: { label: string; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#c9a45c]/60 px-6 py-8 ${className}`}
      style={{ backgroundColor: GOLD_SOFT }}
    >
      {/* Stand-in lines under a blur, so it reads as hidden content rather than empty space. */}
      <span className="absolute inset-0 flex flex-col justify-center gap-2 px-8 opacity-40 blur-[3px]" aria-hidden="true">
        <span className="h-2.5 w-3/4 rounded bg-[#8a6a2b]" />
        <span className="h-2.5 w-1/2 rounded bg-[#8a6a2b]" />
        <span className="h-2.5 w-2/3 rounded bg-[#8a6a2b]" />
      </span>
      <span className="relative inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold shadow-sm" style={{ color: GOLD_TEXT }}>
        <LockIcon size={13} /> {label}: Hub Plus
      </span>
    </button>
  );
}

function Costs({ listing: l }: { listing: Listing }) {
  // Kept as separate lines on purpose (section 14): students new to Dutch
  // renting often can't tell which costs come on top of the rent.
  const monthly = l.rent + (l.utilitiesCost ?? 0) + (l.serviceCharges ?? 0);
  const upfront = l.deposit + (l.adminFees ?? 0) + monthly;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl bg-[#f6f8fb] p-5">
        <p className="text-xs font-bold uppercase tracking-wide" style={{ color: `${NAVY}99` }}>
          Every month
        </p>
        <dl className="mt-2">
          <CostLine label="Monthly rent" value={euro(l.rent)} />
          <CostLine label="Utilities" value={l.utilities === "included" ? "Included" : l.utilitiesCost ? `${euro(l.utilitiesCost)} per month` : "Not included"} />
          <CostLine label="Service charges" value={l.serviceCharges ? euro(l.serviceCharges) : "None"} />
          <CostLine label="Estimated monthly total" value={euro(monthly)} total />
        </dl>
      </div>
      <div className="rounded-2xl bg-[#f6f8fb] p-5">
        <p className="text-xs font-bold uppercase tracking-wide" style={{ color: `${NAVY}99` }}>
          Before you move in
        </p>
        <dl className="mt-2">
          <CostLine label="Deposit" value={euro(l.deposit)} />
          <CostLine label="Administration / other fees" value={l.adminFees ? euro(l.adminFees) : "None"} />
          <CostLine label="First month" value={euro(monthly)} />
          <CostLine label="Estimated upfront total" value={euro(upfront)} total />
        </dl>
      </div>
      <p className="text-xs leading-relaxed sm:col-span-2" style={{ color: `${NAVY}80` }}>
        As supplied by the accommodation provider. Confirm every amount in the written contract before paying.
      </p>
    </div>
  );
}

function CostLine({ label, value, total }: { label: string; value: string; total?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 py-1.5 text-sm ${total ? "mt-1 border-t border-[#092A4D]/10 pt-2.5 font-extrabold" : ""}`}>
      <dt style={total ? undefined : { color: `${NAVY}B3` }}>{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}

function Rules({ listing: l }: { listing: Listing }) {
  const r = l.rules;
  const items: [string, string][] = [];
  const yn = (v: boolean | undefined) => (v === undefined ? null : v ? "Yes" : "No");
  const push = (label: string, value: string | null | undefined) => value && items.push([label, value]);
  push("Couples permitted", yn(r.couples));
  push("Students only", yn(r.studentsOnly));
  push("Pets permitted", yn(r.pets));
  push("Smoking", r.smoking === undefined ? null : r.smoking ? "Permitted" : "Not permitted");
  push("Energy rating", r.energyLabel);
  push("Maximum occupancy", r.maxOccupancy ? String(r.maxOccupancy) : null);
  push("Income requirements", r.incomeRequirement);
  push("Guarantor requirements", l.guarantorRequired ? "A guarantor is required" : "No guarantor needed");
  if (!items.length) return null;

  return (
    <Section title="Good to know">
      <dl className="grid gap-x-8 sm:grid-cols-2">
        {items.map(([label, value]) => (
          <Row key={label} label={label} value={value} />
        ))}
      </dl>
    </Section>
  );
}

function Location({ listing: l }: { listing: Listing }) {
  // Approximate listings get a wider map with no pin, so the building can't be
  // picked out (section 5: security or landlord preference).
  const d = l.approximateLocation ? 0.012 : 0.006;
  const bbox = [l.lng - d, l.lat - d * 0.6, l.lng + d, l.lat + d * 0.6].join(",");
  const marker = l.approximateLocation ? "" : `&marker=${l.lat},${l.lng}`;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div>
        <iframe
          title={`Map of ${l.area}, ${l.city}`}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik${marker}`}
          className="aspect-[4/3] w-full rounded-2xl border-0 ring-1 ring-[#092A4D]/10"
          loading="lazy"
        />
        <p className="mt-2 text-xs" style={{ color: `${NAVY}80` }}>
          {l.approximateLocation
            ? `Approximate location in ${l.area}, ${l.postcode}. The exact address is shared by the provider.`
            : `${l.area}, ${l.postcode} ${l.city}`}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-extrabold">Nearest universities</h3>
          <ul className="mt-2 flex flex-col gap-2">
            {l.universities.map((u) => (
              <li key={u.university} className="rounded-xl bg-[#f6f8fb] px-4 py-3 text-sm">
                <span className="block font-bold">{u.university}</span>
                <span style={{ color: `${NAVY}99` }}>
                  {u.km.toLocaleString("en-GB")} km · about {u.transitMin} min by public transport
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-extrabold">Transport</h3>
          <ul className="mt-2 flex flex-col gap-1 text-sm" style={{ color: `${NAVY}B3` }}>
            {l.transport.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Contact (sections 7 and 13)

function ContactCard({ listing: l, disabled }: { listing: Listing; disabled: boolean }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const premium = l.tier === "hubplus";

  function reveal() {
    setOpen(true);
    recordEvent("accommodation_contact_reveal", { listing_id: l.id, tier: l.tier });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(l.contact.email);
      setCopied(true);
      recordEvent("accommodation_contact_copy", { listing_id: l.id, tier: l.tier });
    } catch {
      // Clipboard blocked: the address is on screen to copy by hand.
    }
  }

  return (
    <div
      className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(9,42,77,0.08)]"
      style={premium ? { boxShadow: `0 0 0 2px ${GOLD}66, 0 10px 30px rgba(9,42,77,0.08)` } : undefined}
    >
      <p className="text-2xl font-extrabold">
        {euro(l.rent)} <span className="text-sm font-semibold" style={{ color: `${NAVY}80` }}>per month</span>
      </p>
      <p className="mt-1 text-sm" style={{ color: `${NAVY}99` }}>
        {statusLabel(l)}
      </p>

      {!open ? (
        <button
          type="button"
          disabled={disabled}
          onClick={reveal}
          className="mt-5 w-full rounded-full px-6 py-3.5 text-sm font-extrabold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          style={premium ? { backgroundColor: GOLD, color: NAVY_DEEP } : { backgroundColor: ORANGE, color: "#fff" }}
        >
          Contact Landlord / Agent
        </button>
      ) : (
        <div className="mt-5 rounded-2xl bg-[#f6f8fb] p-4">
          <p className="text-sm font-extrabold">Contact this accommodation provider</p>
          <p className="mt-0.5 text-xs" style={{ color: `${NAVY}99` }}>
            {l.contact.name}
          </p>
          <p className="mt-3 break-all text-sm">
            <span style={{ color: `${NAVY}99` }}>Email: </span>
            <a href={`mailto:${l.contact.email}`} className="font-semibold underline">
              {l.contact.email}
            </a>
          </p>
          {/* The telephone number is the Hub Plus extra (section 13). */}
          {premium && (
            <p className="mt-1.5 text-sm">
              <span style={{ color: `${NAVY}99` }}>Telephone: </span>
              <span className="font-semibold">{l.contact.phone}</span>
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={`mailto:${l.contact.email}`}
              onClick={() => recordEvent("accommodation_contact_email", { listing_id: l.id, tier: l.tier })}
              className="rounded-full px-4 py-2 text-xs font-bold text-white"
              style={{ backgroundColor: NAVY }}
            >
              Email
            </a>
            <button type="button" onClick={copy} className="rounded-full px-4 py-2 text-xs font-bold ring-1 ring-[#092A4D]/15 hover:bg-white">
              {copied ? "Copied ✓" : "Copy Email"}
            </button>
            {premium && (
              <a
                href={`tel:${l.contact.phone.replace(/\s+/g, "")}`}
                onClick={() => recordEvent("accommodation_contact_call", { listing_id: l.id, tier: l.tier })}
                className="rounded-full px-4 py-2 text-xs font-bold"
                style={{ backgroundColor: GOLD, color: NAVY_DEEP }}
              >
                Call
              </a>
            )}
          </div>
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed" style={{ color: `${NAVY}80` }}>
        {premium
          ? "As a Hub Plus member you can reach this provider by email or telephone."
          : "You’ll get the provider’s verified email address. Hub Plus members also get a direct telephone number."}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Reporting (section 16)

const REPORT_REASONS = [
  "Suspected fraud",
  "Incorrect information",
  "Misleading photographs",
  "Property no longer available",
  "Incorrect pricing",
  "Inappropriate landlord/agent behaviour",
  "Other issue",
];

function ReportListing({ listing: l }: { listing: Listing }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);

  function close() {
    setOpen(false);
    setSent(false);
    setReason("");
    setDetails("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-10 inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4"
        style={{ color: `${NAVY}99` }}
      >
        <span aria-hidden="true">⚑</span> Report this listing
      </button>

      {open && (
        <Modal onClose={close}>
          {sent ? (
            <>
              <h2 className="text-lg font-extrabold" style={{ color: NAVY }}>
                Thanks for letting us know
              </h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: `${NAVY}A6` }}>
                Our team reviews every report. If you think you’ve been scammed, also contact the police.
              </p>
              <button type="button" onClick={close} className="mt-5 rounded-full px-5 py-2.5 text-sm font-bold text-white" style={{ backgroundColor: NAVY }}>
                Close
              </button>
            </>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Preview: nothing is sent yet. Reports need a listing_reports
                // table (listing_id, reason, details, reporter) and a moderator view.
                recordEvent("accommodation_report", { listing_id: l.id, reason });
                setSent(true);
              }}
            >
              <h2 className="text-lg font-extrabold" style={{ color: NAVY }}>
                Report this listing
              </h2>
              <p className="mt-1 text-sm" style={{ color: `${NAVY}A6` }}>
                {l.title}
              </p>
              <fieldset className="mt-4 flex flex-col gap-2">
                <legend className="sr-only">Reason</legend>
                {REPORT_REASONS.map((r) => (
                  <label key={r} className="flex cursor-pointer items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 text-sm" style={{ color: NAVY }}>
                    <input type="radio" name="reason" required value={r} checked={reason === r} onChange={() => setReason(r)} className="accent-[#fd7933]" />
                    {r}
                  </label>
                ))}
              </fieldset>
              <label className="mt-4 block text-xs font-bold" style={{ color: NAVY }}>
                Details (optional)
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={3}
                  maxLength={1000}
                  className="mt-1.5 w-full rounded-xl bg-white px-3.5 py-2.5 text-sm font-normal outline-none ring-1 ring-[#092A4D]/10 focus:ring-2 focus:ring-[#fd7933]/50"
                />
              </label>
              <button type="submit" className="mt-4 w-full rounded-full px-5 py-3 text-sm font-bold text-white" style={{ backgroundColor: ORANGE }}>
                Send report
              </button>
            </form>
          )}
        </Modal>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function utilitiesText(l: Listing) {
  if (l.utilities === "included") return "Included";
  if (l.utilities === "partial") return l.utilitiesCost ? `Partially included (${euro(l.utilitiesCost)}/month extra)` : "Partially included";
  return l.utilitiesCost ? `Not included (about ${euro(l.utilitiesCost)}/month)` : "Not included";
}
