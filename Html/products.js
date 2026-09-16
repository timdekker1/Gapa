const gapaProducts = [
    [1, "longsleevezwartgrijs.jpeg", "Lange mouwen longsleeve", "kleding", "grijs", "Lange mouwen, grijs met zwarte mouwen"],
    [2, "dameskraagdasdetail.jpg", "Dames shirt met kraag", "kleding", "roze", "Dames shirt lange mouw met kraag, roze/bruin"],
    [3, "longsleeveblauwgrijs.jpg", "Lange mouwen longsleeve", "kleding", "blauw", "Lange mouwen, donkerblauw met grijze mouwen"],
    [4, "longsleeverozemetzwart.jpg", "Lange mouwen longsleeve", "kleding", "roze", "Lange mouwen, roze met zwarte mouwen"],
    [5, "oversizedlongsleeveshirt.jpg", "Oversized longsleeve shirt", "kleding", "grijs", "Oversized longsleeve shirt, lichtgrijs"],
    [6, "oversizedlongsleeveshirtblauw.jpg", "Oversized longsleeve shirt", "kleding", "blauw", "Oversized longsleeve shirt, blauw"],
    [7, "gestreeptesweaterroodroze.jpg", "Gestreepte sweater", "kleding", "rood", "Gestreepte sweater, losvallende fit, bordeauxrood en lichtroze"],
    [8, "gestreeptesweaterwitbruin.jpg", "Gestreepte sweater", "kleding", "bruin", "Gestreepte sweater, lichtbruin en wit"],
    [9, "gestreeptesweaterblauwwit.jpg", "Gestreepte sweater", "kleding", "blauw", "Gestreepte sweater, donkerblauw en wit"],
    [10, "gestreeptesweaterblauwgroen.jpg", "Gestreepte sweater", "kleding", "blauw", "Gestreepte sweater, lichtblauw en donkergroen"],
    [11, "manteljasmetriemdonkergroen.jpg", "Manteljas met riem", "kleding", "groen", "Manteljas met riem, donkergroen"],
    [12, "manteljasmetriembruin.jpg", "Manteljas met riem", "kleding", "bruin", "Manteljas met riem, camel-achtige bruine tint"],
    [13, "kantttoplangemouwenblauw.jpg", "Kanttop met lange mouwen", "kleding", "blauw", "Kanttop/lace top met lange mouwen, donkerblauw"],
    [14, "kanttoplangemouwenroze.jpg", "Kanttop met lange mouwen", "kleding", "roze", "Kanttop/lace top met lange mouwen, oud roze"],
    [15, "kanttoplangemouwengroen.jpg", "Kanttop met lange mouwen", "kleding", "groen", "Kanttop/lace top met lange mouwen, donkergroen"],
    [16, "kanttoplangemouwenbeige.jpg", "Kanttop met lange mouwen", "kleding", "beige", "Kanttop/lace top met lange mouwen, beige/offwhite"],
    [17, "kanttoplangemouwenmiddengrijs.jpg", "Kanttop met lange mouwen", "kleding", "grijs", "Kanttop/lace top met lange mouwen, middengrijs"],
    [18, "kanttoplangemouwendonkerrood.jpg", "Kanttop met lange mouwen", "kleding", "rood", "Kanttop/lace top met lange mouwen, bordeauxrood"],
    [19, "kanttoplangemouwenzwart.jpg", "Kanttop met lange mouwen", "kleding", "zwart", "Kanttop/lace top met lange mouwen, zwart"],
    [20, "satijnenblousemetlangemouwenrood.jpg", "Satijnen blouse", "kleding", "rood", "Satijnen blouse met lange mouwen, bordeauxrood"],
    [21, "gebreidetruimethogekraag.jpg", "Gebreide trui met hoge kraag", "kleding", "grijs", "Gebreide trui met hoge kraag, lichtgrijs"],
    [22, "gebreidetruimethogekraagteal.jpg", "Gebreide trui met hoge kraag", "kleding", "teal", "Gebreide trui met hoge kraag, teal"],
    [23, "sherpajasmethogekraag.jpg", "Fleece/sherpa jas", "kleding", "bruin", "Fleece/sherpa jas met hoge kraag, middenbruin"],
    [24, "sherpajasmethogekraag.jpg", "Fleece/sherpa jas", "kleding", "beige", "Fleece/sherpa jas met hoge kraag, beige met bruine details"],
    [25, "lerenschoudertasmetvoorvakdonkerbruin.jpg", "Leren schoudertas met voorvak", "tassen", "bruin", "Leren schoudertas met voorvak, donkerbruin"],
    [26, "lerenschoudertasmetvoorvakdonkerbruinenbruinegloed.jpg", "Vintage leren schoudertas", "tassen", "bruin", "Vintage model met dubbele verticale ritsen, donkerbruin met lichtbruine gloed"],
    [27, "lerenrugzakbruin.jpg", "Vintage leren rugzak", "tassen", "bruin", "Leren rugzak met voorvak, top-handle en verstelbare banden"],
    [28, "lerenschoudertasrechhoekingmodel.jpg", "Rechthoekige leren schoudertas", "tassen", "bruin", "Leren schoudertas met voorvak en verstelbare schouderband"],
    [29, "vintagelerentotebagmetverstelbareschouderband.jpg", "Vintage leren tote bag", "tassen", "bruin", "Vintage leren tote bag met verstelbare schouderbanden"],
    [30, "lerenschoudertasmetlogopatch.jpg", "Leren schoudertas met logo patch", "tassen", "bruin", "Rechthoekig model met voorvak en logo patch"],
    [31, "lerenschoudertasmetflap.jpg", "Leren schoudertas met flap", "tassen", "bruin", "Leren schoudertas met flap en voorvak"],
    [32, "gevlochtenhandtasdonkerbruin.jpg", "Gevlochten handtas", "tassen", "bruin", "Korte handvatten en verstelbare schouderband, basket-wave model"],
    [33, "gevlochtentotebagdonkerbruin.jpg", "Gevlochten tote bag", "tassen", "bruin", "Twee handvatten en een open bovenkant"],
    [34, "gevlochtenhandtaszwartgroenegloed.jpg", "Gevlochten handtas", "tassen", "zwart", "Gevlochten handtas met schouderband en korte handvatten"],
    [35, "lerenschoudertasmiddenstikselzwart.jpg", "Leren schoudertas met flaplijn", "tassen", "zwart", "Middenstiksel, rechte flaplijn en verstelbare schouderband"],
    [36, "lerenrugzakgladdevoorkantzwart.jpg", "Leren rugzak", "tassen", "zwart", "Gladde voorkant, top handle en verstelbare schouderbanden"],
    [37, "Zwartelerenrugzakmetflapengesp.jpg", "Leren rugzak met flap en gesp", "tassen", "zwart", "Gladde voorkant zonder extra vakken, overslagklep"],
    [38, "lerenschoudertasmetdubbelevoorritsenzwart.jpg", "Leren schoudertas met dubbele rits", "tassen", "zwart", "Dubbele voorritsen en verstelbare schouderband"],
    [39, "suèdeschoudertasjemetvoorritscamelbruin.jpg", "Suede schoudertasje", "tassen", "bruin", "Verstelbare band, minimalistische voorkant"],
    [40, "suèdeschoudertasjemetflapbruin.jpg", "Suede handtas met flap", "tassen", "bruin", "Flap en goudkleurige hardware"],
    [41, "suèdeschoudertasjegoudkettinggrijs.jpg", "Suede schoudertasje met goudketting", "tassen", "grijs", "Lange band met goudkleurig kettingdetail"],
    [42, "suèdeschoudertasjebruincamelbruin.jpg", "Suede handtas met goudhardware", "tassen", "bruin", "Lange schouderband en goudhardware"],
    [43, "suèdeschoudertasjebruin.jpg", "Suede handtas met voorrits", "tassen", "bruin", "Voorrits en goudhardware"],
    [44, "suèdepouchtasjedonkerbruin.jpg", "Suede pouch-tasje", "tassen", "bruin", "Messing hardware en zwarte schouderband"],
    [45, "suedeschoudertasmetflapdonkerbruin.jpg", "Suede schoudertas met flap", "tassen", "bruin", "Overslagklep en verticale siertiksels"],
    [46, "suèdehandtasmetstuds.jpg", "Suede handtas met studs", "tassen", "bruin", "Flapsluiting met goud/messingkleurige studs in W-vorm"],
    [47, "eastpackoranjesportief.jpg", "Eastpak schoudertas", "tassen", "oranje", "Sportief model met voorvak en verstelbare band"],
    [48, "eastpackpaarssportiefmodel.jpg", "Eastpak schoudertas", "tassen", "paars", "Sportief model met voorvak en verstelbare band"],
    [49, "eastpackduffeltasdonkerblauw.jpg", "Eastpak duffeltas 30 L", "tassen", "blauw", "Voorvak met rits en zwarte draagbanden"],
    [50, "eastpackduffeltasdonkergrijs.jpg", "Eastpak duffeltas 30 L", "tassen", "grijs", "30-year warranty, voorvak met rits en zwarte draagbanden"],
    [51, "eastpackrugzakgrijscharcoal.jpg", "Eastpak rugzak", "tassen", "grijs", "Rugzak met voorvak, charcoal"],
    [52, "eastpackrugzakzwartneutraal.jpg", "Eastpak rugzak", "tassen", "zwart", "Rugzak met voorvak, strakke zwarte stof"],
    [53, "eastpackrugzakpaarsdonker.jpg", "Eastpak rugzak", "tassen", "paars", "Rugzak met voorvak, diepe paarse stof"],
    [54, "eastpackrugzakblauwfel.jpg", "Eastpak rugzak", "tassen", "blauw", "Rugzak met voorvak, heldere blauwe stof"],
    [55, "eastpackrugzakgrijscharcoalkoel.jpg", "Eastpak rugzak", "tassen", "grijs", "Rugzak met voorvak, grijze stof"],
].map(function (item) {
    return {
        number: item[0],
        image: "../" + item[1],
        name: item[2],
        category: item[3],
        color: item[4],
        details: item[5],
    };
});

