<!-- SearchPage.vue -->
<template>
  <div class="container">
    <!-- Search Form -->
    <form @submit.prevent="searchRecipes" class="search-form">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for recipes..."
        class="search-input"
      />
      <b-form-group label="Results count" class="results-count">
        <b-form-select v-model="resultsCount">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="Sort by" class="sort-by">
        <b-form-select v-model="sortBy">
          <option value="likes">Likes</option>
          <option value="time">Time to Make</option>
        </b-form-select>
      </b-form-group>
      <button type="submit" class="search-button">Search</button>
    </form>

    <div v-if="loading" class="loading-spinner">
      <b-spinner label="Loading..."></b-spinner>
    </div>

    <div v-if="filteredRecipes.length" class="recipe-details">
      <RecipeDetails
        v-for="(recipe, index) in filteredRecipes"
        :key="index"
        :recipe="recipe"
      />
    </div>
    <!-- No Recipes Found -->
    <div v-else-if="!loading && !filteredRecipes.length" class="no-recipes">
      No recipes found.
    </div>
  </div>
</template>

<script>
import { mockGetRecipeFullDetails } from "../services/recipes.js";
import RecipeDetails from "../components/RecipeDetails.vue";

export default {
  components: {
    RecipeDetails,
  },
  data() {
    return {
      searchQuery: "",
      filteredRecipes: [],
      resultsCount: 5, // default value
      sortBy: "likes", // default sorting option
      loading: false,
    };
  },

  computed: {
    sortedRecipes() {
      return this.filteredRecipes.sort((a, b) => {
        if (this.sortBy === "likes") {
          return b.likes - a.likes;
        } else if (this.sortBy === "time") {
          return a.timeToMake - b.timeToMake;
        }
        return 0;
      });
    },
  },

  methods: {
    async searchRecipes() {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        this.filteredRecipes = [];
        return;
      }

      this.loading = true;

      try {
        const response = await mockGetRecipeFullDetails("1");
        if (response.status === 200) {
          const recipe = response.data.recipe;
          const results = [];
          for (let i = 0; i < this.resultsCount; i++) {
            const recipeCopy = { ...recipe };
            const title = recipeCopy.title.toLowerCase();
            if (title.includes(query)) {
              results.push(recipeCopy);
            }
          }
          this.filteredRecipes = results;
        } else {
          console.error("Recipe not found");
        }
      } catch (error) {
        console.error("An error occurred while fetching the recipes:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
.search-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}
.search-input {
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.results-count {
  flex-shrink: 0;
}
.search-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
.search-button:hover {
  background-color: #0056b3;
}
.recipe-details {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
.no-recipes {
  text-align: center;
  font-size: 18px;
  color: #777;
}
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
