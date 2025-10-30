// console.log(supabase);
import { getCartItems, getUserSession } from "../Database/allMethods.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const userSession = await getUserSession()

        if (userSession.session) {

            const cartItems = await getCartItems();
            console.log(cartItems);

        } else {
            window.location.href = `../HTML/login.html`
        }


    } catch (error) {
        console.error(error);
    }

})