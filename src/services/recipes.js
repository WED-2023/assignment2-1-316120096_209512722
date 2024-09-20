// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
export const SPOONACULAR_API_KEY = 'a3b4f56bddf7424da3ab020405a6c4ca';
import axios from "axios";

/**
 * Get a random selection of recipe previews.
 *
 * @param {number} [amount=1] - The number of recipe previews to retrieve.
 * @returns {Object} - An object containing an array of recipe previews.
 */
export async function getRecipesPreviewRandom(amount = 1) {
  try {
    // Call Spoonacular API to get random recipes
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random`,
      {
        params: {
          number: amount,
          apiKey: SPOONACULAR_API_KEY,
        },
      }
    );

    // The response will contain the list of recipes
    const recipes = response.data.recipes;

    // Return the data in a similar structure to your previous mock
    return { data: { recipes: recipes } };
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { data: { recipes: [] } }; // Return an empty list on error
  }
}

export async function getRecipeFullDetails(recipeId) {
  try {
    // Call Spoonacular API to get random recipes
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information
`,
      {
        params: {
          apiKey: SPOONACULAR_API_KEY,
        },
      }
    );

    // The response will contain the list of recipes
    const recipes = response.data.recipes;

    // Return the data in a similar structure to your previous mock
    return { data: { recipes: recipes } };
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { data: { recipes: [] } }; // Return an empty list on error
  }
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

export async function searchRecipes({
  query,
  resultsCount,
  sortBy,
  filterBy,
  cuisineType,
  mealType,
}) {
  const searchQuery = query.trim().toLowerCase();
  if (!searchQuery) {
    return [];
  }

  try {
    // Fetch recipes from Spoonacular API
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        query: searchQuery ? searchQuery : null,
        number: resultsCount || 100, // Get a large number of results to apply filters later
        addRecipeInformation: true, // Adds details about recipes
        apiKey: SPOONACULAR_API_KEY,
        diet: filterBy ? filterBy : null,
        cuisine: cuisineType ? cuisineType : null,
        type: mealType ? mealType : null,
        sort: sortBy ? sortBy : null,

      },
    });

    if (response.data.results.length !== 0) {
      let recipes = response.data.results;

      
      // Apply additional filters
      if (filterBy) {
        if (filterBy === "vegetarian") {
          recipes = recipes.filter((recipe) => recipe.vegetarian);
        } else if (filterBy === "vegan") {
          recipes = recipes.filter((recipe) => recipe.vegan);
        } else if (filterBy === "gluten free") {
          recipes = recipes.filter((recipe) => recipe.glutenFree);
        }
      }

      // Filter by cuisineType
      if (cuisineType) {
        recipes = recipes.filter((recipe) =>
          recipe.cuisines.includes(cuisineType)
        );
      }

      // Filter by mealType
      if (mealType) {
        recipes = recipes.filter((recipe) =>
          recipe.dishTypes.includes(mealType)
        );
      }

      // Sort recipes
      recipes.sort((a, b) => {
        if (sortBy === "likes") {
          return b.aggregateLikes - a.aggregateLikes;
        } else if (sortBy === "time") {
          return a.readyInMinutes - b.readyInMinutes;
        }
      });

      // Apply the resultsCount limit
      return recipes.slice(0, resultsCount);
    } else {
      console.error("Recipes not found");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching the recipes:", error);
    return [];
  }
}