<template>
  <div class="meal-planning-container">
    <!-- Existing HTML code -->
    <draggable v-model="recipes" class="recipe-list" @end="onDragEnd">
      <div
        v-for="(recipe, index) in recipes"
        :key="recipe.id"
        class="recipe-item"
      >
        <!-- Existing recipe item structure -->
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
            <div
              class="progress-bar"
              :style="{ width: recipe.progress + '%' }"
              :aria-valuenow="recipe.progress"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ recipe.progress }}%
            </div>
          </div>
        </div>
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
    this.recipes = (await mockGetmealPlanninglists()).response.data.recipes.map(
      (recipe) => ({
        ...recipe,
        done: false, // Initially no recipes are marked as done
        progress: 0, // Initialize progress to 0%
      })
    );
  },
  methods: {
    removeRecipe(index) {
      const removedRecipe = this.recipes.splice(index, 1)[0];
      removemealPlanninglist(removedRecipe.id);
    },
    toggleDone(recipe) {
      const index = this.recipes.indexOf(recipe);
      this.$set(this.recipes[index], "done", !this.recipes[index].done);
    },
    removeAllRecipes() {
      this.recipes = [];
      mockRemoveAllMeals();
    },
    onDragEnd(event) {
      mockchangeorder(this.recipes);
    },
    updateProgress(recipeId, newProgress) {
      const recipe = this.recipes.find((r) => r.id === recipeId);
      if (recipe) {
        recipe.progress = mockGetReecipePrecntag(recipe);
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

.meal-planning-title {
  color: #444;
}

.recipe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
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

.recipe-item {
  padding: 10px;
  margin-bottom: 15px;
  background-color: #f8f9fa;
  border-radius: 10px;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.recipe-item:hover {
  transform: translateY(-5px);
  background-color: #e9ecef;
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
.progress-bar {
  background-color: #007bff; /* Choose your desired progress bar color */
  height: 100%;
  color: white;
  text-align: center;
  line-height: 1.5;
  border-radius: 10px;
}

@keyframes checkmark-expand {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
