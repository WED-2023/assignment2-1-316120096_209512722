import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import { mockGetRecipesPreview } from "./recipes.js";
import axios from "axios";
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
export async function mockgetRecipeInstructions(recipeId) {
  const url = `https://api.spoonacular.com/recipes/324694/analyzedInstructions`;
  try {
    const response = await axios.get(url, {
      params: {
        apiKey: "82d181759f064ccb9fb29c272c319613",
      },
    });
    if (response.status === 200) {
      const data = response.data;
      // Assuming the response contains a list of instructions
      const instructions =
        data.length > 0 ? data[0].steps.map((step) => step.step) : [];
      return instructions;
    } else {
      console.error(
        `Failed to fetch recipe instructions: ${response.statusText}`
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching recipe instructions:", error.message);
    return null;
  }
}
