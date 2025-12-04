import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { RecipesPage } from "../pages/RecipesPage";
import { AddRecipePage } from "../pages/AddRecipePage";
import { FavoritesPage } from "../pages/FavoritesPage";
import { RecipeDetailsPage } from "../pages/RecipeDetailsPage";
import { ProfilePage } from "../pages/ProfilePage";
import { EditRecipePage } from "../pages/EditRecipePage";
import { useMock } from "../utils/config";

export const Routing = () => {
  const isMock = useMock;
  return (
      <Routes>
        <Route path="/" element={ isMock ? ( <Navigate to="/recipes" replace /> ) : (<LoginPage />)}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/add" element={<AddRecipePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/recipes/:id/edit" element={<EditRecipePage />} />
      </Routes>
  );
};