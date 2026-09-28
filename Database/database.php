<?php
$host     = getenv('DB_HOST')     ?: 'localhost';
$port     = getenv('DB_PORT')     ?: '3306';
$dbname   = getenv('DB_NAME')     ?: 'gapa_database';
$username = getenv('DB_USER')     ?: 'root';
$password = getenv('DB_PASSWORD') ?: '';

try {
    $pdo = new PDO(
        "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE,            PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    /* ── Gebruikers tabel ── */
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            email         VARCHAR(255)  NOT NULL UNIQUE,
            password_hash VARCHAR(255)  NOT NULL,
            is_admin      TINYINT(1)    NOT NULL DEFAULT 0,
            last_login_at TIMESTAMP     NULL DEFAULT NULL,
            created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    /* Kolommen toevoegen als ze nog niet bestaan (backward compat) */
    $cols = $pdo->query("SHOW COLUMNS FROM users")->fetchAll(PDO::FETCH_COLUMN);
    if (!in_array('is_admin', $cols)) {
        $pdo->exec("ALTER TABLE users ADD COLUMN is_admin TINYINT(1) NOT NULL DEFAULT 0 AFTER password_hash");
    }
    if (!in_array('last_login_at', $cols)) {
        $pdo->exec("ALTER TABLE users ADD COLUMN last_login_at TIMESTAMP NULL DEFAULT NULL");
    }

    /* ── Producten tabel ── */
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS products (
            id           INT UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
            image_path   VARCHAR(255)  NOT NULL,
            name         VARCHAR(255)  NOT NULL,
            category     VARCHAR(50)   NOT NULL,
            color        VARCHAR(50)   NOT NULL,
            details      TEXT          NOT NULL,
            stock        INT           NOT NULL DEFAULT 5,
            is_available TINYINT(1)    NOT NULL DEFAULT 1,
            created_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
            updated_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    /* Voorraad en beschikbaarheidskolommen toevoegen als die nog niet bestaan */
    $prodCols = $pdo->query("SHOW COLUMNS FROM products")->fetchAll(PDO::FETCH_COLUMN);
    if (!in_array('stock', $prodCols)) {
        $pdo->exec("ALTER TABLE products ADD COLUMN stock INT NOT NULL DEFAULT 5 AFTER details");
    }
    if (!in_array('is_available', $prodCols)) {
        $pdo->exec("ALTER TABLE products ADD COLUMN is_available TINYINT(1) NOT NULL DEFAULT 1 AFTER stock");
    }

    /* Producten invoeren als de tabel leeg is */
    $count = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
    if ($count == 0) {
        $insert = $pdo->prepare("
            INSERT INTO products (image_path, name, category, color, details, stock)
            VALUES (:image_path, :name, :category, :color, :details, :stock)
        ");
        $producten = [
            ['longsleevezwartgrijs.jpeg',                              'Lange mouwen longsleeve',             'kleding', 'grijs',  'Lange mouwen, grijs met zwarte mouwen',                5],
            ['dameskraagdasdetail.jpg',                                'Dames shirt met kraag',               'kleding', 'roze',   'Dames shirt lange mouw met kraag, roze/bruin',         5],
            ['longsleeveblauwgrijs.jpg',                               'Lange mouwen longsleeve',             'kleding', 'blauw',  'Lange mouwen, donkerblauw met grijze mouwen',          5],
            ['longsleeverozemetzwart.jpg',                             'Lange mouwen longsleeve',             'kleding', 'roze',   'Lange mouwen, roze met zwarte mouwen',                 5],
            ['oversizedlongsleeveshirt.jpg',                           'Oversized longsleeve shirt',          'kleding', 'grijs',  'Oversized longsleeve shirt, lichtgrijs',               5],
            ['oversizedlongsleeveshirtblauw.jpg',                      'Oversized longsleeve shirt',          'kleding', 'blauw',  'Oversized longsleeve shirt, blauw',                    5],
            ['gestreeptesweaterroodroze.jpg',                          'Gestreepte sweater',                  'kleding', 'rood',   'Gestreepte sweater bordeauxrood en lichtroze',         5],
            ['gestreeptesweaterwitbruin.jpg',                          'Gestreepte sweater',                  'kleding', 'bruin',  'Gestreepte sweater lichtbruin en wit',                 5],
            ['gestreeptesweaterblauwwit.jpg',                          'Gestreepte sweater',                  'kleding', 'blauw',  'Gestreepte sweater donkerblauw en wit',                5],
            ['gestreeptesweaterblauwgroen.jpg',                        'Gestreepte sweater',                  'kleding', 'blauw',  'Gestreepte sweater lichtblauw en donkergroen',         5],
            ['manteljasmetriemdonkergroen.jpg',                        'Manteljas met riem',                  'kleding', 'groen',  'Manteljas met riem, donkergroen',                      5],
            ['manteljasmetriembruin.jpg',                              'Manteljas met riem',                  'kleding', 'bruin',  'Manteljas met riem, camel bruin',                      5],
            ['kantttoplangemouwenblauw.jpg',                           'Kanttop met lange mouwen',            'kleding', 'blauw',  'Kanttop met lange mouwen, donkerblauw',                5],
            ['kanttoplangemouwenroze.jpg',                             'Kanttop met lange mouwen',            'kleding', 'roze',   'Kanttop met lange mouwen, oud roze',                   5],
            ['kanttoplangemouwengroen.jpg',                            'Kanttop met lange mouwen',            'kleding', 'groen',  'Kanttop met lange mouwen, donkergroen',                5],
            ['kanttoplangemouwenbeige.jpg',                            'Kanttop met lange mouwen',            'kleding', 'beige',  'Kanttop met lange mouwen, beige',                      5],
            ['kanttoplangemouwenmiddengrijs.jpg',                      'Kanttop met lange mouwen',            'kleding', 'grijs',  'Kanttop met lange mouwen, middengrijs',                5],
            ['kanttoplangemouwendonkerrood.jpg',                       'Kanttop met lange mouwen',            'kleding', 'rood',   'Kanttop met lange mouwen, bordeauxrood',               5],
            ['kanttoplangemouwenzwart.jpg',                            'Kanttop met lange mouwen',            'kleding', 'zwart',  'Kanttop met lange mouwen, zwart',                      5],
            ['satijnenblousemetlangemouwenrood.jpg',                   'Satijnen blouse',                     'kleding', 'rood',   'Satijnen blouse met lange mouwen, bordeauxrood',       5],
            ['gebreidetruimethogekraag.jpg',                           'Gebreide trui met hoge kraag',        'kleding', 'grijs',  'Gebreide trui met hoge kraag, lichtgrijs',             5],
            ['gebreidetruimethogekraagteal.jpg',                       'Gebreide trui met hoge kraag',        'kleding', 'teal',   'Gebreide trui met hoge kraag, teal',                   5],
            ['sherpajasmethogekraag.jpg',                              'Fleece jas',                          'kleding', 'bruin',  'Fleece jas met hoge kraag, middenbruin',               5],
            ['sherpajasmethogekraag.jpg',                              'Fleece jas',                          'kleding', 'beige',  'Fleece jas met hoge kraag, beige',                     5],
            ['lerenschoudertasmetvoorvakdonkerbruin.jpg',              'Leren schoudertas met voorvak',       'tassen',  'bruin',  'Leren schoudertas met voorvak, donkerbruin',           5],
            ['lerenschoudertasmetvoorvakdonkerbruinenbruinegloed.jpg', 'Vintage leren schoudertas',           'tassen',  'bruin',  'Vintage model dubbele verticale ritsen, donkerbruin',  5],
            ['lerenrugzakbruin.jpg',                                   'Vintage leren rugzak',                'tassen',  'bruin',  'Leren rugzak met voorvak en verstelbare banden',       5],
            ['lerenschoudertasrechhoekingmodel.jpg',                   'Rechthoekige leren schoudertas',      'tassen',  'bruin',  'Leren schoudertas met verstelbare schouderband',       5],
            ['vintagelerentotebagmetverstelbareschouderband.jpg',      'Vintage leren tote bag',              'tassen',  'bruin',  'Vintage leren tote bag met verstelbare schouderbanden',5],
            ['lerenschoudertasmetlogopatch.jpg',                       'Leren schoudertas met logo patch',    'tassen',  'bruin',  'Rechthoekig model met voorvak en logo patch',          5],
            ['lerenschoudertasmetflap.jpg',                            'Leren schoudertas met flap',          'tassen',  'bruin',  'Leren schoudertas met flap en voorvak',                5],
            ['gevlochtenhandtasdonkerbruin.jpg',                       'Gevlochten handtas',                  'tassen',  'bruin',  'Korte handvatten en verstelbare schouderband',         5],
            ['gevlochtentotebagdonkerbruin.jpg',                       'Gevlochten tote bag',                 'tassen',  'bruin',  'Twee handvatten en open bovenkant',                    5],
            ['gevlochtenhandtaszwartgroenegloed.jpg',                  'Gevlochten handtas',                  'tassen',  'zwart',  'Gevlochten handtas met schouderband',                  5],
            ['lerenschoudertasmiddenstikselzwart.jpg',                 'Leren schoudertas met flaplijn',      'tassen',  'zwart',  'Middenstiksel en verstelbare schouderband',            5],
            ['lerenrugzakgladdevoorkantzwart.jpg',                     'Leren rugzak',                        'tassen',  'zwart',  'Gladde voorkant en verstelbare schouderbanden',        5],
            ['Zwartelerenrugzakmetflapengesp.jpg',                     'Leren rugzak met flap en gesp',       'tassen',  'zwart',  'Gladde voorkant zonder extra vakken',                  5],
            ['lerenschoudertasmetdubbelevoorritsenzwart.jpg',          'Leren schoudertas met dubbele rits',  'tassen',  'zwart',  'Dubbele voorritsen en verstelbare schouderband',       5],
            ['suedeschoudertasjemetvoorritscamelbruin.jpg',            'Suede schoudertasje',                 'tassen',  'bruin',  'Verstelbare band, minimalistische voorkant',           5],
            ['suedeschoudertasjemetflapbruin.jpg',                     'Suede handtas met flap',              'tassen',  'bruin',  'Flap en goudkleurige hardware',                        5],
            ['suedeschoudertasjegoudkettinggrijs.jpg',                 'Suede schoudertasje met goudketting', 'tassen',  'grijs',  'Lange band met goudkleurig kettingdetail',             5],
            ['suedeschoudertasjebruincamelbruin.jpg',                  'Suede handtas met goudhardware',      'tassen',  'bruin',  'Lange schouderband en goudhardware',                   5],
            ['suedeschoudertasjebruin.jpg',                            'Suede handtas met voorrits',          'tassen',  'bruin',  'Voorrits en goudhardware',                             5],
            ['suedepouchtasjedonkerbruin.jpg',                         'Suede pouch-tasje',                   'tassen',  'bruin',  'Messing hardware en zwarte schouderband',              5],
            ['suedeschoudertasmetflapdonkerbruin.jpg',                 'Suede schoudertas met flap',          'tassen',  'bruin',  'Overslagklep en verticale siertiksels',                5],
            ['suedehandtasmetstuds.jpg',                               'Suede handtas met studs',             'tassen',  'bruin',  'Flapsluiting met goudkleurige studs',                  5],
            ['eastpackoranjesportief.jpg',                             'Eastpak schoudertas',                 'tassen',  'oranje', 'Sportief model met voorvak en verstelbare band',       5],
            ['eastpackpaarssportiefmodel.jpg',                         'Eastpak schoudertas',                 'tassen',  'paars',  'Sportief model met voorvak en verstelbare band',       5],
            ['eastpackduffeltasdonkerblauw.jpg',                       'Eastpak duffeltas 30L',               'tassen',  'blauw',  'Voorvak met rits en zwarte draagbanden',               5],
            ['eastpackduffeltasdonkergrijs.jpg',                       'Eastpak duffeltas 30L',               'tassen',  'grijs',  '30-year warranty, voorvak met rits',                   5],
            ['eastpackrugzakgrijscharcoal.jpg',                        'Eastpak rugzak',                      'tassen',  'grijs',  'Rugzak met voorvak, charcoal',                         5],
            ['eastpackrugzakzwartneutraal.jpg',                        'Eastpak rugzak',                      'tassen',  'zwart',  'Rugzak met voorvak, strakke zwarte stof',              5],
            ['eastpackrugzakpaarsdonker.jpg',                          'Eastpak rugzak',                      'tassen',  'paars',  'Rugzak met voorvak, diepe paarse stof',                5],
            ['eastpackrugzakblauwfel.jpg',                             'Eastpak rugzak',                      'tassen',  'blauw',  'Rugzak met voorvak, heldere blauwe stof',              5],
            ['eastpackrugzakgrijscharcoalkoel.jpg',                    'Eastpak rugzak',                      'tassen',  'grijs',  'Rugzak met voorvak, grijze stof',                      5],
        ];
        foreach ($producten as $p) {
            $insert->execute([
                'image_path' => $p[0],
                'name'       => $p[1],
                'category'   => $p[2],
                'color'      => $p[3],
                'details'    => $p[4],
                'stock'      => $p[5],
            ]);
        }
    }

} catch (PDOException $e) {
    http_response_code(500);
    die(json_encode(['success' => false, 'message' => 'Databaseverbinding mislukt.']));
}
