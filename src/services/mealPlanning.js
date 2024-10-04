import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import { mockGetRecipeFullDetails, mockGetRecipesPreview } from "./recipes.js";
import GetAnalyzedRecipeInstructions from "../assets/mocks/GetAnalyzedRecipeInstructions.json";
import GetRecipeInformation from "../assets/mocks/GetRecipeInformation.json";
import axios from "axios";
let mealPlanninglist = [...recipe_preview].slice(0, 3);
const reciPoggres = 0;
let myMap = {};
for (let key in mealPlanninglist) {
  myMap[mealPlanninglist[key].id] = 100;
}

export function mockGetReecipePrecntag(recipe, username) {
  return myMap[recipe.id];
}

export function mockGetmealPlanninglists(username) {
  return {
    status: 200,
    response: {
      data: {
        recipes: mealPlanninglist,
      },
    },
  };
}
export function getRecipeslen(username) {
  return mealPlanninglist.length;
}
export function mockAddRecipe(recipeId, userName) {
  console.log("recipe", recipeId, userName);
  const recipe = recipe_preview.find((recipe) => recipe.id === recipeId);
  console.log(recipe);
  mealPlanninglist.push(recipe);

  return {
    status: 200,
    response: {
      data: {
        message: "The Recipe successfully added to My meals" + usernamer,
        success: true,
      },
    },
  };
}

export async function removemealPlanninglist(recipeId, username) {
  mealPlanninglist = mealPlanninglist.filter(
    (recipe) => recipe.id !== recipeId
  );
  console.log(mealPlanninglist.length);
}
export function mockRemoveAllMeals() {
  mealPlanninglist = [];
  console.log(mealPlanninglist.length);
}

export async function mockgetRecipeInstructions(recipeId, userName) {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`,
      {
        params: {
          apiKey: "a2627e0fb27042d2b386078fda160ee9", // Your Spoonacular API key
        },
      }
    );

    if (response.data) {
      console.log(`Recipe instructions for ${userName}:`, response.data);
      return response.data; // Return the entire JSON response
    } else {
      console.log(`No instructions found for recipeId: ${recipeId}`);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching recipe instructions for ${recipeId}:`, error);
    throw error;
  }
}

export async function mockGetRecipeInfo(recipeid) {
  let response = await mockGetRecipeFullDetails(recipeid);

  // Destructure the recipe object from response
  let recipe = response.data.recipe.recipe;

  return {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    servings: recipe.servings,
    readyInMinutes: recipe.readyInMinutes,
    ingredients: recipe.extendedIngredients.map((ingredient) => ({
      id: ingredient.id,
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
    })),
    summary: recipe.summary,
  };
}

export async function mockchangeorder(recipeLsit, userName) {
  mealPlanninglist = recipeLsit;
}
