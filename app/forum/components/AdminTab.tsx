"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useT } from "../../i18n/I18nProvider";
import { formatDate } from "@/lib/format";
import { Avatar } from "./Avatar";
import { PushNotificationsPanel } from "./PushNotificationsPanel";

const NAVY = "#092A4D";

type AdminUser = {
  id: string;
  displayName: string;
  email: string | null;
  role: "member" | "moderator" | "admin";
  status: "active" | "suspended";
  joinedAt: string;
};

export function AdminTab() {
  const t = useT();
  const { user: me } = useAuth();
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data?.users)) setUsers(data.users);
        else setError(t("admin.users.loadError"));
      })
      .catch(() => {
        if (!cancelled) setError(t("admin.users.loadError"));
      });
    return () => {
      cancelled = true;
    };
    // Only needs to run once on mount; `t` is stable per language.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function changeRole(id: string, role: AdminUser["role"]) {
    setBusyId(id);
    const res = await fetch(`/api/admin/users/${id}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    if (res.ok) {
      setUsers((prev) => prev?.map((u) => (u.id === id ? { ...u, role } : u)) ?? null);
    }
    setBusyId(null);
  }

  async function toggleStatus(id: string, nextStatus: AdminUser["status"]) {
    setBusyId(id);
    const res = await fetch(`/api/admin/users/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    if (res.ok) {
      setUsers((prev) => prev?.map((u) => (u.id === id ? { ...u, status: nextStatus } : u)) ?? null);
    }
    setBusyId(null);
  }

  async function deleteUser(id: string) {
    if (!window.confirm(t("admin.users.confirmDelete"))) return;
    setBusyId(id);
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    if (res.ok) {
      setUsers((prev) => prev?.filter((u) => u.id !== id) ?? null);
    }
    setBusyId(null);
  }

  if (error) {
    return <p className="text-sm font-semibold text-red-600">{error}</p>;
  }

  if (users === null) {
    return (
      <div
        className="rounded-2xl bg-white p-6 text-center text-sm font-semibold shadow-[0_1px_2px_rgba(9,42,77,0.04)]"
        style={{ color: `${NAVY}80` }}
      >
        …
      </div>
    );
  }

  return (
    <>
      <PushNotificationsPanel />
      <div className="overflow-x-auto rounded-2xl bg-white shadow-[0_1px_2px_rgba(9,42,77,0.04)]">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead>
          <tr
            className="border-b border-[#092A4D]/10 text-xs font-bold uppercase tracking-wide"
            style={{ color: `${NAVY}80` }}
          >
            <th className="px-5 py-3">{t("auth.field.name")}</th>
            <th className="px-5 py-3">{t("admin.users.role")}</th>
            <th className="px-5 py-3">{t("admin.users.status")}</th>
            <th className="px-5 py-3">{t("admin.users.joined")}</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const isSelf = u.id === me?.id;
            const busy = busyId === u.id;
            return (
              <tr key={u.id} className="border-b border-[#092A4D]/5 last:border-0">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={u.displayName} small />
                    <div className="min-w-0">
                      <p className="truncate font-bold" style={{ color: NAVY }}>
                        {u.displayName}
                        {isSelf && (
                          <span className="ml-1.5 font-normal" style={{ color: `${NAVY}60` }}>
                            {t("admin.users.you")}
                          </span>
                        )}
                      </p>
                      {u.email && (
                        <p className="truncate text-xs" style={{ color: `${NAVY}80` }}>
                          {u.email}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <select
                    value={u.role}
                    disabled={busy || isSelf}
                    onChange={(e) => changeRole(u.id, e.target.value as AdminUser["role"])}
                    className="rounded-lg bg-[#f6f8fb] px-2.5 py-1.5 text-xs font-bold ring-1 ring-[#092A4D]/10 disabled:opacity-50"
                    style={{ color: NAVY }}
                  >
                    <option value="member">{t("forum.role.member")}</option>
                    <option value="moderator">{t("forum.role.moderator")}</option>
                    <option value="admin">{t("forum.role.admin")}</option>
                  </select>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold"
                      style={
                        u.status === "active"
                          ? { color: "#15803d", backgroundColor: "#15803d1a" }
                          : { color: "#b91c1c", backgroundColor: "#b91c1c1a" }
                      }
                    >
                      {u.status === "active" ? t("admin.users.statusActive") : t("admin.users.statusSuspended")}
                    </span>
                    {!isSelf && (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => toggleStatus(u.id, u.status === "active" ? "suspended" : "active")}
                        className="text-xs font-bold underline-offset-2 hover:underline disabled:opacity-40"
                        style={{ color: `${NAVY}80` }}
                      >
                        {u.status === "active" ? t("admin.users.suspend") : t("admin.users.reactivate")}
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-5 py-3 text-xs" style={{ color: `${NAVY}80` }}>
                  {formatDate(u.joinedAt)}
                </td>
                <td className="px-5 py-3 text-right">
                  {!isSelf && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => deleteUser(u.id)}
                      className="text-xs font-bold text-red-600 hover:underline disabled:opacity-40"
                    >
                      {t("admin.users.delete")}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </>
  );
}
