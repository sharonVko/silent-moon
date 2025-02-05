import React, { createContext, useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { getUsers } from "../functions/supabase-func";

export const mainContext = createContext({})

export default function UserProvider({children}: {children: React.ReactNode}) {

    const [user, setUser] = useState<IUser[]>()
    const [isLoggedIn, setIsLoggenIn] = useState<boolean | null>(false)

    useEffect(() => {
        async function getData() {
            const users_variable = await getUsers()
            setUser(users_variable)
        }
        getData()
    }, [])

    return (
        <mainContext.Provider value={{isLoggedIn, user, setUser, setIsLoggenIn}}>
            {children}
        </mainContext.Provider>
    )
}