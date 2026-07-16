"use client";

import { useEffect, useState } from "react";
import { useT } from "../../i18n/I18nProvider";

const NAVY = "#092A4D";

type Stats = { totalMembers: number; newMembers30d: number; newPosts30d: number };

export function AboutTab() {
  const t = useT();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/forum/stats")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(9,42,77,0.04)]">
        <h3 className="text-sm font-bold" style={{ color: NAVY }}>
          {t("forum.about.title")}
        </h3>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: `${NAVY}99` }}>
          {t("forum.about.description")}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(9,42,77,0.04)]">
        <h3 className="text-sm font-bold" style={{ color: NAVY }}>
          {t("forum.about.activity")}
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Stat label={t("forum.about.newPosts")} value={stats?.newPosts30d} />
          <Stat label={t("forum.about.newMembers")} value={stats?.newMembers30d} />
        </div>
        <div className="mt-4 border-t border-[#092A4D]/10 pt-4">
          <Stat label={t("forum.about.totalMembers")} value={stats?.totalMembers} />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | undefined }) {
  return (
    <div>
      <p className="text-2xl font-extrabold" style={{ color: NAVY }}>
        {value ?? "–"}
      </p>
      <p className="text-xs font-semibold" style={{ color: `${NAVY}80` }}>
        {label}
      </p>
    </div>
  );
}
