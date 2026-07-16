"use client";

import { useEffect, useState } from "react";
import { useT } from "../../i18n/I18nProvider";
import { formatDate } from "@/lib/format";
import { Avatar } from "./Avatar";
import type { ForumMember } from "./types";

const NAVY = "#092A4D";

export function MembersTab() {
  const t = useT();
  const [members, setMembers] = useState<ForumMember[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/forum/members")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setMembers(data?.members ?? []);
      })
      .catch(() => {
        if (!cancelled) setMembers([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (members === null) {
    return (
      <div
        className="rounded-2xl bg-white p-6 text-center text-sm font-semibold shadow-[0_1px_2px_rgba(9,42,77,0.04)]"
        style={{ color: `${NAVY}80` }}
      >
        …
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <p
        className="rounded-2xl bg-white p-6 text-center text-sm font-semibold"
        style={{ color: `${NAVY}80` }}
      >
        {t("forum.members.empty")}
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {members.map((m) => (
        <li
          key={m.id}
          className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_1px_2px_rgba(9,42,77,0.04)]"
        >
          <Avatar name={m.displayName} />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold" style={{ color: NAVY }}>
              {m.displayName}
            </p>
            <p className="text-xs" style={{ color: `${NAVY}80` }}>
              {t("forum.members.since")} {formatDate(m.joinedAt)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
