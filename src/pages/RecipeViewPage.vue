<template>
  <div class="container">
    <div v-if="recipe" class="recipe-container">
      <div class="recipe-header">
        <h1 class="recipe-title">{{ recipe.title }}</h1>
        <RecipeButton
          :recipeId="recipeId"
          buttonText="Make this recipe"
          class="recipe-button"
        />
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
            <span>{{ recipe.servings }} Servings</span>
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
                {{ s.step }}
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
import "@fortawesome/fontawesome-free/css/all.css";

export default {
  components: {
    RecipeButton,
  },
  data() {
    return {
      recipe: null,
      recipeId: null,
    };
  },
  async created() {
    try {
      this.recipeId = this.$route.params.recipeId;

      let response;
      // response = this.$route.params.response;

      try {
        // response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/" + this.$route.params.recipeId,
        //   {
        //     withCredentials: true
        //   }
        // );
        console.log("this.$route.params.recipeId", this.$route.params.recipeId);
        response = mockGetRecipeFullDetails(this.$route.params.recipeId);
        console.log("response", response);
        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        summary,
        image,
        servings,
        title,
      } = response.data.recipe;

      let _instructions = analyzedInstructions
        .map((fstep) => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        servings,
        summary,
        image,
        title,
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Italianno&display=swap");
.recipe-button {
  font-size: 2rem;
}
.img-container {
  display: flex;
  justify-content: center; /* Center the image horizontally */
  align-items: center; /* Center the image vertically */
  margin-top: 1rem;
  overflow: hidden;
}

.recipe-container {
  max-width: 1400px;
  margin: 0 auto;
  background-color: #ffffffcd;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  font-family: "Italianno", cursive;
}

.recipe-header {
  text-align: center;
  margin-bottom: 2rem;
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

.recipe-image {
  width: 100%; /* Ensure the image takes up full width of the container */
  max-width: 600px; /* Set a max width to maintain consistency */
  height: 450px; /* Set a fixed height for all images */
  object-fit: cover; /* Ensure the image covers the container while maintaining aspect ratio */
  border-radius: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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
  color: #7e8473;
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

.instruction-list li::before {
  content: counter(step-counter);
  position: absolute;
  left: 0;
  top: 0;
  background-color: #070707;
  color: #fff;
  font-weight: bold;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
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

@media (max-width: 768px) {
  .recipe-content {
    flex-direction: column;
  }

  .ingredients,
  .instructions {
    width: 100%;
  }
}
</style>
