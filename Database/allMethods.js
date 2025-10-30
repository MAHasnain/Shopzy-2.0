import { createNewUser, getLoggedInUser, getUserSession, signInUser, signOutUser } from "./auth.database.js";
import { getCartItems, addProductInCart, editProductInCart, removeMultipleProducts, removeProductById } from "./cart.database.js";
import { getAllCategories, getCategoryById } from "./categories.database.js";
import { getAllProducts, getProductById } from "./products.database.js";
import { getOrders, orderCreation } from "./orders.database.js";

export {
    // Auth Methods
    createNewUser,
    signInUser,
    signOutUser,
    getUserSession,
    getLoggedInUser,
    // Cart Methods
    getCartItems,
    addProductInCart,
    editProductInCart,
    removeProductById,
    removeMultipleProducts,
    // Categories Methods
    getAllCategories,
    getCategoryById,
    // Products Methods
    getAllProducts,
    getProductById,
    // Orders Methods
    getOrders,
    orderCreation
};