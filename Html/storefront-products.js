(async function() {
    const cards = document.querySelectorAll(".products > .product");
    if (!cards.length) return;

    function formatPrice(price) {
        if (price === null || price === "" || !Number.isFinite(Number(price))) return "Prijs op aanvraag";
        return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(Number(price));
    }

    function stockInfo(stock) {
        const amount = Number(stock);
        if (amount <= 0) return { text: "Uitverkocht", className: "stock-none" };
        if (amount <= 2) return { text: "Bijna uitverkocht: " + amount, className: "stock-low" };
        return { text: "Op voorraad: " + amount, className: "stock-good" };
    }

    try {
        const response = await fetch("/api/products/get_products.php", { credentials: "same-origin" });
        if (!response.ok) throw new Error("Product API niet bereikbaar.");
        const data = await response.json();
        if (!data.success || !Array.isArray(data.products)) throw new Error("Producten konden niet geladen worden.");

        const featuredProducts = data.products.slice(-cards.length).reverse();

        cards.forEach(function(card, index) {
            const product = featuredProducts[index];
            if (!product) return;
            const image = card.querySelector(".product-image img");
            if (!image) return;

            card.dataset.productId = product.id;
            card.dataset.price = product.price === null ? "" : product.price;
            image.src = "/" + product.image_path;
            image.alt = product.name + ": " + product.details;
            image.style.cursor = "pointer";

            let imageLink = image.parentElement;
            if (imageLink.tagName !== "A") {
                imageLink = document.createElement("a");
                image.parentNode.insertBefore(imageLink, image);
                imageLink.appendChild(image);
            }
            imageLink.href = "/Html/product.html?id=" + encodeURIComponent(product.id);
            imageLink.setAttribute("aria-label", "Bekijk " + product.name);
            imageLink.style.cssText = "display:block;width:100%;height:100%;";

            const info = card.querySelector(".product-info");
            if (!info) return;
            const name = info.querySelector(".product-name");
            if (name) name.textContent = product.name;
            card.dataset.name = product.name;
            card.dataset.category = product.category;
            card.dataset.color = product.color;

            const descriptions = info.querySelectorAll(".product-description");
            if (descriptions.length) {
                descriptions[0].textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1) + " · " + product.color;
            }

            const price = info.querySelector(".product-price");
            if (price) price.textContent = formatPrice(product.price);

            const stock = info.querySelector(".stock");
            if (stock) {
                const status = stockInfo(product.stock);
                stock.className = "stock " + status.className;
                stock.textContent = status.text;
            }
        });
    } catch (error) {
        cards.forEach(function(card) {
            const stock = card.querySelector(".stock");
            if (stock) stock.textContent = "Voorraad niet beschikbaar";
        });
        console.error("Voorraad kon niet uit de database worden geladen.", error);
    }
})();
