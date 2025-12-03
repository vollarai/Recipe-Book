import type { Category } from "./category";

export const categoryColor: Record<Category, string> = {
  Breakfast: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  Lunch: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  Dinner: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
  Dessert: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
  Snack: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
};
