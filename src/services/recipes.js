import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import { api } from "../main.js"; // Importing the new axios instance

const API_ROUTE_PREFIX = "recipes";

/**
 * Get a preview of recipes (mock).
 *
 * @param {number} [amount=1] - The number of recipe previews to retrieve.
 * @returns {Object} - An object containing an array of recipe previews.
 */
export async function mockGetRecipesPreview(amount = 1) {
  let recipes = [];
  for (let i = 0; i < amount; i++) {
    recipes.push(...recipe_preview);
  }

  return { data: { recipes: recipes } };
}

/**
 * Get a random selection of recipe previews from the API.
 *
 * @param {number} [amount=1] - The number of recipe previews to retrieve.
 * @returns {Object} - An object containing an array of recipe previews.
 */
export async function mockGetRecipesPreviewRandom(amount = 1) {
  try {
    // Call the new API
    const response = await api.get(`${API_ROUTE_PREFIX}/random`, {
      params: {
        number: amount,
      },
    });

    const recipes = response.data.recipes;
    return { data: { recipes: recipes } };
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    return { data: { recipes: [] } };
  }
}

/**
 * Get full recipe details by recipe ID from the API.
 *
 * @param {string} recipeId - The ID of the recipe to retrieve details for.
 * @returns {Object} - An object containing the recipe details.
 */
export async function mockGetRecipeFullDetails(recipeId) {
  try {
    // Call the new API
    const response = await api.get(`${API_ROUTE_PREFIX}/${recipeId}`);

    return { status: 200, data: { recipe: response.data } };
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return { status: 500, data: {} };
  }
}

/**
 * Search for recipes with various filters and sorting options.
 *
 * @param {Object} options - The search parameters.
 * @param {string} options.query - The search query.
 * @param {number} options.resultsCount - Number of results to return.
 * @param {string} options.sortBy - Sorting option ('likes' or 'time').
 * @param {string} options.filterBy - Filtering option ('vegetarian', 'vegan', etc.).
 * @param {string} options.cuisineType - The type of cuisine to filter by.
 * @param {string} options.mealType - The type of meal to filter by.
 * @returns {Array} - An array of recipes that match the search criteria.
 */
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

    // Sort by time or popularity
    if (sortBy === "likes") {
      params.sort = "popularity";
    } else if (sortBy === "time") {
      params.sort = "time";
    }

    // Call the new API for complex search
    const response = await api.get(`${API_ROUTE_PREFIX}/search`, {
      params,
    });

    const recipes = response.data.results;
    return recipes.length > 0 ? recipes.slice(0, resultsCount) : [];
  } catch (error) {
    console.error("An error occurred while searching for recipes:", error);
    return [];
  }
}
