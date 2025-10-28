import { create } from "zustand";

export interface Ingredient {
  ingredient: string;
  amount: number | null;
  unit: string | null;
}

interface RecipeState {
  servings: number;
  prepTime: number;
  cookTime: number;
  setServings: (n: number) => void;
  setPrepTime: (n: number) => void;
  setCookTime: (n: number) => void;
  itemsIngredient: Ingredient[] | null;
  setItemsIngredient: (items: Ingredient[] | null) => void;
}

const useRecipeStore = create<RecipeState>((set, get) => ({
  servings: 1,
  prepTime: 1,
  cookTime: 1,
  setServings: (n: number) =>
    set((state) => {
      const prev = state.servings || 1;
      const ratio = n / prev || 1;
      const newPrep = Math.round((state.prepTime ?? 0) * ratio);
      const newCook = Math.round((state.cookTime ?? 0) * ratio);
      return { servings: n, prepTime: newPrep, cookTime: newCook };
    }),
  setPrepTime: (n: number) =>
    set((state) => ({ prepTime: n * state.servings })),
  setCookTime: (n: number) =>
    set((state) => ({ cookTime: n * state.servings })),
  itemsIngredient: null,
  setItemsIngredient: (items: Ingredient[] | null) =>
    set(() => ({ itemsIngredient: items })),
}));

export default useRecipeStore;