const gapaColors = [...new Set(gapaProducts.map(function (product) { return product.color; }))].sort();

function gapaLabel(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function gapaCreateProduct(product, matcher) {
    const card = document.createElement("article");
    card.className = "product";
    card.dataset.name = product.name;
    card.dataset.category = product.category;
    card.dataset.type = product.category;
    card.dataset.color = product.color;
    card.dataset.style = product.category;
    card.dataset.number = product.number;

    const imageBox = document.createElement("div");
    imageBox.className = "product-image";

    const label = document.createElement("span");
    label.className = matcher ? "match-label" : "new-label";
    label.textContent = matcher ? "MATCH" : "AFBEELDING " + product.number;
    imageBox.appendChild(label);

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name + ": " + product.details;
    image.loading = "lazy";
    imageBox.appendChild(image);
    card.appendChild(imageBox);

    const info = document.createElement("div");
    info.className = "product-info";

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.name;
    info.appendChild(name);

    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = gapaLabel(product.category) + " · " + gapaLabel(product.color);
    info.appendChild(description);

    const details = document.createElement("p");
    details.className = "product-description";
    details.textContent = product.details;
    info.appendChild(details);

    if (matcher) {
        const score = document.createElement("div");
        score.className = "match-score";
        score.textContent = "● Beschikbaar in de collectie";
        info.appendChild(score);
    }

    card.appendChild(info);
    return card;
}

function gapaSetOptions(select, options, allLabel) {
    if (!select) return;
    select.replaceChildren();
    const all = document.createElement("option");
    all.value = "all";
    all.textContent = allLabel;
    select.appendChild(all);
    options.forEach(function (option) {
        const item = document.createElement("option");
        item.value = option;
        item.textContent = gapaLabel(option);
        select.appendChild(item);
    });
}

function gapaPrepareFilters() {
    gapaSetOptions(document.getElementById("categoryFilter"), ["kleding", "tassen"], "Alle categorieën");
    gapaSetOptions(document.getElementById("typeFilter"), ["kleding", "tassen"], "Alle categorieën");
    gapaSetOptions(document.getElementById("colorFilter"), gapaColors, "Alle kleuren");

    const styleFilter = document.getElementById("styleFilter");
    if (styleFilter) {
        styleFilter.closest(".filter-group").style.display = "none";
    }
    const priceFilter = document.getElementById("priceFilter");
    if (priceFilter) {
        priceFilter.closest(".filter-group").style.display = "none";
    }
}

function gapaRenderProducts() {
    const collectionContainer = document.getElementById("productContainer");
    const matcher = Boolean(document.getElementById("typeFilter"));
    if (!collectionContainer) return;
    collectionContainer.replaceChildren();
    gapaProducts.forEach(function (product) {
        collectionContainer.appendChild(gapaCreateProduct(product, matcher));
    });
    gapaPrepareFilters();
    if (matcher && typeof findMatches === "function") {
        findMatches();
    } else if (typeof filterProducts === "function") {
        filterProducts();
    }
}

document.addEventListener("DOMContentLoaded", gapaRenderProducts);
