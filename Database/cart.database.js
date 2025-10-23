const SUPABASE_URL = `SUPABASE_URL`;
const SUPABASE_ANON_KEY = `SUPABASE_ANON_KEY`;

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
