import Link from "next/link";

const NAVY = "#03294f";
const ORANGE = "#fd7933";
const AVATAR_BG = "#e8eafb";
const TAG_BG = "#ffe7d6";
const NOTICE_BG = "#fff1e2";
const NOTICE_BORDER = "#fbd6b3";

type Partner = {
  href: string;
  name: string;
  blurb: string;
};

const PARTNERS: Partner[] = [
  {
    href: "/partners/utility-direct",
    name: "Utility Direct",
    blurb: "Utilities setup for student rentals",
  },
  {
    href: "/partners/studielink",
    name: "Studielink",
    blurb: "Official Dutch enrolment portal",
  },
  {
    href: "/partners/feather",
    name: "Feather",
    blurb: "Student health & liability insurance",
  },
  {
    href: "/partners/hays",
    name: "Hays",
    blurb: "Part-time student work in NL",
  },
  {
    href: "/partners/babbel",
    name: "Babbel",
    blurb: "Practical Dutch for daily life",
  },
  {
    href: "/partners/revolut",
    name: "Revolut",
    blurb: "EU-friendly student banking",
  },
];

export function ApprovedPartners() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p
          className="text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ color: ORANGE }}
        >
          Approved Partners
        </p>
        <h2
          className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          style={{ color: NAVY }}
        >
          Trusted tools for one part of the move each.
        </h2>
        <p
          className="mt-4 max-w-xl text-sm leading-relaxed sm:text-base"
          style={{ color: `${NAVY}99` }}
        >
          We only recommend services we&apos;d use ourselves. Each partner
          solves one specific student problem — housing, banking, language,
          work, utilities or insurance — and is labelled as such.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((p) => (
            <PartnerCard key={p.href} partner={p} />
          ))}
        </div>

        <div
          className="mt-8 flex items-start gap-3 rounded-2xl px-5 py-4"
          style={{
            backgroundColor: NOTICE_BG,
            boxShadow: `inset 0 0 0 1px ${NOTICE_BORDER}`,
          }}
        >
          <span className="shrink-0" style={{ color: ORANGE }}>
            <AlertTriangleIcon />
          </span>
          <p className="text-sm" style={{ color: `${NAVY}cc` }}>
            Partner links are always labelled. If a recommendation has a
            commercial relationship, you&apos;ll see it on the card.
          </p>
        </div>
      </div>
    </section>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  const letter = partner.name.charAt(0);
  return (
    <Link
      href={partner.href}
      className="group flex items-center gap-4 rounded-2xl bg-white px-5 py-4 ring-1 ring-black/[0.06] shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)] hover:ring-black/10"
    >
      <span
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-base font-bold"
        style={{ backgroundColor: AVATAR_BG, color: NAVY }}
      >
        {letter}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold" style={{ color: NAVY }}>
          {partner.name}
        </h3>
        <p
          className="mt-0.5 text-xs leading-snug"
          style={{ color: `${NAVY}99` }}
        >
          {partner.blurb}
        </p>
      </div>
      <span
        className="shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
        style={{ backgroundColor: TAG_BG, color: ORANGE }}
      >
        Partner
      </span>
    </Link>
  );
}

function AlertTriangleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
