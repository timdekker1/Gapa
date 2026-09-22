-- ================================================
-- GAPA LEDERWAREN — LOKALE DATABASE INITIALISATIE
-- Wordt automatisch uitgevoerd door PostgreSQL
-- bij de eerste keer opstarten van de container.
-- ================================================


-- ================================================
-- PRODUCTEN TABEL
-- ================================================
create table if not exists public.products (
    id          bigint primary key,
    image_path  text not null,
    name        text not null,
    category    text not null,
    color       text not null,
    details     text not null,
    stock       integer not null default 5,
    is_available boolean not null default true,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);


-- ================================================
-- GEBRUIKERS TABEL (lokaal, zonder Supabase auth)
-- ================================================
create table if not exists public.users (
    id          uuid primary key default gen_random_uuid(),
    email       text not null unique,
    password    text not null,
    is_admin    boolean not null default false,
    created_at  timestamptz not null default now()
);


-- ================================================
-- PRODUCTEN INVOEREN (stock = 5 als beginwaarde)
-- ================================================
insert into public.products (id, image_path, name, category, color, details, stock) values
(1,  'longsleevezwartgrijs.jpeg',                              'Lange mouwen longsleeve',             'kleding', 'grijs',  'Lange mouwen, grijs met zwarte mouwen', 5),
(2,  'dameskraagdasdetail.jpg',                                'Dames shirt met kraag',               'kleding', 'roze',   'Dames shirt lange mouw met kraag, roze/bruin', 5),
(3,  'longsleeveblauwgrijs.jpg',                               'Lange mouwen longsleeve',             'kleding', 'blauw',  'Lange mouwen, donkerblauw met grijze mouwen', 5),
(4,  'longsleeverozemetzwart.jpg',                             'Lange mouwen longsleeve',             'kleding', 'roze',   'Lange mouwen, roze met zwarte mouwen', 5),
(5,  'oversizedlongsleeveshirt.jpg',                           'Oversized longsleeve shirt',          'kleding', 'grijs',  'Oversized longsleeve shirt, lichtgrijs', 5),
(6,  'oversizedlongsleeveshirtblauw.jpg',                      'Oversized longsleeve shirt',          'kleding', 'blauw',  'Oversized longsleeve shirt, blauw', 5),
(7,  'gestreeptesweaterroodroze.jpg',                          'Gestreepte sweater',                  'kleding', 'rood',   'Gestreepte sweater bordeauxrood en lichtroze', 5),
(8,  'gestreeptesweaterwitbruin.jpg',                          'Gestreepte sweater',                  'kleding', 'bruin',  'Gestreepte sweater lichtbruin en wit', 5),
(9,  'gestreeptesweaterblauwwit.jpg',                          'Gestreepte sweater',                  'kleding', 'blauw',  'Gestreepte sweater donkerblauw en wit', 5),
(10, 'gestreeptesweaterblauwgroen.jpg',                        'Gestreepte sweater',                  'kleding', 'blauw',  'Gestreepte sweater lichtblauw en donkergroen', 5),
(11, 'manteljasmetriemdonkergroen.jpg',                        'Manteljas met riem',                  'kleding', 'groen',  'Manteljas met riem donkergroen', 5),
(12, 'manteljasmetriembruin.jpg',                              'Manteljas met riem',                  'kleding', 'bruin',  'Manteljas met riem camel bruin', 5),
(13, 'kantttoplangemouwenblauw.jpg',                           'Kanttop met lange mouwen',            'kleding', 'blauw',  'Kanttop met lange mouwen donkerblauw', 5),
(14, 'kanttoplangemouwenroze.jpg',                             'Kanttop met lange mouwen',            'kleding', 'roze',   'Kanttop met lange mouwen oud roze', 5),
(15, 'kanttoplangemouwengroen.jpg',                            'Kanttop met lange mouwen',            'kleding', 'groen',  'Kanttop met lange mouwen donkergroen', 5),
(16, 'kanttoplangemouwenbeige.jpg',                            'Kanttop met lange mouwen',            'kleding', 'beige',  'Kanttop met lange mouwen beige', 5),
(17, 'kanttoplangemouwenmiddengrijs.jpg',                      'Kanttop met lange mouwen',            'kleding', 'grijs',  'Kanttop met lange mouwen middengrijs', 5),
(18, 'kanttoplangemouwendonkerrood.jpg',                       'Kanttop met lange mouwen',            'kleding', 'rood',   'Kanttop met lange mouwen bordeauxrood', 5),
(19, 'kanttoplangemouwenzwart.jpg',                            'Kanttop met lange mouwen',            'kleding', 'zwart',  'Kanttop met lange mouwen zwart', 5),
(20, 'satijnenblousemetlangemouwenrood.jpg',                   'Satijnen blouse',                     'kleding', 'rood',   'Satijnen blouse met lange mouwen bordeauxrood', 5),
(21, 'gebreidetruimethogekraag.jpg',                           'Gebreide trui met hoge kraag',        'kleding', 'grijs',  'Gebreide trui met hoge kraag lichtgrijs', 5),
(22, 'gebreidetruimethogekraagteal.jpg',                       'Gebreide trui met hoge kraag',        'kleding', 'teal',   'Gebreide trui met hoge kraag teal', 5),
(23, 'sherpajasmethogekraag.jpg',                              'Fleece jas',                          'kleding', 'bruin',  'Fleece jas met hoge kraag middenbruin', 5),
(24, 'sherpajasmethogekraag.jpg',                              'Fleece jas',                          'kleding', 'beige',  'Fleece jas met hoge kraag beige', 5),
(25, 'lerenschoudertasmetvoorvakdonkerbruin.jpg',              'Leren schoudertas met voorvak',       'tassen',  'bruin',  'Leren schoudertas met voorvak donkerbruin', 5),
(26, 'lerenschoudertasmetvoorvakdonkerbruinenbruinegloed.jpg', 'Vintage leren schoudertas',           'tassen',  'bruin',  'Vintage model dubbele verticale ritsen donkerbruin', 5),
(27, 'lerenrugzakbruin.jpg',                                   'Vintage leren rugzak',                'tassen',  'bruin',  'Leren rugzak met voorvak en verstelbare banden', 5),
(28, 'lerenschoudertasrechhoekingmodel.jpg',                   'Rechthoekige leren schoudertas',      'tassen',  'bruin',  'Leren schoudertas met voorvak en verstelbare schouderband', 5),
(29, 'vintagelerentotebagmetverstelbareschouderband.jpg',      'Vintage leren tote bag',              'tassen',  'bruin',  'Vintage leren tote bag met verstelbare schouderbanden', 5),
(30, 'lerenschoudertasmetlogopatch.jpg',                       'Leren schoudertas met logo patch',    'tassen',  'bruin',  'Rechthoekig model met voorvak en logo patch', 5),
(31, 'lerenschoudertasmetflap.jpg',                            'Leren schoudertas met flap',          'tassen',  'bruin',  'Leren schoudertas met flap en voorvak', 5),
(32, 'gevlochtenhandtasdonkerbruin.jpg',                       'Gevlochten handtas',                  'tassen',  'bruin',  'Korte handvatten en verstelbare schouderband', 5),
(33, 'gevlochtentotebagdonkerbruin.jpg',                       'Gevlochten tote bag',                 'tassen',  'bruin',  'Twee handvatten en open bovenkant', 5),
(34, 'gevlochtenhandtaszwartgroenegloed.jpg',                  'Gevlochten handtas',                  'tassen',  'zwart',  'Gevlochten handtas met schouderband', 5),
(35, 'lerenschoudertasmiddenstikselzwart.jpg',                 'Leren schoudertas met flaplijn',      'tassen',  'zwart',  'Middenstiksel en verstelbare schouderband', 5),
(36, 'lerenrugzakgladdevoorkantzwart.jpg',                     'Leren rugzak',                        'tassen',  'zwart',  'Gladde voorkant en verstelbare schouderbanden', 5),
(37, 'Zwartelerenrugzakmetflapengesp.jpg',                     'Leren rugzak met flap en gesp',       'tassen',  'zwart',  'Gladde voorkant zonder extra vakken', 5),
(38, 'lerenschoudertasmetdubbelevoorritsenzwart.jpg',          'Leren schoudertas met dubbele rits',  'tassen',  'zwart',  'Dubbele voorritsen en verstelbare schouderband', 5),
(39, 'suedeschoudertasjemetvoorritscamelbruin.jpg',            'Suede schoudertasje',                 'tassen',  'bruin',  'Verstelbare band minimalistische voorkant', 5),
(40, 'suedeschoudertasjemetflapbruin.jpg',                     'Suede handtas met flap',              'tassen',  'bruin',  'Flap en goudkleurige hardware', 5),
(41, 'suedeschoudertasjegoudkettinggrijs.jpg',                 'Suede schoudertasje met goudketting', 'tassen',  'grijs',  'Lange band met goudkleurig kettingdetail', 5),
(42, 'suedeschoudertasjebruincamelbruin.jpg',                  'Suede handtas met goudhardware',      'tassen',  'bruin',  'Lange schouderband en goudhardware', 5),
(43, 'suedeschoudertasjebruin.jpg',                            'Suede handtas met voorrits',          'tassen',  'bruin',  'Voorrits en goudhardware', 5),
(44, 'suedepouchtasjedonkerbruin.jpg',                         'Suede pouch-tasje',                   'tassen',  'bruin',  'Messing hardware en zwarte schouderband', 5),
(45, 'suedeschoudertasmetflapdonkerbruin.jpg',                 'Suede schoudertas met flap',          'tassen',  'bruin',  'Overslagklep en verticale siertiksels', 5),
(46, 'suedehandtasmetstuds.jpg',                               'Suede handtas met studs',             'tassen',  'bruin',  'Flapsluiting met goudkleurige studs', 5),
(47, 'eastpackoranjesportief.jpg',                             'Eastpak schoudertas',                 'tassen',  'oranje', 'Sportief model met voorvak en verstelbare band', 5),
(48, 'eastpackpaarssportiefmodel.jpg',                         'Eastpak schoudertas',                 'tassen',  'paars',  'Sportief model met voorvak en verstelbare band', 5),
(49, 'eastpackduffeltasdonkerblauw.jpg',                       'Eastpak duffeltas 30L',               'tassen',  'blauw',  'Voorvak met rits en zwarte draagbanden', 5),
(50, 'eastpackduffeltasdonkergrijs.jpg',                       'Eastpak duffeltas 30L',               'tassen',  'grijs',  '30-year warranty voorvak met rits', 5),
(51, 'eastpackrugzakgrijscharcoal.jpg',                        'Eastpak rugzak',                      'tassen',  'grijs',  'Rugzak met voorvak charcoal', 5),
(52, 'eastpackrugzakzwartneutraal.jpg',                        'Eastpak rugzak',                      'tassen',  'zwart',  'Rugzak met voorvak strakke zwarte stof', 5),
(53, 'eastpackrugzakpaarsdonker.jpg',                          'Eastpak rugzak',                      'tassen',  'paars',  'Rugzak met voorvak diepe paarse stof', 5),
(54, 'eastpackrugzakblauwfel.jpg',                             'Eastpak rugzak',                      'tassen',  'blauw',  'Rugzak met voorvak heldere blauwe stof', 5),
(55, 'eastpackrugzakgrijscharcoalkoel.jpg',                    'Eastpak rugzak',                      'tassen',  'grijs',  'Rugzak met voorvak grijze stof', 5)
on conflict (id) do nothing;
