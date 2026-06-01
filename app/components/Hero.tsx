import Image from "next/image";
import Link from "next/link";

const NAVY = "#03294f";
const ORANGE = "#fd7933";

export function Hero() {
  return (
    <section className="bg-white px-4 pb-12 pt-4 sm:px-6 lg:px-8">
      <div
        className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20"
        style={{
          background:
            "linear-gradient(135deg, #fde0d0 0%, #f9d5d8 50%, #e8c8e8 100%)",
        }}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <span
              className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-medium shadow-[0_1px_3px_rgba(3,41,79,0.06)]"
              style={{ color: NAVY }}
            >
              + Your guide to studying in NL
            </span>

            <h1
              className="mt-6 text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight"
              style={{ color: NAVY }}
            >
              Your clear route to studying in the Netherlands.
            </h1>

            <p
              className="mt-6 max-w-xl text-base leading-relaxed"
              style={{ color: `${NAVY}99` }}
            >
              Make the big decisions in the right order: study route,
              enrolment, housing, money, work rules and arrival tasks.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/start"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#e96a25]"
                style={{ backgroundColor: ORANGE }}
              >
                Start your move
                <ArrowRightIcon />
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold shadow-[0_1px_3px_rgba(3,41,79,0.06)] transition-shadow hover:shadow-[0_2px_8px_rgba(3,41,79,0.1)]"
                style={{ color: NAVY }}
              >
                Browse guides
              </Link>
            </div>

            <div
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold"
              style={{ color: ORANGE }}
            >
              <span className="inline-flex items-center gap-1.5">
                <CheckIcon />
                Enrolment explained
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckIcon />
                Housing safety
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckIcon />
                Arrival planning
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/hero/hero.png"
                alt="Students studying together"
                width={720}
                height={520}
                className="h-auto w-full object-cover"
                priority
              />
            </div>

            <FloatingCard
              className="absolute left-4 top-6 sm:left-6 sm:top-8"
              label="Scholarship deadlines"
              value="12 open"
            />
            <FloatingCard
              className="absolute right-2 top-1/3 sm:right-4"
              label="Housing scam check"
              value="Safe first"
            />
            <FloatingCard
              className="absolute bottom-6 left-4 sm:bottom-8 sm:left-6"
              label="Arrival checklist"
              value="30 days"
            />

            <span
              className="absolute bottom-6 right-4 inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md sm:bottom-8 sm:right-6"
              style={{ backgroundColor: ORANGE }}
            >
              Start-ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  className,
  label,
  value,
}: {
  className?: string;
  label: string;
  value: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-white px-4 py-2.5 shadow-[0_4px_14px_rgba(3,41,79,0.12)] ${className ?? ""}`}
    >
      <div className="text-[10px] font-medium tracking-wide text-[#03294f]/60">
        {label}
      </div>
      <div className="text-sm font-bold text-[#03294f]">{value}</div>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}
