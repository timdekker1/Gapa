-- ================================================
-- GAPA LEDERWAREN — DATABASE SETUP
-- Plak dit in phpMyAdmin → gapa_database → SQL tab
-- ================================================

-- Zorg dat we in de juiste database zitten
USE gapa_database;

-- ================================================
-- STAP 1: stock kolom toevoegen als die er niet is
-- ================================================
ALTER TABLE products ADD COLUMN stock INT NOT NULL DEFAULT 5;
ALTER TABLE products ADD COLUMN is_available TINYINT(1) NOT NULL DEFAULT 1;

-- ================================================
-- STAP 2: is_admin kolom toevoegen aan users
-- ================================================
ALTER TABLE users ADD COLUMN is_admin TINYINT(1) NOT NULL DEFAULT 0;

-- ================================================
-- STAP 3: alle 55 producten invoeren
-- ================================================
INSERT INTO products (image_path, name, category, color, details, stock, is_available) VALUES
('longsleevezwartgrijs.jpeg',                              'Lange mouwen longsleeve',             'kleding', 'grijs',  'Lange mouwen, grijs met zwarte mouwen', 5, 1),
('dameskraagdasdetail.jpg',                                'Dames shirt met kraag',               'kleding', 'roze',   'Dames shirt lange mouw met kraag, roze/bruin', 5, 1),
('longsleeveblauwgrijs.jpg',                               'Lange mouwen longsleeve',             'kleding', 'blauw',  'Lange mouwen, donkerblauw met grijze mouwen', 5, 1),
('longsleeverozemetzwart.jpg',                             'Lange mouwen longsleeve',             'kleding', 'roze',   'Lange mouwen, roze met zwarte mouwen', 5, 1),
('oversizedlongsleeveshirt.jpg',                           'Oversized longsleeve shirt',          'kleding', 'grijs',  'Oversized longsleeve shirt, lichtgrijs', 5, 1),
('oversizedlongsleeveshirtblauw.jpg',                      'Oversized longsleeve shirt',          'kleding', 'blauw',  'Oversized longsleeve shirt, blauw', 5, 1),
('gestreeptesweaterroodroze.jpg',                          'Gestreepte sweater',                  'kleding', 'rood',   'Gestreepte sweater bordeauxrood en lichtroze', 5, 1),
('gestreeptesweaterwitbruin.jpg',                          'Gestreepte sweater',                  'kleding', 'bruin',  'Gestreepte sweater lichtbruin en wit', 5, 1),
('gestreeptesweaterblauwwit.jpg',                          'Gestreepte sweater',                  'kleding', 'blauw',  'Gestreepte sweater donkerblauw en wit', 5, 1),
('gestreeptesweaterblauwgroen.jpg',                        'Gestreepte sweater',                  'kleding', 'blauw',  'Gestreepte sweater lichtblauw en donkergroen', 5, 1),
('manteljasmetriemdonkergroen.jpg',                        'Manteljas met riem',                  'kleding', 'groen',  'Manteljas met riem, donkergroen', 5, 1),
('manteljasmetriembruin.jpg',                              'Manteljas met riem',                  'kleding', 'bruin',  'Manteljas met riem, camel bruin', 5, 1),
('kantttoplangemouwenblauw.jpg',                           'Kanttop met lange mouwen',            'kleding', 'blauw',  'Kanttop met lange mouwen, donkerblauw', 5, 1),
('kanttoplangemouwenroze.jpg',                             'Kanttop met lange mouwen',            'kleding', 'roze',   'Kanttop met lange mouwen, oud roze', 5, 1),
('kanttoplangemouwengroen.jpg',                            'Kanttop met lange mouwen',            'kleding', 'groen',  'Kanttop met lange mouwen, donkergroen', 5, 1),
('kanttoplangemouwenbeige.jpg',                            'Kanttop met lange mouwen',            'kleding', 'beige',  'Kanttop met lange mouwen, beige', 5, 1),
('kanttoplangemouwenmiddengrijs.jpg',                      'Kanttop met lange mouwen',            'kleding', 'grijs',  'Kanttop met lange mouwen, middengrijs', 5, 1),
('kanttoplangemouwendonkerrood.jpg',                       'Kanttop met lange mouwen',            'kleding', 'rood',   'Kanttop met lange mouwen, bordeauxrood', 5, 1),
('kanttoplangemouwenzwart.jpg',                            'Kanttop met lange mouwen',            'kleding', 'zwart',  'Kanttop met lange mouwen, zwart', 5, 1),
('satijnenblousemetlangemouwenrood.jpg',                   'Satijnen blouse',                     'kleding', 'rood',   'Satijnen blouse met lange mouwen, bordeauxrood', 5, 1),
('gebreidetruimethogekraag.jpg',                           'Gebreide trui met hoge kraag',        'kleding', 'grijs',  'Gebreide trui met hoge kraag, lichtgrijs', 5, 1),
('gebreidetruimethogekraagteal.jpg',                       'Gebreide trui met hoge kraag',        'kleding', 'teal',   'Gebreide trui met hoge kraag, teal', 5, 1),
('sherpajasmethogekraag.jpg',                              'Fleece jas',                          'kleding', 'bruin',  'Fleece jas met hoge kraag, middenbruin', 5, 1),
('sherpajasmethogekraag.jpg',                              'Fleece jas',                          'kleding', 'beige',  'Fleece jas met hoge kraag, beige', 5, 1),
('lerenschoudertasmetvoorvakdonkerbruin.jpg',              'Leren schoudertas met voorvak',       'tassen',  'bruin',  'Leren schoudertas met voorvak, donkerbruin', 5, 1),
('lerenschoudertasmetvoorvakdonkerbruinenbruinegloed.jpg', 'Vintage leren schoudertas',           'tassen',  'bruin',  'Vintage model dubbele verticale ritsen, donkerbruin', 5, 1),
('lerenrugzakbruin.jpg',                                   'Vintage leren rugzak',                'tassen',  'bruin',  'Leren rugzak met voorvak en verstelbare banden', 5, 1),
('lerenschoudertasrechhoekingmodel.jpg',                   'Rechthoekige leren schoudertas',      'tassen',  'bruin',  'Leren schoudertas met verstelbare schouderband', 5, 1),
('vintagelerentotebagmetverstelbareschouderband.jpg',      'Vintage leren tote bag',              'tassen',  'bruin',  'Vintage leren tote bag met verstelbare schouderbanden', 5, 1),
('lerenschoudertasmetlogopatch.jpg',                       'Leren schoudertas met logo patch',    'tassen',  'bruin',  'Rechthoekig model met voorvak en logo patch', 5, 1),
('lerenschoudertasmetflap.jpg',                            'Leren schoudertas met flap',          'tassen',  'bruin',  'Leren schoudertas met flap en voorvak', 5, 1),
('gevlochtenhandtasdonkerbruin.jpg',                       'Gevlochten handtas',                  'tassen',  'bruin',  'Korte handvatten en verstelbare schouderband', 5, 1),
('gevlochtentotebagdonkerbruin.jpg',                       'Gevlochten tote bag',                 'tassen',  'bruin',  'Twee handvatten en open bovenkant', 5, 1),
('gevlochtenhandtaszwartgroenegloed.jpg',                  'Gevlochten handtas',                  'tassen',  'zwart',  'Gevlochten handtas met schouderband', 5, 1),
('lerenschoudertasmiddenstikselzwart.jpg',                 'Leren schoudertas met flaplijn',      'tassen',  'zwart',  'Middenstiksel en verstelbare schouderband', 5, 1),
('lerenrugzakgladdevoorkantzwart.jpg',                     'Leren rugzak',                        'tassen',  'zwart',  'Gladde voorkant en verstelbare schouderbanden', 5, 1),
('Zwartelerenrugzakmetflapengesp.jpg',                     'Leren rugzak met flap en gesp',       'tassen',  'zwart',  'Gladde voorkant zonder extra vakken', 5, 1),
('lerenschoudertasmetdubbelevoorritsenzwart.jpg',          'Leren schoudertas met dubbele rits',  'tassen',  'zwart',  'Dubbele voorritsen en verstelbare schouderband', 5, 1),
('suedeschoudertasjemetvoorritscamelbruin.jpg',            'Suede schoudertasje',                 'tassen',  'bruin',  'Verstelbare band, minimalistische voorkant', 5, 1),
('suedeschoudertasjemetflapbruin.jpg',                     'Suede handtas met flap',              'tassen',  'bruin',  'Flap en goudkleurige hardware', 5, 1),
('suedeschoudertasjegoudkettinggrijs.jpg',                 'Suede schoudertasje met goudketting', 'tassen',  'grijs',  'Lange band met goudkleurig kettingdetail', 5, 1),
('suedeschoudertasjebruincamelbruin.jpg',                  'Suede handtas met goudhardware',      'tassen',  'bruin',  'Lange schouderband en goudhardware', 5, 1),
('suedeschoudertasjebruin.jpg',                            'Suede handtas met voorrits',          'tassen',  'bruin',  'Voorrits en goudhardware', 5, 1),
('suedepouchtasjedonkerbruin.jpg',                         'Suede pouch-tasje',                   'tassen',  'bruin',  'Messing hardware en zwarte schouderband', 5, 1),
('suedeschoudertasmetflapdonkerbruin.jpg',                 'Suede schoudertas met flap',          'tassen',  'bruin',  'Overslagklep en verticale siertiksels', 5, 1),
('suedehandtasmetstuds.jpg',                               'Suede handtas met studs',             'tassen',  'bruin',  'Flapsluiting met goudkleurige studs', 5, 1),
('eastpackoranjesportief.jpg',                             'Eastpak schoudertas',                 'tassen',  'oranje', 'Sportief model met voorvak en verstelbare band', 5, 1),
('eastpackpaarssportiefmodel.jpg',                         'Eastpak schoudertas',                 'tassen',  'paars',  'Sportief model met voorvak en verstelbare band', 5, 1),
('eastpackduffeltasdonkerblauw.jpg',                       'Eastpak duffeltas 30L',               'tassen',  'blauw',  'Voorvak met rits en zwarte draagbanden', 5, 1),
('eastpackduffeltasdonkergrijs.jpg',                       'Eastpak duffeltas 30L',               'tassen',  'grijs',  '30-year warranty, voorvak met rits', 5, 1),
('eastpackrugzakgrijscharcoal.jpg',                        'Eastpak rugzak',                      'tassen',  'grijs',  'Rugzak met voorvak, charcoal', 5, 1),
('eastpackrugzakzwartneutraal.jpg',                        'Eastpak rugzak',                      'tassen',  'zwart',  'Rugzak met voorvak, strakke zwarte stof', 5, 1),
('eastpackrugzakpaarsdonker.jpg',                          'Eastpak rugzak',                      'tassen',  'paars',  'Rugzak met voorvak, diepe paarse stof', 5, 1),
('eastpackrugzakblauwfel.jpg',                             'Eastpak rugzak',                      'tassen',  'blauw',  'Rugzak met voorvak, heldere blauwe stof', 5, 1),
('eastpackrugzakgrijscharcoalkoel.jpg',                    'Eastpak rugzak',                      'tassen',  'grijs',  'Rugzak met voorvak, grijze stof', 5, 1);

-- ================================================
-- STAP 4: jezelf admin maken
-- Vervang het e-mailadres hieronder met jouw eigen e-mailadres
-- ================================================
UPDATE users SET is_admin = 1 WHERE email = 'jouw@emailadres.nl';

-- ================================================
-- KLAAR — controlleer of alles werkt:
-- SELECT COUNT(*) FROM products;   --> moet 55 zijn
-- SELECT email, is_admin FROM users;
-- ================================================
