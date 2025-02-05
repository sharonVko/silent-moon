import { IEmpty, ISession } from "../interfaces/ISession";
import supabase from "../utils/supabase";

export async function getUsers():Promise<IEmpty> {
    const { data, error } = await supabase.auth.getSession()
    console.log(data);
    
    if(error) {
        console.error(error);
    }
    
    return data as IEmpty
}