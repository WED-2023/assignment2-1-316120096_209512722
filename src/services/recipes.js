// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";

export function mockGetRecipesPreview(amount = 1) {
  let recipes = [];
  for (let i = 0; i < amount; i++) {
    recipes.push(...recipe_preview);
  }

  return { data: { recipes: recipes } };
}

export function mockGetRecipeFullDetails(recipeId) {
  for (let i = 0; i < recipe_full_view.length; i++) {
    if (recipe_full_view[i].id === recipeId) {
      return { status: 200, data: { recipe: recipe_full_view[i] } };
    }
  }
  return { status: 200, data: {} };
}
export function mockGetAllRecipes(amount = recipe_full_view.length) {
  let recipes = [];
  for (let i = 0; i < amount; i++) {
    recipes.push(...recipe_full_view);
  }
  return { data: { recipes: recipes } };
}
