"use client";

import { FormEvent, useEffect, useState } from "react";
import { useT } from "../../i18n/I18nProvider";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";

type SendResult = { accepted: number; failed: number; removed: number };

export function PushNotificationsPanel() {
  const t = useT();
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SendResult | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/push")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && typeof data?.subscriberCount === "number") setSubscriberCount(data.subscriberCount);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setSending(true);
    try {
      const res = await fetch("/api/admin/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, url: url || undefined }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? t("admin.push.error"));
        return;
      }
      setResult(data);
      setTitle("");
      setBody("");
      setUrl("");
      setSubscriberCount((prev) => (prev !== null ? prev - data.removed : prev));
    } catch {
      setError(t("admin.push.error"));
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mb-6 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(9,42,77,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-bold" style={{ color: NAVY }}>
          {t("admin.push.heading")}
        </h3>
        {subscriberCount !== null && (
          <span className="text-xs font-bold" style={{ color: `${NAVY}80` }}>
            {subscriberCount} {t("admin.push.subscriberCountLabel")}
          </span>
        )}
      </div>

      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold" style={{ color: NAVY }}>
            {t("admin.push.titleLabel")}
          </span>
          <input
            type="text"
            required
            maxLength={100}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t("admin.push.titlePlaceholder")}
            className="w-full rounded-xl bg-[#f6f8fb] px-4 py-2.5 text-sm font-medium outline-none ring-1 ring-[#092A4D]/10 focus:ring-2 focus:ring-[#fd7933]/50"
            style={{ color: NAVY }}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold" style={{ color: NAVY }}>
            {t("admin.push.bodyLabel")}
          </span>
          <textarea
            required
            maxLength={500}
            rows={2}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={t("admin.push.bodyPlaceholder")}
            className="w-full resize-none rounded-xl bg-[#f6f8fb] px-4 py-2.5 text-sm font-medium outline-none ring-1 ring-[#092A4D]/10 focus:ring-2 focus:ring-[#fd7933]/50"
            style={{ color: NAVY }}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold" style={{ color: NAVY }}>
            {t("admin.push.urlLabel")}
          </span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t("admin.push.urlPlaceholder")}
            className="w-full rounded-xl bg-[#f6f8fb] px-4 py-2.5 text-sm font-medium outline-none ring-1 ring-[#092A4D]/10 focus:ring-2 focus:ring-[#fd7933]/50"
            style={{ color: NAVY }}
          />
        </label>

        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
        {result && (
          <div>
            <p className="text-sm font-semibold" style={{ color: "#15803d" }}>
              {result.accepted} {t("admin.push.result.accepted")} · {result.failed} {t("admin.push.result.failed")}
              {result.removed > 0 && ` · ${result.removed} ${t("admin.push.result.removed")}`}
            </p>
            <p className="mt-1 text-xs" style={{ color: `${NAVY}80` }}>
              {t("admin.push.result.note")}
            </p>
          </div>
        )}
        {subscriberCount === 0 && <p className="text-sm" style={{ color: `${NAVY}80` }}>{t("admin.push.noSubscribers")}</p>}

        <button
          type="submit"
          disabled={sending || subscriberCount === 0}
          className="mt-1 inline-flex w-fit items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity disabled:opacity-50"
          style={{ backgroundColor: ORANGE }}
        >
          {sending ? t("admin.push.sending") : t("admin.push.send")}
        </button>
      </form>
    </div>
  );
}
