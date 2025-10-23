const SUPABASE_URL = `SUPABASE_URL`;
const SUPABASE_ANON_KEY = `SUPABASE_ANON_KEY`;

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const getAllCategories = async () => {

    const { data, error } = await supabaseClient
        .from('Categories')
        .select()

    if (error) {
        console.error(error);
        return error;
    }

    console.log(data);
    return data;
}

export const getCategoryById = async (categoryId) => {
    const { data, error } = await supabaseClient
        .from("Categories")
        .select()
        .eq('id', categoryId)
        .single();

    if (error) {
        console.error(error);
        return error;
    }
    // console.log(data);
    return data;
}