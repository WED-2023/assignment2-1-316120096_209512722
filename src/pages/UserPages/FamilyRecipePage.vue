<template>
  <div>
    <h1>Favorite Recipes 🩵</h1>
    <div v-if="favorites.length > 0">
      <div v-for="recipe in favorites" :key="recipe.id">
        <recipe-preview :recipe="recipe" />
      </div>
    </div>
    <div v-else>
      <h2>No favorite recipes yet!</h2>
    </div>
  </div>
</template>

<script>
import RecipePreview from "@/components/RecipePreview.vue";
import { mockGetFamilyRecipes } from "@/services/user";

export default {
  name: "FavoritesPage",
  components: {
    RecipePreview,
  },
  data() {
    return {
      favorites: [],
    };
  },
  mounted() {
    this.updateFavorites();
  },
  methods: {
    async updateFavorites() {
      try {
        const response = mockGetFamilyRecipes();
        console.log("mockget:", response);
        const recipes = response.data.recipes;
        console.log("recipes:", recipes);
        this.favorites = [];
        this.favorites.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
