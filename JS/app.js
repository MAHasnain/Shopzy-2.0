// console.log(getAllProducts);
// console.log(supabase);

import { getAllCategories, getAllProducts } from "../Database/allMethods.js";

const productsContainer = document.querySelector(".products_container")
const categoriesContainer = document.querySelector(".categories")

function shortText(text, limit = 30) {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
}

document.addEventListener("DOMContentLoaded", async () => {
    const allProducts = await getAllProducts();
    console.log(allProducts);

    allProducts.map(product => {
        productsContainer.innerHTML += `
        <div class="product-card" data-id="${product.id}">
        <div>
        <img src="${product.image_url}" width=200px alt=""></div>
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
    allCategories.map(category => {
        categoriesContainer.innerHTML += `<div data-id="${category.id}" class="category-card card">
            <p>${category.name}</p>
        </div>
        `
    })

    const categoryCards = document.querySelectorAll(".category-card");
    categoryCards.forEach(card => {
        card.addEventListener("click", () => {
            const cardId = card.getAttribute("data-id");
            window.location.href = `../HTML/category_details.html?id=${cardId}`;
        })
    })

})