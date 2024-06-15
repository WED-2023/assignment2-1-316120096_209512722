<template>
  <div class="container">
    <div v-if="recipe" class="recipe-container">
      <div class="recipe-header">
        <h1 class="recipe-title">{{ recipe.title }}</h1>
        <RecipeButton :recipeId="recipeId" buttonText="Make this recipe" />
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
        image,
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
.img-container {
  position: relative;
  width: 100%;
  padding-bottom: 75%;
  overflow: hidden;
}
.recipe-container {
  max-width: 800px;
  margin: 0 auto;
  background-color: #f8f8f8b3;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.recipe-header {
  text-align: center;
  margin-bottom: 2rem;
}

.recipe-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.recipe-id {
  font-size: 1rem;
  color: #666;
}

.recipe-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  max-width: none;
  max-height: none;
  object-fit: cover;
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
}

.detail-item i {
  font-size: 1.2rem;
  color: #666;
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
  font-size: 1.1rem;
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
  background-color: #333;
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
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
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
