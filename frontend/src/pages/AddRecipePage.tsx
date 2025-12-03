import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useUser } from "../providers/UserContext";
import { toast } from "react-toastify";

const createRecipeSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  ingredients: Yup.string(),
  steps: Yup.string(),
});

export const AddRecipePage = () => {
  const navigate = useNavigate();
  const { token } = useUser();

  const initialValues = {
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    category: "",
    image: null as File | null,
  };

  const handleSubmit = async (values: typeof initialValues) => {
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

      const res = await fetch("http://localhost:5113/api/recipes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }

      toast.success("Recipe added!");
      navigate("/recipes");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message ?? "Failed to add recipe");
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
          Add New Recipe
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={createRecipeSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <Field
                  name="title"
                  className="w-full rounded-md border px-3 py-2"
                />
                <ErrorMessage name="title" className="text-red-500 text-sm" component="div" />
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <Field as="textarea" name="description" rows={3} className="w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium">Ingredients</label>
                <Field as="textarea" name="ingredients" rows={4} className="w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium">Steps</label>
                <Field as="textarea" name="steps" rows={5} className="w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFieldValue("image", e.currentTarget.files?.[0] || null)}
                  className="text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white"
              >
                {isSubmitting ? "Saving..." : "Add Recipe"}
              </button>

            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};
