<template>
  <button @click="navigateToRecipe">Make this recipe</button>
</template>

<script>
export default {
  methods: {
    navigateToRecipe() {
      this.$router.push("/recipe");
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
