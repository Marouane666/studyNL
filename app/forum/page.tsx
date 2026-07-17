"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useT } from "../i18n/I18nProvider";
import { AuthPanel } from "./components/AuthPanel";
import { PostComposer } from "./components/PostComposer";
import { PostCard } from "./components/PostCard";
import { MembersTab } from "./components/MembersTab";
import { AboutTab } from "./components/AboutTab";
import type { ForumPost } from "./components/types";

const BG = "#EAF6FF";
const NAVY = "#092A4D";
const ORANGE = "#fd7933";

type Tab = "discussion" | "members" | "about";

const TABS: { key: Tab; labelKey: string }[] = [
  { key: "discussion", labelKey: "forum.tabs.discussion" },
  { key: "members", labelKey: "forum.tabs.members" },
  { key: "about", labelKey: "forum.tabs.about" },
];

export default function ForumPage() {
  const t = useT();
  const { user, loading: authLoading, logout } = useAuth();
  const [tab, setTab] = useState<Tab>("discussion");
  const [posts, setPosts] = useState<ForumPost[] | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (tab !== "discussion" || posts !== null) return;
    let cancelled = false;
    fetch("/api/forum/posts")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setPosts(data?.posts ?? []);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [tab, posts]);

  const feedContent = (
    <>
      {loadError && <p className="text-sm font-semibold text-red-600">{t("forum.loadError")}</p>}

      {posts && posts.length === 0 && !loadError && (
        <div className="rounded-2xl bg-white p-10 text-center shadow-[0_1px_2px_rgba(9,42,77,0.04)]">
          <p className="text-lg font-bold" style={{ color: NAVY }}>
            {t("forum.empty.title")}
          </p>
          <p className="mt-1 text-sm" style={{ color: `${NAVY}80` }}>
            {t("forum.empty.subtitle")}
          </p>
        </div>
      )}

      {posts?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onDeleted={(id) => setPosts((prev) => prev?.filter((p) => p.id !== id) ?? null)}
        />
      ))}
    </>
  );

  return (
    <section style={{ backgroundColor: BG, color: NAVY }}>
      <div className="mx-auto max-w-5xl px-6 py-10">
        <span
          className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold ring-1 ring-[#092A4D]/10"
          style={{ color: NAVY }}
        >
          {t("forum.badge")}
        </span>

        <h1
          className="mt-8 max-w-2xl break-words text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight"
          style={{ color: NAVY }}
        >
          {t("forum.title")}
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed" style={{ color: `${NAVY}99` }}>
          {t("forum.subtitle")}
        </p>

        {!authLoading && user && (
          <div
            className="mt-6 flex items-center justify-between gap-3 rounded-full bg-white px-4 py-2 text-xs font-semibold ring-1 ring-[#092A4D]/10"
            style={{ color: `${NAVY}99` }}
          >
            <span>
              {t("auth.loggedInAs")} <strong style={{ color: NAVY }}>{user.displayName}</strong>
            </span>
            <button
              type="button"
              onClick={logout}
              className="font-bold underline-offset-2 hover:underline"
              style={{ color: NAVY }}
            >
              {t("auth.logout")}
            </button>
          </div>
        )}

        <div className="mt-8 flex gap-2 border-b border-[#092A4D]/10">
          {TABS.map((item) => {
            const active = tab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setTab(item.key)}
                className="border-b-2 px-3 pb-3 text-sm font-bold transition-colors"
                style={{
                  color: active ? NAVY : `${NAVY}66`,
                  borderColor: active ? ORANGE : "transparent",
                }}
              >
                {t(item.labelKey)}
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          {tab === "discussion" &&
            !authLoading &&
            (user ? (
              <div className="flex flex-col gap-5">
                <PostComposer onCreated={(p) => setPosts((prev) => [p, ...(prev ?? [])])} />
                {feedContent}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
                <div className="order-2 flex flex-col gap-5 lg:order-1">{feedContent}</div>
                <div className="order-1 lg:order-2 lg:sticky lg:top-24">
                  <AuthPanel />
                </div>
              </div>
            ))}

          {tab === "members" && <MembersTab />}
          {tab === "about" && <AboutTab />}
        </div>
      </div>
    </section>
  );
}
