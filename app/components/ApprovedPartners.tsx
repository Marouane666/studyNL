"use client";

import { useT } from "../i18n/I18nProvider";

const NAVY = "#03294f";

type Partner = { name: string; src: string };

const PARTNERS: Partner[] = [
  { name: "Utility Direct", src: "/logos/utility.svg" },
  { name: "Studielink", src: "/logos/studielink.svg" },
  { name: "Feather", src: "/logos/feather.svg" },
  { name: "Hays", src: "/logos/hays.svg" },
  { name: "Babbel", src: "/logos/babbel.svg" },
  { name: "Revolut", src: "/logos/revolut.svg" },
];

// Duplicated track so the CSS keyframe (0 → -50%) loops seamlessly.
const TRACK = [...PARTNERS, ...PARTNERS];

export function ApprovedPartners() {
  const t = useT();
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div
          className="relative overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-12"
          style={{
            background:
              "linear-gradient(135deg, #f6f8fb 0%, #eef3fa 100%)",
          }}
        >
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:gap-12">
            <div className="min-w-0">
              <span
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold ring-1 ring-[#03294f]/10"
                style={{ color: NAVY }}
              >
                <span className="size-1.5 rounded-full bg-[#fd7933]" />
                {t("partners.badge")}
              </span>
              <h2
                className="mt-4 break-words text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-[1.1] tracking-tight"
                style={{ color: NAVY }}
              >
                {t("partners.title")}
              </h2>
              <p
                className="mt-3 max-w-md text-sm leading-relaxed"
                style={{ color: `${NAVY}99` }}
              >
                {t("partners.subtitle")}
              </p>
            </div>

            <div
              className="marquee relative overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              }}
              aria-label={t("partners.title")}
              role="region"
            >
              <ul className="marquee-track flex w-max items-center" aria-hidden="true">
                {TRACK.map((partner, i) => (
                  <li
                    key={`${partner.name}-${i}`}
                    className="mr-4 flex h-20 w-[180px] shrink-0 items-center justify-center rounded-2xl bg-white px-6 ring-1 ring-[#03294f]/10 transition-shadow duration-200 hover:shadow-[0_6px_20px_rgba(3,41,79,0.08)] sm:w-[200px]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={partner.src}
                      alt={partner.name}
                      className="h-8 w-auto max-w-[140px] object-contain opacity-80 transition-opacity duration-200 hover:opacity-100 sm:h-9"
                      loading="lazy"
                      draggable={false}
                    />
                  </li>
                ))}
              </ul>

              <ul className="sr-only">
                {PARTNERS.map((p) => (
                  <li key={p.name}>{p.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
