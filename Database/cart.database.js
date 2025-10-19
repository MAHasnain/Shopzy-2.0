const SUPABASE_URL = `https://ufeiacuottjvkuezhyue.supabase.co`;
const SUPABASE_ANON_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmZWlhY3VvdHRqdmt1ZXpoeXVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MTQ3MDgsImV4cCI6MjA3NjE5MDcwOH0.3nRXCTj84tAReLv6w9c0QIDCzuYphEo64F3tQn0BQ30`;

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const addProductInCart = async (product) => {
    const { data, error } = await supabaseClient
        .from('Cart')
        .insert(product)
        .select()

    if (error) {
        console.error(error);
        return error;
    }
    console.log(data);
    return data;
}

export const editProductInCart = async (productData, productId) => {
    const { error } = await supabaseClient
        .from('Cart')
        .update(productData)
        .eq('id', productId)
        .select()

    if (error) {
        console.error(error);
        return error;
    }

}

export const removeProductById = async (productId) => {
    const { data, error } = await supabaseClient
        .from('Cart')
        .delete()
        .eq('id', productId)
        .select()

    if (error) {
        console.error(error);
        return error;
    }
    return data;
}

export const removeMultipleProducts = async (productIdsArray) => {
    const response = await supabaseClient
        .from('Cart')
        .delete()
        .in('id', productIdsArray);

    const { data, error } = response
    if (error) {
        console.error(error)
        return error
    }
    console.log(data);
    return data;
};
