import Link from "next/link";

const NAVY = "#03294f";

type LinkItem = { href: string; label: string };

const COLUMNS: LinkItem[][] = [
  [
    { href: "/guides/study-route", label: "Study in the Netherlands" },
    { href: "/guides/scholarships", label: "Scholarships & Funding" },
    { href: "/guides/cost-of-living", label: "Cost of living" },
    { href: "/guides/working-while-studying", label: "Working while studying" },
  ],
  [
    { href: "/guides/arrival-checklist", label: "Arrival checklist" },
    { href: "/guides/dutch-enrolment", label: "Enrolment" },
    { href: "/hub-plus", label: "Hub Plus" },
    { href: "/forum", label: "Forum" },
  ],
  [
    { href: "/universities", label: "Universities" },
    { href: "/fraternities", label: "Fraternities" },
    { href: "/guides/visa-residency", label: "Visa & residency" },
    { href: "/guides/housing-scams", label: "Avoid scams" },
  ],
  [
    { href: "/guides/cities", label: "City guides" },
    { href: "/guides/finance", label: "Finance & loans" },
    { href: "/guides/accommodation", label: "Accommodation" },
    { href: "/partners", label: "Partner with us" },
  ],
  [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/legal", label: "Legal" },
    { href: "/help-centre", label: "Help centre" },
  ],
];

export function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(90deg, #F8BBA4 0%, #EAF6FF 100%)",
        color: NAVY,
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_repeat(5,minmax(0,1fr))]">
          <div>
            <Link href="/" className="flex flex-col leading-none">
              <span className="text-2xl font-bold tracking-tight">
                <span style={{ color: NAVY }}>Study</span>
                <span className="text-[#fd7933]">NL</span>
              </span>
              <span
                className="mt-1.5 text-[10px] font-medium tracking-[0.15em]"
                style={{ color: `${NAVY}80` }}
              >
                POWERED BY GRADUATE HELP STUDENTS
              </span>
            </Link>
          </div>

          {COLUMNS.map((col, i) => (
            <ul key={i} className="space-y-3">
              {col.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-bold transition-opacity hover:opacity-70"
                    style={{ color: NAVY }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <p
          className="mt-14 text-xs"
          style={{ color: `${NAVY}80` }}
        >
          © 2035 StudyNL. Static HTML redesign preview.
        </p>
      </div>
    </footer>
  );
}
