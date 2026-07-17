"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useT } from "../../i18n/I18nProvider";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";

type Mode = "login" | "signup";

export function AuthPanel({
  loginSubtitle,
  signupSubtitle,
  hideSignup,
}: {
  loginSubtitle?: string;
  signupSubtitle?: string;
  hideSignup?: boolean;
}) {
  const t = useT();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isLogin = hideSignup ? true : mode === "login";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = isLogin ? await login(email, password) : await signup(name, email, password);
    setSubmitting(false);
    if (result.error) setError(result.error);
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_2px_10px_rgba(9,42,77,0.05)] sm:p-8">
      <h2 className="text-xl font-bold" style={{ color: NAVY }}>
        {isLogin ? t("auth.login.title") : t("auth.signup.title")}
      </h2>
      <p className="mt-1 text-sm" style={{ color: `${NAVY}99` }}>
        {isLogin ? (loginSubtitle ?? t("auth.login.subtitle")) : (signupSubtitle ?? t("auth.signup.subtitle"))}
      </p>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
        {!isLogin && (
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

        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity disabled:opacity-60"
          style={{ backgroundColor: ORANGE }}
        >
          {submitting
            ? isLogin
              ? t("auth.login.submitting")
              : t("auth.signup.submitting")
            : isLogin
              ? t("auth.login.submit")
              : t("auth.signup.submit")}
        </button>
      </form>

      {!hideSignup && (
        <p className="mt-5 text-center text-sm" style={{ color: `${NAVY}99` }}>
          {isLogin ? t("auth.login.switchPrompt") : t("auth.signup.switchPrompt")}{" "}
          <button
            type="button"
            onClick={() => {
              setError(null);
              setMode(isLogin ? "signup" : "login");
            }}
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
