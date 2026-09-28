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
        if (!response.ok) return;
        const data = await response.json();
        if (!data.success || !Array.isArray(data.products)) return;

        const byImage = new Map(data.products.map(function(product) {
            return [product.image_path.toLowerCase(), product];
        }));

        cards.forEach(function(card) {
            const image = card.querySelector(".product-image img");
            if (!image) return;
            const imagePath = new URL(image.getAttribute("src"), document.baseURI).pathname.split("/").pop().toLowerCase();
            const product = byImage.get(imagePath);
            if (!product) return;

            card.dataset.productId = product.id;
            card.dataset.price = product.price === null ? "" : product.price;
            image.alt = product.name + ": " + product.details;
            image.style.cursor = "pointer";

            const imageLink = document.createElement("a");
            imageLink.href = "/Html/product.html?id=" + encodeURIComponent(product.id);
            imageLink.setAttribute("aria-label", "Bekijk " + product.name);
            imageLink.style.cssText = "display:block;width:100%;height:100%;";
            image.parentNode.insertBefore(imageLink, image);
            imageLink.appendChild(image);

            const info = card.querySelector(".product-info");
            if (!info) return;
            const name = info.querySelector(".product-name");
            if (name) name.textContent = product.name;

            const descriptions = info.querySelectorAll(".product-description");
            if (descriptions.length) {
                descriptions[0].textContent = product.category + " · " + product.color;
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
        /* Keep the static homepage usable if the API is unavailable. */
    }
})();
