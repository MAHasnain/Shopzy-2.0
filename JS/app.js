// console.log(getAllProducts);
// console.log(supabase);

import { getAllCategories, getAllProducts } from "../Database/allMethods.js";

const productsContainer = document.querySelector(".products_container")
document.addEventListener("DOMContentLoaded", async () => {
    const allProducts = await getAllProducts();
    console.log(allProducts);

    allProducts.map(product => {
        productsContainer.innerHTML += `
         <div class="product-card" data-id="${product.id}">
                <img src="${product.image_url}" width=200px alt="">
                    <div class="product-price"><h4>Rs. ${product.price}</h4></div>
                    <div class="product-name"><p>${product.title}</p></div>
                    <div class="product-description"><p>${product.description}</p></div>
                    <div class="product-stock"><p>${product.stock}</p></div>
                    
                    <button id="cart_btn">Add to Cart</button>
                </div>`
    })

    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach(card => {
        card.addEventListener("click", () => {
            const cardId = card.getAttribute("data-id")
            window.location.href = `../HTML/product_details.html?id=${cardId}`
        })
    })

    const allCategories = await getAllCategories();
    console.log(allCategories);
})