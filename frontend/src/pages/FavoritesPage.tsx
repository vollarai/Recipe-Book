import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useUser } from "../providers/UserContext";
import type { Recipe } from "../models/recipe";
import { LuUtensils, LuHeart } from "react-icons/lu";
import { categoryColor } from "../models/categoryColor";
import { useFavorites } from "../providers/FavoritesContext";

export const FavoritesPage = () => {
  const { token } = useUser();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("You are not authorized");
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const res = await fetch("http://localhost:5113/api/recipes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Error ${res.status}`);
        }

        const data: Recipe[] = await res.json();
        setRecipes(data);
      } catch (e) {
        console.error(e);
        setError("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  const favoriteRecipes = useMemo(
    () => recipes.filter((r) => isFavorite(r.id)),
    [recipes, isFavorite]
  );

  return (
    <Layout>
      <main className="flex-1 p-4 md:p-6 space-y-6 bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        
        {loading && (
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Loading favorites…
          </div>
        )}

        {error && !loading && (
          <div className="text-sm text-red-400">{error}</div>
        )}

        {!loading && !error && favoriteRecipes.length === 0 && (
          <div className="text-sm text-slate-500 dark:text-slate-400">
            You don&apos;t have any favorite recipes yet. Go to{" "}
            <button
              onClick={() => navigate("/recipes")}
              className="underline underline-offset-2 text-emerald-600 dark:text-emerald-400"
            >
              My recipes
            </button>{" "}
            and tap the heart to add.
          </div>
        )}

        {!loading && !error && favoriteRecipes.length > 0 && (
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {favoriteRecipes.map((recipe) => (
              <article
                key={recipe.id}
                onClick={() => navigate(`/recipes/${recipe.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer flex flex-col border border-slate-200 dark:bg-slate-900 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
              >
                {recipe.imageUrl ? (
                  <img
                    src={`http://localhost:5113${recipe.imageUrl}`}
                    alt={recipe.title}
                    className="h-40 w-full object-cover"
                  />
                ) : (
                  <div className="h-40 w-full bg-gradient-to-br from-emerald-200 to-sky-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                    <LuUtensils
                      className="text-slate-700 dark:text-slate-300"
                      size={40}
                    />
                  </div>
                )}

                <div className="flex-1 p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-base font-semibold text-slate-800 dark:text-slate-50">
                      {recipe.title}
                    </h2>
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

                  {recipe.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 dark:text-slate-400">
                      {recipe.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400 dark:text-slate-500">
                    <span>
                      Created:{" "}
                      {new Date(recipe.createdAt).toLocaleDateString()}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(recipe.id);
                      }}
                      className="
                        p-1.5 rounded-full
                        bg-white/80 dark:bg-slate-800/80
                        hover:bg-white dark:hover:bg-slate-700
                        shadow transition
                      "
                    >
                      <LuHeart
                        size={18}
                        className={
                          isFavorite(recipe.id)
                            ? "text-rose-500 fill-rose-500"
                            : "text-slate-400"
                        }
                      />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </Layout>
  );
};
