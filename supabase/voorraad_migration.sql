-- =====================================================
-- GAPA LEDERWAREN – VOORRAAD + ADMIN MIGRATIE
-- Plak dit in Supabase SQL Editor en klik RUN
-- =====================================================


-- 1. Voorraad kolom toevoegen aan products tabel
--    (als die al bestaat, geeft dit geen fout)
alter table public.products
    add column if not exists stock integer not null default 0;

-- Zet bestaande producten op een realistische beginvoorraad
update public.products set stock = 5 where stock = 0;


-- 2. Admin tabel
--    Hier staan de UUID's van gebruikers die admin zijn.
--    Voeg jouw eigen user-id toe via de Supabase dashboard
--    (Authentication → Users → kopieer jouw UUID)
create table if not exists public.admins (
    user_id uuid primary key references auth.users(id) on delete cascade,
    created_at timestamptz not null default now()
);

-- Row Level Security inschakelen
alter table public.admins enable row level security;

-- Iedereen (ingelogd) mag checken of hij admin is
drop policy if exists "Ingelogde gebruikers mogen admins lezen" on public.admins;
create policy "Ingelogde gebruikers mogen admins lezen"
    on public.admins for select
    to authenticated
    using (true);

-- Alleen de service_role mag admins toevoegen/verwijderen
-- (dat doe jij via het Supabase dashboard of SQL editor)


-- 3. Voorraad RLS: iedereen mag lezen, alleen admins mogen updaten
--    Producten zijn al leesbaar voor anon+authenticated (zie schema.sql)

-- Update policy: alleen als user in admins tabel zit
drop policy if exists "Admins mogen voorraad aanpassen" on public.products;
create policy "Admins mogen voorraad aanpassen"
    on public.products for update
    to authenticated
    using (
        exists (
            select 1 from public.admins
            where admins.user_id = (select auth.uid())
        )
    )
    with check (
        exists (
            select 1 from public.admins
            where admins.user_id = (select auth.uid())
        )
    );


-- =====================================================
-- NA HET DRAAIEN:
-- Ga naar Authentication → Users in Supabase dashboard
-- Kopieer jouw UUID en voer dit uit:
--
--   insert into public.admins (user_id)
--   values ('<jouw-uuid-hier>');
--
-- =====================================================
