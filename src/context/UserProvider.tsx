import { createContext, useContext, useState } from "react";
import { User } from "@supabase/supabase-js";

interface UserContext {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    }

    const UserContext = createContext<UserContext>(null!);

    export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
        {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
