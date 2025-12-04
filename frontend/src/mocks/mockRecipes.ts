import type { Recipe } from "../models/recipe";

export const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: "Creamy Garlic Pasta",
    description: "Rich and creamy pasta with garlic, parmesan and a hint of lemon.",
    ingredients: 
        `- 200 g spaghetti
        - 2 cloves garlic
        - 200 ml cream
        - 50 g parmesan
        - 1 tbsp butter
        - salt, pepper`,
    steps: 
        `1. Cook pasta al dente.
        2. Fry garlic in butter.
        3. Add cream and parmesan, simmer for 3–4 minutes.
        4. Toss pasta in the sauce, season and serve.`,
    category: "Dinner",
    imageUrl: "images/pasta.jpg",
    createdAt: "2025-01-01T12:00:00Z",
  },
  {
    id: 2,
    title: "Avocado Toast with Egg",
    description: "Simple and healthy breakfast with crispy toast, avocado and soft-boiled egg.",
    ingredients: 
        `- 2 slices bread
        - 1 ripe avocado
        - 2 eggs
        - salt, pepper, chili flakes
        - olive oil`,
    steps: 
        `1. Toast the bread.
        2. Mash avocado with salt and pepper.
        3. Cook soft-boiled eggs (6–7 minutes).
        4. Spread avocado on toast, top with egg and chili flakes.`,
    category: "Breakfast",
    imageUrl: "images/toast.jpg",
    createdAt: "2025-02-01T12:00:00Z",
  },
  {
    id: 3,
    title: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a gooey molten center. Perfect dessert for guests.",
    ingredients: 
        `- 100 g dark chocolate
        - 80 g butter
        - 2 eggs
        - 2 egg yolks
        - 60 g sugar
        - 40 g flour`,
    steps: 
        `1. Melt chocolate with butter.
        2. Whisk eggs, yolks and sugar until pale.
        3. Fold in melted chocolate and flour.
        4. Pour into ramekins and bake 8–10 minutes at 220°C.`,
    category: "Dessert",
    imageUrl: "images/cake.jpg",
    createdAt: "2025-03-01T12:00:00Z",
  },
  {
    id: 4,
    title: "Chicken Caesar Wrap",
    description: "Quick lunch wrap with grilled chicken, crisp lettuce and Caesar dressing.",
    ingredients: 
        `- 1 large tortilla
        - 150 g grilled chicken
        - lettuce leaves
        - 2 tbsp Caesar dressing
        - 1 tbsp parmesan
        - salt, pepper`,
    steps: 
        `1. Warm the tortilla for a few seconds.
        2. Slice the grilled chicken.
        3. Add lettuce, chicken, parmesan and Caesar dressing.
        4. Roll tightly and slice in half.`,
    category: "Lunch",
    imageUrl: "images/wrap.jpg",
    createdAt: "2025-04-03T13:10:00Z",
    },
    {
    id: 5,
    title: "Tomato Basil Soup",
    description: "Comforting homemade soup with roasted tomatoes and fresh basil.",
    ingredients: 
        `- 600 g tomatoes
        - 1 onion
        - 2 cloves garlic
        - 500 ml vegetable broth
        - fresh basil
        - salt, pepper
        - olive oil`,
    steps: 
        `1. Roast tomatoes, onion and garlic for 20 minutes.
        2. Transfer to pot and add broth.
        3. Simmer for 10 minutes.
        4. Blend until smooth.
        5. Serve with fresh basil.`,
    category: "Dinner",
    imageUrl: "images/soup.jpg",
    createdAt: "2025-05-04T18:45:00Z",
    },
    {
    id: 6,
    title: "Banana Oat Pancakes",
    description: "Healthy breakfast pancakes made with banana, oats and eggs.",
    ingredients:
        `- 1 ripe banana
        - 2 eggs
        - 50 g oats
        - 1 tsp honey
        - pinch of salt
        - berries for topping`,
    steps:
        `1. Blend banana, oats and eggs into a smooth batter.
        2. Heat a pan and pour small portions of batter.
        3. Cook 2 minutes per side until golden.
        4. Serve with berries and honey.`,
    category: "Breakfast",
    imageUrl: "public/images/pancakes.jpg",
    createdAt: "2025-06-06T08:20:00Z",
    },
    {
    id: 7,
    title: "Quinoa Salad Bowl",
    description: "Fresh and colorful quinoa salad with vegetables and lemon dressing.",
    ingredients:
        `- 150 g cooked quinoa
        - 1 cucumber
        - 1 tomato
        - 1 avocado
        - fresh parsley
        - 1 tbsp olive oil
        - lemon juice, salt, pepper`,
    steps:
        `1. Dice cucumber, tomato and avocado.
        2. Mix vegetables with quinoa.
        3. Add olive oil, lemon juice and seasoning.
        4. Serve chilled.`,
    category: "Lunch",
    imageUrl: "images/salad.jpg",
    createdAt: "2025-01-08T12:40:00Z",
    },
    {
    id: 8,
    title: "Tuna Sandwich",
    description: "Classic tuna sandwich with mayo, celery and toasted bread.",
    ingredients:
        `- 2 slices toasted bread
        - 1 can tuna
        - 1 tbsp mayonnaise
        - 1 celery stalk
        - salt, pepper`,
    steps:
        `1. Mix tuna with mayo, chopped celery, salt and pepper.
        2. Spread mixture onto toasted bread.
        3. Cut in half and serve.`,
    category: "Lunch",
    imageUrl: "images/tuna.jpg",
    createdAt: "2025-08-09T13:05:00Z",
    },
    {
    id: 9,
    title: "Baked Salmon with Lemon",
    description: "Healthy baked salmon with garlic, lemon and herbs.",
    ingredients:
        `- 1 salmon fillet
        - 1 lemon
        - 2 cloves garlic
        - salt, pepper
        - olive oil`,
    steps:
        `1. Place salmon on baking sheet.
        2. Season with salt, pepper and garlic.
        3. Top with lemon slices.
        4. Bake for 15 minutes at 200°C.`,
    category: "Dinner",
    imageUrl: "images/salmon.jpg",
    createdAt: "2025-09-11T20:15:00Z",
    },
    {
    id: 10,
    title: "Cinnamon Apple Crumble",
    description: "Warm apple dessert with crispy cinnamon topping.",
    ingredients:
        `- 3 apples
        - 2 tbsp sugar
        - 1 tsp cinnamon
        - 50 g oats
        - 40 g butter`,
    steps:
        `1. Slice apples and mix with cinnamon and sugar.
        2. Mix oats with butter to make crumble.
        3. Bake apples with crumble topping for 25 minutes.`,
    category: "Dessert",
    imageUrl: "images/crumble.jpg",
    createdAt: "2025-01-19T18:10:00Z",
    },
];
