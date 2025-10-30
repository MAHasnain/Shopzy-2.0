import { addProductInCart, getProductById, getUserSession } from "../Database/allMethods.js";

const productContainer = document.querySelector(".product-container");
document.addEventListener("DOMContentLoaded", async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const productId = searchParams.get('id');
    console.log(productId);
    if (productId) {

        const product = await getProductById(productId);
        console.log(product);

        document.querySelector("#product-name").textContent = product.title
        document.querySelector("#product-img").src = product.image_url
        document.querySelector("#product-price").textContent = product.price
        document.querySelector("#product-description").textContent = product.description

        // ITEM QUANTITY INPUTS SECTION
        document.querySelector(".action-btns-section").innerHTML = `
            <div id="change-Quantity">
            <button class="qtyInc">+</button>
            <input type="number" value=1 min=1 class="qtyInp" readonly>
            <button class="qtyDec">-</button>
            </div>
            <button class="cartBtn">Add to Cart</button>`;

        // Quantity update section
        const productQty = document.querySelector(".qtyInp");
        document.querySelector(".qtyInc").addEventListener("click", (e) => {
            e.preventDefault();
            console.log(productQty.value);
            productQty.value = Number(productQty.value) + 1;
        })
        document.querySelector(".qtyDec").addEventListener("click", (e) => {
            e.preventDefault();
            let currentVal = Number(productQty.value);
            if (currentVal > 1) {
                productQty.value = currentVal - 1;
            }
        })

        const userSession = await getUserSession();
        console.log(userSession.session);
        if (userSession.session) {

            const cartBtn = document.querySelector(".cartBtn");
            cartBtn.addEventListener("click", async (e) => {
                e.preventDefault();
                const user = JSON.parse(localStorage.getItem("user"));
                console.log(user.id);
                const addedProduct = await addProductInCart({
                    user_id: user.id,
                    product_id: productId,
                    quantity: productQty.value,
                })
                console.log(addedProduct);
            })

        } else {
            window.location.href = `../HTML/login.html`
        }

    } else {
        productContainer.innerHTML = `<p>Product not found!</p>`
    }
})