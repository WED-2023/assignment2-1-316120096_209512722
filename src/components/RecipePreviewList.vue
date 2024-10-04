<template>
  <b-container class="recipe-list-container">
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <div class="recipe-list">
      <RecipePreview
        :userName="userName || ''"
        v-for="r in recipes"
        :key="r.id"
        :recipe="r"
        class="recipe-item"
      />
    </div>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetRecipesPreviewRandom } from "../services/recipes.js";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    userName: {
      type: String,
      required: true,
      default: "", // Default to an empty string
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const amountToFetch = 3; // Fetching 3 random recipes
        const response = await mockGetRecipesPreviewRandom(amountToFetch);

        // Assuming the response is an array of recipe objects
        console.log(response); // Log the entire response

        if (Array.isArray(response)) {
          this.recipes = response; // Directly set the response if it's an array
        } else if (response.data && Array.isArray(response.data)) {
          this.recipes = response.data; // Set the data property if response has it
        } else {
          console.error("Unexpected response format", response);
        }
      } catch (error) {
        console.log("Error fetching recipes", error);
      }
    },

    fetchDifferentRecipes() {
      this.updateRecipes(); // Call updateRecipes method
      this.$emit("recipes-updated"); // Emit a custom event
    },

    fetchDifferentRecipes() {
      this.updateRecipes(); // Call updateRecipes method
      this.$emit("recipes-updated"); // Emit a custom event
    },
  },
};
</script>

<style scoped>
.recipe-list-container {
  max-width: 85%;
  margin: 0 auto;
  padding: 40px 20px;
  background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
  font-family: var(--font-family-sans);
}

h3 {
  font-family: var(--font-family-serif);
  color: var(--color-primary);
  text-align: center;
  font-size: 2rem;
  margin-bottom: 40px;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.recipe-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 30px;
  justify-content: center;
  justify-items: center;
  align-items: center;
}

@media (max-width: 768px) {
  .recipe-list {
    grid-template-columns: repeat(1, 1fr);
    gap: 25px;
  }
}
</style>
