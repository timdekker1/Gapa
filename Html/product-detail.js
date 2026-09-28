const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));
const pageState = document.getElementById("pageState");
const productContent = document.getElementById("productContent");
let product;

function stockLabel(stock) {
    if (stock === 0) return { text: "Uitverkocht", color: "#a00000" };
    if (stock <= 2) return { text: "Nog " + stock + " op voorraad", color: "#a56a00" };
    return { text: "Op voorraad: " + stock, color: "#26733b" };
}

function formatPrice(price) {
    if (price === null || price === "" || !Number.isFinite(Number(price))) return "Prijs op aanvraag";
    return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(Number(price));
}

async function loadAnsweredQuestions() {
    const container = document.getElementById("answeredQuestions");
    try {
        const response = await fetch("/api/products/get_questions.php?product_id=" + encodeURIComponent(product.id));
        const data = await response.json();
        container.replaceChildren();
        if (!data.success || data.questions.length === 0) {
            container.textContent = "Nog geen beantwoorde vragen.";
            return;
        }
        data.questions.forEach(function(item) {
            const block = document.createElement("article");
            block.className = "question-item";
            const question = document.createElement("strong");
            question.textContent = "Vraag: " + item.question;
            const answer = document.createElement("p");
            answer.textContent = "Antwoord: " + item.answer;
            block.append(question, answer);
            container.appendChild(block);
        });
    } catch (error) {
        container.textContent = "Vragen konden niet geladen worden.";
    }
}

async function loadProduct() {
    if (!Number.isInteger(productId) || productId <= 0) {
        pageState.textContent = "Dit product bestaat niet.";
        return;
    }

    try {
        const response = await fetch("/api/products/get_products.php");
        const data = await response.json();
        product = data.products && data.products.find(function(item) { return Number(item.id) === productId; });
        if (!data.success || !product) {
            pageState.textContent = "Dit product is niet gevonden of niet meer beschikbaar.";
            return;
        }

        document.title = product.name + " | Gapa Lederwaren";
        document.getElementById("productImage").src = "../" + product.image_path;
        document.getElementById("productImage").alt = product.name;
        document.getElementById("productCategory").textContent = product.category + " · " + product.color;
        document.getElementById("productName").textContent = product.name;
        document.getElementById("productPrice").textContent = formatPrice(product.price);
        const stock = stockLabel(Number(product.stock));
        const stockElement = document.getElementById("productStock");
        stockElement.textContent = stock.text;
        stockElement.style.color = stock.color;
        document.getElementById("productDescription").textContent = product.details;
        document.getElementById("questionForm").dataset.productId = product.id;
        pageState.hidden = true;
        productContent.hidden = false;
        loadAnsweredQuestions();
    } catch (error) {
        pageState.textContent = "Product laden is niet gelukt. Probeer het opnieuw.";
    }
}

document.getElementById("questionForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const status = document.getElementById("questionStatus");
    const button = form.querySelector("button[type='submit']");
    const values = new FormData(form);
    button.disabled = true;
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
        button.disabled = false;
    }
});

loadProduct();
