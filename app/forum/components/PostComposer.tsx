"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useT } from "../../i18n/I18nProvider";
import { Avatar } from "./Avatar";
import type { ForumPost } from "./types";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";

export function PostComposer({ onCreated }: { onCreated: (post: ForumPost) => void }) {
  const t = useT();
  const { user } = useAuth();
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!user) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center shadow-[0_2px_10px_rgba(9,42,77,0.05)]">
        <p className="text-sm font-semibold" style={{ color: `${NAVY}99` }}>
          {t("forum.compose.loginPrompt")}
        </p>
      </div>
    );
  }

  async function onPickImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setError(null);
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/forum/upload", { method: "POST", body: form });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error);
      setImageUrl(data.url);
    } catch {
      setError(t("forum.compose.uploadError"));
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;

    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/forum/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body, imageUrl }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error);
      onCreated(data.post);
      setBody("");
      setImageUrl(null);
    } catch {
      setError(t("forum.compose.postError"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(9,42,77,0.05)]">
      <div className="flex items-start gap-3">
        <Avatar name={user.displayName} />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={t("forum.compose.placeholder")}
          rows={2}
          maxLength={4000}
          className="min-w-0 flex-1 resize-none rounded-2xl bg-[#f6f8fb] px-4 py-3 text-sm font-medium outline-none ring-1 ring-[#092A4D]/10 focus:ring-2 focus:ring-[#fd7933]/50"
          style={{ color: NAVY }}
        />
      </div>

      {imageUrl && (
        <div className="relative mt-3 w-fit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="" className="max-h-56 rounded-xl object-cover" />
          <button
            type="button"
            onClick={() => setImageUrl(null)}
            aria-label={t("forum.compose.removeImage")}
            className="absolute -right-2 -top-2 inline-flex size-7 items-center justify-center rounded-full bg-white text-lg leading-none text-[#092A4D] shadow ring-1 ring-[#092A4D]/10"
          >
            ×
          </button>
        </div>
      )}

      {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
      {uploading && (
        <p className="mt-3 text-sm font-semibold" style={{ color: `${NAVY}80` }}>
          {t("forum.compose.uploading")}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-[#092A4D]/10 pt-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || !!imageUrl}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors hover:bg-[#f6f8fb] disabled:opacity-40"
          style={{ color: NAVY }}
        >
          <ImageIcon />
          {t("forum.compose.addImage")}
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={onPickImage} className="hidden" />

        <button
          type="submit"
          disabled={submitting || uploading || !body.trim()}
          className="inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm transition-opacity disabled:opacity-40"
          style={{ backgroundColor: ORANGE }}
        >
          {t("forum.compose.button")}
        </button>
      </div>
    </form>
  );
}

function ImageIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}
