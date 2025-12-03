import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { RecipesPage } from "../pages/RecipesPage";
import { AddRecipePage } from "../pages/AddRecipePage";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/add" element={<AddRecipePage />} />
      </Routes>
    </BrowserRouter>
  );
};
