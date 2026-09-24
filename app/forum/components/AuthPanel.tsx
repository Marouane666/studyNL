"use client";

import { FormEvent, useRef, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useT } from "../../i18n/I18nProvider";
import { useZukoForm } from "../../analytics/zuko";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";

type Mode = "login" | "signup" | "forgot";

export function AuthPanel({
  loginSubtitle,
  signupSubtitle,
  hideSignup,
  initialMode = "login",
  onSuccess,
}: {
  loginSubtitle?: string;
  signupSubtitle?: string;
  hideSignup?: boolean;
  initialMode?: Mode;
  /** Called after a successful log-in or sign-up. */
  onSuccess?: () => void;
}) {
  const t = useT();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  // The address a reset link was requested for, once the request went through.
  const [resetSentTo, setResetSentTo] = useState<string | null>(null);

  const isForgot = mode === "forgot";
  const isLogin = !isForgot && (hideSignup ? true : mode === "login");
  const isSignup = !isLogin && !isForgot;

  const formRef = useRef<HTMLFormElement>(null);
  const trackSignup = useZukoForm("signup", formRef, isSignup);

  function switchMode(next: Mode) {
    setError(null);
    setResetSentTo(null);
    setMode(next);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (isForgot) {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => null);
      setSubmitting(false);
      if (res.ok) setResetSentTo(email);
      else setError(data?.error ?? t("reset.error"));
      return;
    }

    const result = isLogin ? await login(email, password) : await signup(name, email, password);
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (isSignup) trackSignup();
    onSuccess?.();
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_2px_10px_rgba(9,42,77,0.05)] sm:p-8">
      <h2 className="text-xl font-bold" style={{ color: NAVY }}>
        {isForgot ? t("auth.forgot.title") : isLogin ? t("auth.login.title") : t("auth.signup.title")}
      </h2>
      <p className="mt-1 text-sm" style={{ color: `${NAVY}99` }}>
        {isForgot
          ? t("auth.forgot.subtitle")
          : isLogin
            ? (loginSubtitle ?? t("auth.login.subtitle"))
            : (signupSubtitle ?? t("auth.signup.subtitle"))}
      </p>

      {/* Worded the same whether or not the account exists, matching the
          route, so the form doesn't reveal who has an account. */}
      {isForgot && resetSentTo ? (
        <p className="mt-6 rounded-xl bg-[#f6f8fb] px-4 py-3.5 text-sm leading-relaxed" style={{ color: NAVY }}>
          {t("auth.forgot.sent").replace("{email}", resetSentTo)}
        </p>
      ) : (
        <form ref={formRef} onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
          {!isLogin && !isForgot && (
            <Field label={t("auth.field.name")}>
              <input
                type="text"
                required
                maxLength={80}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-[#f6f8fb] px-4 py-2.5 text-sm font-medium outline-none ring-1 ring-[#092A4D]/10 focus:ring-2 focus:ring-[#fd7933]/50"
                style={{ color: NAVY }}
              />
            </Field>
          )}

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

          {!isForgot && (
            <Field label={t("auth.field.password")}>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-[#f6f8fb] px-4 py-2.5 text-sm font-medium outline-none ring-1 ring-[#092A4D]/10 focus:ring-2 focus:ring-[#fd7933]/50"
                style={{ color: NAVY }}
              />
            </Field>
          )}

          {isLogin && (
            <button
              type="button"
              onClick={() => switchMode("forgot")}
              className="-mt-2 self-end text-xs font-bold underline-offset-2 hover:underline"
              style={{ color: `${NAVY}99` }}
            >
              {t("auth.forgot.link")}
            </button>
          )}

          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity disabled:opacity-60"
            style={{ backgroundColor: ORANGE }}
          >
            {isForgot
              ? submitting
                ? t("auth.forgot.submitting")
                : t("auth.forgot.submit")
              : submitting
                ? isLogin
                  ? t("auth.login.submitting")
                  : t("auth.signup.submitting")
                : isLogin
                  ? t("auth.login.submit")
                  : t("auth.signup.submit")}
          </button>
        </form>
      )}

      {isForgot ? (
        <p className="mt-5 text-center text-sm">
          <button
            type="button"
            onClick={() => switchMode("login")}
            className="font-bold underline-offset-2 hover:underline"
            style={{ color: NAVY }}
          >
            {t("auth.forgot.back")}
          </button>
        </p>
      ) : !hideSignup && (
        <p className="mt-5 text-center text-sm" style={{ color: `${NAVY}99` }}>
          {isLogin ? t("auth.login.switchPrompt") : t("auth.signup.switchPrompt")}{" "}
          <button
            type="button"
            onClick={() => switchMode(isLogin ? "signup" : "login")}
            className="font-bold underline-offset-2 hover:underline"
            style={{ color: NAVY }}
          >
            {isLogin ? t("auth.login.switchAction") : t("auth.signup.switchAction")}
          </button>
        </p>
      )}
    </div>
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
