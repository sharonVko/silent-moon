import { createContext, useContext, useState, ReactNode } from 'react';

interface IFavContext {
  savedFav: boolean;
  setSavedFav: (value: boolean) => void;
}

export const FavouritesContext = createContext<IFavContext | null>(null);

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const [savedFav, setSavedFav] = useState<boolean>(false);

  return <FavouritesContext.Provider value={{ savedFav, setSavedFav }}>{children}</FavouritesContext.Provider>;
};

export const useFavouritesContext = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavouritesContext must be used within a FavouritesProvider');
  }
  return context;
};
