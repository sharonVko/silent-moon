import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import UserProvider from './context/UserProvider.tsx';
import { FavouritesProvider } from './context/FavoriteProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <FavouritesProvider>
        <App />
      </FavouritesProvider>
    </UserProvider>
  </StrictMode>
);
