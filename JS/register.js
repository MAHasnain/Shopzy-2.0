// console.log(supabase);
import { createNewUser } from "../Database/auth.database.js";

const regNameInp = document.querySelector("#regNameInp")
const regAgeInp = document.querySelector("#regAgeInp")
const regEmailInp = document.querySelector("#regEmailInp")
const regPasswordInp = document.querySelector("#regPasswordInp")
const registerBtn = document.querySelector("#register-btn")

const sessionCheck = async () => {
    const userSession = await getUserSession();
    console.log(userSession);

    if (userSession.session) {
        window.location.href = `/`;
    }
}
sessionCheck();

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
        
        if (newUser.user) {
            window.location.href = `../HTML/login.html`;
        }

        return newUser;

    } catch (error) {
        console.error(error);
        return error;
    }

})
