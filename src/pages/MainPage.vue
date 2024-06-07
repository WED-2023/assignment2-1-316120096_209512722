<template>
  <div class="container">
    <h1 class="title">Omer's Culinary Oasis</h1>
    <h5 class="sub-title">Explore a world of flavors</h5>
    <RecipePreviewList
      title="Explore this recipes"
      class="RandomRecipes center"
    />
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
