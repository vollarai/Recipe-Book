import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useUser } from "../providers/UserContext";
import type { Recipe } from "../models/recipe";
import { LuUtensils, LuHeart, LuArrowLeft } from "react-icons/lu";
import { useFavorites } from "../providers/FavoritesContext";
import { categoryColor } from "../models/categoryColor";

export const RecipeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useUser();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    if (!id) {
      setError("Recipe not found");
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`http://localhost:5113/api/recipes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Error ${res.status}`);
        }

        const data: Recipe = await res.json();
        setRecipe(data);
      } catch (e) {
        console.error(e);
        setError("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, token, navigate]);

  return (
    <Layout>
      <main className="flex-1 p-4 md:p-6 bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <div className="max-w-3xl mx-auto space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition mb-2"
          >
            <LuArrowLeft size={16} />
            Back to recipes
          </button>

          {loading && (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Loading recipe…
            </div>
          )}

          {error && !loading && (
            <div className="text-sm text-red-400">{error}</div>
          )}

          {!loading && !error && recipe && (
            <article className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              {recipe.imageUrl ? (
                <img
                  src={`http://localhost:5113${recipe.imageUrl}`}
                  alt={recipe.title}
                  className="h-64 w-full object-cover"
                />
              ) : (
                <div className="h-64 w-full bg-gradient-to-br from-emerald-200 to-sky-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                  <LuUtensils className="text-slate-700 dark:text-slate-300" size={56} />
                </div>
              )}

              <div className="p-5 md:p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                      {recipe.title}
                    </h1>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span>
                        Created:{" "}
                        {new Date(recipe.createdAt).toLocaleDateString()}
                      </span>
                      {recipe.category && (
                        <span
                          className={`
                            rounded-full px-2 py-[2px] text-[11px] border 
                            border-transparent ${
                              categoryColor[recipe.category] ||
                              "bg-slate-200 dark:bg-slate-700"
                            }
                          `}
                        >
                          {recipe.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFavorite(recipe.id)}
                    className="
                      p-2 rounded-full
                      bg-white/80 dark:bg-slate-800/80
                      hover:bg-white dark:hover:bg-slate-700
                      shadow transition
                    "
                  >
                    <LuHeart
                      size={20}
                      className={
                        isFavorite(recipe.id)
                          ? "text-rose-500 fill-rose-500"
                          : "text-slate-400"
                      }
                    />
                  </button>
                </div>

                {recipe.description && (
                  <section>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                      Description
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line">
                      {recipe.description}
                    </p>
                  </section>
                )}

                {recipe.ingredients && (
                  <section>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                      Ingredients
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line">
                      {recipe.ingredients}
                    </p>
                  </section>
                )}

                {recipe.steps && (
                  <section>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                      Steps
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line">
                      {recipe.steps}
                    </p>
                  </section>
                )}
              </div>
            </article>
          )}
        </div>
      </main>
    </Layout>
  );
};
