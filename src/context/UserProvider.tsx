import React, { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from '../interfaces/IUser';
import supabase from '../utils/supabase';

interface UserContextType {
  logInSystem: (userData: IUser) => void;
  isLoggedIn: boolean;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const mainContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggenIn] = useState<boolean>(false);

  async function getUsers(): Promise<IUser[]> {
    const { data: users, error } = await supabase.from('profiles').select('*');
    if (error) {
      console.error(error);
    }

    return users as IUser[];
  }

  useEffect(() => {
    async function getData() {
      const users_variable = await getUsers();
      if (users_variable.session) {
        setUser(users_variable);
      }
    }
    getData();
  }, []);

  const logInSystem = userData => {
    setUser(userData);
  };

  return (
    <mainContext.Provider value={{ logInSystem, isLoggedIn, user, setUser, setIsLoggenIn }}>
      {children}
    </mainContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(mainContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
