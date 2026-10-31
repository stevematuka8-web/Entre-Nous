-- ENTRE-NOUS — annonces, favoris, messagerie Connect, mises en relation Business
-- À coller dans Supabase Dashboard > SQL Editor > New query, puis "Run".
-- Prérequis : supabase/schema.sql (table profiles) déjà exécuté.

create extension if not exists pgcrypto;

-- ─── Annonces publiées par les utilisateurs (dashboard Prestataire) ───
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  category text not null,
  space text not null check (space in ('digital', 'marketplace')),
  price text not null,
  description text not null,
  cover text not null,
  created_at timestamptz not null default now()
);

alter table public.listings enable row level security;

create policy "Listings are viewable by everyone"
  on public.listings for select
  using (true);

create policy "Owners can publish listings"
  on public.listings for insert
  with check (auth.uid() = owner_id);

create policy "Owners or admin can remove listings"
  on public.listings for delete
  using (
    auth.uid() = owner_id
    or auth.uid() = (select id from public.profiles order by created_at asc limit 1)
  );

-- ─── Favoris (dashboard Acheteur) ───
create table if not exists public.favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  service_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, service_id)
);

alter table public.favorites enable row level security;

create policy "Users manage their own favorites"
  on public.favorites for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── Messagerie ENTRE-NOUS CONNECT ───
-- Conversations fictives entre l'utilisateur et des prestataires du
-- catalogue (pas de vrais comptes en face) : privées à chaque utilisateur.
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  participant_name text not null,
  participant_role text not null,
  context_label text,
  context_href text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, participant_name)
);

alter table public.conversations enable row level security;

create policy "Users manage their own conversations"
  on public.conversations for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  owner_id uuid not null references auth.users (id) on delete cascade,
  from_me boolean not null,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

create policy "Users manage their own messages"
  on public.messages for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- ─── ENTRE-NOUS BUSINESS — mises en relation / commissions ───
create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  proposer_id uuid not null references auth.users (id) on delete cascade,
  service_id text not null,
  service_title text not null,
  service_href text not null,
  provider text not null,
  commission_rate text not null,
  status text not null default 'en_attente' check (status in ('en_attente', 'validee')),
  created_at timestamptz not null default now(),
  unique (proposer_id, service_id)
);

alter table public.deals enable row level security;

-- Chaque apporteur voit ses propres mises en relation ; l'administrateur
-- (premier compte inscrit, même convention que pour profiles) les voit
-- toutes pour le pilotage global.
create policy "Deals are viewable by their owner or the admin"
  on public.deals for select
  using (
    auth.uid() = proposer_id
    or auth.uid() = (select id from public.profiles order by created_at asc limit 1)
  );

create policy "Users propose their own deals"
  on public.deals for insert
  with check (auth.uid() = proposer_id);

create policy "Users update their own deals"
  on public.deals for update
  using (auth.uid() = proposer_id);
