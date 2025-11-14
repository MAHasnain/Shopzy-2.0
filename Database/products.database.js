const SUPABASE_URL = `https://ufeiacuottjvkuezhyue.supabase.co`;
const SUPABASE_ANON_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmZWlhY3VvdHRqdmt1ZXpoeXVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MTQ3MDgsImV4cCI6MjA3NjE5MDcwOH0.3nRXCTj84tAReLv6w9c0QIDCzuYphEo64F3tQn0BQ30`;

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// console.log(supabase);
// console.log(supabaseClient);

export const getAllProducts = async () => {

    const { data, error } = await supabaseClient
        .from('Products')
        .select("*")

    if (error) {
        console.log(error);
        return error;
    }

    console.log(data);
    return data;

}

export const getProductById = async (id) => {
    const { data, error } = await supabaseClient
        .from("Products")
        .select("*")
        .eq('id', id)
        .single();

    if (error) {
        console.log(error);
        return error;
    }
    // console.log(data);
    return data;
}