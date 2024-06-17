<template>
  <div class="container">
    <!-- Search Form -->
    <form @submit.prevent="searchRecipesHandler" class="search-form">
      <!-- Search Input -->
      <b-form-group label="Search" class="results-input">
        <input
          aria-label="Search"
          type="text"
          v-model="searchQuery"
          placeholder="Search for recipes..."
          class="search-input"
        />
      </b-form-group>

      <!-- Results Count -->
      <b-form-group label="Results count" class="results-count">
        <b-form-select v-model="resultsCount">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </b-form-select>
      </b-form-group>

      <!-- Filter By -->
      <b-form-group label="Filter by" class="filter-by">
        <b-form-select v-model="filterBy">
          <option
            v-for="option in filterByOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </b-form-select>
      </b-form-group>

      <!-- Cuisine Type -->
      <b-form-group label="Cuisine Type" class="cuisine-type">
        <b-form-select v-model="cuisineType">
          <option
            v-for="option in cuisineTypeOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </b-form-select>
      </b-form-group>

      <!-- Meal Type -->
      <b-form-group label="Meal Type" class="meal-type">
        <b-form-select v-model="mealType">
          <option
            v-for="option in mealTypeOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </b-form-select>
      </b-form-group>

      <!-- Sort By -->
      <b-form-group label="Sort by" class="sort-by">
        <b-form-select v-model="sortBy">
          <option
            v-for="option in sortByOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </b-form-select>
      </b-form-group>

      <!-- Search Button -->
      <button type="submit" class="search-button">Search</button>
    </form>

    <!-- Display Recipes -->
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
import { mocksearchRecipes } from "../services/recipes.js";
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
      resultsCount: 5,
      sortBy: "likes",
      filterBy: "",
      cuisineType: "",
      mealType: "",
      loading: false,

      sortByOptions: [
        { value: "likes", text: "Likes" },
        { value: "time", text: "Time to Make" },
      ],
      filterByOptions: [
        { value: "", text: "None" },
        { value: "vegetarian", text: "Vegetarian" },
        { value: "vegan", text: "Vegan" },
        { value: "gluten free", text: "Gluten Free" },
      ],
      cuisineTypeOptions: [
        { value: "", text: "None" },
        { value: "African", text: "African" },
        { value: "Asian", text: "Asian" },
        { value: "American", text: "American" },
        { value: "British", text: "British" },
        { value: "Cajun", text: "Cajun" },
        { value: "Caribbean", text: "Caribbean" },
        { value: "Chinese", text: "Chinese" },
        { value: "Eastern European", text: "Eastern European" },
        { value: "European", text: "European" },
        { value: "French", text: "French" },
        { value: "German", text: "German" },
        { value: "Greek", text: "Greek" },
        { value: "Indian", text: "Indian" },
        { value: "Irish", text: "Irish" },
        { value: "Italian", text: "Italian" },
        { value: "Japanese", text: "Japanese" },
        { value: "Jewish", text: "Jewish" },
        { value: "Korean", text: "Korean" },
        { value: "Latin American", text: "Latin American" },
        { value: "Mediterranean", text: "Mediterranean" },
        { value: "Mexican", text: "Mexican" },
        { value: "Middle Eastern", text: "Middle Eastern" },
        { value: "Nordic", text: "Nordic" },
        { value: "Southern", text: "Southern" },
        { value: "Spanish", text: "Spanish" },
        { value: "Thai", text: "Thai" },
        { value: "Vietnamese", text: "Vietnamese" },
      ],
      mealTypeOptions: [
        { value: "", text: "None" },
        { value: "main course", text: "Main Course" },
        { value: "side dish", text: "Side Dish" },
        { value: "dessert", text: "Dessert" },
        { value: "appetizer", text: "Appetizer" },
        { value: "salad", text: "Salad" },
        { value: "bread", text: "Bread" },
        { value: "breakfast", text: "Breakfast" },
        { value: "soup", text: "Soup" },
        { value: "beverage", text: "Beverage" },
        { value: "sauce", text: "Sauce" },
        { value: "marinade", text: "Marinade" },
        { value: "fingerfood", text: "Fingerfood" },
        { value: "snack", text: "Snack" },
        { value: "drink", text: "Drink" },
      ],

      recentSearch: {
        query: "",
        resultsCount: 5,
        sortBy: "",
        filterBy: "",
        cuisineType: "",
        mealType: "",
      },

    };
  },
  mounted() {
    // Load last search query from localStorage on component mount
    const lastSearchQuery = localStorage.getItem("lastSearchQuery");
    if (lastSearchQuery && this.$root.store.username) {
      this.searchQuery = lastSearchQuery;
      // Optionally, you can trigger search here automatically
      this.searchRecipesHandler();
    }
  },
  methods: {
    async searchRecipesHandler() {
      this.loading = true;
      try {
        this.filteredRecipes = await mocksearchRecipes({
          query: this.searchQuery,
          resultsCount: this.resultsCount,
          sortBy: this.sortBy,
          filterBy: this.filterBy,
          cuisineType: this.cuisineType,
          mealType: this.mealType,
        });
        // Save searchQuery to localStorage after successful search
        if (this.$root.store.username) {
          localStorage.setItem("lastSearchQuery", this.searchQuery);
        } else localStorage.setItem("lastSearchQuery", "");
      } catch (error) {
        console.error("An error occurred while fetching the recipes:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    sortBy: {
      handler: "searchRecipesHandler",
      immediate: true,
    },
  },
};
</script>

<style scoped>
/* Container */
/* Container */
/* Container */
/* Container */
.container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.5s ease;
}

