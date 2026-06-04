const NAVY = "#092A4D";

type Value = {
  category: string;
  title: string;
  blurb: string;
};

const VALUES: Value[] = [
  {
    category: "Promise",
    title: "Advice written for international students",
    blurb: "Plain language, real decisions and clear next steps.",
  },
  {
    category: "Safety",
    title: "Clear warnings around housing and payments",
    blurb: "Students see risks before they send money or documents.",
  },
  {
    category: "Trust",
    title: "Partner offers labelled clearly",
    blurb: "Support options are presented with transparency.",
  },
];

export default function AboutPage() {
  return (
    <section className="bg-white" style={{ color: NAVY }}>
      <div className="mx-auto max-w-7xl px-6 py-20">
        <span
          className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold ring-1 ring-[#092A4D]/10"
          style={{ color: NAVY }}
        >
          About StudyNL
        </span>

        <h1
          className="mt-8 max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
          style={{ color: NAVY }}
        >
          A trusted student support network, not just a blog.
        </h1>

        <p
          className="mt-8 max-w-xl text-base leading-relaxed"
          style={{ color: `${NAVY}99` }}
        >
          StudyNL helps international students prepare for studying in the
          Netherlands with practical guidance around housing, money, documents,
          arrival and safety.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <ValueCard key={v.category} value={v} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueCard({ value }: { value: Value }) {
  return (
    <div className="flex min-h-[220px] flex-col rounded-2xl bg-white px-7 py-7 ring-1 ring-[#092A4D]/10">
      <span
        className="inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-[11px] font-semibold ring-1 ring-[#092A4D]/10"
        style={{ color: NAVY }}
      >
        {value.category}
      </span>

      <h3
        className="mt-7 text-lg font-bold leading-snug"
        style={{ color: NAVY }}
      >
        {value.title}
      </h3>

      <p
        className="mt-3 text-sm leading-relaxed"
        style={{ color: `${NAVY}99` }}
      >
        {value.blurb}
      </p>
    </div>
  );
}
