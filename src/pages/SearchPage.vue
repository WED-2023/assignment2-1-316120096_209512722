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

    <div v-if="filteredRecipes.length" class="recipe-list">
      <RecipePreview
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
import { mockGetRecipesPreview } from "../services/recipes.js";
import RecipeDetails from "../components/RecipeDetails.vue";
import RecipePreview from "../components/RecipePreview.vue";
export default {
  components: {
    RecipeDetails,
    RecipePreview,
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

  methods: {
    async searchRecipes() {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        this.filteredRecipes = [];
        return;
      }

      this.loading = true;

      try {
        const response = await mockGetRecipesPreview();
        console.log(response);
        if (response.data.recipes.length != 0) {
          const recipes = response.data.recipes; // Assuming response.data.recipes is an array of recipe objects
          const results = recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(query)
          );
          results.sort((a, b) => {
            if (this.sortBy === "likes") {
              return b.aggregateLikes - a.ggregateLike;
            } else if (this.sortBy === "time") {
              return a.readyInMinutes - b.readyInMinutes;
            }
          });

          // Apply the resultsCount limit
          this.filteredRecipes = results.slice(0, this.resultsCount);
        } else {
          console.error("Recipes not found");
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
recipes-grid {
  display: flex;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 30px;
  justify-content: center;
  justify-items: center;
  align-items: center;
}

.recipe-list {
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 30px;
}

.recipe-item {
  width: 300px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.recipe-item:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
}

.recipe-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.recipe-item:hover .recipe-image {
  transform: scale(1.1);
}

.image-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  font-family: var(--font-family-serif);
  font-size: 1.4rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}
.recipe-item:hover .image-title {
  transform: translateY(0);
}
.recipe-info {
  padding: 20px;
}
.recipe-info p {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 15px;
}
.recipes-container {
  display: flex;
  justify-content: center;
}
.recipe-meta {
  display: flex;
  justify-content: space-between;
  color: var(--color-text-secondary);
  font-size: 0.8rem;
}
.recipe-meta span {
  display: flex;
  align-items: center;
}
.recipe-meta i {
  margin-right: 5px;
  font-size: 1rem;
}
.no-generic {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 40px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
}
.no-generic h2 {
  font-family: var(--font-family-serif);
  font-size: 2.2rem;
  color: var(--color-primary);
  margin-bottom: 20px;
}
.no-generic p {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 30px;
}
.explore-btn {
  font-family: var(--font-family-sans);
  font-size: 1rem;
  font-weight: 600;
  padding: 15px 30px;
  background-color: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
}
.explore-btn:hover {
  background-color: #2980b9;
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.6);
}
.loading,
.error {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 40px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
}
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid var(--color-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}
.error-icon {
  font-size: 3rem;
  color: #e74c3c;
  margin-bottom: 20px;
}
.retry-btn {
  font-family: var(--font-family-sans);
  font-size: 1rem;
  font-weight: 600;
  padding: 10px 20px;
  background-color: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
}
.retry-btn:hover {
  background-color: #2980b9;
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.6);
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* Icons */
[class^="icon-"]:before {
  font-family: "recipe-icons";
  font-style: normal;
  font-weight: normal;
}
.icon-heart:before {
  content: "\e800";
}
.icon-clock:before {
  content: "🕒";
}
.icon-difficulty:before {
  content: "\e802";
}
@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
  .recipes-grid {
    grid-template-columns: repeat(1, 1fr);
    gap: 25px;
  }
  .recipe-list {
    grid-template-columns: repeat(1, 1fr);
    gap: 25px;
  }
  .recipe-item {
    width: 100%;
  }
}
</style>
