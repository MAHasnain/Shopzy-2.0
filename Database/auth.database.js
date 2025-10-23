const SUPABASE_URL = `SUPABASE_URL`;
const SUPABASE_ANON_KEY = `SUPABASE_ANON_KEY`;

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const createNewUser = async (userData) => {
    const { data, error } = await supabaseClient.auth.signUp(
        userData
        // {
        //     email: 'example@email.com',
        //     password: 'example-password',
        //     options: {
        //         data: {
        //             first_name: 'John',
        //             age: 27,
        //         }
        //     }
        // }
    )

    if (error) {
        console.error(error);
        return error;
    }
    console.log(data);
    return data;

};

export const signInUser = async (userData) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword(
        //     {
        //     email: 'example@email.com',
        //     password: 'example-password',
        // }
        userData
    )

    if (error) {
        console.error(error);
        return error;
    }
    console.log(data);
    return data;

}

export const signOutUser = async () => {
    const { error } = await supabaseClient.auth.signOut()

    if (error) {
        console.error(error);
        return error
    }
}

export const getUserSession = async () => {
    const { data, error } = await supabaseClient.auth.getSession()

    if (error) {
        console.error(error);
        return error;
    }
    console.log(data);
    return data;

}

export const getLoggedInUser = async () => {

    const { data: { user } } = await supabaseClient.auth.getUser()

    console.log(user);
    return user;

}