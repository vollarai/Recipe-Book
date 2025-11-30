import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify';
import { UserProvider } from "./providers/UserContext";
import { ThemeProvider } from "./providers/ThemeProvider";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <ThemeProvider>
        <App />
        <ToastContainer />
      </ThemeProvider>
    </UserProvider>
  </StrictMode>,
)
