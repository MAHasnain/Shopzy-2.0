import { addProductInCart, getAllProducts, getCategoryById } from "../Database/allMethods.js";

function shortText(text, limit = 30) {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
}

document.addEventListener("DOMContentLoaded", async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryName = document.querySelector(".category-name")
    const productsContainer = document.querySelector(".products_container")
    const categoryId = searchParams.get("id");
    console.log(categoryId);
    if (categoryId) {
        const category = await getCategoryById(categoryId)
        console.log(category);
        categoryName.textContent = category.name;

        const allProducts = await getAllProducts();
        // console.log(allProducts[0].category_id == categoryId);
        // console.log(allProducts[0].category_id, categoryId);
        const filteredProducts = allProducts.filter(product => {
            // console.log(categoryId);
            // console.log(product.category_id);
            return product.category_id == categoryId
        })
        console.log(filteredProducts);

        filteredProducts.length === 0 ? productsContainer.innerHTML = `<p>No Products in this category</p>` :
            filteredProducts.map(product => {
                console.log(product);
                productsContainer.innerHTML += `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.image_url}" width=200px alt="">
                    <div class="product-price"><h4>Rs. ${product.price}</h4></div>
                    <div class="product-name"><p>${product.title}</p></div>
                    <div class="product-description"><p>${product.description}</p></div>
                    <div class="product-stock"><p>Stock ${product.stock}</p></div>
                    
                    <button class="btn" id="cart_btn">Add to Cart</button>
                </div>`

                const descEl = document.querySelectorAll(".product-description");
                descEl.forEach(el => {
                    el.textContent = shortText(el.textContent, 40);
                });

                // const cart_btn = document.querySelector("#cart_btn");
                // cart_btn.addEventListener("click", async (e) => {
                //     e.preventDefault();

                //     const addProduct = await addProductInCart(product.id)
                //     console.log(addProduct);
                // });
            })

        const productCards = document.querySelectorAll(".product-card");
        productCards.forEach(card => {
            card.addEventListener("click", () => {
                const cardId = card.getAttribute("data-id");
                window.location.href = `../HTML/product_details.html?id=${cardId}`;
            })
        });

    }

})