// console.log(supabase);
import { createNewUser } from "../Database/auth.database.js";

const regNameInp = document.querySelector("#regNameInp")
const regAgeInp = document.querySelector("#regAgeInp")
const regEmailInp = document.querySelector("#regEmailInp")
const regPasswordInp = document.querySelector("#regPasswordInp")
const registerBtn = document.querySelector("#register-btn")

registerBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {

        const newUser = await createNewUser(
            {
                email: regEmailInp.value,
                password: regPasswordInp.value,
                options: {
                    data: {
                        first_name: regNameInp.value,
                        age: regAgeInp.value,
                    }
                }
            }
        );

        console.log(newUser);
        return newUser;

    } catch (error) {
        console.error(error);
        return error;
    }

})
