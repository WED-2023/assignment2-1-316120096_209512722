<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <RecipePreviewList title="Randome Recipes" class="RandomRecipes center" />
    <router-link v-if="!$root.store.username" to="/login" tag="button"
      >You need to Login to vue this</router-link
    >

    <RecipePreviewList
      title="Last Viewed Recipes"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true,
      }"
      disabled
    ></RecipePreviewList>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList,
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
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
  display: block;
  margin: 0 auto 40px;
}

.login-btn:hover {
  background-color: #2980b9;
  transform: scale(1.05);
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

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
}
</style>
