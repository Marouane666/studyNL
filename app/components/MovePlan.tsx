import Link from "next/link";

const NAVY = "#03294f";
const ORANGE = "#fd7933";
const STEP_BG = "#0a3866";
const STEP_BORDER = "#13476f";

type Step = {
  number: string;
  title: string;
  blurb: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Choose your study route",
    blurb: "Research vs applied uni, English-taught programmes, numerus fixus.",
  },
  {
    number: "02",
    title: "Check money & deadlines",
    blurb: "Tuition tiers, scholarships, DUO loans, monthly budget per city.",
  },
  {
    number: "03",
    title: "Secure housing safely",
    blurb: "Verified routes, contracts, deposit rules — and red flags.",
  },
  {
    number: "04",
    title: "Prepare documents",
    blurb: "Diplomas, visa/MVV, insurance, translations and apostilles.",
  },
  {
    number: "05",
    title: "Land and settle in",
    blurb: "BSN, bank, GP, gemeente registration, OV-chipkaart, SIM.",
  },
];

export function MovePlan() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div
          className="rounded-3xl px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-20"
          style={{ backgroundColor: NAVY }}
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/85"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              >
                <CompassIcon />
                The Move Plan
              </span>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                A guided path,
                <br />
                not a pile of links.
              </h2>

              <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
                Each step unlocks the next. Skip ahead and you&apos;ll trip on
                a deadline, a deposit, or a document you didn&apos;t know you
                needed.
              </p>

              <Link
                href="/plan"
                className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: ORANGE }}
              >
                Build my plan
                <ArrowRightIcon />
              </Link>
            </div>

            <ol className="flex flex-col gap-3">
              {STEPS.map((s) => (
                <li
                  key={s.number}
                  className="flex items-center gap-5 rounded-2xl px-5 py-4"
                  style={{
                    backgroundColor: STEP_BG,
                    boxShadow: `inset 0 0 0 1px ${STEP_BORDER}`,
                  }}
                >
                  <span
                    className="text-xl font-bold tabular-nums"
                    style={{ color: ORANGE }}
                  >
                    {s.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-white sm:text-base">
                      {s.title}
                    </h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/60 sm:text-sm">
                      {s.blurb}
                    </p>
                  </div>
                  <span className="shrink-0 text-white/40">
                    <CheckCircleIcon />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Svg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

function CompassIcon() {
  return (
    <Svg width={14} height={14}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </Svg>
  );
}
function ArrowRightIcon() {
  return (
    <Svg width={16} height={16}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </Svg>
  );
}
function CheckCircleIcon() {
  return (
    <Svg width={20} height={20}>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  );
}
