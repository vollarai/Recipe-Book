import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useUser } from "../providers/UserContext";
import type { Recipe } from "../models/recipe";
import { LuSearch, LuUtensils, LuHeart } from "react-icons/lu";
import { categoryColor } from "../models/categoryColor";
import { useFavorites } from "../providers/FavoritesContext";

type SortOrder = "newest" | "oldest";

export const RecipesPage = () => {
  const { token } = useUser();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [categoryFilter, setCategoryFilter] = useState<Recipe["category"] | "All">("All");
  const { isFavorite, toggleFavorite } = useFavorites();

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
        setError("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  const filteredRecipes = useMemo(() => {
    let list = [...recipes];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          (r.description && r.description.toLowerCase().includes(q))
      );
    }

    if (categoryFilter !== "All") {
      list = list.filter((r) => r.category === categoryFilter);
    }

    list.sort((a, b) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? db - da : da - db;
    });

    return list;
  }, [recipes, search, sortOrder, categoryFilter]);

  return (
    <Layout>
      <main className="flex-1 p-4 md:p-6 space-y-6 bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <section className="space-y-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <span className="text-slate-400 text-sm"><LuSearch size = {18}/></span>
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-sm bg-transparent outline-none text-slate-700 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="hidden md:inline">Sort by:</span>
              <button
                onClick={() => setSortOrder("newest")}
                className={`rounded-full border px-3 py-1 ${
                  sortOrder === "newest"
                    ? "border-slate-900 bg-slate-900 text-slate-50 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
                    : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                }`}
              >
                Newest
              </button>
              <button
                onClick={() => setSortOrder("oldest")}
                className={`rounded-full border px-3 py-1 ${
                  sortOrder === "oldest"
                    ? "border-slate-900 bg-slate-900 text-slate-50 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
                    : "border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                }`}
              >
                Oldest
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setCategoryFilter("All")}
              className={`rounded-full px-3 py-1 ${
                categoryFilter === "All"
                  ? "bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-950"
                  : "bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setCategoryFilter("Breakfast")}
              className={`rounded-full px-3 py-1 ${
                categoryFilter === "Breakfast"
                  ? "bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-950"
                  : "bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800"
              }`}
            >
              Breakfast
            </button>

            <button
              onClick={() => setCategoryFilter("Lunch")}
              className={`rounded-full px-3 py-1 ${
                categoryFilter === "Lunch"
                  ? "bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-950"
                  : "bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800"
              }`}
            >
              Lunch
            </button>

            <button
              onClick={() => setCategoryFilter("Dinner")}
              className={`rounded-full px-3 py-1 ${
                categoryFilter === "Dinner"
                  ? "bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-950"
                  : "bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800"
              }`}
            >
              Dinner
            </button>

            <button
              onClick={() => setCategoryFilter("Dessert")}
              className={`rounded-full px-3 py-1 ${
                categoryFilter === "Dessert"
                  ? "bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-950"
                  : "bg-white border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800"
              }`}
            >
              Dessert
            </button>
          </div>
        </section>

        {loading && (
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Loading recipes…
          </div>
        )}

        {error && !loading && (
          <div className="text-sm text-red-400">{error}</div>
        )}

        {!loading && !error && filteredRecipes.length === 0 && (
          <div className="text-sm text-slate-500 dark:text-slate-400">
            No recipes yet. Click “Add recipe” to create.
          </div>
        )}

        {!loading && !error && filteredRecipes.length > 0 && (
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredRecipes.map((recipe) => (
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
                  <div className="h-40 w-full bg-gradient-to-br from-emerald-200 to-sky-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-4xl">
                    <LuUtensils className="text-slate-700 dark:text-slate-300" size={40} />
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
                          border-transparent ${categoryColor[recipe.category] || "bg-slate-200 dark:bg-slate-700"}
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
                      Created: {new Date(recipe.createdAt).toLocaleDateString()}
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
