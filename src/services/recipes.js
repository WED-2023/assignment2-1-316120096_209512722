import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";

import axios from "axios";
import state from "../store";

let url = state.server_domain;
axios.defaults.baseURL = url;

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
    const response = await axios.get(`/recipes/random`);
    console.log("Response data:", response.data); // logs the returned data from API
    console.log("Response config:", response.config); // logs the Axios config used
    console.log("Response status:", response.status); // Use the data in your application
    return response.data;
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    const res = await axios.get("/");
    console.log("this is res", res.data); // Use the data in your application
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
    console.log("This recipe id in mockGetfullDetails:", recipeId); // Correct"recipeId);
    // Call the API with the correct endpoint for recipe details
    const response = await axios.get(`/recipes/details/${recipeId}`);
    console.log("Response data:", response.data); // logs the returned data from API

    // Assuming the response data includes the recipe object as part of `response.data`
    return { status: 200, data: { recipe: response.data } };
  } catch (error) {
    console.error("Error fetching recipe details:", error.message);

    // Return the status and empty data in case of an error
    return { status: error.response ? error.response.status : 500, data: {} };
  }
}

export async function mocksearchRecipes({
  query,
  resultsCount = 10, // Default to 10 results if not provided
  sortBy = "popularity", // Default sorting by popularity
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
      sortBy: sortBy, // Now directly pass the sortBy value
    };

    // Add optional filters to the params
    if (filterBy) {
      params.diet = filterBy; // Pass the filter directly (e.g., vegetarian, vegan)
    }

    if (cuisineType) {
      params.cuisine = cuisineType;
    }

    if (mealType) {
      params.mealType = mealType;
    }

    // Make the API call to your backend's search route
    const response = await axios.get(`/recipes/search`, { params });

    const recipes = response.data;
    return recipes.length > 0 ? recipes.slice(0, resultsCount) : [];
  } catch (error) {
    console.error("An error occurred while searching for recipes:", error);
    return [];
  }
}
