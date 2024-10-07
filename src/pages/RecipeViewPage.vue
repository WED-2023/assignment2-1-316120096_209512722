<template>
  <div class="container">
    <div v-if="recipe" class="recipe-container">
      <div class="recipe-header">
        <h1 class="recipe-title">{{ recipe.title }}</h1>
        <div class="button-container" v-if="recipeId">
          <RecipeButton
            :recipeId="String(recipeId)"
            buttonText="Make this recipe"
            @click="navigateToMakeRecipe"
          />
          <button class="meal-plan-btn" @click="addToMealPlan">
            Add to meal plan
          </button>
        </div>

        <p class="recipe-id">Recipe ID: {{ recipeId }}</p>
        <div class="img-container">
          <img :src="recipe.image" class="recipe-image" />
        </div>
      </div>
      <div class="recipe-body">
        <div class="recipe-details">
          <div class="detail-item">
            <i class="fas fa-clock"></i>
            <span>Ready in {{ recipe.readyInMinutes }} minutes</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-heart"></i>
            <span>{{ recipe.aggregateLikes }} likes</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-utensils"></i>
            <span>{{ recipe.servings }} servings</span>
          </div>
        </div>
        <div class="recipe-summary">
          <h3>Summary</h3>
          <p v-html="recipe.summary"></p>
        </div>
        <div class="recipe-content">
          <div class="ingredients">
            <h3>Ingredients</h3>
            <ul class="ingredient-list">
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="instructions">
            <h3>Instructions</h3>
            <ol class="instruction-list">
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.number }}. {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mockGetRecipeFullDetails } from "../services/recipes.js";
import RecipeButton from "../components/MakeRecipeButton.vue";
import { mockAddRecipe } from "../services/mealPlanning.js";

export default {
  props:{
    fetchData: {
      type: Boolean,
      default: true,
      required: false,
    },
    recipe:{
      type: Object,
      default: null,
      required: false,
    }
  },
  data() {

    return {
      recipe: null,
      recipeId: null,
    };
  },
  components: {
    RecipeButton,
  },
  methods: {
    addToMealPlan(recipeId) {
      swal(
        "Recipe Added ",
        "the recipe has been added to your meal plan",
        "success"
      );
      mockAddRecipe(this.recipeId, this.$root.store.username);
      this.$root.store.count++;
    },
  },

  async created() {
  
    try {
      let response = [];
      if (this.fetchData) {
      // Get the recipeId from the route parameters
      this.recipeId = this.$route.params.recipeId;
      console.log(
        "this.recipeId in view page by route parameter:",
        this.recipeId
      );

      // Await the response from the mockGetRecipeFullDetails function
      response = await mockGetRecipeFullDetails(this.recipeId);

      // Check if the response status is not 200 or recipe data is missing, redirect to NotFound page
      if (response?.status !== 200 || !response?.data?.recipe?.recipe) {
        this.$router.replace("/NotFound");
        return; // Exit early if the recipe was not found
      }

      console.log("this is response in recipeViewPage:", response.data);
    }
    else {
      response = this.recipe;
    }
      // Destructure from the correct nested structure
      let {
        analyzedInstructions = [],
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        summary,
        servings,
        image,
        title,
        id,
      } = response.data.recipe.recipe; // Adjust here to access the nested recipe object

      // Ensure analyzedInstructions exists and has valid data before mapping

      let _instructions = [];
      if (
        Array.isArray(analyzedInstructions) &&
        analyzedInstructions.length > 0
      ) {
        _instructions = analyzedInstructions
          .map((instruction) => {
            return instruction.steps.map((step) => {
              return {
                number: step.number, // the step number
                step: step.step, // the instruction text for the step
              };
            });
          })
          .flat(); // Flatten the array of arrays into a single array
      }

      // Create the final _recipe object
      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        summary,
        servings,
        image,
        title,
        id,
      };

      // Log each part of the recipe to see what data is available
      console.log("Recipe Title:", _recipe.title);
      console.log("Recipe Image:", _recipe.image);
      console.log("Recipe Summary:", _recipe.summary);
      console.log("Recipe Instructions:", _recipe.instructions);
      console.log("Recipe Ingredients:", _recipe.extendedIngredients);
      console.log("Recipe Analyezd:", _recipe.analyzedInstructions);

      // Assign the recipe to the component's data
      this.recipe = _recipe;

      // Reassign this.recipeId if it's not already set
      if (!this.recipeId && this.recipe.id) {
        this.recipeId = this.recipe.id;
      }

      console.log(this.recipe.id, "recipeId");
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Italianno&display=swap");
@import "@fortawesome/fontawesome-free/css/all.min.css";

.container {
  width: 80%;
}

.recipe-button {
  font-size: 1.5rem;
}

.recipe-container {
  max-width: 1800px;
  margin: 0 auto;
  background-color: #ffffffac;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  font-family: "Italianno", cursive;
}

.recipe-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.img-container {
  width: 100%;
  max-width: 400px;
  aspect-ratio: 4 / 3;
  position: relative;
  margin-bottom: 1rem;
}

.recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.recipe-title {
  font-size: 4rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.recipe-id {
  font-size: 1.8rem;
  color: #666;
}

.recipe-details {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.detail-item {
  display: flex;
  align-items: center;
  margin: 0 1rem;
  font-size: 2rem;
}

.detail-item i {
  color: #9d7a7aee;
  margin-right: 0.5rem;
}

.recipe-content {
  display: flex;
  justify-content: space-between;
}

.ingredients,
.instructions {
  width: 48%;
}

.ingredient-list,
.instruction-list {
  list-style-type: none;
  padding: 0;
}

.ingredient-list li,
.instruction-list li {
  font-size: 1.9rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.ingredient-list li::before {
  content: "🍴 ";
}

.instruction-list li {
  counter-increment: step-counter;
  position: relative;
  padding-left: 2rem;
}
.button-container {
  display: flex;
  gap: 10px;
  margin-top: 1rem;
}
.instruction-list li::before {
  content: counter(step-counter);
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(241, 222, 198, 0.809);
  color: #161513c8;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

h3 {
  font-size: 2.3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.recipe-summary p {
  font-size: 2rem;
  line-height: 1.6;
  color: #1b1b1b;
}

.meal-plan-btn {
  background-color: #89342c;
  color: white;
  border: none;
  padding: 0.69rem 1rem;
  font-size: 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}

.meal-plan-btn:hover {
  background-color: #e65073;
}

.meal-plan-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 111, 97, 0.5);
}

@media (max-width: 768px) {
  .recipe-content {
    flex-direction: column;
  }

  .ingredients,
  .instructions {
    width: 100%;
  }

  .recipe-header {
    flex-direction: column;
    align-items: center;
  }

  .img-container {
    width: 80%;
    padding-bottom: 60%;
    margin-left: 0;
    margin-bottom: 1rem;
  }
}
</style>
