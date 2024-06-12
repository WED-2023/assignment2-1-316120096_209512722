import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import { mockGetRecipesPreview } from "./recipes.js";
let mealPlanninglist = [...recipe_preview];

export function mockGetmealPlanninglists() {
  return {
    status: 200,
    response: {
      data: {
        recipes: mealPlanninglist,
      },
    },
  };
}
export function getRecipeslen() {
  return mealPlanninglist.length;
}
export function mockAddRecipe(recipeDetails) {
  familyRecipes.push(recipeDetails);
  return {
    status: 200,
    response: {
      data: {
        message: "The Recipe successfully added to Family Recipes",
        success: true,
      },
    },
  };
}
export async function removemealPlanninglist(recipeId) {
  mealPlanninglist = mealPlanninglist.filter(
    (recipe) => recipe.id !== recipeId
  );
  console.log(mealPlanninglist.length);
}
export function mockRemoveAllMeals() {
  mealPlanninglist = [];
  console.log(mealPlanninglist.length);
}
