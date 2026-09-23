"use client";

// Where the password-reset email lands.
//
// Supabase's link verifies the email, then redirects here with a recovery
// session in the URL fragment (#access_token=…&type=recovery), or with
// #error=…&error_code=otp_expired when the link is stale. The fragment never
// reaches the server, so it is read here, removed from the address bar so the
// token isn't left in history, and sent along with the new password.

import Link from "next/link";
import { FormEvent, useEffect, useState, useSyncExternalStore } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useT } from "../i18n/I18nProvider";
import { AuthPanel } from "../forum/components/AuthPanel";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";

type State = "checking" | "ready" | "invalid" | "done";

// The fragment is read once and kept, because the page wipes it from the
// address bar straight after; reading it live would lose the token.
let capturedHash: string | null = null;
function readHash() {
  if (capturedHash === null) capturedHash = window.location.hash;
  return capturedHash;
}
const noSubscribe = () => () => {};

/** The recovery token from the link, or "" if the link carried none. */
function recoveryToken(hash: string) {
  const params = new URLSearchParams(hash.slice(1));
  return params.get("type") === "recovery" ? (params.get("access_token") ?? "") : "";
}

export default function ResetPasswordPage() {
  const t = useT();
  const { user } = useAuth();
  // null while server rendering: the fragment only exists in the browser.
  const hash = useSyncExternalStore(noSubscribe, readHash, () => null);
  const accessToken = hash === null ? "" : recoveryToken(hash);
  // Set once the form has been used; until then the link decides the state.
  const [outcome, setOutcome] = useState<"invalid" | "done" | null>(null);
  const state: State = outcome ?? (hash === null ? "checking" : accessToken ? "ready" : "invalid");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError(t("reset.mismatch"));
      return;
    }

    setSubmitting(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken, password }),
    });
    const data = await res.json().catch(() => null);
    setSubmitting(false);

    if (res.status === 401) {
      setOutcome("invalid");
      return;
    }
    if (!res.ok) {
      setError(data?.error ?? t("reset.error"));
      return;
    }
    setOutcome("done");
  }

  return (
    <section className="bg-[#f6f8fb]">
      <div className="mx-auto max-w-md px-6 pb-20 pt-12">
        {state === "checking" && (
          <p className="text-center text-sm" style={{ color: `${NAVY}99` }}>
            {t("reset.checking")}
          </p>
        )}

        {state === "ready" && (
          <div className="rounded-2xl bg-white p-6 shadow-[0_2px_10px_rgba(9,42,77,0.05)] sm:p-8">
            <h1 className="text-xl font-bold" style={{ color: NAVY }}>
              {t("reset.title")}
            </h1>
            <p className="mt-1 text-sm" style={{ color: `${NAVY}99` }}>
              {t("reset.subtitle")}
            </p>

            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
              <PasswordField label={t("reset.field.password")} value={password} onChange={setPassword} />
              <PasswordField label={t("reset.field.confirm")} value={confirm} onChange={setConfirm} />

              {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity disabled:opacity-60"
                style={{ backgroundColor: ORANGE }}
              >
                {submitting ? t("reset.submitting") : t("reset.submit")}
              </button>
            </form>
          </div>
        )}

        {state === "invalid" && (
          <>
            <Notice title={t("reset.invalid.title")} body={t("reset.invalid.body")} />
            <AuthPanel initialMode="forgot" />
          </>
        )}

        {state === "done" && (
          <>
            <Notice title={t("reset.done.title")} body={t("reset.done.body")} />
            {user ? (
              <div className="text-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm"
                  style={{ backgroundColor: ORANGE }}
                >
                  {t("reset.continue")}
                </Link>
              </div>
            ) : (
              <AuthPanel />
            )}
          </>
        )}
      </div>
    </section>
  );
}

function Notice({ title, body }: { title: string; body: string }) {
  return (
    <div className="mb-6 text-center">
      <h1 className="text-xl font-bold" style={{ color: NAVY }}>
        {title}
      </h1>
      <p className="mt-1 text-sm" style={{ color: `${NAVY}99` }}>
        {body}
      </p>
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-bold" style={{ color: NAVY }}>
        {label}
      </span>
      <input
        type="password"
        required
        minLength={6}
        autoComplete="new-password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-[#f6f8fb] px-4 py-2.5 text-sm font-medium outline-none ring-1 ring-[#092A4D]/10 focus:ring-2 focus:ring-[#fd7933]/50"
        style={{ color: NAVY }}
      />
    </label>
  );
}
