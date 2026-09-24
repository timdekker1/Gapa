/* ==============================================
   GAPA LEDERWAREN — PRODUCTS.JS
   Laadt producten + voorraad vanuit PHP/MySQL API.
============================================== */

/* ============================================
   LOKALE PRODUCT DATA (fallback als API uitvalt)
============================================ */
const gapaProducts = [
    [1,  "longsleevezwartgrijs.jpeg",                              "Lange mouwen longsleeve",             "kleding", "grijs",  "Lange mouwen, grijs met zwarte mouwen"],
    [2,  "dameskraagdasdetail.jpg",                                "Dames shirt met kraag",               "kleding", "roze",   "Dames shirt lange mouw met kraag, roze/bruin"],
    [3,  "longsleeveblauwgrijs.jpg",                               "Lange mouwen longsleeve",             "kleding", "blauw",  "Lange mouwen, donkerblauw met grijze mouwen"],
    [4,  "longsleeverozemetzwart.jpg",                             "Lange mouwen longsleeve",             "kleding", "roze",   "Lange mouwen, roze met zwarte mouwen"],
    [5,  "oversizedlongsleeveshirt.jpg",                           "Oversized longsleeve shirt",          "kleding", "grijs",  "Oversized longsleeve shirt, lichtgrijs"],
    [6,  "oversizedlongsleeveshirtblauw.jpg",                      "Oversized longsleeve shirt",          "kleding", "blauw",  "Oversized longsleeve shirt, blauw"],
    [7,  "gestreeptesweaterroodroze.jpg",                          "Gestreepte sweater",                  "kleding", "rood",   "Gestreepte sweater bordeauxrood en lichtroze"],
    [8,  "gestreeptesweaterwitbruin.jpg",                          "Gestreepte sweater",                  "kleding", "bruin",  "Gestreepte sweater lichtbruin en wit"],
    [9,  "gestreeptesweaterblauwwit.jpg",                          "Gestreepte sweater",                  "kleding", "blauw",  "Gestreepte sweater donkerblauw en wit"],
    [10, "gestreeptesweaterblauwgroen.jpg",                        "Gestreepte sweater",                  "kleding", "blauw",  "Gestreepte sweater lichtblauw en donkergroen"],
    [11, "manteljasmetriemdonkergroen.jpg",                        "Manteljas met riem",                  "kleding", "groen",  "Manteljas met riem, donkergroen"],
    [12, "manteljasmetriembruin.jpg",                              "Manteljas met riem",                  "kleding", "bruin",  "Manteljas met riem, camel bruin"],
    [13, "kantttoplangemouwenblauw.jpg",                           "Kanttop met lange mouwen",            "kleding", "blauw",  "Kanttop met lange mouwen, donkerblauw"],
    [14, "kanttoplangemouwenroze.jpg",                             "Kanttop met lange mouwen",            "kleding", "roze",   "Kanttop met lange mouwen, oud roze"],
    [15, "kanttoplangemouwengroen.jpg",                            "Kanttop met lange mouwen",            "kleding", "groen",  "Kanttop met lange mouwen, donkergroen"],
    [16, "kanttoplangemouwenbeige.jpg",                            "Kanttop met lange mouwen",            "kleding", "beige",  "Kanttop met lange mouwen, beige"],
    [17, "kanttoplangemouwenmiddengrijs.jpg",                      "Kanttop met lange mouwen",            "kleding", "grijs",  "Kanttop met lange mouwen, middengrijs"],
    [18, "kanttoplangemouwendonkerrood.jpg",                       "Kanttop met lange mouwen",            "kleding", "rood",   "Kanttop met lange mouwen, bordeauxrood"],
    [19, "kanttoplangemouwenzwart.jpg",                            "Kanttop met lange mouwen",            "kleding", "zwart",  "Kanttop met lange mouwen, zwart"],
    [20, "satijnenblousemetlangemouwenrood.jpg",                   "Satijnen blouse",                     "kleding", "rood",   "Satijnen blouse met lange mouwen, bordeauxrood"],
    [21, "gebreidetruimethogekraag.jpg",                           "Gebreide trui met hoge kraag",        "kleding", "grijs",  "Gebreide trui met hoge kraag, lichtgrijs"],
    [22, "gebreidetruimethogekraagteal.jpg",                       "Gebreide trui met hoge kraag",        "kleding", "teal",   "Gebreide trui met hoge kraag, teal"],
    [23, "sherpajasmethogekraag.jpg",                              "Fleece jas",                          "kleding", "bruin",  "Fleece jas met hoge kraag, middenbruin"],
    [24, "sherpajasmethogekraag.jpg",                              "Fleece jas",                          "kleding", "beige",  "Fleece jas met hoge kraag, beige"],
    [25, "lerenschoudertasmetvoorvakdonkerbruin.jpg",              "Leren schoudertas met voorvak",       "tassen",  "bruin",  "Leren schoudertas met voorvak, donkerbruin"],
    [26, "lerenschoudertasmetvoorvakdonkerbruinenbruinegloed.jpg", "Vintage leren schoudertas",           "tassen",  "bruin",  "Vintage model dubbele verticale ritsen, donkerbruin"],
    [27, "lerenrugzakbruin.jpg",                                   "Vintage leren rugzak",                "tassen",  "bruin",  "Leren rugzak met voorvak en verstelbare banden"],
    [28, "lerenschoudertasrechhoekingmodel.jpg",                   "Rechthoekige leren schoudertas",      "tassen",  "bruin",  "Leren schoudertas met verstelbare schouderband"],
    [29, "vintagelerentotebagmetverstelbareschouderband.jpg",      "Vintage leren tote bag",              "tassen",  "bruin",  "Vintage leren tote bag met verstelbare schouderbanden"],
    [30, "lerenschoudertasmetlogopatch.jpg",                       "Leren schoudertas met logo patch",    "tassen",  "bruin",  "Rechthoekig model met voorvak en logo patch"],
    [31, "lerenschoudertasmetflap.jpg",                            "Leren schoudertas met flap",          "tassen",  "bruin",  "Leren schoudertas met flap en voorvak"],
    [32, "gevlochtenhandtasdonkerbruin.jpg",                       "Gevlochten handtas",                  "tassen",  "bruin",  "Korte handvatten en verstelbare schouderband"],
    [33, "gevlochtentotebagdonkerbruin.jpg",                       "Gevlochten tote bag",                 "tassen",  "bruin",  "Twee handvatten en open bovenkant"],
    [34, "gevlochtenhandtaszwartgroenegloed.jpg",                  "Gevlochten handtas",                  "tassen",  "zwart",  "Gevlochten handtas met schouderband"],
    [35, "lerenschoudertasmiddenstikselzwart.jpg",                 "Leren schoudertas met flaplijn",      "tassen",  "zwart",  "Middenstiksel en verstelbare schouderband"],
    [36, "lerenrugzakgladdevoorkantzwart.jpg",                     "Leren rugzak",                        "tassen",  "zwart",  "Gladde voorkant en verstelbare schouderbanden"],
    [37, "Zwartelerenrugzakmetflapengesp.jpg",                     "Leren rugzak met flap en gesp",       "tassen",  "zwart",  "Gladde voorkant zonder extra vakken"],
    [38, "lerenschoudertasmetdubbelevoorritsenzwart.jpg",          "Leren schoudertas met dubbele rits",  "tassen",  "zwart",  "Dubbele voorritsen en verstelbare schouderband"],
    [39, "suedeschoudertasjemetvoorritscamelbruin.jpg",            "Suede schoudertasje",                 "tassen",  "bruin",  "Verstelbare band, minimalistische voorkant"],
    [40, "suedeschoudertasjemetflapbruin.jpg",                     "Suede handtas met flap",              "tassen",  "bruin",  "Flap en goudkleurige hardware"],
    [41, "suedeschoudertasjegoudkettinggrijs.jpg",                 "Suede schoudertasje met goudketting", "tassen",  "grijs",  "Lange band met goudkleurig kettingdetail"],
    [42, "suedeschoudertasjebruincamelbruin.jpg",                  "Suede handtas met goudhardware",      "tassen",  "bruin",  "Lange schouderband en goudhardware"],
    [43, "suedeschoudertasjebruin.jpg",                            "Suede handtas met voorrits",          "tassen",  "bruin",  "Voorrits en goudhardware"],
    [44, "suedepouchtasjedonkerbruin.jpg",                         "Suede pouch-tasje",                   "tassen",  "bruin",  "Messing hardware en zwarte schouderband"],
    [45, "suedeschoudertasmetflapdonkerbruin.jpg",                 "Suede schoudertas met flap",          "tassen",  "bruin",  "Overslagklep en verticale siertiksels"],
    [46, "suedehandtasmetstuds.jpg",                               "Suede handtas met studs",             "tassen",  "bruin",  "Flapsluiting met goudkleurige studs"],
    [47, "eastpackoranjesportief.jpg",                             "Eastpak schoudertas",                 "tassen",  "oranje", "Sportief model met voorvak en verstelbare band"],
    [48, "eastpackpaarssportiefmodel.jpg",                         "Eastpak schoudertas",                 "tassen",  "paars",  "Sportief model met voorvak en verstelbare band"],
    [49, "eastpackduffeltasdonkerblauw.jpg",                       "Eastpak duffeltas 30L",               "tassen",  "blauw",  "Voorvak met rits en zwarte draagbanden"],
    [50, "eastpackduffeltasdonkergrijs.jpg",                       "Eastpak duffeltas 30L",               "tassen",  "grijs",  "30-year warranty, voorvak met rits"],
    [51, "eastpackrugzakgrijscharcoal.jpg",                        "Eastpak rugzak",                      "tassen",  "grijs",  "Rugzak met voorvak, charcoal"],
    [52, "eastpackrugzakzwartneutraal.jpg",                        "Eastpak rugzak",                      "tassen",  "zwart",  "Rugzak met voorvak, strakke zwarte stof"],
    [53, "eastpackrugzakpaarsdonker.jpg",                          "Eastpak rugzak",                      "tassen",  "paars",  "Rugzak met voorvak, diepe paarse stof"],
    [54, "eastpackrugzakblauwfel.jpg",                             "Eastpak rugzak",                      "tassen",  "blauw",  "Rugzak met voorvak, heldere blauwe stof"],
    [55, "eastpackrugzakgrijscharcoalkoel.jpg",                    "Eastpak rugzak",                      "tassen",  "grijs",  "Rugzak met voorvak, grijze stof"],
].map(function(item) {
    return {
        id:       item[0],
        number:   item[0],
        image:    "../" + item[1],
        name:     item[2],
        category: item[3],
        color:    item[4],
        details:  item[5],
        stock:    5,
    };
});

