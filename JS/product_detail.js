import { getProductById } from "../Database/allMethods.js";

document.addEventListener("DOMContentLoaded", async () => {
    const searchParams = new URLSearchParams(window.location.search);
     const productId= searchParams.get('id');
     console.log(productId);
    if (productId) {
        
        const product = await getProductById(productId);
        console.log(product);

    } else {
        
    }
})