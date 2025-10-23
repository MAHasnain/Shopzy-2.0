const SUPABASE_URL = `SUPABASE_URL`;
const SUPABASE_ANON_KEY = `SUPABASE_ANON_KEY`;

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const orderCreation = async (orderData) => {
    const { data, error } = await supabaseClient
        .from('Orders')
        .insert(orderData)
        .select()

    if (error) {
        console.error(error);
        return error;
    }
    console.log(data);
    return data;
}

export const getOrders = async () => {
    const { data, error } = await supabaseClient
        .from('Orders')
        .select("*")

    if (error) {
        console.error(error);
        return error;
    }
    console.log(data);
    return data;

}