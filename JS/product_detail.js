import { addProductInCart, getProductById, getUserSession } from "../Database/allMethods.js";

const productContainer = document.querySelector(".product-container");
function showCartModal(message) {
    const modal = document.querySelector("#cartModal");
    const content = document.querySelector("#cartModalContent");

    content.innerHTML = `
        <h2>${message}</h2>
        <button class="btn" id="closeCartModal">Okay</button>`;

    modal.classList.add("active");

    document.querySelector("#closeCartModal").addEventListener("click", () => {
        modal.classList.remove("active");
        // window.location.href = `../HTML/cart.html`;
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const productId = searchParams.get('id');
    console.log(productId);
    if (productId) {

        const product = await getProductById(productId);
        console.log(product);

        document.querySelector("#product-name").textContent = product.title
        document.querySelector("#product-img").src = product.image_url
        document.querySelector("#product-price").textContent = `Rs. ${product.price}`
        document.querySelector("#product-description").textContent = product.description

        // ITEM QUANTITY INPUTS SECTION
        document.querySelector(".action-btns-section").innerHTML = `
            <div id="change-Quantity">
            <input type="number" value=1 min=1 class="qtyInp" readonly>
            <button class="btn qtyInc">+</button>
            <button class="btn qtyDec">-</button>
            </div>
            <div class="buy-btns"><button class="btn cartBtn">Add to Cart</button><button class="btn buyBtn">Buy Now</button></div>`;

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
                const userId = userSession.session?.user?.id;
                console.log(userId);
                const addedProduct = await addProductInCart({
                    user_id: userId,
                    product_id: productId,
                    quantity: productQty.value,
                })
                console.log(addedProduct);
                if (addedProduct) {
                    showCartModal("Item added to your cart!");
                } else {
                    return
                }
            })

            const buyBtn = document.querySelector(".buyBtn");
            buyBtn.addEventListener("click", () => {
                window.location.href = `../HTML/checkout.html?product=${productId}`
            })

        } else {
            window.location.href = `../HTML/login.html`
        }

    } else {
        productContainer.innerHTML = `<p>Product not found!</p>`
    }
})