const SUPABASE_URL = `SUPABASE_URL`;
const SUPABASE_ANON_KEY = `SUPABASE_ANON_KEY`;

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