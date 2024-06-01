<template>
  <div class="container">
    <!-- Search Form -->
    <div class="search-section">
      <h1 class="title">Find Your Recipe</h1>
      <form @submit.prevent="searchRecipes" class="search-form">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for recipes..."
          class="search-input"
        />
        <button type="submit" class="search-button">Search</button>
      </form>
      <div class="filters">
        <h2>Filter By Category</h2>
        <select v-model="selectedCategory" class="filter-select">
          <option value="">All Categories</option>
          <option
            v-for="category in categories"
            :value="category"
            :key="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <!-- Search Results -->
    <div class="search-results" v-if="showResults">
      <h2>Search Results</h2>
      <div v-if="filteredResults.length > 0">
        <div
          v-for="recipe in displayedResults"
          :key="recipe.id"
          class="recipe-card"
        >
          <h3>{{ recipe.name }}</h3>
          <p>Category: {{ recipe.category }}</p>
        </div>
      </div>
      <div v-else>
        <p class="no-results">No results found.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      selectedCategory: "",
      categories: [
        "vegetarian",
        "vegan",
        "glutenFree",
        "dairyFree",
        "veryHealthy",
        "cheap",
        "veryPopular",
        "sustainable",
        "lowFodmap",
      ],
      searchResults: [
        // Add more sample data as needed
      ],
    };
  },
  computed: {
    filteredResults() {
      if (!this.searchQuery && !this.selectedCategory) {
        return [];
      }
      let results = this.searchResults;
      if (this.searchQuery) {
        results = results.filter((recipe) =>
          recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      if (this.selectedCategory && this.selectedCategory !== "All Categories") {
        results = results.filter(
          (recipe) => recipe.category === this.selectedCategory
        );
      }
      return results;
    },
    displayedResults() {
      return this.filteredResults;
    },
    showResults() {
      return this.searchQuery || this.selectedCategory;
    },
  },
  methods: {
    searchRecipes() {
      // This method is optional, can be used for additional actions when searching
      console.log("Searching for:", this.searchQuery);
      console.log("Selected Category:", this.selectedCategory);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-section {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.search-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.filters {
  margin-top: 20px;
}

.filter-select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.search-results {
  background-color: #3b895c;
  padding: 20px;
  border-radius: 8px;
}

.recipe-card {
  background-color: rgb(54, 209, 201);
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.no-results {
  text-align: center;
  font-style: italic;
  color: #e1e1e1;
}
</style>
