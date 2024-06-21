<template>
  <div class="meal-planning-container">
    <img class="logo" src="@/assets/images/menu.png" alt="Logo" />
    <draggable
      v-model="recipes"
      class="recipe-list"
      @end="onDragEnd"
      ghost-class="ghost-card"
    >
      <div
        v-for="(recipe, index) in recipes"
        :key="recipe.id"
        class="recipe-item"
      >
        <div class="recipe-header">
          <h2>{{ "Recipe " + (index + 1) }}</h2>
          <div class="button-container">
            <MakeRecipeButton :recipeId="recipe.id" class="small-button" />

            <button class="remove-button" @click="removeRecipe(index)">
              x
            </button>
          </div>
        </div>

        <div class="recipe-preview-container">
          <RecipePreview :recipe="recipe" />
        </div>
        <div class="progress-container">
          <div class="progress">
            <div class="progress-bar" :style="{ width: recipe.progress + '%' }">
              {{ recipe.progress }}%
            </div>
          </div>
          <div class="checkbox-container">
            <input
              type="checkbox"
              :checked="recipe.done"
              @click="toggleDone(recipe)"
            />
            <label>Done</label>
          </div>
        </div>
      </div>
    </draggable>

    <button
      v-if="recipes.length"
      class="remove-all-button"
      @click="removeAllRecipes"
    >
      <i class="fas fa-trash"></i> Remove All Recipes
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
import MakeRecipeButton from "../components/MakeRecipeButton.vue";

export default {
  name: "MealPage",
  components: {
    RecipePreview,
    draggable,
    MakeRecipeButton,
  },
  data() {
    return {
      recipes: [],
    };
  },
  created() {
    this.recipes = mockGetmealPlanninglists(
      this.$root.store.username
    ).response.data.recipes.map((recipe) => ({
      ...recipe,
      done: false,
      progress: mockGetReecipePrecntag(recipe, this.$root.store.username),
    }));
    this.$root.store.count = this.recipes.length;
  },
  methods: {
    removeRecipe(index) {
      const removedRecipe = this.recipes.splice(index, 1)[0];
      removemealPlanninglist(removedRecipe.id, this.$root.store.username);
      this.$root.store.count--;
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
        recipe.progress = newProgress;
      }
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
/* Add styles for the button container */
.button-container {
  display: flex;
  align-items: center;
  gap: 10px; /* Adjust the gap between buttons as needed */
}

/* General styles */
body {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  background-attachment: fixed;
}

/* Container styles */
.meal-planning-container {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 20px;
  max-width: 800px; /* Adjust the max-width to your desired width */
  backdrop-filter: blur(10px);
  background-image: url("https://t3.ftcdn.net/jpg/02/82/40/28/360_F_282402880_73Gx4lK3fUVOiLkJaAXtz77RxXm7QHaN.jpg");
  background-size: contain;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 72px rgba(193, 59, 59, 0.741);
  max-width: 1500px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Recipe item styles */
.recipe-item {
  background-color: #ffffff;
  border: 3px solid #dd0808;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
}

.recipe-item:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.recipe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
}

.recipe-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.remove-button {
  background-color: #dc3545;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.2rem;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #c82333;
}

/* MakeRecipeButton styles */
.small-button {
  font-size: 1rem;
  padding: 5px 10px;
  margin-left: 10px;
  margin-bottom: 20px;
}

/* Recipe Preview styles */
.recipe-preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0;
}

/* Checkbox styles */
.progress-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
}

.checkbox-container {
  display: flex;
  align-items: center;
}

.checkbox-container input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.checkbox-container input[type="checkbox"]:checked {
  background-color: #2196f3;
  border-color: #2196f3;
}

.checkbox-container input[type="checkbox"]:checked::before {
  content: "\2714";
  display: flex;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
}

.checkbox-container label {
  margin-left: 10px;
  font-size: 0.9rem;
  color: #555;
}

/* Progress bar styles */
.progress {
  position: relative;
  width: 80%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #2196f3;
  border-radius: 5px;
  transition: width 0.3s ease;
}

/* Remove All button styles */
.remove-all-button {
  display: block;
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  background-color: #dc3545;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.remove-all-button:hover {
  background-color: #c82333;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.remove-all-button i {
  margin-right: 8px;
}

/* Drag and Drop styles */
.ghost-card {
  opacity: 0.5;
  background-color: #f8f8f8;
  border: 1px dashed #ccc;
}

/* Responsive styles */
@media (max-width: 768px) {
  .meal-planning-container {
    padding: 20px;
  }
  .recipe-item {
    padding: 15px;
  }
  .recipe-header h2 {
    font-size: 1rem;
  }
  .remove-button {
    font-size: 1rem;
  }
  .checkbox-container label {
    font-size: 0.8rem;
  }
}
</style>
