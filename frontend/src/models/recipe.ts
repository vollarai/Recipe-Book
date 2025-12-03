export type Recipe = {
  id: number;
  title: string;
  description?: string | null;
  ingredients?: string | null;
  steps?: string | null;
  createdAt: string;
  imageUrl?: string | null;
  category: string;
};