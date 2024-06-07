<template>
  <b-container class="recipe-list-container">
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <div class="recipe-list">
      <RecipePreview
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
import { mockGetRecipesPreview } from "../services/recipes.js";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
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
        // const response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/random",
        // );

        const amountToFetch = 1; // Set this to how many recipes you want to fetch
        const response = mockGetRecipesPreview(amountToFetch);

        console.log(response);
        const recipes = response.data.recipes;
        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
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
