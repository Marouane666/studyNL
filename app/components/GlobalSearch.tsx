"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { useT } from "../i18n/I18nProvider";
import { useSiteSearch } from "../search/useSiteSearch";

const NAVY = "#03294f";

export function GlobalSearch() {
  const t = useT();
  const [open, setOpen] = useState(false);

  // Global shortcut: Cmd/Ctrl+K toggles the palette.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("search.trigger")}
        className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#03294f]/70 shadow-[0_1px_3px_rgba(3,41,79,0.06)] transition-colors hover:text-[#03294f]"
      >
        <SearchIcon />
        <span className="hidden xl:inline">{t("search.trigger")}</span>
        <kbd className="hidden items-center rounded-md bg-[#eaf2fa] px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-[#03294f]/60 xl:inline-flex">
          ⌘K
        </kbd>
      </button>

      {/* Mounting fresh on each open keeps query/selection state self-resetting. */}
      {open && <SearchDialog onClose={() => setOpen(false)} />}
    </>
  );
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const t = useT();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listboxId = useId();

  const results = useSiteSearch(query);
  const active = results[activeIndex];

  // Focus the input and lock body scroll for the lifetime of the dialog.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  function goTo(href: string) {
    onClose();
    router.push(href);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) =>
        results.length ? (i - 1 + results.length) % results.length : 0,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active) goTo(active.entry.href);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  }

  const trimmed = query.trim();

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#03294f]/50 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("search.trigger")}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(3,41,79,0.35)]"
      >
        <div className="flex items-center gap-3 border-b border-[#03294f]/10 px-4 py-3">
          <span className="shrink-0 text-[#03294f]/40">
            <SearchIcon />
          </span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={t("search.placeholder")}
            aria-label={t("search.placeholder")}
            aria-controls={listboxId}
            aria-activedescendant={
              active ? `${listboxId}-${active.entry.id}` : undefined
            }
            role="combobox"
            aria-expanded={results.length > 0}
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-base font-medium outline-none placeholder:text-[#03294f]/40"
            style={{ color: NAVY }}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("nav.close")}
            className="hidden shrink-0 items-center rounded-md bg-[#eaf2fa] px-2 py-1 text-[10px] font-bold tracking-wide text-[#03294f]/60 sm:inline-flex"
          >
            ESC
          </button>
        </div>

        <ul id={listboxId} role="listbox" className="max-h-[52vh] overflow-y-auto py-2">
          {trimmed === "" && (
            <li className="px-4 py-6 text-center text-sm text-[#03294f]/50">
              {t("search.hint")}
            </li>
          )}

          {trimmed !== "" && results.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-[#03294f]/50">
              {t("search.empty")}
            </li>
          )}

          {results.map((result, i) => {
            const selected = i === activeIndex;
            return (
              <li key={result.entry.id} role="none">
                <button
                  type="button"
                  id={`${listboxId}-${result.entry.id}`}
                  role="option"
                  aria-selected={selected}
                  onClick={() => goTo(result.entry.href)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors ${
                    selected ? "bg-[#eaf2fa]" : "hover:bg-[#f5f7fa]"
                  }`}
                >
                  <span
                    className="min-w-0 flex-1 truncate text-sm font-semibold"
                    style={{ color: NAVY }}
                  >
                    {result.title}
                  </span>
                  <span className="shrink-0 rounded-full bg-[#eaf2fa] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#03294f]/60">
                    {result.section}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
