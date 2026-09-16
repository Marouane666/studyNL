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

-- Hub Plus membership (paid premium access to /hub-plus/dashboard). Deliberately
-- a separate column from `role`, not a fourth role value: role answers "what may
-- this user do in the forum" (member/moderator/admin) while plan answers "has
-- this user paid", and the two are independent — an admin or moderator can hold
-- a paid membership, and only a plan needs an expiry date.
alter table public.profiles add column if not exists plan text not null default 'free';
alter table public.profiles add column if not exists plan_started_at timestamptz;
-- null = no end date (open-ended/lifetime grant); a past timestamp = lapsed.
alter table public.profiles add column if not exists plan_expires_at timestamptz;

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'profiles_plan_check') then
    alter table public.profiles add constraint profiles_plan_check check (plan in ('free', 'premium'));
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

-- Web push subscriptions (PWA install → "enable notifications"). user_id is
-- nullable because a visitor can enable notifications without an account —
-- the endpoint alone is enough to deliver to that browser/device.
create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  endpoint text not null unique,
  p256dh text not null,
  auth_key text not null,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists push_subscriptions_user_id_idx on public.push_subscriptions (user_id);

alter table public.push_subscriptions enable row level security;

-- Newsletter sign-ups from the site-wide email capture popup. email is unique so
-- a repeat visitor re-subscribing is a no-op rather than a duplicate row; the
-- route turns the unique violation into a success response.
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (char_length(email) between 3 and 320),
  created_at timestamptz not null default now()
);

create index if not exists newsletter_subscribers_created_at_idx on public.newsletter_subscribers (created_at desc);

alter table public.newsletter_subscribers enable row level security;

-- Checkout consent records (app/hub-plus/join → app/api/hub-plus/checkout).
--
-- EU distance-selling rules only let a member waive their 14-day withdrawal
-- right if they expressly consented to immediate delivery of the digital
-- content, so this is the durable record of that: the verbatim sentence the
-- member was shown, not just a boolean, because "they ticked a box" is worth
-- nothing without proof of what the box said. Rows are append-only and are
-- deliberately never updated — a later purchase writes a new row.
create table if not exists public.hub_plus_consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  -- The policy revision in force at the time (lib/legal.ts POLICY_VERSION).
  policy_version text not null,
  consent_text text not null,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists hub_plus_consents_user_id_idx
  on public.hub_plus_consents (user_id, created_at desc);

alter table public.hub_plus_consents enable row level security;

-- Preferred site language, held on the account rather than only in the
-- visitor's localStorage (app/i18n/I18nProvider.tsx). Two reasons: the choice
-- follows a member across devices, and anything sent from the server — email
-- above all — has no access to localStorage and would otherwise have no way of
-- knowing whether to write to someone in English or Dutch.
--
-- No check constraint on purpose: the supported set lives in
-- app/i18n/dictionary.ts (LANGUAGES) and route handlers validate against it, so
-- adding a language doesn't need a migration to go with it.
alter table public.profiles add column if not exists language text not null default 'en';

-- Stripe linkage for Hub Plus subscriptions.
--
-- The customer id is kept so a returning member reuses their Stripe customer
-- record instead of accumulating a new one per checkout attempt — duplicates
-- would split their billing history and break the customer portal.
--
-- subscription_status mirrors Stripe's own status ('active', 'past_due',
-- 'canceled', ...) and exists for support and display only: access is still
-- decided by plan + plan_expires_at (lib/plan.ts), so a webhook that never
-- arrives can't silently hand out or revoke access on its own.
alter table public.profiles add column if not exists stripe_customer_id text;
alter table public.profiles add column if not exists stripe_subscription_id text;
alter table public.profiles add column if not exists subscription_status text;

-- Partial, so the many rows with no Stripe customer yet don't collide on null.
create unique index if not exists profiles_stripe_customer_id_key
  on public.profiles (stripe_customer_id)
  where stripe_customer_id is not null;
