const NAVY = "#092A4D";

type Feature = {
  title: string;
  blurb: string;
};

const FEATURES: Feature[] = [
  {
    title: "Verified housing route",
    blurb: "Reduce the risk around your housing search.",
  },
  {
    title: "Priority Q&A",
    blurb: "Ask specific questions and get guided support.",
  },
  {
    title: "Arrival templates",
    blurb: "Use ready-made checklists and planning tools.",
  },
];

export default function HubPlusPage() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <span
          className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold ring-1 ring-[#092A4D]/10"
          style={{ color: NAVY }}
        >
          Hub Plus
        </span>

        <div
          className="mt-8 rounded-3xl px-10 py-14 sm:px-16 sm:py-20"
          style={{ backgroundColor: NAVY }}
        >
          <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Premium support for students who want fewer unknowns.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70">
            Get verified resources, priority support, arrival templates and
            partner guidance in one place.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} feature={f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="flex min-h-[130px] flex-col justify-start rounded-2xl bg-white px-6 py-6">
      <h3
        className="text-lg font-bold leading-snug"
        style={{ color: NAVY }}
      >
        {feature.title}
      </h3>
      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: `${NAVY}99` }}
      >
        {feature.blurb}
      </p>
    </div>
  );
}
