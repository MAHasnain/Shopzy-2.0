import { signInUser } from "../Database/auth.database.js";
// console.log(supabase);

const loginEmailInp = document.querySelector("#loginEmailInp");
const loginPassInp = document.querySelector("#loginPassInp");
const loginBtn = document.querySelector("#loginBtn");

loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {

        const signedInUser = await signInUser({
            email: loginEmailInp.value,
            password: loginPassInp.value,
        })

        console.log(signedInUser);
    
    } catch (error) {
        console.error(error)
        return error;
    }

})