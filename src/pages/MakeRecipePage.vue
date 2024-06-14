<template>
  <div class="recipe-instructions">
    <h1 class="title">Recipe Instructions</h1>
    <FixRecipeMake />
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div class="instructions">
        <transition-group name="fade" tag="ol">
          <li
            v-for="(instruction, index) in instructions"
            :key="instruction.number"
            class="instruction-item"
          >
            <div
              :class="[
                'instruction-container',
                { completed: completedSteps[index] },
              ]"
            >
              <input
                type="checkbox"
                :id="'step-' + instruction.number"
                v-model="completedSteps[index]"
                class="step-checkbox"
              />
              <label :for="'step-' + instruction.number" class="step-label">
                <strong>Step {{ instruction.number }}:</strong>
                {{ instruction.step }}
              </label>
              <div v-if="instruction.equipment.length" class="equipment">
                <em>Equipment:</em>
                <ul>
                  <li v-for="(item, idx) in instruction.equipment" :key="idx">
                    {{ item.name }}
                  </li>
                </ul>
              </div>
              <div v-if="instruction.ingredients.length" class="ingredients">
                <em>Ingredients:</em>
                <ul>
                  <li v-for="(item, idx) in instruction.ingredients" :key="idx">
                    {{ item.name }}
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mockgetRecipeInstructions } from "../services/mealPlanning.js";
import FixRecipeMake from "../components/FixRecipeMake.vue";
export default {
  components: {
    FixRecipeMake,
  },
  props: {
    recipeId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      instructions: [],
      loading: false,
      error: null,
      completedSteps: [], // Use an object for better indexing
    };
  },
  async created() {
    try {
      this.loading = true; // Set loading to true when starting data fetch
      const result = await mockgetRecipeInstructions(this.recipeId);
      if (result.error) {
        this.error = result.error;
      } else {
        this.instructions = result;
        // Initialize completedSteps with an object for better indexing
        this.completedSteps = {};
        result.forEach((instruction, index) => {
          // Initialize each checkbox state with false
          this.$set(this.completedSteps, index, false);
        });
      }
    } catch (error) {
      this.error = "Error fetching recipe instructions: " + error.message;
    } finally {
      this.loading = false; // Set loading to false after data fetch completes
    }
  },
};
</script>

<style scoped>
.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
  font-family: "Georgia", serif;
  background: linear-gradient(to right, #fdfbfb, #ebedee);
  padding: 1rem 2rem;
  border-radius: 0.8rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
}

.loading,
.error {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 1.2rem;
}

.loading {
  font-style: italic;
  color: #777;
}

.error {
  color: #ff6347;
  font-weight: bold;
}

.instructions {
  margin-top: 1.5rem;
}

.instruction-item {
  margin-bottom: 1.5rem;
}

.instruction-container {
  background-color: #e8f4f8;
  border: 1px solid #bcd4e6;
  border-radius: 0.8rem;
  padding: 1.5rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, opacity 0.3s;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.instruction-container.completed {
  background-color: #c8e6c9; /* Light green */
}

.instruction-container:hover {
  transform: scale(1.02);
}

.step-checkbox {
  margin-right: 0.8rem;
  margin-top: 0.3rem;
}

.step-label {
  cursor: pointer;
  flex-grow: 1;
  margin-bottom: 0.6rem;
  font-size: 1.1rem;
}

.equipment,
.ingredients {
  margin-left: 1.8rem;
  margin-top: 1rem;
}

.equipment ul,
.ingredients ul {
  padding-left: 1.6rem;
  margin-top: 0.5rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.instructions ol {
  list-style-type: none;
  padding-left: 0;
}

.recipe-instructions {
  font-family: "Arial", sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 1rem;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
}
</style>
