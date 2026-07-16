"use client";

import { useT } from "../../i18n/I18nProvider";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";

export function RoleBadge({ role }: { role: "member" | "moderator" | "admin" }) {
  const t = useT();
  if (role === "member") return null;

  const label = role === "admin" ? t("forum.role.admin") : t("forum.role.moderator");
  const color = role === "admin" ? ORANGE : NAVY;

  return (
    <span
      className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
      style={{ color, backgroundColor: `${color}1a` }}
    >
      {label}
    </span>
  );
}
