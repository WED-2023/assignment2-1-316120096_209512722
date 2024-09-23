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
          apiKey: "a2627e0fb27042d2b386078fda160ee9",
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

export async function mockGetRecipeFullDetails(recipeId) {
  try {
    // Call Spoonacular API to get full details of the recipe by ID
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information`,
      {
        params: {
          apiKey: "a2627e0fb27042d2b386078fda160ee9",
        },
      }
    );

    // Return the data in a similar structure to your previous mock
    return { status: 200, data: { recipe: response.data } };
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return { status: 500, data: {} }; // Return an empty object on error
  }
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
    // Set up the API request parameters
    let params = {
      query: searchQuery,
      number: resultsCount,
      apiKey: "a2627e0fb27042d2b386078fda160ee9",
    };

    // Add optional filters to the params
    if (filterBy) {
      if (filterBy === "vegetarian") {
        params.diet = "vegetarian";
      } else if (filterBy === "vegan") {
        params.diet = "vegan";
      } else if (filterBy === "gluten free") {
        params.intolerances = "gluten";
      }
    }

    if (cuisineType) {
      params.cuisine = cuisineType;
    }

    if (mealType) {
      params.type = mealType;
    }

    // Sort by time or popularity (Spoonacular supports sorting by "popularity" and "time")
    if (sortBy === "likes") {
      params.sort = "popularity";
    } else if (sortBy === "time") {
      params.sort = "time";
    }

    // Call Spoonacular API to search for recipes
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      { params }
    );

    // Extract recipes from the API response
    const recipes = response.data.results;

    if (recipes && recipes.length > 0) {
      return recipes.slice(0, resultsCount); // Return the limited number of results
    } else {
      console.error("No recipes found");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while searching for recipes:", error);
    return [];
  }
}
