<template>
  <GenericPage pageName="My Culinary Gems 💎🍽️" :fetchData="fetchFavorites" />
</template>

<script>
import GenericPage from "@/components/GenericPage.vue";
import { getFavoriteRecipes } from "../../services/user";
import { mockGetRecipeInfo } from "../../services/mealPlanning";

export default {
  name: "FavoritesPage",
  components: {
    GenericPage,
  },
  data() {
    return {
      recipes: [], // Ensure this is part of the component's state
    };
  },
  methods: {
    async fetchFavorites() {
      try {
        // Fetch favorite recipes for the current user
        const response = await getFavoriteRecipes(this.$root.store.username);

        if (
          response.response.data.recipes &&
          Array.isArray(response.response.data.recipes)
        ) {
          // Fetch full recipe details using recipe IDs
          const recipePromises = response.response.data.recipes.map((recipe) =>
            mockGetRecipeInfo(recipe.recipe_id)
          );

          // Wait for all the recipe details to be fetched
          const recipes = await Promise.all(recipePromises);
          console.log("favoritwew:", recipes);

          // Map recipes to ensure they match the structure expected by GenericPage
          const mappedRecipes = recipes.map((recipe) => ({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            servings: recipe.servings,
            readyInMinutes: recipe.readyInMinutes,
            summary: recipe.summary,
            aggregateLikes: recipe.aggregateLikes,

            whomade: recipe.whomade || "Unknown Chef",
            whenmade: recipe.whenmade || "No Occasion",
          }));

          return { response: { data: { recipes: mappedRecipes } } }; // Match the expected structure
        }
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
        throw new Error("Failed to fetch favorite recipes.");
      }
    },
  },
};
</script>
