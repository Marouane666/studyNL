"use client";

// Site language switcher. Used in the navbar's top strip (tone "dark") and in
// the Hub Plus dashboard's top bar (tone "light"), which has no site navbar.

import { useEffect, useRef, useState } from "react";
import { LANGUAGES } from "../i18n/dictionary";
import { useI18n } from "../i18n/I18nProvider";

export function LanguagePicker({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const selected = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("nav.changeLanguage")}
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold transition-colors sm:px-3 ${
          tone === "dark"
            ? "bg-white/10 py-1 text-white hover:bg-white/20"
            : "bg-[#0a2847]/5 py-2 text-[#092A4D]/80 hover:bg-[#0a2847]/10"
        }`}
      >
        <GlobeIcon />
        <span className="hidden sm:inline">{selected.label}</span>
        <span className="sm:hidden">{selected.short}</span>
        <ChevronDownIcon
          className={open ? "rotate-180 transition-transform" : "transition-transform"}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 max-h-[70vh] w-48 overflow-y-auto rounded-2xl bg-white py-1.5 shadow-[0_8px_28px_rgba(3,41,79,0.18)] ring-1 ring-[#03294f]/10"
        >
          {LANGUAGES.map((l) => {
            const active = l.code === lang;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2 text-start text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#eef1f6] text-[#03294f]"
                      : "text-[#03294f] hover:bg-[#f5f7fa]"
                  }`}
                >
                  <span>{l.label}</span>
                  <span className="text-[10px] font-bold tracking-wide text-[#03294f]/50">
                    {l.short}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
