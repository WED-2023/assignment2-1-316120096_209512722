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

export function mockAddUserRecipes(recipeDetails) {
  let userRecipes = []; // Define userRecipes array
  const title = recipeDetails.get("title");
  const image = recipeDetails.get("image");
  const description = recipeDetails.get("description");
  const readyInMinutes = recipeDetails.get("readyInMinutes");
  const instructions = JSON.parse(recipeDetails.get("instructions"));
  const ingredients = JSON.parse(recipeDetails.get("ingredients"));

  // Generate a simple unique ID using timestamp and random number
  const newRecipeId = Math.floor(1000 + Math.random() * 9000);

  const newRecipe = {
    id: newRecipeId,
    title: title,
    image: image, // Here, 'image' should be the URL/path where the image is stored
    description: description,
    readyInMinutes: parseInt(readyInMinutes),
    instructions: instructions,
    ingredients: ingredients,
  };

  userRecipes.push(newRecipe); // Push the new recipe to userRecipes array
  console.log(userRecipes, "userRecipes");
  return {
    status: 200,
    response: {
      data: {
        message: "The Recipe successfully added to My Recipes",
        success: true,
        recipeId: newRecipeId, // Optionally return the new recipe ID
      },
    },
  };
}
