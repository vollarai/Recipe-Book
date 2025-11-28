import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify';
import { UserProvider } from "./providers/UserContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <App />
      <ToastContainer />
    </UserProvider>
  </StrictMode>,
)
