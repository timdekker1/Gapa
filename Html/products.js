/* ==============================================
   GAPA LEDERWAREN — PRODUCTS.JS
   Laadt producten + voorraad vanuit PHP/MySQL API.
============================================== */

/* ============================================
   LOKALE PRODUCT DATA (fallback als API uitvalt)
============================================ */
let gapaProducts = [
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
        stock:    null,
    };
});

/* ============================================
   VOORRAAD LADEN VIA PHP API
============================================ */
async function gapaLaadVoorraad() {
    try {
        const response = await fetch("/api/products/get_products.php", { credentials: "same-origin" });
        if (!response.ok) throw new Error("Voorraad-API niet bereikbaar.");
        const data = await response.json();
        if (!data.success || !data.products) throw new Error("Voorraad kon niet geladen worden.");

        gapaProducts = data.products.map(function(product) {
            return {
                id: Number(product.id),
                number: Number(product.id),
                image: "../" + product.image_path,
                name: product.name,
                category: product.category,
                color: product.color,
                details: product.details,
                price: product.price,
                stock: Number(product.stock),
                is_available: Number(product.is_available),
            };
        });
    } catch (e) {
        console.error("Voorraad kon niet uit de database worden geladen.", e);
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
let gapaColors = [...new Set(gapaProducts.map(function(p) { return p.color; }))].sort();

function gapaLabel(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function gapaStockLabel(stock) {
    if (stock === null || stock === undefined || !Number.isFinite(Number(stock))) {
        return { tekst: "Voorraad niet beschikbaar", kleur: "#666" };
    }
    if (stock === 0) return { tekst: "Uitverkocht",                    kleur: "#a00000" };
    if (stock <= 2)  return { tekst: "Nog " + stock + " op voorraad", kleur: "#c05000" };
    return { tekst: "Op voorraad: " + stock,                          kleur: "#2a7a2a" };
}

let gapaProductDialog;

function gapaEnsureProductDialog() {
    if (gapaProductDialog) return;

    const style = document.createElement("style");
    style.textContent = `
        .gapa-product-dialog {
            width: min(960px, calc(100vw - 32px));
            max-width: none;
            max-height: calc(100vh - 32px);
            padding: 0;
            border: 0;
            color: #171717;
            background: #fff;
            box-shadow: 0 18px 60px rgba(0,0,0,.24);
        }
        .gapa-product-dialog::backdrop { background: rgba(17,17,17,.65); }
        .gapa-detail-grid { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); }
        .gapa-detail-image { width: 100%; height: 100%; min-height: 480px; max-height: 760px; object-fit: cover; background: #eee; }
        .gapa-detail-content { padding: 32px; overflow-y: auto; max-height: calc(100vh - 32px); }
        .gapa-detail-close { display: block; margin-left: auto; width: 36px; height: 36px; border: 1px solid #ccc; background: #fff; font-size: 22px; cursor: pointer; }
        .gapa-detail-eyebrow { margin: 18px 0 8px; color: #777; font-size: 11px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; }
        .gapa-detail-title { margin: 0 0 10px; font-size: 30px; line-height: 1.15; }
        .gapa-detail-meta { color: #666; font-size: 13px; }
        .gapa-detail-stock { margin: 18px 0; font-size: 13px; font-weight: bold; }
        .gapa-detail-description { margin: 0 0 28px; color: #333; font-size: 15px; line-height: 1.65; white-space: pre-line; }
        .gapa-question-section { border-top: 1px solid #ddd; padding-top: 22px; }
        .gapa-question-section h3 { margin: 0 0 14px; font-size: 18px; }
        .gapa-question-item { padding: 12px 0; border-top: 1px solid #eee; font-size: 13px; line-height: 1.55; }
        .gapa-question-item strong { display: block; margin-bottom: 4px; }
        .gapa-question-form { display: grid; gap: 11px; margin-top: 18px; }
        .gapa-question-form label { display: grid; gap: 5px; font-size: 12px; font-weight: bold; }
        .gapa-question-form input, .gapa-question-form textarea { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 0; font: inherit; font-size: 14px; }
        .gapa-question-form textarea { min-height: 90px; resize: vertical; }
        .gapa-question-form button { justify-self: start; padding: 11px 16px; border: 0; background: #111; color: #fff; font: inherit; font-size: 13px; font-weight: bold; cursor: pointer; }
        .gapa-question-status { min-height: 18px; margin: 0; font-size: 12px; }
        @media (max-width: 700px) {
            .gapa-detail-grid { grid-template-columns: 1fr; }
            .gapa-detail-image { min-height: 0; height: min(48vh, 360px); }
            .gapa-detail-content { padding: 20px; max-height: none; overflow: visible; }
            .gapa-detail-title { font-size: 25px; }
        }
    `;
    document.head.appendChild(style);

    gapaProductDialog = document.createElement("dialog");
    gapaProductDialog.className = "gapa-product-dialog";
    gapaProductDialog.setAttribute("aria-labelledby", "gapaDetailTitle");

    const grid = document.createElement("div");
    grid.className = "gapa-detail-grid";
    const image = document.createElement("img");
    image.className = "gapa-detail-image";
    image.id = "gapaDetailImage";
    const content = document.createElement("div");
    content.className = "gapa-detail-content";
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "gapa-detail-close";
    closeButton.textContent = "×";
    closeButton.setAttribute("aria-label", "Productdetails sluiten");
    closeButton.addEventListener("click", function() { gapaProductDialog.close(); });

    const eyebrow = document.createElement("p");
    eyebrow.className = "gapa-detail-eyebrow";
    eyebrow.id = "gapaDetailEyebrow";
    const title = document.createElement("h2");
    title.className = "gapa-detail-title";
    title.id = "gapaDetailTitle";
    const meta = document.createElement("p");
    meta.className = "gapa-detail-meta";
    meta.id = "gapaDetailMeta";
    const stock = document.createElement("p");
    stock.className = "gapa-detail-stock";
    stock.id = "gapaDetailStock";
    const description = document.createElement("p");
    description.className = "gapa-detail-description";
    description.id = "gapaDetailDescription";

    const questionSection = document.createElement("section");
    questionSection.className = "gapa-question-section";
    const questionHeading = document.createElement("h3");
    questionHeading.textContent = "Vragen over dit product";
    const questionList = document.createElement("div");
    questionList.id = "gapaQuestionList";
    questionSection.append(questionHeading, questionList);

    const form = document.createElement("form");
    form.className = "gapa-question-form";
    form.id = "gapaQuestionForm";
    form.innerHTML = `
        <label>Naam<input name="name" autocomplete="name" maxlength="120" required></label>
        <label>E-mailadres<input name="email" type="email" autocomplete="email" maxlength="255" required></label>
        <label>Je vraag<textarea name="question" minlength="5" maxlength="4000" required></textarea></label>
        <p class="gapa-question-status" id="gapaQuestionStatus" role="status" aria-live="polite"></p>
        <button type="submit">Vraag versturen</button>
    `;
    form.addEventListener("submit", gapaSubmitQuestion);

    content.append(closeButton, eyebrow, title, meta, stock, description, questionSection, form);
    grid.append(image, content);
    gapaProductDialog.appendChild(grid);
    gapaProductDialog.addEventListener("click", function(event) {
        if (event.target === gapaProductDialog) gapaProductDialog.close();
    });
    document.body.appendChild(gapaProductDialog);
}

function gapaOpenProduct(product) {
    gapaEnsureProductDialog();
    const stock = gapaStockLabel(product.stock);
    document.getElementById("gapaDetailImage").src = product.image;
    document.getElementById("gapaDetailImage").alt = product.name;
    document.getElementById("gapaDetailEyebrow").textContent = gapaLabel(product.category) + " · " + gapaLabel(product.color);
    document.getElementById("gapaDetailTitle").textContent = product.name;
    document.getElementById("gapaDetailMeta").textContent = "Artikel " + product.number;
    const stockElement = document.getElementById("gapaDetailStock");
    stockElement.textContent = stock.tekst;
    stockElement.style.color = stock.kleur;
    document.getElementById("gapaDetailDescription").textContent = product.details;
    document.getElementById("gapaQuestionForm").dataset.productId = product.id;
    document.getElementById("gapaQuestionForm").reset();
    document.getElementById("gapaQuestionStatus").textContent = "";
    document.getElementById("gapaQuestionList").textContent = "Antwoorden laden...";
    gapaProductDialog.showModal();
    gapaLoadProductQuestions(product.id);
}

async function gapaLoadProductQuestions(productId) {
    const list = document.getElementById("gapaQuestionList");
    try {
        const response = await fetch("/api/products/get_questions.php?product_id=" + encodeURIComponent(productId));
        const data = await response.json();
        list.replaceChildren();
        if (!data.success || data.questions.length === 0) {
            list.textContent = "Nog geen beantwoorde vragen.";
            return;
        }
        data.questions.forEach(function(item) {
            const entry = document.createElement("article");
            entry.className = "gapa-question-item";
            const question = document.createElement("strong");
            question.textContent = "Vraag: " + item.question;
            const answer = document.createElement("p");
            answer.textContent = "Antwoord: " + item.answer;
            entry.append(question, answer);
            list.appendChild(entry);
        });
    } catch (error) {
        list.textContent = "Vragen konden niet geladen worden.";
    }
}

async function gapaSubmitQuestion(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const status = document.getElementById("gapaQuestionStatus");
    const submit = form.querySelector("button[type='submit']");
    const values = new FormData(form);
    submit.disabled = true;
    status.textContent = "Versturen...";

    try {
        const response = await fetch("/api/products/ask_question.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                product_id: Number(form.dataset.productId),
                name: values.get("name"),
                email: values.get("email"),
                question: values.get("question"),
            }),
        });
        const result = await response.json();
        status.textContent = result.message || "Je vraag kon niet worden verstuurd.";
        if (result.success) form.reset();
    } catch (error) {
        status.textContent = "Geen verbinding. Probeer het later opnieuw.";
    } finally {
        submit.disabled = false;
    }
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
    card.tabIndex = 0;
    card.style.cursor = "pointer";
    card.setAttribute("aria-label", product.name + ". Bekijk productdetails en stel een vraag.");
    card.addEventListener("click", function() { gapaOpenProduct(product); });
    card.addEventListener("keydown", function(event) {
        if ((event.key === "Enter" || event.key === " ") && event.target === card) {
            event.preventDefault();
            gapaOpenProduct(product);
        }
    });

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
    image.style.cursor = "pointer";
    image.addEventListener("click", function(event) {
        event.stopPropagation();
        window.location.href = "product.html?id=" + encodeURIComponent(product.id);
    });
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

    const detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.textContent = "Bekijk productdetails";
    detailsButton.style.cssText = "margin-top:12px;padding:0;border:0;background:none;color:#111;text-decoration:underline;font-size:12px;font-weight:bold;cursor:pointer;";
    detailsButton.addEventListener("click", function(event) {
        event.stopPropagation();
        window.location.href = "product.html?id=" + encodeURIComponent(product.id);
    });
    info.appendChild(detailsButton);

    /* Admin knoppen */
    if (gapaIsAdmin) {
        const adminRow        = document.createElement("div");
        adminRow.style.cssText = "display:flex; align-items:center; gap:8px; margin-top:10px;";
        adminRow.addEventListener("click", function(event) { event.stopPropagation(); });

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
    gapaColors = [...new Set(gapaProducts.map(function(product) { return product.color; }))].sort();
    gapaEnsureProductDialog();
    gapaRenderProducts();
    gapaToonAdminBanner();
});
