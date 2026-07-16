"use client";

import { FormEvent, useState } from "react";
import { useT } from "../i18n/I18nProvider";

const BG = "#EAF6FF";
const NAVY = "#092A4D";
const ORANGE = "#fd7933";
const CONTACT_EMAIL = "contact@study-nl.com";

export default function ContactPage() {
  const t = useT();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? t("contactPage.error"));
        return;
      }
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError(t("contactPage.error"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section style={{ backgroundColor: BG, color: NAVY }}>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <span
          className="inline-flex w-fit items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold"
          style={{ color: NAVY }}
        >
          {t("contactPage.badge")}
        </span>

        <h1
          className="mt-8 max-w-2xl break-words text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ color: NAVY }}
        >
          {t("contactPage.title")}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: `${NAVY}B3` }}>
          {t("contactPage.subtitle")}
        </p>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold shadow-[0_1px_3px_rgba(9,42,77,0.06)] hover:underline"
          style={{ color: NAVY }}
        >
          <MailIcon />
          {CONTACT_EMAIL}
        </a>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-[0_2px_10px_rgba(9,42,77,0.05)] sm:p-8">
          {sent ? (
            <div className="py-6 text-center">
              <h2 className="text-lg font-bold" style={{ color: NAVY }}>
                {t("contactPage.success.title")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
                {t("contactPage.success.body")}
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-5 text-sm font-bold underline-offset-2 hover:underline"
                style={{ color: NAVY }}
              >
                {t("contactPage.success.again")}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <Field label={t("auth.field.name")}>
                <input
                  type="text"
                  required
                  maxLength={200}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-[#f6f8fb] px-4 py-2.5 text-sm font-medium outline-none ring-1 ring-[#092A4D]/10 focus:ring-2 focus:ring-[#fd7933]/50"
                  style={{ color: NAVY }}
                />
              </Field>

              <Field label={t("auth.field.email")}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-[#f6f8fb] px-4 py-2.5 text-sm font-medium outline-none ring-1 ring-[#092A4D]/10 focus:ring-2 focus:ring-[#fd7933]/50"
                  style={{ color: NAVY }}
                />
              </Field>

              <Field label={t("contactPage.field.message")}>
                <textarea
                  required
                  rows={5}
                  maxLength={4000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-none rounded-xl bg-[#f6f8fb] px-4 py-3 text-sm font-medium outline-none ring-1 ring-[#092A4D]/10 focus:ring-2 focus:ring-[#fd7933]/50"
                  style={{ color: NAVY }}
                />
              </Field>

              {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity disabled:opacity-60"
                style={{ backgroundColor: ORANGE }}
              >
                {submitting ? t("contactPage.submitting") : t("contactPage.submit")}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-xs leading-relaxed" style={{ color: `${NAVY}80` }}>
          {t("contactPage.privacyNote")}
        </p>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-bold" style={{ color: NAVY }}>
        {label}
      </span>
      {children}
    </label>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}
