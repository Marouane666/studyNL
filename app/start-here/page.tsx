const NAVY = "#092A4D";
const ORANGE = "#fd7933";

type Stage = {
  step: number;
  title: string;
  blurb: string;
};

const STAGES: Stage[] = [
  {
    step: 1,
    title: "I'm exploring programs",
    blurb: "Understand routes, universities and application windows.",
  },
  {
    step: 2,
    title: "I'm applying now",
    blurb: "Plan documents, Studielink and enrolment deadlines.",
  },
  {
    step: 3,
    title: "I've been accepted",
    blurb: "Handle housing, money, visa and insurance tasks.",
  },
  {
    step: 4,
    title: "I'm arriving soon",
    blurb: "Prepare BSN, city registration and arrival week.",
  },
];

export default function StartHerePage() {
  return (
    <section className="bg-white" style={{ color: NAVY }}>
      <div className="mx-auto max-w-7xl px-6 py-20">
        <span
          className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold ring-1 ring-[#092A4D]/10"
          style={{ color: NAVY }}
        >
          Start Here
        </span>

        <h1
          className="mt-8 max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
          style={{ color: NAVY }}
        >
          Get your personal move plan.
        </h1>

        <p
          className="mt-8 max-w-xl text-base leading-relaxed"
          style={{ color: `${NAVY}99` }}
        >
          Choose where you are in the process and get the right checklist,
          deadlines and guides.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stage) => (
            <StageCard key={stage.step} stage={stage} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StageCard({ stage }: { stage: Stage }) {
  return (
    <div className="flex min-h-[230px] flex-col rounded-2xl bg-[#f6f8fb] px-6 py-6 ring-1 ring-[#092A4D]/5">
      <span
        className="inline-flex size-9 items-center justify-center rounded-full text-sm font-bold"
        style={{ backgroundColor: `${ORANGE}26`, color: ORANGE }}
      >
        {stage.step}
      </span>

      <h3
        className="mt-12 text-lg font-bold leading-snug"
        style={{ color: NAVY }}
      >
        {stage.title}
      </h3>

      <p
        className="mt-3 text-sm leading-relaxed"
        style={{ color: `${NAVY}99` }}
      >
        {stage.blurb}
      </p>
    </div>
  );
}
