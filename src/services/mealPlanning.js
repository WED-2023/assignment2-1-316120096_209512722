import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import { mockGetRecipesPreview } from "./recipes.js";
import GetAnalyzedRecipeInstructions from "../assets/mocks/GetAnalyzedRecipeInstructions.json";
import GetRecipeInformation from "../assets/mocks/GetRecipeInformation.json";
import axios from "axios";
const mealPlanninglist = [...recipe_preview];
const recipeInstructions = GetAnalyzedRecipeInstructions;
const recipeFullInfo = GetRecipeInformation;
const reciPoggres = 0;
let myMap = {};
for (let key in mealPlanninglist) {
  myMap[mealPlanninglist[key].id] = 10;
}

export function mockGetReecipePrecntag(recipe) {
  return myMap[recipe.id];
}

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
        message: "The Recipe successfully added to My meals",
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
  return recipeInstructions[0].steps;
}

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

export async function mockchangeorder(recipeLsit) {
  mealPlanninglist = recipeLsit;
}
