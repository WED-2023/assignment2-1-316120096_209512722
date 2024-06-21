<template>
  <div class="recipe-card">
    <b-card
      :title="recipe.title"
      :img-src="recipe.image"
      img-alt="Recipe Image"
      img-top
      class="recipe-card-content"
    >
      <b-card-text>
        <div class="recipe-details">
          <div class="servings-section">
            <p>Servings: {{ servings }}</p>
            <b-button
              @click="updateServings(-1)"
              variant="danger"
              class="servings-button"
              >-</b-button
            >
            <b-button
              @click="updateServings(1)"
              variant="success"
              class="servings-button"
              >+</b-button
            >
          </div>
          <p>Ready In: {{ recipe.readyInMinutes }} minutes</p>
          <h5>Ingredients:</h5>
          <ul>
            <li v-for="ingredient in adjustedIngredients" :key="ingredient.id">
              {{ ingredient.amount }} {{ ingredient.unit }}
              {{ ingredient.name }}
            </li>
          </ul>
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { mockGetRecipeInfo } from "../services/mealPlanning.js";

export default {
  data() {
    return {
      recipe: {},
      servings: 1,
    };
  },
  mounted() {
    this.fetchRecipeInfo();
  },
  computed: {
    adjustedIngredients() {
      return this.recipe.ingredients.map((ingredient) => ({
        ...ingredient,
        amount: ingredient.amount * this.servings,
      }));
    },
  },
  methods: {
    async fetchRecipeInfo() {
      try {
        this.recipe = await mockGetRecipeInfo();
        this.servings = this.recipe.servings;
      } catch (error) {
        console.error("Error fetching recipe information:", error);
      }
    },
    updateServings(value) {
      this.servings = Math.max(1, this.servings + value);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Open+Sans:wght@400;600&display=swap");

.recipe-card {
  max-width: 800px;
  margin: 20px auto;
  perspective: 1000px; /* Adding perspective for 3D effect */
}

.recipe-card-content {
  border: none;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
  transition: transform 0.8s ease-in-out, box-shadow 0.8s ease-in-out;
  transform-origin: center;
}

.recipe-details {
  padding: 15px;
  text-align: center;
  font-family: "Open Sans", sans-serif;
}

.recipe-details p,
.recipe-details li {
  font-size: 1em;
  color: #333;
}

.recipe-details h5 {
  font-family: "Dancing Script", cursive;
  font-size: 1.5em;
  color: #c0392b;
  margin-top: 15px;
  margin-bottom: 10px;
}

.servings-section {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
}

.servings-section p {
  margin: 0 10px;
  font-size: 1.2em;
  font-family: "Dancing Script", cursive;
  color: #333;
}

.servings-button {
  width: 40px;
  height: 40px;
  font-size: 1.5em;
  line-height: 1;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
}

.servings-button:hover {
  transform: scale(1.2);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

ul {
  padding-left: 0;
  list-style-type: none;
}

li {
  margin-bottom: 5px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  padding: 5px 10px;
  transition: background 0.3s, transform 0.3s;
}

li:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateX(5px); /* Adding slight movement on hover */
}
</style>
