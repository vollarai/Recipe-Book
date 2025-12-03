import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify';
import { UserProvider } from "./providers/UserContext";
import { ThemeProvider } from "./providers/ThemeProvider";
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './providers/FavoritesContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider>
          <FavoritesProvider>
            <App />
            <ToastContainer />
          </FavoritesProvider>
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
