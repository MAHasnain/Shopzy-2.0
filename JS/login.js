import { getUserSession, signInUser } from "../Database/allMethods.js";
// console.log(supabase);

const loginEmailInp = document.querySelector("#loginEmailInp");
const loginPassInp = document.querySelector("#loginPassInp");
const loginBtn = document.querySelector("#loginBtn");

const sessionCheck = async () => {
    const userSession = await getUserSession();
    console.log(userSession);

    if (userSession.session) {
        window.location.href = `/`;
    }
}
sessionCheck();

loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {

        const signedInUser = await signInUser({
            email: loginEmailInp.value,
            password: loginPassInp.value,
        })

        console.log(signedInUser);
        const user = localStorage.setItem("user", JSON.stringify(signedInUser));

        if (signedInUser) {
            window.location.href = `/index.html`;
        }

    } catch (error) {
        console.error(error)
        return error;
    }

})

// function emptyInputVals(email, username, phoneNumber, password) {
//     for (let i = 0; i < arguments.length; i++) {
//         arguments[i].value = "";
//     }
// }