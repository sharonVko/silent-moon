import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { getUsers } from "../functions/supabase-func";

export const mainContext = createContext({})

export default function UserProvider({children}: {children: React.ReactNode}) {

    const [user, setUser] = useState<{ session: Session | null } | undefined>()
    const [isLoggedIn, setIsLoggenIn] = useState<boolean | null>(false)

    useEffect(() => {
        async function getData() {
            const users_variable = await getUsers()
            setUser(users_variable)
        }
        getData()
    }, [])

    const logInSystem = (userData) => {
        setUser(userData)
    } 
    return (
        <mainContext.Provider value={{logInSystem ,isLoggedIn, user, setUser, setIsLoggenIn}}>
            {children}
        </mainContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(mainContext)
    if (!context) {
      throw new Error('useUserContext must be used within a UserProvider')
    }
    return context
  }