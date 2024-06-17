<template>
  <button @click="navigateToRecipe">{{ buttonText }}</button>
</template>

<script>
import { mockAddRecipe } from "../services/mealPlanning.js";
export default {
  props: {
    recipeId: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      default: "Make this recipe",
    },
  },
  methods: {
    navigateToRecipe() {
      mockAddRecipe(this.recipeId, this.$root.store.username);

      let number = parseInt(this.recipeId);
      this.$router.push({
        name: "MakeRecipeid",
        params: { recipeId: this.recipeId },
      });
    },
  },
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #218838;
}
</style>
