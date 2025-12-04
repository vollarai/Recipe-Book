import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify';
import { UserProvider } from "./providers/UserContext";
import { ThemeProvider } from "./providers/ThemeProvider";
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './providers/FavoritesContext.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/Recipe_Book">
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
