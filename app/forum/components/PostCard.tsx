"use client";

import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useT } from "../../i18n/I18nProvider";
import { formatDate } from "@/lib/format";
import { Avatar } from "./Avatar";
import type { ForumComment, ForumPost } from "./types";

const NAVY = "#092A4D";
const ORANGE = "#fd7933";

export function PostCard({ post }: { post: ForumPost }) {
  const t = useT();
  const { user } = useAuth();
  const [liked, setLiked] = useState(post.likedByMe);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [viewCount, setViewCount] = useState(post.viewCount);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/forum/posts/${post.id}/view`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data?.viewCount === "number") setViewCount(data.viewCount);
      })
      .catch(() => {});
    // Fires once per (post, logged-in user) — post.id is stable for this component's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  async function toggleLike() {
    if (!user) return;
    const res = await fetch(`/api/forum/posts/${post.id}/like`, { method: "POST" });
    const data = await res.json().catch(() => null);
    if (res.ok && data) {
      setLiked(data.liked);
      setLikeCount(data.likeCount);
    }
  }

  return (
    <article className="rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(9,42,77,0.05)] sm:p-6">
      <div className="flex items-start gap-3">
        <Avatar name={post.author.displayName} />
        <div className="min-w-0">
          <p className="text-sm font-bold" style={{ color: NAVY }}>
            {post.author.displayName}
          </p>
          <p className="text-xs" style={{ color: `${NAVY}80` }}>
            {formatDate(post.createdAt)}
          </p>
        </div>
      </div>

      <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed" style={{ color: NAVY }}>
        {post.body}
      </p>

      {post.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.imageUrl}
          alt={t("forum.post.imageAlt")}
          className="mt-4 max-h-96 w-full rounded-xl object-cover"
        />
      )}

      <div
        className="mt-4 flex items-center gap-4 border-t border-[#092A4D]/10 pt-3 text-xs font-bold"
        style={{ color: `${NAVY}80` }}
      >
        <button
          type="button"
          onClick={toggleLike}
          disabled={!user}
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 transition-colors hover:bg-[#f6f8fb] disabled:cursor-default disabled:hover:bg-transparent"
          style={liked ? { color: ORANGE } : undefined}
        >
          <HeartIcon filled={liked} />
          {likeCount} {liked ? t("forum.post.liked") : t("forum.post.like")}
        </button>

        <button
          type="button"
          onClick={() => setShowComments((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 transition-colors hover:bg-[#f6f8fb]"
        >
          <CommentIcon />
          {post.commentCount} {t("forum.post.comments")}
        </button>

        <span className="ml-auto inline-flex items-center gap-1.5">
          <EyeIcon />
          {viewCount} {t("forum.post.views")}
        </span>
      </div>

      {showComments && <CommentsSection postId={post.id} />}
    </article>
  );
}

function CommentsSection({ postId }: { postId: string }) {
  const t = useT();
  const { user } = useAuth();
  const [comments, setComments] = useState<ForumComment[] | null>(null);
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/forum/posts/${postId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setComments(data?.comments ?? []);
      })
      .catch(() => {
        if (!cancelled) setComments([]);
      });
    return () => {
      cancelled = true;
    };
  }, [postId]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!draft.trim() || !user) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/forum/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: draft }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.comment) {
        setComments((prev) => [...(prev ?? []), data.comment]);
        setDraft("");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-4 border-t border-[#092A4D]/10 pt-4">
      {comments === null ? (
        <p className="text-xs" style={{ color: `${NAVY}60` }}>
          …
        </p>
      ) : comments.length === 0 ? (
        <p className="text-xs" style={{ color: `${NAVY}60` }}>
          {t("forum.post.noComments")}
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {comments.map((c) => (
            <li key={c.id} className="flex items-start gap-2.5">
              <Avatar name={c.author.displayName} small />
              <div className="min-w-0 rounded-2xl bg-[#f6f8fb] px-3.5 py-2">
                <p className="text-xs font-bold" style={{ color: NAVY }}>
                  {c.author.displayName}
                </p>
                <p className="whitespace-pre-wrap break-words text-sm" style={{ color: NAVY }}>
                  {c.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {user ? (
        <form onSubmit={onSubmit} className="mt-3 flex items-center gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t("forum.post.commentPlaceholder")}
            maxLength={2000}
            className="min-w-0 flex-1 rounded-full bg-[#f6f8fb] px-4 py-2 text-sm font-medium outline-none ring-1 ring-[#092A4D]/10 focus:ring-2 focus:ring-[#fd7933]/50"
            style={{ color: NAVY }}
          />
          <button
            type="submit"
            disabled={submitting || !draft.trim()}
            className="inline-flex items-center rounded-full px-4 py-2 text-xs font-bold text-white disabled:opacity-40"
            style={{ backgroundColor: ORANGE }}
          >
            {t("forum.post.commentButton")}
          </button>
        </form>
      ) : (
        <p className="mt-3 text-xs font-semibold" style={{ color: `${NAVY}80` }}>
          {t("forum.post.loginToComment")}
        </p>
      )}
    </div>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

function CommentIcon() {
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
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-4-1L3 20l1-4.5a8.38 8.38 0 0 1-1-4A8.38 8.38 0 0 1 11.5 3a8.5 8.5 0 0 1 9.5 8.5Z" />
    </svg>
  );
}

function EyeIcon() {
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
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
