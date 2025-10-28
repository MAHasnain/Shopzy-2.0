import { getCategoryById } from "../Database/allMethods.js";

document.addEventListener("DOMContentLoaded", async () => {
    const searchParams = new URLSearchParams(window.location.search);

    const categoryId = searchParams.get("id");
    console.log(categoryId);
    if (categoryId) {
        const category = await getCategoryById(categoryId)
        console.log(category);
    }

})