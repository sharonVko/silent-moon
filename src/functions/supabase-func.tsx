import { IUser } from "../interfaces/IUser";
import supabase from "../utils/supabase";

export async function getUsers():Promise<IUser[]> {
    const {data: users, error} = await supabase.from("profiles").select("*")
    if(error) {
        console.error(error);
    }
    
    return users as IUser[]
}