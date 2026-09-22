-- =====================================================
-- GAPA LEDERWAREN – VOLLEDIG SCHEMA + VOORRAAD
-- Plak dit in Supabase SQL Editor en klik RUN
-- =====================================================

-- Extensie
create extension if not exists pgcrypto;


-- =====================================================
-- PROFILES TABEL
-- =====================================================
create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text,
    display_name text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.profiles (id, email, display_name)
    values (
        new.id,
        new.email,
        coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1))
    )
    on conflict (id) do update set
        email = excluded.email,
        updated_at = now();
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
    before update on public.profiles
    for each row execute procedure public.set_updated_at();


-- =====================================================
-- PRODUCTS TABEL (met stock kolom)
-- =====================================================
create table if not exists public.products (
    id bigint primary key,
    image_path text not null,
    name text not null,
    category text not null check (category in ('kleding', 'tassen')),
    color text not null,
    details text not null,
    stock integer not null default 5,
    is_available boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Stock kolom toevoegen als de tabel al bestond zonder stock
alter table public.products add column if not exists stock integer not null default 5;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
    before update on public.products
    for each row execute procedure public.set_updated_at();

create index if not exists products_category_idx on public.products (category);
create index if not exists products_color_idx on public.products (color);
create index if not exists products_available_idx on public.products (is_available);


-- =====================================================
-- ADMINS TABEL
-- =====================================================
create table if not exists public.admins (
    user_id uuid primary key references auth.users(id) on delete cascade,
    created_at timestamptz not null default now()
);


-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.admins enable row level security;

-- Profiles
drop policy if exists "Users can view their profile" on public.profiles;
create policy "Users can view their profile"
    on public.profiles for select to authenticated
    using ((select auth.uid()) = id);

drop policy if exists "Users can update their profile" on public.profiles;
create policy "Users can update their profile"
    on public.profiles for update to authenticated
    using ((select auth.uid()) = id)
    with check ((select auth.uid()) = id);

-- Products: iedereen mag lezen
drop policy if exists "Anyone can view available products" on public.products;
create policy "Anyone can view available products"
    on public.products for select to anon, authenticated
    using (is_available = true);

-- Products: alleen admins mogen updaten
drop policy if exists "Admins mogen voorraad aanpassen" on public.products;
create policy "Admins mogen voorraad aanpassen"
    on public.products for update to authenticated
    using (
        exists (select 1 from public.admins where admins.user_id = (select auth.uid()))
    )
    with check (
        exists (select 1 from public.admins where admins.user_id = (select auth.uid()))
    );

-- Admins: ingelogde gebruikers mogen lezen (om te checken of je admin bent)
drop policy if exists "Ingelogde gebruikers mogen admins lezen" on public.admins;
create policy "Ingelogde gebruikers mogen admins lezen"
    on public.admins for select to authenticated
    using (true);


-- =====================================================
-- PRODUCTEN INVOEREN
-- =====================================================
insert into public.products (id, image_path, name, category, color, details, stock)
values
    (1,  'longsleevezwartgrijs.jpeg',                              'Lange mouwen longsleeve',             'kleding', 'grijs',  'Lange mouwen, grijs met zwarte mouwen', 5),
    (2,  'dameskraagdasdetail.jpg',                                'Dames shirt met kraag',               'kleding', 'roze',   'Dames shirt lange mouw met kraag, roze/bruin', 5),
    (3,  'longsleeveblauwgrijs.jpg',                               'Lange mouwen longsleeve',             'kleding', 'blauw',  'Lange mouwen, donkerblauw met grijze mouwen', 5),
    (4,  'longsleeverozemetzwart.jpg',                             'Lange mouwen longsleeve',             'kleding', 'roze',   'Lange mouwen, roze met zwarte mouwen', 5),
    (5,  'oversizedlongsleeveshirt.jpg',                           'Oversized longsleeve shirt',          'kleding', 'grijs',  'Oversized longsleeve shirt, lichtgrijs', 5),
    (6,  'oversizedlongsleeveshirtblauw.jpg',                      'Oversized longsleeve shirt',          'kleding', 'blauw',  'Oversized longsleeve shirt, blauw', 5),
    (7,  'gestreeptesweaterroodroze.jpg',                          'Gestreepte sweater',                  'kleding', 'rood',   'Gestreepte sweater, losvallende fit, bordeauxrood en lichtroze', 5),
    (8,  'gestreeptesweaterwitbruin.jpg',                          'Gestreepte sweater',                  'kleding', 'bruin',  'Gestreepte sweater, lichtbruin en wit', 5),
    (9,  'gestreeptesweaterblauwwit.jpg',                          'Gestreepte sweater',                  'kleding', 'blauw',  'Gestreepte sweater, donkerblauw en wit', 5),
    (10, 'gestreeptesweaterblauwgroen.jpg',                        'Gestreepte sweater',                  'kleding', 'blauw',  'Gestreepte sweater, lichtblauw en donkergroen', 5),
    (11, 'manteljasmetriemdonkergroen.jpg',                        'Manteljas met riem',                  'kleding', 'groen',  'Manteljas met riem, donkergroen', 5),
    (12, 'manteljasmetriembruin.jpg',                              'Manteljas met riem',                  'kleding', 'bruin',  'Manteljas met riem, camel-achtige bruine tint', 5),
    (13, 'kantttoplangemouwenblauw.jpg',                           'Kanttop met lange mouwen',            'kleding', 'blauw',  'Kanttop met lange mouwen, donkerblauw', 5),
    (14, 'kanttoplangemouwenroze.jpg',                             'Kanttop met lange mouwen',            'kleding', 'roze',   'Kanttop met lange mouwen, oud roze', 5),
    (15, 'kanttoplangemouwengroen.jpg',                            'Kanttop met lange mouwen',            'kleding', 'groen',  'Kanttop met lange mouwen, donkergroen', 5),
    (16, 'kanttoplangemouwenbeige.jpg',                            'Kanttop met lange mouwen',            'kleding', 'beige',  'Kanttop met lange mouwen, beige/offwhite', 5),
    (17, 'kanttoplangemouwenmiddengrijs.jpg',                      'Kanttop met lange mouwen',            'kleding', 'grijs',  'Kanttop met lange mouwen, middengrijs', 5),
    (18, 'kanttoplangemouwendonkerrood.jpg',                       'Kanttop met lange mouwen',            'kleding', 'rood',   'Kanttop met lange mouwen, bordeauxrood', 5),
    (19, 'kanttoplangemouwenzwart.jpg',                            'Kanttop met lange mouwen',            'kleding', 'zwart',  'Kanttop met lange mouwen, zwart', 5),
    (20, 'satijnenblousemetlangemouwenrood.jpg',                   'Satijnen blouse',                     'kleding', 'rood',   'Satijnen blouse met lange mouwen, bordeauxrood', 5),
    (21, 'gebreidetruimethogekraag.jpg',                           'Gebreide trui met hoge kraag',        'kleding', 'grijs',  'Gebreide trui met hoge kraag, lichtgrijs', 5),
    (22, 'gebreidetruimethogekraagteal.jpg',                       'Gebreide trui met hoge kraag',        'kleding', 'teal',   'Gebreide trui met hoge kraag, teal', 5),
    (23, 'sherpajasmethogekraag.jpg',                              'Fleece/sherpa jas',                   'kleding', 'bruin',  'Fleece/sherpa jas met hoge kraag, middenbruin', 5),
    (24, 'sherpajasmethogekraag.jpg',                              'Fleece/sherpa jas',                   'kleding', 'beige',  'Fleece/sherpa jas met hoge kraag, beige met bruine details', 5),
    (25, 'lerenschoudertasmetvoorvakdonkerbruin.jpg',              'Leren schoudertas met voorvak',       'tassen',  'bruin',  'Leren schoudertas met voorvak, donkerbruin', 5),
    (26, 'lerenschoudertasmetvoorvakdonkerbruinenbruinegloed.jpg', 'Vintage leren schoudertas',           'tassen',  'bruin',  'Vintage model met dubbele verticale ritsen, donkerbruin', 5),
    (27, 'lerenrugzakbruin.jpg',                                   'Vintage leren rugzak',                'tassen',  'bruin',  'Leren rugzak met voorvak, top-handle en verstelbare banden', 5),
    (28, 'lerenschoudertasrechhoekingmodel.jpg',                   'Rechthoekige leren schoudertas',      'tassen',  'bruin',  'Leren schoudertas met voorvak en verstelbare schouderband', 5),
    (29, 'vintagelerentotebagmetverstelbareschouderband.jpg',      'Vintage leren tote bag',              'tassen',  'bruin',  'Vintage leren tote bag met verstelbare schouderbanden', 5),
    (30, 'lerenschoudertasmetlogopatch.jpg',                       'Leren schoudertas met logo patch',    'tassen',  'bruin',  'Rechthoekig model met voorvak en logo patch', 5),
    (31, 'lerenschoudertasmetflap.jpg',                            'Leren schoudertas met flap',          'tassen',  'bruin',  'Leren schoudertas met flap en voorvak', 5),
    (32, 'gevlochtenhandtasdonkerbruin.jpg',                       'Gevlochten handtas',                  'tassen',  'bruin',  'Korte handvatten en verstelbare schouderband, basket-wave model', 5),
    (33, 'gevlochtentotebagdonkerbruin.jpg',                       'Gevlochten tote bag',                 'tassen',  'bruin',  'Twee handvatten en een open bovenkant', 5),
    (34, 'gevlochtenhandtaszwartgroenegloed.jpg',                  'Gevlochten handtas',                  'tassen',  'zwart',  'Gevlochten handtas met schouderband en korte handvatten', 5),
    (35, 'lerenschoudertasmiddenstikselzwart.jpg',                 'Leren schoudertas met flaplijn',      'tassen',  'zwart',  'Middenstiksel, rechte flaplijn en verstelbare schouderband', 5),
    (36, 'lerenrugzakgladdevoorkantzwart.jpg',                     'Leren rugzak',                        'tassen',  'zwart',  'Gladde voorkant, top handle en verstelbare schouderbanden', 5),
    (37, 'Zwartelerenrugzakmetflapengesp.jpg',                     'Leren rugzak met flap en gesp',       'tassen',  'zwart',  'Gladde voorkant zonder extra vakken, overslagklep', 5),
    (38, 'lerenschoudertasmetdubbelevoorritsenzwart.jpg',          'Leren schoudertas met dubbele rits',  'tassen',  'zwart',  'Dubbele voorritsen en verstelbare schouderband', 5),
    (39, 'suedeschoudertasjemetvoorritscamelbruin.jpg',            'Suede schoudertasje',                 'tassen',  'bruin',  'Verstelbare band, minimalistische voorkant', 5),
    (40, 'suedeschoudertasjemetflapbruin.jpg',                     'Suede handtas met flap',              'tassen',  'bruin',  'Flap en goudkleurige hardware', 5),
    (41, 'suedeschoudertasjegoudkettinggrijs.jpg',                 'Suede schoudertasje met goudketting', 'tassen',  'grijs',  'Lange band met goudkleurig kettingdetail', 5),
    (42, 'suedeschoudertasjebruincamelbruin.jpg',                  'Suede handtas met goudhardware',      'tassen',  'bruin',  'Lange schouderband en goudhardware', 5),
    (43, 'suedeschoudertasjebruin.jpg',                            'Suede handtas met voorrits',          'tassen',  'bruin',  'Voorrits en goudhardware', 5),
    (44, 'suedepouchtasjedonkerbruin.jpg',                         'Suede pouch-tasje',                   'tassen',  'bruin',  'Messing hardware en zwarte schouderband', 5),
    (45, 'suedeschoudertasmetflapdonkerbruin.jpg',                 'Suede schoudertas met flap',          'tassen',  'bruin',  'Overslagklep en verticale siertiksels', 5),
    (46, 'suedehandtasmetstuds.jpg',                               'Suede handtas met studs',             'tassen',  'bruin',  'Flapsluiting met goud/messingkleurige studs in W-vorm', 5),
    (47, 'eastpackoranjesportief.jpg',                             'Eastpak schoudertas',                 'tassen',  'oranje', 'Sportief model met voorvak en verstelbare band', 5),
    (48, 'eastpackpaarssportiefmodel.jpg',                         'Eastpak schoudertas',                 'tassen',  'paars',  'Sportief model met voorvak en verstelbare band', 5),
    (49, 'eastpackduffeltasdonkerblauw.jpg',                       'Eastpak duffeltas 30 L',              'tassen',  'blauw',  'Voorvak met rits en zwarte draagbanden', 5),
    (50, 'eastpackduffeltasdonkergrijs.jpg',                       'Eastpak duffeltas 30 L',              'tassen',  'grijs',  '30-year warranty, voorvak met rits en zwarte draagbanden', 5),
    (51, 'eastpackrugzakgrijscharcoal.jpg',                        'Eastpak rugzak',                      'tassen',  'grijs',  'Rugzak met voorvak, charcoal', 5),
    (52, 'eastpackrugzakzwartneutraal.jpg',                        'Eastpak rugzak',                      'tassen',  'zwart',  'Rugzak met voorvak, strakke zwarte stof', 5),
    (53, 'eastpackrugzakpaarsdonker.jpg',                          'Eastpak rugzak',                      'tassen',  'paars',  'Rugzak met voorvak, diepe paarse stof', 5),
    (54, 'eastpackrugzakblauwfel.jpg',                             'Eastpak rugzak',                      'tassen',  'blauw',  'Rugzak met voorvak, heldere blauwe stof', 5),
    (55, 'eastpackrugzakgrijscharcoalkoel.jpg',                    'Eastpak rugzak',                      'tassen',  'grijs',  'Rugzak met voorvak, grijze stof', 5)
on conflict (id) do update set
    image_path   = excluded.image_path,
    name         = excluded.name,
    category     = excluded.category,
    color        = excluded.color,
    details      = excluded.details,
    updated_at   = now();
-- (stock wordt niet overschreven zodat aanpassingen bewaard blijven)


-- =====================================================
-- STORAGE BUCKET VOOR MATCHER
-- =====================================================
insert into storage.buckets (id, name, public)
values ('matcher-uploads', 'matcher-uploads', false)
on conflict (id) do nothing;
