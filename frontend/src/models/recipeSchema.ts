import * as Yup from "yup";

export const recipeSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  ingredients: Yup.string(),
  steps: Yup.string(),
  category: Yup.string(),
});