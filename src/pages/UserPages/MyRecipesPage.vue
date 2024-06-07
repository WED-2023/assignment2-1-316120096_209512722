<template>
  <GenericPage
    pageName="My Kitchen Creations 🍳🎨"
    :fetchData="fetchFavorites"
    :newPageName="{
      header: 'Create Your Own Culinary Masterpieces',
      body:
        'Unleash your creativity in the kitchen and add your own unique recipes to the collection. Share your culinary innovations and inspire others with your favorite homemade dishes!',
    }"
  />
</template>

<script>
import GenericPage from "@/components/GenericPage.vue";
import { mockGetUserRecipes } from "../../services/user";

export default {
  name: "FavoritesPage",
  components: {
    GenericPage,
  },
  methods: {
    fetchFavorites() {
      return mockGetUserRecipes();
    },
  },
};
</script>
