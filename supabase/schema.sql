-- ENTRE-NOUS — schéma d'authentification Supabase
-- À coller dans Supabase Dashboard > SQL Editor > New query, puis "Run".

-- Table de profil publique, liée 1-1 à auth.users.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  email text not null,
  roles text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Tout le monde peut lire les profils (nom, rôles affichés publiquement :
-- cartes prestataires, listes admin, etc.).
-- Note : l'email est dupliqué ici (depuis auth.users, normalement privé)
-- uniquement pour que la liste "Utilisateurs" de l'admin puisse l'afficher
-- sans clé service_role. Il devient donc lisible par n'importe quel compte
-- connecté — acceptable pour ce prototype interne, à revoir avant une mise
-- en production grand public (ex. route admin côté serveur + service role).
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

-- Chacun ne peut modifier que son propre profil (ex. activer/désactiver un rôle).
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- À l'inscription, Supabase Auth crée une ligne dans auth.users ; ce trigger
-- crée automatiquement la ligne de profil correspondante, avec le nom et les
-- rôles transmis via `options.data` lors de l'appel à `supabase.auth.signUp`.
-- SECURITY DEFINER : l'insertion contourne la RLS (l'utilisateur n'a pas
-- encore de session active si la confirmation par email est activée).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, roles)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(
      (
        select array_agg(value::text)
        from jsonb_array_elements_text(new.raw_user_meta_data -> 'roles')
      ),
      '{}'
    )
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
