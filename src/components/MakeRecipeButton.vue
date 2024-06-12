<template>
  <button @click="navigateToRecipe">{{ buttonText }}</button>
</template>

<script>
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
