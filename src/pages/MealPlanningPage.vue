<template>
  <div class="meal-planning-container">
    <div class="meal-planning-title text-center my-3">
      <h1 class="display-6">Meal Planning</h1>
    </div>
    <div class="progress my-4">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        :style="{ width: progressBarWidth + '%' }"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {{ progressBarWidth }}%
      </div>
    </div>
    <button class="remove-all-button" @click="removeAllRecipes">
      Remove All Recipes
    </button>
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
    </div>
  </div>
</template>

<script>
import {
  mockGetmealPlanninglists,
  removemealPlanninglist,
  mockRemoveAllMeals,
} from "../services/mealPlanning.js";
import RecipePreview from "../components/RecipePreview.vue";

export default {
  name: "MealPage",
  components: {
    RecipePreview,
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
        done: false, // Assuming initially no recipes are marked as done
      })
    );
  },
  computed: {
    progressBarWidth() {
      const doneRecipes = this.recipes.filter((recipe) => recipe.done).length;
      const totalRecipes = this.recipes.length;
      return totalRecipes === 0 ? 0 : (doneRecipes / totalRecipes) * 100;
    },
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
  },
};
</script>

<style scoped>
.meal-planning-container {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 20px;
  max-width: 450px;
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

@keyframes checkmark-expand {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