/* ============================================
   VOORRAAD LADEN VIA PHP API
============================================ */
async function gapaLaadVoorraad() {
    try {
        const response = await fetch("/api/products/get_products.php", { credentials: "same-origin" });
        if (!response.ok) return;
        const data = await response.json();
        if (!data.success || !data.products) return;

        const map = {};
        data.products.forEach(function(p) { map[p.id] = p; });

        gapaProducts.forEach(function(product) {
            if (map[product.id] !== undefined) {
                product.stock        = parseInt(map[product.id].stock);
                product.is_available = map[product.id].is_available;
            }
        });
    } catch (e) {
        /* Stille fout — lokale data wordt gebruikt */
    }
}

/* ============================================
   ADMIN CHECK VIA PHP SESSIE
============================================ */
let gapaIsAdmin = false;

async function gapaCheckAdmin() {
    try {
        const response = await fetch("/api/auth/session.php", { credentials: "same-origin" });
        if (!response.ok) return false;
        const data = await response.json();
        gapaIsAdmin = data.authenticated && data.is_admin === true;
        return gapaIsAdmin;
    } catch (e) {
        return false;
    }
}

/* ============================================
   HULPFUNCTIES
============================================ */
const gapaColors = [...new Set(gapaProducts.map(function(p) { return p.color; }))].sort();

