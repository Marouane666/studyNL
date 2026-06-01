const NAVY = "#03294f";

const PARTNERS = [
  "Utility Direct",
  "Studielink",
  "Feather",
  "Hays",
  "Babbel",
  "Revolut",
  "ABN AMRO",
  "DUO",
];

export function ApprovedPartners() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-3xl border border-[#03294f]/10 bg-white px-6 py-8 sm:px-10 sm:py-10">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:gap-10">
            <div className="min-w-0">
              <span
                className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium ring-1 ring-[#03294f]/10"
                style={{ color: NAVY }}
              >
                Approved partners
              </span>
              <h2
                className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl"
                style={{ color: NAVY }}
              >
                We&apos;re Approved Partners
              </h2>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: `${NAVY}80` }}
              >
                Trusted partners that support different parts of the student
                journey.
              </p>
            </div>

            <div
              className="marquee relative overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              }}
            >
              <div className="marquee-track flex w-max">
                {[...PARTNERS, ...PARTNERS].map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    className="mr-3 inline-flex shrink-0 items-center rounded-2xl bg-[#eef1f6] px-6 py-3 text-sm font-bold whitespace-nowrap"
                    style={{ color: NAVY }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
