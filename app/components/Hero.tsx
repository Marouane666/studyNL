"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useT } from "../i18n/I18nProvider";

const NAVY = "#03294f";
const ORANGE = "#fd7933";

// Slideshow images. Drop your files in /public/hero/ and list them here.
// The first entry (hero.png) already exists so the section never breaks.
const HERO_SLIDES = [
  "/hero/hero.png",
  "/hero/hero-1.jpg",
  "/hero/hero-2.jpg",
  "/hero/hero-3.jpg",
  "/hero/hero-4.jpg",
  "/hero/hero-5.jpg",
  "/hero/hero-6.jpg",
  "/hero/hero-7.jpg",
  "/hero/hero-8.jpg",
  "/hero/hero-9.jpg",
  "/hero/hero-10.jpg",
  "/hero/hero-11.jpg",
  "/hero/hero-12.jpg",
  "/hero/hero-13.jpg",
  "/hero/hero-14.jpg",
  "/hero/hero-15.jpg",
];

const SLIDE_INTERVAL_MS = 4500;

export function Hero() {
  const t = useT();
  return (
    <section className="bg-white px-4 pb-6 pt-4 sm:px-6 lg:px-8">
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
              {t("hero.badge")}
            </span>

            <h1
              className="mt-6 break-words text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight"
              style={{ color: NAVY }}
            >
              {t("hero.title")}
            </h1>

            <p
              className="mt-6 max-w-xl text-base leading-relaxed"
              style={{ color: `${NAVY}B3` }}
            >
              {t("hero.subtitle")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/start"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#e96a25]"
                style={{ backgroundColor: ORANGE }}
              >
                {t("hero.cta_primary")}
                <ArrowRightIcon />
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold shadow-[0_1px_3px_rgba(3,41,79,0.06)] transition-shadow hover:shadow-[0_2px_8px_rgba(3,41,79,0.1)]"
                style={{ color: NAVY }}
              >
                {t("hero.cta_secondary")}
              </Link>
            </div>

            <div
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold"
              style={{ color: ORANGE }}
            >
              <span className="inline-flex items-center gap-1.5">
                <CheckIcon />
                {t("hero.chip_enrolment")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckIcon />
                {t("hero.chip_housing")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckIcon />
                {t("hero.chip_arrival")}
              </span>
            </div>
          </div>

          <div className="relative">
            <HeroSlideshow />

            <FloatingCard
              className="absolute left-4 top-6 sm:left-6 sm:top-8"
              label={t("hero.card1_label")}
              value={t("hero.card1_value")}
            />
            <FloatingCard
              className="absolute right-2 top-1/3 sm:right-4"
              label={t("hero.card2_label")}
              value={t("hero.card2_value")}
            />
            <FloatingCard
              className="absolute bottom-6 left-4 sm:bottom-8 sm:left-6"
              label={t("hero.card3_label")}
              value={t("hero.card3_value")}
            />

            <span
              className="absolute bottom-6 right-4 inline-flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md sm:bottom-8 sm:right-6"
              style={{ backgroundColor: ORANGE }}
            >
              {t("hero.tag_startready")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const slides = HERO_SLIDES;

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="relative aspect-720/520 w-full overflow-hidden rounded-3xl shadow-lg">
      {slides.map((src, i) => (
        <div
          key={src}
          aria-hidden={i !== active}
          className="absolute inset-0 transition-opacity duration-1200 ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <Image
            src={src}
            alt="Students studying together"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className={`h-full w-full object-cover transition-transform ease-out ${
              i === active ? "scale-110 duration-6000" : "scale-100 duration-0"
            }`}
            priority={i === 0}
          />
        </div>
      ))}

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {slides.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActive(i)}
            className="h-1.5 rounded-full bg-white transition-all"
            style={{
              width: i === active ? 20 : 6,
              opacity: i === active ? 1 : 0.55,
            }}
          />
        ))}
      </div>
    </div>
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
      className={`max-w-[60%] rounded-2xl bg-white px-4 py-2.5 shadow-[0_4px_14px_rgba(3,41,79,0.12)] sm:max-w-[45%] ${className ?? ""}`}
    >
      <div className="text-[10px] font-medium leading-tight tracking-wide text-[#03294f]/60">
        {label}
      </div>
      <div className="text-sm font-bold leading-tight text-[#03294f]">{value}</div>
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
