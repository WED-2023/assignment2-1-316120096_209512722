<template>
  <div class="recipe-instructions">
    <h1 class="title">Recipe Instructions</h1>
    <FixRecipeMake />
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading recipe instructions...</p>
    </div>
    <div v-else-if="error" class="error">
      <i class="fas fa-exclamation-triangle"></i>
      <p>{{ error }}</p>
    </div>
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
              <div class="checkbox-wrapper">
                <input
                  type="checkbox"
                  :id="'step-' + instruction.number"
                  v-model="completedSteps[index]"
                  class="step-checkbox"
                />
                <label :for="'step-' + instruction.number" class="step-label">
                  <span class="step-number">Step {{ instruction.number }}</span>
                  <span class="step-text">{{ instruction.step }}</span>
                </label>
              </div>
              <div v-if="instruction.ingredients.length" class="ingredients">
                <h3><i class="fas fa-carrot"></i> Ingredients:</h3>
                <ul>
                  <li v-for="(item, idx) in instruction.ingredients" :key="idx">
                    {{ item.name }}
                  </li>
                </ul>
              </div>
              <div v-if="instruction.equipment.length" class="equipment">
                <h3><i class="fas fa-utensils"></i> Equipment:</h3>
                <ul>
                  <li v-for="(item, idx) in instruction.equipment" :key="idx">
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
      completedSteps: {},
    };
  },
  async created() {
    try {
      this.loading = true;
      const result = await mockgetRecipeInstructions(this.recipeId);
      if (result.error) {
        this.error = result.error;
      } else {
        this.instructions = result;
        this.completedSteps = Object.fromEntries(
          result.map((_, index) => [index, false])
        );
      }
    } catch (error) {
      this.error = "Error fetching recipe instructions: " + error.message;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css");

.recipe-instructions {
  font-family: "Poppins", sans-serif;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff82;
  border-radius: 1rem;
  box-shadow: 0 0.4rem 1.5rem rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.loading,
.error {
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading {
  color: #3498db;
}

.error {
  color: #e74c3c;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #3498db;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.instructions {
  margin-top: 2rem;
}

.instruction-item {
  margin-bottom: 1.5rem;
}

.instruction-container {
  background-color: #f8f9fa;
  border-radius: 0.8rem;
  padding: 1.5rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.instruction-container.completed {
  background-color: #e8f6e9;
}

.instruction-container:hover {
  transform: translateY(-3px);
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
}

.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.step-checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  min-width: 1.5rem; /* Add this line */
  min-height: 1.5rem; /* Add this line */
  border: 2px solid #000000;
  border-radius: 0.3rem;
  margin-right: 1rem;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  box-sizing: border-box; /* Add this line */
}

.step-checkbox:checked {
  background-color: #3498db;
}

.step-checkbox:checked::after {
  content: "\2714";
  font-size: 1rem;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.step-label {
  cursor: pointer;
  flex-grow: 1;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
}

.step-number {
  font-weight: 700;
  color: #3498db;
  margin-bottom: 0.5rem;
}

.step-text {
  line-height: 1.6;
}

.equipment,
.ingredients {
  margin-top: 1rem;
  padding-left: 2.5rem;
}

.equipment h3,
.ingredients h3 {
  font-weight: 400;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.equipment h3 i,
.ingredients h3 i {
  margin-right: 0.5rem;
}

.equipment ul,
.ingredients ul {
  padding-left: 1.2rem;
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
</style>
