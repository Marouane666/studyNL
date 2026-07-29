"use client";

import { useEffect, useRef, useState } from "react";
import { FaCheck, FaEnvelope } from "react-icons/fa";
import { useT } from "../i18n/I18nProvider";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";

const DISMISSED_KEY = "studynl.newsletter.dismissed";
const DELAY_MS = 20_000;

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterPopup() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISSED_KEY) === "1") return;
    } catch {
      /* localStorage unavailable (private mode), fall through and still ask */
    }
    const timer = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Focus the input once the card mounts so keyboard users land on the field
  // they're being asked to fill, not on the page behind the overlay.
  useEffect(() => {
    if (open && status === "idle") inputRef.current?.focus();
  }, [open, status]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function close() {
    setOpen(false);
    // Persist on close rather than on show: a visitor who never saw the card
    // (tab closed at 19s) should still get the ask on their next visit.
    try {
      window.localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed.includes("@") || !trimmed.includes(".")) {
      setStatus("error");
      setMessage(t("newsletter.invalid"));
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? t("newsletter.error"));
        return;
      }
      setStatus("success");
      // Subscribers shouldn't be asked again on the next visit.
      try {
        window.localStorage.setItem(DISMISSED_KEY, "1");
      } catch {
        /* ignore */
      }
    } catch {
      setStatus("error");
      setMessage(t("newsletter.error"));
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-end justify-center px-4 pb-4 sm:items-center sm:pb-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-popup-title"
    >
      <button
        type="button"
        onClick={close}
        aria-label={t("newsletter.dismissAriaLabel")}
        className="absolute inset-0 h-full w-full cursor-default bg-[#092A4D]/45 backdrop-blur-[2px]"
        tabIndex={-1}
      />

      <div className="relative w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-[0_18px_50px_rgba(9,42,77,0.28)]">
        <button
          type="button"
          onClick={close}
          aria-label={t("newsletter.dismissAriaLabel")}
          className="absolute right-4 top-4 inline-flex size-7 items-center justify-center rounded-full transition-colors hover:bg-[#092A4D]/6"
          style={{ color: `${NAVY}80` }}
        >
          <CloseIcon />
        </button>

        {status === "success" ? (
          <>
            <span
              className="mx-auto flex size-12 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: ORANGE }}
            >
              <FaCheck size={18} />
            </span>
            <h2 id="newsletter-popup-title" className="mt-4 text-lg font-extrabold" style={{ color: NAVY }}>
              {t("newsletter.successTitle")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
              {t("newsletter.successBody")}
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-5 w-full rounded-full py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: NAVY }}
            >
              {t("newsletter.successDone")}
            </button>
          </>
        ) : (
          <>
            <span
              className="mx-auto flex size-12 items-center justify-center rounded-full"
              style={{ backgroundColor: "#fff4ec", color: ORANGE }}
            >
              <FaEnvelope size={18} />
            </span>
            <h2
              id="newsletter-popup-title"
              className="mt-4 text-lg font-extrabold leading-snug"
              style={{ color: NAVY }}
            >
              {t("newsletter.title")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
              {t("newsletter.subtitle")}
            </p>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 text-left">
              <label className="flex flex-col gap-1.5">
                <span className="sr-only">{t("newsletter.emailLabel")}</span>
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder={t("newsletter.placeholder")}
                  autoComplete="email"
                  required
                  className="rounded-xl border border-[#092A4D]/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#fd7933] focus:ring-2 focus:ring-[#fd7933]/20"
                />
              </label>

              {status === "error" && message && (
                <p className="text-xs font-semibold text-[#c02626]" role="alert">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: ORANGE }}
              >
                {status === "loading" ? t("newsletter.submitting") : t("newsletter.submit")}
              </button>
            </form>

            <p className="mt-3 text-[11px]" style={{ color: `${NAVY}66` }}>
              {t("newsletter.privacy")}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
