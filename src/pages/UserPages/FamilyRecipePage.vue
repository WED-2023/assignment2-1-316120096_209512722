<template>
  <GenericPage
    pageName="Family Recipes Treasures 🏠👑"
    :fetchData="fetchFamilyRecipes"
    :newPageMessage="{
      header: 'Welcome to the Family Recipe Treasures',
      body:
        'Delve into the heart of family traditions with our cherished recipes. Whether it\'s grandma\'s famous apple pie or dad\'s secret barbecue sauce, each dish tells a story. Start exploring and savor the memories!',
    }"
    :background="
      'https://ih1.redbubble.net/image.4268589145.3799/paperpc,750x,w,f8f8f8-pad,1000x1000,f8f8f8.jpg'
    "
  />
</template>

<script>
import GenericPage from "@/components/GenericPage.vue";
import { mockGetFamilyRecipes } from "../../services/user";

export default {
  name: "FamilyRecipePage", // Corrected the name to match the file name for clarity
  components: {
    GenericPage,
  },
  methods: {
    fetchFamilyRecipes() {
      return mockGetFamilyRecipes();
    },
  },
};
</script>
