<template>
  <GenericPage
    pageName="Family Recipes Treasures 🏠👑"
    :fetchData="fetchFamilyRecipes"
    :isFamilyRecipe="true"
    :newPageMessage="{
      header: 'Welcome to the Family Recipe Treasures',
      body:
        'Delve into the heart of family traditions with our cherished recipes. Whether it\'s grandma\'s famous apple pie or dad\'s secret barbecue sauce, each dish tells a story. Start exploring and savor the memories!',
    }"
  />
</template>

<script>
import GenericPage from "@/components/GenericPage.vue";
import { mockGetFamilyRecipes } from "../../services/user";

export default {
  name: "FamilyRecipePage",
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
