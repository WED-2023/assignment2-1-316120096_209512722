<template>
  <GenericPage pageName="My Culinary Gems 💎🍽️" :fetchData="fetchFavorites" />
</template>

<script>
import GenericPage from "@/components/GenericPage.vue";
import { mockGetFavorites } from "../../services/user";

export default {
  name: "FavoritesPage",
  components: {
    GenericPage,
  },
  methods: {
    fetchFavorites() {
      return mockGetFavorites();
    },
  },
};
</script>
