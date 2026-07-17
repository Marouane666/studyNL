"use client";

import { useAuth } from "../auth/AuthProvider";
import { useT } from "../i18n/I18nProvider";
import { AuthPanel } from "../forum/components/AuthPanel";
import { AdminTab } from "../forum/components/AdminTab";
import { isAdminRole } from "@/lib/roles";

const BG = "#EAF6FF";
const NAVY = "#092A4D";

export default function PsAdminPage() {
  const t = useT();
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <section style={{ backgroundColor: BG, color: NAVY }}>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <span
          className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold ring-1 ring-[#092A4D]/10"
          style={{ color: NAVY }}
        >
          {t("psAdmin.badge")}
        </span>

        <h1
          className="mt-8 max-w-2xl break-words text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ color: NAVY }}
        >
          {t("psAdmin.title")}
        </h1>

        <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: `${NAVY}99` }}>
          {t("psAdmin.subtitle")}
        </p>

        <div className="mt-8 max-w-md">
          {!user && <AuthPanel loginSubtitle={t("psAdmin.loginSubtitle")} hideSignup />}
          {user && !isAdminRole(user.role) && (
            <p className="rounded-2xl bg-white p-6 text-sm font-semibold shadow-[0_1px_2px_rgba(9,42,77,0.04)]" style={{ color: `${NAVY}99` }}>
              {t("psAdmin.accessDenied")}
            </p>
          )}
        </div>

        {user && isAdminRole(user.role) && (
          <div className="mt-8">
            <AdminTab />
          </div>
        )}
      </div>
    </section>
  );
}
