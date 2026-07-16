-- StudyNL forum schema.
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query → paste → Run).
--
-- Design note: all reads/writes to these tables happen through Next.js Route
-- Handlers (app/api/**) using the service-role key — never from the browser.
-- RLS is enabled with zero policies as defense-in-depth (blocks the anon/
-- authenticated roles entirely at the DB level); the service role bypasses
-- RLS regardless, so the app keeps working normally.

create extension if not exists pgcrypto;

-- One row per auth.users user, holding the public display name shown on posts.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.forum_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 4000),
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.forum_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.forum_posts (id) on delete cascade,
  author_id uuid not null references auth.users (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

create table if not exists public.forum_likes (
  post_id uuid not null references public.forum_posts (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

-- One row per (post, user) so a logged-in view only ever counts once.
create table if not exists public.forum_post_views (
  post_id uuid not null references public.forum_posts (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create index if not exists forum_comments_post_id_idx on public.forum_comments (post_id, created_at);
create index if not exists forum_posts_created_at_idx on public.forum_posts (created_at desc);
create index if not exists profiles_created_at_idx on public.profiles (created_at);

alter table public.profiles enable row level security;
alter table public.forum_posts enable row level security;
alter table public.forum_comments enable row level security;
alter table public.forum_likes enable row level security;
alter table public.forum_post_views enable row level security;

-- Storage bucket for post images, uploaded via app/api/forum/upload (service role only).
insert into storage.buckets (id, name, public)
values ('forum-media', 'forum-media', true)
on conflict (id) do nothing;

-- Per-post aggregate counts for a batch of posts, used by lib/forum/serialize.ts.
-- Returning one row per post_id (not a raw row per like/comment/view) keeps the
-- response small regardless of how many likes/comments/views a post accumulates —
-- a plain `select ... in (post_ids)` on the raw tables would eventually hit
-- PostgREST's default row cap and silently undercount popular posts.
create or replace function public.forum_like_counts(post_ids uuid[])
returns table (post_id uuid, count bigint)
language sql
stable
as $$
  select post_id, count(*) from public.forum_likes where post_id = any(post_ids) group by post_id;
$$;

create or replace function public.forum_comment_counts(post_ids uuid[])
returns table (post_id uuid, count bigint)
language sql
stable
as $$
  select post_id, count(*) from public.forum_comments where post_id = any(post_ids) group by post_id;
$$;

create or replace function public.forum_view_counts(post_ids uuid[])
returns table (post_id uuid, count bigint)
language sql
stable
as $$
  select post_id, count(*) from public.forum_post_views where post_id = any(post_ids) group by post_id;
$$;