function gapaLabel(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function gapaStockLabel(stock) {
    if (stock === 0) return { tekst: "Uitverkocht",                    kleur: "#a00000" };
    if (stock <= 2)  return { tekst: "Nog " + stock + " op voorraad", kleur: "#c05000" };
    return { tekst: "Op voorraad: " + stock,                          kleur: "#2a7a2a" };
}

/* ============================================
   PRODUCT KAART
============================================ */
function gapaCreateProduct(product, matcher) {
    const card = document.createElement("article");
    card.className        = "product";
    card.dataset.name     = product.name;
    card.dataset.category = product.category;
    card.dataset.type     = product.category;
    card.dataset.color    = product.color;
    card.dataset.style    = product.category;
    card.dataset.number   = product.number;
    card.dataset.id       = product.id;

    if (product.stock === 0) card.style.opacity = "0.55";

    /* Afbeelding */
    const imageBox    = document.createElement("div");
    imageBox.className = "product-image";

    const label       = document.createElement("span");
    label.className   = matcher ? "match-label" : "new-label";
    label.textContent = matcher ? "MATCH" : "ARTIKEL " + product.number;
    imageBox.appendChild(label);

    const image    = document.createElement("img");
    image.src      = product.image;
    image.alt      = product.name + ": " + product.details;
    image.loading  = "lazy";
    imageBox.appendChild(image);
    card.appendChild(imageBox);

    /* Info */
    const info    = document.createElement("div");
    info.className = "product-info";

    const name        = document.createElement("h3");
    name.className    = "product-name";
    name.textContent  = product.name;
    info.appendChild(name);

    const desc        = document.createElement("p");
    desc.className    = "product-description";
    desc.textContent  = gapaLabel(product.category) + " \u00b7 " + gapaLabel(product.color);
    info.appendChild(desc);

    const det         = document.createElement("p");
    det.className     = "product-description";
    det.textContent   = product.details;
    info.appendChild(det);

    /* Voorraad badge */
    const stockInfo   = gapaStockLabel(product.stock);
    const stockEl     = document.createElement("div");
    stockEl.className         = "product-stock";
    stockEl.dataset.productId = product.id;
    stockEl.textContent       = stockInfo.tekst;
    stockEl.style.cssText     = "margin-top:10px; font-size:12px; font-weight:bold; color:" + stockInfo.kleur + ";";
    info.appendChild(stockEl);

    /* Admin knoppen */
    if (gapaIsAdmin) {
        const adminRow        = document.createElement("div");
        adminRow.style.cssText = "display:flex; align-items:center; gap:8px; margin-top:10px;";

        const minBtn          = document.createElement("button");
        minBtn.textContent    = "\u2212";
        minBtn.title          = "Voorraad verlagen";
        minBtn.style.cssText  = "width:30px;height:30px;border:1px solid #d5d5d5;background:#fff;font-size:16px;cursor:pointer;font-weight:bold;";
        minBtn.addEventListener("click", function() { gapaUpdateVoorraad(product.id, -1, card); });

        const plusBtn         = document.createElement("button");
        plusBtn.textContent   = "+";
        plusBtn.title         = "Voorraad verhogen";
        plusBtn.style.cssText = "width:30px;height:30px;border:1px solid #111;background:#111;color:#fff;font-size:16px;cursor:pointer;font-weight:bold;";
        plusBtn.addEventListener("click", function() { gapaUpdateVoorraad(product.id, +1, card); });

        const adminLabel        = document.createElement("span");
        adminLabel.style.cssText = "font-size:11px; color:#aaa;";
        adminLabel.textContent   = "Admin";

        adminRow.appendChild(minBtn);
        adminRow.appendChild(plusBtn);
        adminRow.appendChild(adminLabel);
        info.appendChild(adminRow);
    }

    card.appendChild(info);
    return card;
}

/* ============================================
   VOORRAAD AANPASSEN (admin only, via PHP API)
============================================ */
async function gapaUpdateVoorraad(productId, delta, card) {
    const local = gapaProducts.find(function(p) { return p.id === productId; });
    if (!local) return;

    const nieuweStock = Math.max(0, local.stock + delta);

    try {
        const response = await fetch("/api/products/update_stock.php", {
            method:      "POST",
            credentials: "same-origin",
            headers:     { "Content-Type": "application/json" },
            body:        JSON.stringify({ id: productId, stock: nieuweStock }),
        });
        const result = await response.json();
        if (!result.success) {
            alert("Fout: " + result.message);
            return;
        }
    } catch (e) {
        alert("Kan de server niet bereiken.");
        return;
    }

    /* Lokaal bijwerken */
    local.stock = nieuweStock;

    const stockInfo = gapaStockLabel(nieuweStock);
    const stockEl   = card.querySelector("[data-product-id='" + productId + "']");
    if (stockEl) {
        stockEl.textContent = stockInfo.tekst;
        stockEl.style.color = stockInfo.kleur;
    }
    card.style.opacity = nieuweStock === 0 ? "0.55" : "1";
}

/* ============================================
   FILTERS
============================================ */
function gapaSetOptions(select, options, allLabel) {
    if (!select) return;
    select.replaceChildren();
    const all       = document.createElement("option");
    all.value       = "all";
    all.textContent = allLabel;
    select.appendChild(all);
    options.forEach(function(option) {
        const item       = document.createElement("option");
        item.value       = option;
        item.textContent = gapaLabel(option);
        select.appendChild(item);
    });
}

function gapaPrepareFilters() {
    gapaSetOptions(document.getElementById("categoryFilter"), ["kleding", "tassen"], "Alle categorie\u00ebn");
    gapaSetOptions(document.getElementById("typeFilter"),     ["kleding", "tassen"], "Alle categorie\u00ebn");
    gapaSetOptions(document.getElementById("colorFilter"),    gapaColors,            "Alle kleuren");

    const styleFilter = document.getElementById("styleFilter");
    if (styleFilter) styleFilter.closest(".filter-group").style.display = "none";
    const priceFilter = document.getElementById("priceFilter");
    if (priceFilter) priceFilter.closest(".filter-group").style.display = "none";
}

/* ============================================
   RENDEREN
============================================ */
function gapaRenderProducts() {
    const container = document.getElementById("productContainer");
    const matcher   = Boolean(document.getElementById("typeFilter"));
    if (!container) return;

    container.replaceChildren();
    gapaProducts.forEach(function(product) {
        container.appendChild(gapaCreateProduct(product, matcher));
    });

    gapaPrepareFilters();

    if (matcher && typeof findMatches === "function") {
        findMatches();
    } else if (typeof filterProducts === "function") {
        filterProducts();
    }
}

/* ============================================
   ADMIN BANNER
============================================ */
function gapaToonAdminBanner() {
    if (!gapaIsAdmin) return;
    const banner        = document.createElement("div");
    banner.style.cssText = "background:#111;color:#fff;text-align:center;padding:10px;font-size:13px;font-weight:bold;letter-spacing:1px;";
    banner.innerHTML     =
        "\u2699 ADMIN MODUS \u2014 Gebruik + en \u2212 knoppen bij elk product om de voorraad aan te passen. " +
        "<a href='admin.html' style='color:#fff;text-decoration:underline;margin-left:10px;'>Ga naar beheer paneel \u2192</a>";
    document.body.insertBefore(banner, document.body.firstChild);
}

/* ============================================
   INITIALISATIE
============================================ */
document.addEventListener("DOMContentLoaded", async function() {
    await Promise.all([gapaLaadVoorraad(), gapaCheckAdmin()]);
    gapaRenderProducts();
    gapaToonAdminBanner();
});
