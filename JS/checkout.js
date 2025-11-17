import { getCartItems, getProductById, getUserSession, orderCreation } from "../Database/allMethods.js";

const checkoutSection = document.querySelector(".checkout_section")
const payoutSection = document.querySelector(".payout-section");

const orderModal = document.querySelector("#orderModal");
const orderModalContent = document.querySelector("#orderModalContent");

function showOrderSuccessModal(orderId, amount, itemCount) {
    orderModalContent.innerHTML = `
        <h2>Order Placed Successfully!</h2>
        <p>Your order has been confirmed.</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Total:</strong> ${amount}</p>
        <p><strong>Items:</strong> ${itemCount}</p>
        <button class="btn" id="continueShoppingBtn">Continue Shopping</button>
    `;

    orderModal.classList.add("active");
    document.querySelector("#continueShoppingBtn").addEventListener("click", () => {
        orderModal.classList.remove("active");
        window.location.href = "../index.html";
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const productId = searchParams.get("product");

    const userSession = await getUserSession();
    console.log(userSession);
    const { session } = userSession;
    const { user } = session;

    if (productId) {

        const product = await getProductById(productId);
        console.log(product);

        checkoutSection.innerHTML = `
        <div class="checkout-item " >
                <img src="${product.image_url}"  width="200px" alt="${product.title}">
                <div class="total-items">
                <p class="item-name">${product.title}</p>
                <h4 class="item-price">Rs. ${product.price}</h4>
            </div>
        </div>`;

        payoutSection.innerHTML = `
            <div class="order-summary">
                <h4>Order Summary</h4>
                <div class="total-items">
                    <p class="item-qty"><span>Total Items </span> 1</p>
                    <h4 class="item-total-price"><span>Total </span>${product.price}</h4>
                </div>
                <button class="btn" id="orderBtn">Proceed to Pay</button>
            </div>`;

        const orderBtn = document.querySelector("#orderBtn");

        orderBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            const newOrder = await orderCreation({
                user_id: user.id,
                product_id: product.id,
                quantity: 1,
                price: product.price,
                total: product.price
            })
            console.log(newOrder);
            const { id, total, quantity } = newOrder[0]
            if (newOrder) {
                showOrderSuccessModal(id, total, quantity)
            } else {
                return;
            }
        })

    } else {

        // all cart items 
        const cartItems = await getCartItems();
        console.log(cartItems);

        cartItems.forEach(async item => {
            const { product_id, quantity } = item;
            const product = await getProductById(product_id)
            // console.log(product);
            checkoutSection.innerHTML += `
                <div class="checkout-item " data-itemId="${product_id}">
                    <img src="${product.image_url}"  width="100px" alt="${product.title}">
                    <div class="total-items">
                    <p class="item-name">${product.title}</p>
                    <h4 class="item-price">Rs. ${product.price}</h4>
                    <p class="item-qty">Qty: ${quantity}</p>
                    </div>
                </div>`;
        });

        let totalPrice = 0;
        cartItems.map(async item => {

            const product = await getProductById(item.product_id);
            // console.log(totalPrice = totalPrice + product.price);
            totalPrice += product.price

            payoutSection.innerHTML = `
        <div class="order-summary">
            <h4>Order Summary</h4>
            <div class="total-items">
                <p class="item-qty"><span>Total Items </span>${cartItems.length}</p>
                <h4 class="item-total-price"><span>Total </span>${totalPrice}</h4>
            </div>
                <button class="btn " id="orderBtn" >Proceed to Pay</button>
         </div>`;

            const orderBtn = document.querySelector("#orderBtn");

            orderBtn.addEventListener("click", async (e) => {
                e.preventDefault();
                console.log("clicked");

                const newOrder = await orderCreation({
                    user_id: user.id,
                    product_id: product.id,
                    quantity: cartItems.length,
                    price: product.price,
                    total: totalPrice
                })
                console.log(newOrder);
                const { id, total, quantity } = newOrder[0]
                if (newOrder) {
                    showOrderSuccessModal(id, total, quantity)
                } else {
                    return;
                }
            })
        })
    }
})