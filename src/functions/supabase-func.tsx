import supabase from "../utils/supabase";

export async function getUsers() {
    const { data, error } = await supabase.auth.getSession()
    
    if(error) {
        console.error(error);
    }
    
    return data
}