<template>
  <div class="recipe-instructions">
    <h1 class="title">Recipe Instructions</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="instructions" class="instructions">
      <ol>
        <li
          v-for="(instruction, index) in instructions"
          :key="index"
          class="instruction-item"
        >
          {{ instruction }}
        </li>
      </ol>
    </div>
    <div v-else class="error">
      Failed to fetch recipe instructions.
    </div>
  </div>
</template>

<script>
import { mockgetRecipeInstructions } from "../services/mealPlanning.js";

export default {
  props: {
    recipeId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      instructions: null,
      loading: true,
    };
  },
  async created() {
    try {
      this.instructions = await mockgetRecipeInstructions(this.recipeId);
    } catch (error) {
      console.error("Error fetching recipe instructions:", error.message);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.recipe-instructions {
  font-family: "Arial", sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
}

.loading {
  font-style: italic;
  color: #777;
  text-align: center;
  margin-top: 20px;
}

.instructions {
  margin-top: 20px;
}

.instruction-item {
  margin-bottom: 10px;
  line-height: 1.6;
}

.error {
  color: #ff6347;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}

.fade-enter-active,
.fade-leave-active,
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter,
.fade-leave-to,
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
