// console.log(supabase);
import { getCartItems, getUserSession, getProductById, removeProductById, removeMultipleProducts } from "../Database/allMethods.js";

const cartItemsSection = document.querySelector(".cart-items-section");
const checkoutBtnSection = document.querySelector(".checkout-section");
const deleteBtnSection = document.querySelector(".delete-btn-section");
const authBtnSection = document.querySelector(".authBtnSection");

function showCartModal(message) {
    const modal = document.querySelector("#cartModal");
    const content = document.querySelector("#cartModalContent");

    content.innerHTML = `
        <h2>${message}</h2>
        <button class="btn" id="closeCartModal">Okay</button>
    `;

    modal.classList.add("active");

    document.querySelector("#closeCartModal").addEventListener("click", () => {
        modal.classList.remove("active");
        window.location.reload();
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const userSession = await getUserSession();

        if (userSession.session) {
            authBtnSection.innerHTML = `<button class="btn logout-btn">Logout</button>`;

            const logoutBtn = document.querySelector(".logout-btn");
            logoutBtn.addEventListener("click", async (e) => {
                e.preventDefault();
                console.log("clicked");
                const user = await signOutUser();
                console.log(user);
                window.location.href = `../HTML/login.html`;
            })

            const cartItems = await getCartItems();
            console.log(cartItems);

            if (cartItems.length === 0) {
                cartItemsSection.innerHTML = `<div>
                    <p>No items here yet</p>
                    <p>Find products you’ll love below</p>
                    <button class="btn"> <a href="../index.html">Explore shop</a> </button></div>`

            } else {

                // cart items section
                cartItems.forEach(async item => {
                    // console.log(item);
                    const { product_id, quantity } = item;
                    const product = await getProductById(product_id)
                    // console.log(product);
                    cartItemsSection.innerHTML += `
                    <div class="cart-item " data-itemId="${product_id}">
                    <img src="${product.image_url}"  width="100px" alt="${product.title}">
                    <div class="product-header">
                        <h4 class="item-name">${product.title}</h4>
                        <h5 class="item-price">Rs. ${product.price}</h5>
                    </div>
                    <p class="item-qty">Qty: ${quantity}</p>
                    <div><button class="btn deleteBtn"><i class="fa-solid fa-trash"></i></button>
                    </div></div>`;

                    const deleteBtn = document.querySelectorAll(".deleteBtn");
                    // console.log(deleteBtn);
                    deleteBtn.forEach(btn => {
                        btn.addEventListener("click", async (e) => {
                            e.preventDefault();
                            // console.log("clicked");
                            const deleted = await removeProductById(product_id);
                            // console.log(deleted);
                        })
                    })
                })

                // const removeProduct = await removeProductById()

                // checkout section

                let totalPrice = 0;
                cartItems.map(async item => {

                    const product = await getProductById(item.product_id)
                    // console.log(totalPrice = totalPrice + product.price);
                    totalPrice += product.price

                    checkoutBtnSection.innerHTML = `
                    <div class="checkout">
                    <div class="cart-total">
                    <p class="item-qty"><span>Total Items </span>${cartItems.length}</p>
                    <p class="item-total-price"><span>Total </span>${totalPrice}</p>
                    </div>
                    <div class="checkout-btn">
                    <a class="btn" href="../HTML/checkout.html">Proceed to Checkout</a>
                    </div>
                    </div>`;
                })

                // delete button section

                deleteBtnSection.innerHTML = `
                <div class="">
                        <button class="btn deleteBtn"><i class="fa-solid fa-trash"></i></button>
                    </div>`;

                const deleteBtn = document.querySelector(".deleteBtn");
                deleteBtn.addEventListener("click", async (e) => {
                    e.preventDefault();
                    // console.log(cartItems.filter(item => item.product_id));

                    const itemIds = cartItems.map(item => item.id)
                    // console.log(itemIds);

                    const deletedProducts = await removeMultipleProducts(itemIds);
                    // console.log(deletedProducts);
                    showCartModal("Items removed from your cart!");

                })

            }

        } else {
            window.location.href = `../HTML/login.html`
        }

    } catch (error) {
        console.error(error);
    }

})