/* Search Form */
.search-form {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-weight: bold;
  font-size: 14px;
  color: #333;
}

.search-form:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.search-input {
  flex-grow: 2;
  padding: 12px;
  font-size: 18px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-right: 10px;
  transition: border-color 0.3s ease;
  width: 90%;
  height: 40px;
}

.search-input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.search-options {
  display: flex;
  margin-top: 10px;
  font-weight: bold;
  font-size: 14px;
  color: #c9c9c9;
  width: 30%; /* Set the desired percentage width */
}

.results-count {
  flex-shrink: 0;
  margin-right: 10px;
  font-weight: bold;
  font-size: 14px;
  color: #333;
  width: 20%; /* Set the desired percentage width */
}

.sort-by {
  flex-shrink: 0;
  margin-right: 10px;
  font-weight: bold;
  font-size: 14px;
  color: #333;
  width: 20%; /* Set the desired percentage width */
}
.search-button {
  padding: 12px 25px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-left: auto;
  position: relative;
  overflow: hidden;
}

.search-button:before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  transition: left 0.3s ease;
  transform: skewX(-20deg);
}

.search-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.search-button:hover:before {
  left: 100%;
}

.recipe-list {
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 30px;
  animation: fadeInUp 0.5s ease;
}

.recipe-item {
  width: 300px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
}

.recipe-item:nth-child(1) {
  animation-delay: 0.1s;
}

.recipe-item:nth-child(2) {
  animation-delay: 0.2s;
}

.recipe-item:nth-child(3) {
  animation-delay: 0.3s;
}

.recipe-item:nth-child(4) {
  animation-delay: 0.4s;
}

.recipe-item:nth-child(5) {
  animation-delay: 0.5s;
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
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.recipe-item:hover .recipe-meta {
  opacity: 1;
  transform: translateY(0);
}

.recipe-meta span {
  display: flex;
  align-items: center;
}

.recipe-meta i {
  margin-right: 5px;
  font-size: 1rem;
}

.no-recipes {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 40px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease;
}

.no-recipes h2 {
  font-family: var(--font-family-serif);
  font-size: 2.2rem;
  color: var(--color-primary);
  margin-bottom: 20px;
}

.no-recipes p {
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
  animation: fadeIn 0.5s ease;
}

.error-icon {
  font-size: 3rem;
  color: #e74c3c;
  margin-bottom: 20px;
  animation: shake 0.5s ease;
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-10px);
  }
  40% {
    transform: translateX(10px);
  }

  60% {
    transform: translateX(-10px);
  }
  80% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
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
