import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useUser } from "../providers/UserContext";
import { toast } from "react-toastify";
import type { Recipe } from "../models/recipe";
import type { FormValues } from "../models/formValues";
import { recipeSchema } from "../models/recipeSchema";

export const EditRecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useUser();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState<FormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
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

        setInitialValues({
          title: data.title,
          description: data.description || "",
          ingredients: data.ingredients || "",
          steps: data.steps || "",
          category: data.category || "",
          image: null,
        });

        setCurrentImageUrl(
          data.imageUrl ? `http://localhost:5113${data.imageUrl}` : null
        );
      } catch (e) {
        console.error(e);
        setError("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, token, navigate]);

  const handleSubmit = async (values: FormValues) => {
    if (!token || !id) return;

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description || "");
      formData.append("ingredients", values.ingredients || "");
      formData.append("steps", values.steps || "");

      if (values.category) {
        formData.append("category", values.category);
      }

      if (values.image) {
        formData.append("image", values.image);
      }

      const res = await fetch(`http://localhost:5113/api/recipes/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        } as any,
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update recipe");
      }

      toast.success("Recipe updated");
      navigate(`/recipes/${id}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message ?? "Failed to update recipe");
    }
  };

  return (
    <Layout>
      <div className="flex-1 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Loading…
            </div>
          )}

          {error && !loading && (
            <div className="text-sm text-red-400 mb-4">{error}</div>
          )}

          {!loading && !error && initialValues && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
              <div className="p-6 sm:p-8">
                <Formik
                  initialValues={initialValues}
                  enableReinitialize
                  validationSchema={recipeSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, setFieldValue }) => (
                    <Form className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                            Title<span className="text-red-500">*</span>
                          </label>
                          <Field
                            name="title"
                            className="w-full h-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                          <ErrorMessage
                            name="title"
                            component="div"
                            className="mt-1 text-xs text-red-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                            Category
                          </label>
                          <Field
                            as="select"
                            name="category"
                            className="w-full h-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          >
                            <option value="">Select category</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Snack">Snack</option>
                          </Field>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                          Description
                        </label>
                        <Field
                          as="textarea"
                          name="description"
                          rows={3}
                          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                          placeholder="Short description of the recipe..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                          Ingredients
                        </label>
                        <Field
                          as="textarea"
                          name="ingredients"
                          rows={4}
                          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="- 2 eggs&#10;- 200 ml milk&#10;- ..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                          Steps
                        </label>
                        <Field
                          as="textarea"
                          name="steps"
                          rows={5}
                          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Step 1: ...&#10;Step 2: ..."
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                          Image
                        </label>

                        {currentImageUrl && (
                          <div className="mb-2">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                              Current image:
                            </p>
                            <img
                              src={currentImageUrl}
                              alt="Current"
                              className="h-32 w-full max-w-xs rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                            />
                          </div>
                        )}

                        <label
                          className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 px-3 py-2 text-sm text-slate-600 dark:text-slate-300"
                        >
                          <span>Click to upload or drag and drop</span>
                          <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-2 py-1 text-xs text-emerald-700 dark:text-emerald-300">
                            Image file
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              setFieldValue(
                                "image",
                                e.currentTarget.files?.[0] || null
                              )
                            }
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="pt-2 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => navigate(`/recipes/${id}`)}
                          className="inline-flex items-center rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/70 px-4 py-2 text-sm font-medium text-white shadow-sm transition"
                        >
                          {isSubmitting ? "Saving..." : "Save changes"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
