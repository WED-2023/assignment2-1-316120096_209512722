
import recipe_preview from "../assets/mocks/recipe_preview.json";
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
const recipeFullInfo = GetRecipeInformation;
import GetRecipeInformation from "../assets/mocks/GetRecipeInformation.json";

import axios from "axios";
import { getRecipeFullDetails,SPOONACULAR_API_KEY } from "./recipes";
let mealPlanninglist = [...recipe_preview].slice(0, 3);

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

export async function getRecipeInstructions(recipeId) {
  try{
    const response = await axios.get(`https://api.spoonacular.com/recipes/716252/analyzedInstructions`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
      },
  });
  return response.data.steps;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { data: { recipes: [] } }; // Return an empty list on error
  }
}

// export async function getRecipeInfo(recipeId) {
//   let recipe = getRecipeFullDetails(recipeId);
//   return {
//     id: recipe.id,
//     title: recipe.title,
//     image: recipe.image,
//     servings: recipe.servings,
//     readyInMinutes: recipe.readyInMinutes,
//     ingredients: recipe.extendedIngredients.map((ingredient) => ({
//       id: ingredient.id,
//       name: ingredient.name,
//       amount: ingredient.amount,
//       unit: ingredient.unit,
//     })),
//     summary: recipe.summary,
//   };
// }
export async function mockGetRecipeInfo() {
  let recipe = recipeFullInfo;
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
