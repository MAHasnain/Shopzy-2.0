const SUPABASE_URL = `https://ufeiacuottjvkuezhyue.supabase.co`;
const SUPABASE_ANON_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmZWlhY3VvdHRqdmt1ZXpoeXVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MTQ3MDgsImV4cCI6MjA3NjE5MDcwOH0.3nRXCTj84tAReLv6w9c0QIDCzuYphEo64F3tQn0BQ30`;

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const createNewUser = async (userData) => {
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

const signInUser = async (userData) => {
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

const signOutUser = async () => {
    const { error } = await supabaseClient.auth.signOut()

    if (error) {
        console.error(error);
        return error
    }
}

const getUserSession = async () => {
    const { data, error } = await supabaseClient.auth.getSession()

    if (error) {
        console.error(error);
        return error;
    }
    console.log(data);
    return data;

}