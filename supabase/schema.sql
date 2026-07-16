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

-- Roles + moderation (added after initial launch) — safe to re-run: every
-- statement below is idempotent against the tables/functions created above.

-- Denormalized copy of auth.users.email so the admin user list is a single
-- query against profiles instead of an admin-API round trip per row.
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists role text not null default 'member';
alter table public.profiles add column if not exists status text not null default 'active';

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'profiles_role_check') then
    alter table public.profiles add constraint profiles_role_check check (role in ('member', 'moderator', 'admin'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'profiles_status_check') then
    alter table public.profiles add constraint profiles_status_check check (status in ('active', 'suspended'));
  end if;
end $$;

-- 'hidden' = removed from the public feed by a moderator/admin, but kept
-- (not deleted) so it can be restored ("approved") instead of losing it for good.
alter table public.forum_posts add column if not exists status text not null default 'visible';
alter table public.forum_comments add column if not exists status text not null default 'visible';

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'forum_posts_status_check') then
    alter table public.forum_posts add constraint forum_posts_status_check check (status in ('visible', 'hidden'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'forum_comments_status_check') then
    alter table public.forum_comments add constraint forum_comments_status_check check (status in ('visible', 'hidden'));
  end if;
end $$;

-- Public comment counts only include visible comments, so the number shown
-- always matches what a regular member can actually see and expand.
create or replace function public.forum_comment_counts(post_ids uuid[])
returns table (post_id uuid, count bigint)
language sql
stable
as $$
  select post_id, count(*) from public.forum_comments
  where post_id = any(post_ids) and status = 'visible'
  group by post_id;
$$;

-- Public contact form submissions (app/contact). No auth required to submit;
-- only ever read/written via the service role, same as everything above.
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  message text not null check (char_length(message) between 1 and 4000),
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

-- Personal move plan (app/start) — one row per user, holding their journey
-- answers and per-task completion state so the plan follows them across
-- devices instead of living only in browser localStorage.
create table if not exists public.move_plans (
  user_id uuid primary key references auth.users (id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  done jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.move_plans enable row level security;
