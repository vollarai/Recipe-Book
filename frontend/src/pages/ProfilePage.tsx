import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useUser } from "../providers/UserContext";
import type { Recipe } from "../models/recipe";
import { useFavorites } from "../providers/FavoritesContext";
import { LuUser, LuMail, LuUtensils, LuHeart, LuLayers } from "react-icons/lu";

export const ProfilePage = () => {
  const { user, token } = useUser();
  const { isFavorite } = useFavorites();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
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
        setError("Failed to load your recipes");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token, navigate]);

  const totalRecipes = recipes.length;
  const favoriteCount = useMemo(
    () => recipes.filter((r) => isFavorite(r.id)).length,
    [recipes, isFavorite]
  );

  const recentRecipes = useMemo(
    () => [...recipes].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 5),
    [recipes]
  );

  return (
    <Layout>
      <main className="flex-1 p-4 md:p-6 bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <div className="max-w-5xl mx-auto space-y-6">
          <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <LuUser size={56} className="text-slate-300 dark:text-slate-400" />
              <div>
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                  {user?.userName || "User"}
                </h1>
                <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <LuMail size={14} />
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Total recipes
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-50">
                    {totalRecipes}
                  </p>
                </div>
                <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-500/20">
                  <LuUtensils className="text-emerald-700 dark:text-emerald-300" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Favorites
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-50">
                    {favoriteCount}
                  </p>
                </div>
                <div className="rounded-full bg-rose-100 p-2 dark:bg-rose-500/20">
                  <LuHeart className="text-rose-600 dark:text-rose-300" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Categories used
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-50">
                    {
                        new Set(
                            recipes
                            .map((r) => r.category)
                            .filter(
                                (c): c is NonNullable<Recipe["category"]> => Boolean(c)
                            )
                        ).size
                    }
                  </p>
                </div>
                <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/40">
                    <LuLayers className="text-indigo-600 dark:text-indigo-300" size={24} />
                  </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Recent recipes
            </h2>

            {loading && (
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Loading your recipes…
              </div>
            )}

            {error && !loading && (
              <div className="text-sm text-red-400">{error}</div>
            )}

            {!loading && !error && recentRecipes.length === 0 && (
              <div className="text-sm text-slate-500 dark:text-slate-400">
                You don&apos;t have any recipes yet. Try creating one on the{" "}
                <button
                  className="underline underline-offset-2 text-emerald-600 dark:text-emerald-400"
                  onClick={() => navigate("/add")}
                >
                  Add recipe
                </button>{" "}
                page.
              </div>
            )}

            {!loading && !error && recentRecipes.length > 0 && (
              <div className="space-y-2">
                {recentRecipes.map((recipe) => (
                  <button
                    key={recipe.id}
                    onClick={() => navigate(`/recipes/${recipe.id}`)}
                    className="w-full text-left rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition hover:border-emerald-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-50">
                          {recipe.title}
                        </p>
                        <p className="mt-1 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                          {recipe.description || "No description"}
                        </p>
                      </div>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        {new Date(recipe.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
};
