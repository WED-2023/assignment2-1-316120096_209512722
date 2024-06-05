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
import { mockGetFavorites } from "../../services/user";

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
        const response = mockGetFavorites();
        console.log("Full response:", response);
        const recipes = response.response.data.recipes;
        console.log("Recipes array:", recipes);
        this.favorites = [];
        this.favorites.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>
