<template>
  <div class="container">
    <TitleForUs />

    <b-button
      class="random-button"
      @click="handleButtonClick"
      variant="primary"
    >
      Get Different Recipes
    </b-button>
    <RecipePreviewList
      ref="recipePreviewList"
      title="Random Recipes"
      @recipes-updated="handleRecipesUpdated"
    />


    <div class="last-viewed-recipes-wrapper">
      <router-link
        v-if="!$root.store.username"
        to="/login"
        tag="button"
        class="login-btn"
      >
        <span>Unlock More Deliciousness</span>
        <i class="fas fa-sign-in-alt"></i>
      </router-link>
      <RecipePreviewList
        title="Last Viewed Recipes"
        :class="{
          RandomRecipes: true,
          blur: !$root.store.username,
          center: true,
          disabled: !$root.store.username,
        }"
        disabled="true"
      ></RecipePreviewList>
    </div>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import TitleForUs from "../components/TitleForUs.vue";
export default {
  components: {
    RecipePreviewList,
    TitleForUs,
  },
  methods: {
    handleButtonClick() {
      this.$refs.recipePreviewList.fetchDifferentRecipes(); // Call fetchDifferentRecipes method of RecipePreviewList component
    },
    handleRecipesUpdated() {
      console.log("Recipes updated"); // Handle recipes updated event
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 85%;
  margin: 0 auto;
  padding: 40px 20px;
  background-image: linear-gradient(to button, #dfe9f3 0%, white 100%);

  font-family: var(--font-family-sans);
}
.sub-title {
  font-family: var(--font-family-sans);
  color: var(--color-primary);
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 40px;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  border-top: 2px solid var(--color-primary);
}
.title {
  font-family: var(--font-family-serif);
  color: var(--color-primary);
  text-align: center;
  font-size: 3rem;
  margin-bottom: 40px;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.login-btn {
  font-family: var(--font-family-sans);
  font-size: 1rem;
  font-weight: 600;
  padding: 15px 30px;
  background-color: var(--color-accent);
  color: #454545;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.login-btn:hover {
  background-color: #2980b9;
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.6);
}

.blur {
  -webkit-filter: blur(5px);
  filter: blur(2px);
}

::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
.random-button {
  position: relative;
  bottom: -100px;
  left: 100px;
  font-family: var(--font-family-sans);
  font-size: 1rem;
  font-weight: 600;
  padding: 15px 30px;
  background-color: var(--color-accent);
  color: #454545;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
}

.random-button:hover {
  background-color: #2980b9;
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.6);
}

.disabled {
  pointer-events: none;
}
.last-viewed-recipes-wrapper {
  position: relative;
  text-align: center;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
}
</style>
