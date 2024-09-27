<template>
  <button @click="navigateToRecipe">{{ buttonText }}</button>
</template>

<script>
export default {
  props: {
    recipeId: {
      type: [String, Number],
      required: true,
    },
    buttonText: {
      type: String,
      default: "Make this recipe",
    },
  },

  methods: {
    navigateToRecipe() {
      this.$router.push({
        name: "MakeRecipeid",
        params: { recipeId: this.recipeId }, // Use 'MakeRecipeid' as the parameter name
      });
    },
    mounted() {
      console.log("Received recipeId in RecipeButton:", this.recipeId);
    },
  },
};
</script>

<style scoped>
button {
  background-color: #136c44;
  color: white;
  border: none;
  padding: 0.69rem 1rem;
  font-size: 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}
button:hover {
  background-color: #4dc367;
}
</style>
