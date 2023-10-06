let jsonData = null;

function createProductCard(product) {
    const productCard = document.createElement("div");
    productCard.classList.add(
        "bg-transparent",
        "p-4",
        "relative",
        "w-84",
        "h-96",
        "mb-24",
    );

    const condition = "used";
    const imageUrl = product.images.length > 0 ? product.images[0].src : './img/nopicture.png';

    productCard.innerHTML = `
        <div class="hidden">
            <span>id-${product.id}</span>
        </div>
        <div class="absolute top-7 left-7 bg-black text-white px-2 py-1 rounded text-sm font-normal uppercase">
            <span>${condition}</span>
        </div>
        <img src="${imageUrl}" alt="${product.title}" style="width: 300px; height: 300px;" class="rounded mx-auto mb-4 border border-t-2 border-r-2 border-black text-transparent">
        <div class="flex justify-between mb-2">
            <div class="product-name">
                <h4 class="font-semibold capitalize mb-0 w-48 truncate">${product.title}</h4>
                <p class="font-semibold mb-0">${product.variants[0].price} KR.</p>
            </div>
            <div class="product-condition">
                <p class="font-semibold text-gray-700 mb-0">Condition</p>
                <p class="text-gray-700 mb-0">Slighty ${condition}</p>
            </div>
        </div>
        <button class="rounded bg-black text-white px-4 py-2 w-full hover:bg-gray-800" onclick="addToCart('${product.title}', '${product.variants[0].price}', '${imageUrl}')">ADD TO CART</button>
    `;

    return productCard;
}

function createPagination(totalPages) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let page = 1; page <= totalPages; page++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = page;
        pageButton.addEventListener("click", () => loadPage(page));

        pageButton.classList.add(
            "px-3", 
            "py-2",
            "mr-2",
            "mb-16",
            "mt-24", 
            "bg-transparent",
            "text-black",
            "font-semibold",
            "hover:bg-gray-800",
            "border",
            "border-t-2",
            "border-black",
            
        );

    
        paginationContainer.appendChild(pageButton);
    }
}

function loadPage(page) {
    const productsContainer = document.getElementById("product-container");
    productsContainer.innerHTML = "";

    const itemsPerPage = 24;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const products = jsonData.products.slice(startIndex, endIndex);

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

async function loadProducts() {
    try {
        const response = await fetch('https://voodoo-sandbox.myshopify.com/products.json?limit=461');
        jsonData = await response.json();

        const products = jsonData.products;

        const totalPages = Math.ceil(products.length / 24);

        const productsContainer = document.getElementById("product-container");
        productsContainer.innerHTML = "";

        createPagination(totalPages);
        loadPage(1);

    } catch (error) {
        console.error('Loading Error', error);
    }
}

window.addEventListener("load", loadProducts);


const cartButton = document.getElementById("cart-button");
const cartPopup = document.getElementById("cart-popup");
const cartCloseButton = document.getElementById("cart-close-button");


cartButton.addEventListener("click", () => {
    cartPopup.classList.toggle("show");
});

cartCloseButton.addEventListener("click", () => {
    cartPopup.classList.remove("show");
});

