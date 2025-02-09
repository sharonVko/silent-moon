import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import supabase from '../utils/supabase';

interface UserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logoutFromSystem: () => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContext>(null!);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logoutFromSystem = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          setIsLoading(false);
          console.error('Fehler gibts kein User in Local Storage', error);
        } else {
          if (!user && session) {
            setUser(session?.user);
            console.log('User Session:', session);
          }
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }

      setIsLoading(false);
    };

    checkUserSession();
  }, []);

  return <UserContext.Provider value={{ user, isLoading, setUser, logoutFromSystem }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
