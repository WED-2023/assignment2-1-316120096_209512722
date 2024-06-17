<template>
  <div class="meal-planning-container">
    <draggable v-model="recipes" class="recipe-list" @end="onDragEnd">
      <div
        v-for="(recipe, index) in recipes"
        :key="recipe.id"
        class="recipe-item"
      >
        <div class="recipe-header">
          <h2>{{ "Recipe " + (index + 1) }}</h2>
          <button class="remove-button" @click="removeRecipe(index)">
            &times;
          </button>
        </div>
        <RecipePreview :recipe="recipe" />
        <label class="checkbox-container">
          <input
            type="checkbox"
            :checked="recipe.done"
            @click="toggleDone(recipe)"
          />
          <span class="checkmark"></span>
          Done
        </label>

        <!-- Progress bar -->
        <div class="recipe-progress">
          <div class="progress">
            <div class="progress-bar" :style="{ width: recipe.progress + '%' }">
              {{ recipe.progress }}%
            </div>
          </div>
        </div>

        <!-- Remove button -->
        <button class="remove-button" @click="removeRecipe(index)">
          &times;
        </button>
      </div>
    </draggable>

    <!-- Remove all button -->
    <button class="remove-all-button" @click="removeAllRecipes">
      Remove All Recipes
    </button>
  </div>
</template>

<script>
import {
  mockGetmealPlanninglists,
  removemealPlanninglist,
  mockRemoveAllMeals,
  mockchangeorder,
  mockGetReecipePrecntag,
} from "../services/mealPlanning.js";
import RecipePreview from "../components/RecipePreview.vue";
import draggable from "vuedraggable";

export default {
  name: "MealPage",
  components: {
    RecipePreview,
    draggable,
  },
  data() {
    return {
      recipes: [],
    };
  },
  async created() {
    this.recipes = (
      await mockGetmealPlanninglists(this.$root.store.username)
    ).response.data.recipes.map((recipe) => ({
      ...recipe,
      done: false, // Initially no recipes are marked as done
      progress: mockGetReecipePrecntag(recipe, this.$root.store.username), // Initialize progress to 0%
    }));
  },
  methods: {
    removeRecipe(index) {
      const removedRecipe = this.recipes.splice(index, 1)[0];
      removemealPlanninglist(removedRecipe.id, this.$root.store.username);
    },
    toggleDone(recipe) {
      const index = this.recipes.indexOf(recipe);
      this.$set(this.recipes[index], "done", !this.recipes[index].done);
    },
    removeAllRecipes() {
      this.recipes = [];
      mockRemoveAllMeals(this.$root.store.username);
    },
    onDragEnd(event) {
      mockchangeorder(this.recipes, this.$root.store.username);
    },
    updateProgress(recipeId, newProgress) {
      const recipe = this.recipes.find((r) => r.id === recipeId);
      if (recipe) {
        recipe.progress = mockGetReecipePrecntag(
          recipe,
          this.$root.store.username
        );
      }
    },
  },
};
</script>

<style scoped>
.meal-planning-container {
  background-color: rgba(255, 255, 255, 0.95);
  background-size: cover;
  padding: 20px;
  border-radius: 20px;
  max-width: 800px; /* Adjust the max-width to your desired width */
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.recipe-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 130px; /* Adjust height as necessary */
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; /* Ensure relative positioning for absolute children */
}

.recipe-header {
  display: flex;
  align-items: center;
}

.remove-button {
  border: none;
  border-radius: 50%;
  background-color: #dc3545;
  color: white;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2em;
  line-height: 30px;
  text-align: center;
}

.remove-button:hover {
  background-color: #c82333;
  transform: rotate(90deg);
}

.checkbox-container {
  display: inline-block;
  position: relative;
  padding-left: 35px;
  margin-right: 15px;
  cursor: pointer;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: #ccc;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #2196f3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.remove-all-button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background-color: #dc3545;
  color: white;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-all-button:hover {
  background-color: #c82333;
}

.progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px; /* Adjust height of the progress bar container */
}

.progress-bar {
  height: 100%;
  background-color: #007bff; /* Choose your desired progress bar color */
  color: white;
  text-align: center;
  line-height: 20px; /* Ensure proper centering of text */
  border-radius: 10px;
}
</style>
