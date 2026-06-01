import Link from "next/link";

const NAVY = "#03294f";
const ORANGE = "#fd7933";

type Step = {
  number: string;
  title: string;
  blurb: string;
};

const STEPS: Step[] = [
  {
    number: "1",
    title: "Study route",
    blurb:
      "Choose the right degree type, university path and application window before comparing cities.",
  },
  {
    number: "2",
    title: "Money & deadlines",
    blurb:
      "Plan tuition, scholarships, monthly costs and the dates that can block your move.",
  },
  {
    number: "3",
    title: "Housing safety",
    blurb:
      "Check rental red flags, deposits, contracts and safe next steps before you pay.",
  },
  {
    number: "4",
    title: "Documents",
    blurb:
      "Prepare enrolment, visa, BSN, insurance and arrival documents in the right order.",
  },
];

export function MovePlan() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div
            className="rounded-[2.5rem] px-4 py-8 sm:px-5 sm:py-10"
            style={{
              background:
                "linear-gradient(135deg, #fde0d0 0%, #f5e6f0 50%, #d8e0f5 100%)",
            }}
          >
            <div className="flex h-full flex-col rounded-[2rem] bg-white p-8 sm:p-10">
              <div className="flex items-start justify-between">
                <span
                  className="inline-flex size-12 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: NAVY }}
                >
                  <ArrowUpRightIcon />
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-semibold ring-1 ring-[#03294f]/10"
                    style={{ color: NAVY }}
                  >
                    Move plan
                  </span>
                  <span
                    className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-semibold ring-1 ring-[#03294f]/10"
                    style={{ color: NAVY }}
                  >
                    2025
                  </span>
                </div>
              </div>

              <h3
                className="mt-16 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl"
                style={{ color: NAVY }}
              >
                5 steps to
                <br />
                arrive ready
              </h3>

              <p
                className="mt-5 max-w-sm text-sm leading-relaxed"
                style={{ color: `${NAVY}80` }}
              >
                We organize every important student decision into one clear
                path, from choosing a study route to settling in safely.
              </p>

              <Link
                href="/plan"
                className="mt-8 inline-flex w-fit items-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: NAVY }}
              >
                Build my checklist
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <span
              className="inline-flex w-fit items-center rounded-full bg-white px-4 py-1.5 text-xs font-medium ring-1 ring-[#03294f]/10"
              style={{ color: NAVY }}
            >
              Guided path
            </span>

            <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
              <h2
                className="text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl"
                style={{ color: NAVY }}
              >
                A guided path,
                <br />
                not a pile of links.
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: `${NAVY}80` }}
              >
                Students usually arrive with anxiety: which university, where
                to live, how much money, what documents and what to do first.
                This turns the website into a sequence.
              </p>
            </div>

            <ol className="mt-6 flex flex-col gap-3">
              {STEPS.map((s) => (
                <StepRow key={s.number} step={s} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepRow({ step }: { step: Step }) {
  return (
    <li className="group flex items-center gap-5 rounded-2xl border border-[#03294f]/10 bg-white px-5 py-4 transition-colors duration-200 hover:border-[#fd7933]/30 hover:bg-[#fff4ec]">
      <span
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: ORANGE }}
      >
        {step.number}
      </span>
      <div className="min-w-0 flex-1 grid gap-1 sm:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] sm:items-center sm:gap-6">
        <h3
          className="text-sm font-bold sm:text-base"
          style={{ color: NAVY }}
        >
          {step.title}
        </h3>
        <p
          className="text-xs leading-relaxed sm:text-sm"
          style={{ color: `${NAVY}80` }}
        >
          {step.blurb}
        </p>
      </div>
      <span
        className="shrink-0 text-[#03294f]/40 transition-colors duration-200 group-hover:text-[#fd7933]"
      >
        <ArrowRightIcon />
      </span>
    </li>
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

function ArrowRightIcon() {
  return (
    <Svg width={18} height={18}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </Svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <Svg width={20} height={20}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Svg>
  );
}
