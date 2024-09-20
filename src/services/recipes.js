// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import axios from "axios";

export async function mockGetRecipesPreview(amount = 1) {
  let recipes = [];
  for (let i = 0; i < amount; i++) {
    recipes.push(...recipe_preview);
  }

  return { data: { recipes: recipes } };
}
/**
 * Get a random selection of recipe previews.
 *
 * @param {number} [amount=1] - The number of recipe previews to retrieve.
 * @returns {Object} - An object containing an array of recipe previews.
 */
export async function mockGetRecipesPreviewRandom(amount = 1) {
  try {
    // Call Spoonacular API to get random recipes
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random`,
      {
        params: {
          number: amount,
          apiKey: "82d181759f064ccb9fb29c272c319613",
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

// Return an object containing the array of recipe previews

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

export async function mocksearchRecipes({
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
    const response = await mockGetRecipesPreview();
    console.log(response);
    if (response.data.recipes.length !== 0) {
      let recipes = response.data.recipes;

      // Filter recipes by search query
      recipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery)
      );

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

      if (cuisineType) {
        recipes = recipes.filter((recipe) =>
          recipe.cuisines.includes(cuisineType)
        );
      }

      // Filter by mealType (checks if mealType is in the list of meal types for each recipe)
      if (mealType) {
        recipes = recipes.filter((recipe) =>
          recipe.mealTypes.includes(mealType)
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
