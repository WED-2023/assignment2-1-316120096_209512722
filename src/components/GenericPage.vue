<template>
  <div class="generic-page" :style="backgroundStyle">
    <h1 class="title">{{ pageName }}</h1>

    <div class="recipes-grid">
      <div v-if="isLoading" class="loading">
        <div class="loading-spinner"></div>
        <p>Loading recipes...</p>
      </div>
      <div v-else-if="error" class="error">
        <div class="error-icon">❌</div>
        <h2>Oops! Something went wrong.</h2>
        <p>{{ error }}</p>
      </div>
      <div v-else-if="items.length > 0" class="recipe-list">
        <RecipePreview
          v-for="recipe in items"
          :key="recipe.id"
          :recipe="recipe"
          class="recipe-item"
        />
      </div>
      <div v-else class="no-generic">
        <div class="empty-icon">📖</div>
        <h2>{{ newPageMessage.header }}</h2>
        <p>
          {{ newPageMessage.body }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "@/components/RecipePreview.vue";

export default {
  name: "GenericPage",
  components: {
    RecipePreview,
  },
  props: {
    pageName: {
      type: String,
      required: true,
    },
    fetchData: {
      type: Function,
      required: true,
    },
    newPageMessage: {
      type: {
        header: String,
        body: String,
      },
      default: {
        header: "Your Taste Gallery Awaits!",
        body:
          "Every masterpiece starts with a blank canvas. Begin your culinary journey and fill this space with your favorite flavors. 🎨👨‍🍳",
      },
    },
    background: {
      type: String,
      default: null,
    },
  },

  computed: {
    backgroundStyle() {
      return this.background
        ? { backgroundImage: `url(${this.background})` }
        : `linear-gradient(to top, #dfe9f3 0%, white 100%)`;
    },
  },
  data() {
    return {
      items: [],
      placeholderColors: [
        "#FFD700",
        "#FF6B6B",
        "#4ECDC4",
        "#FF9F1C",
        "#2EC4B6",
        "#E71D36",
      ],
      isLoading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await this.fetchData();
        const recipes = response.response.data.recipes;
        this.items = recipes.map((recipe) => ({
          ...recipe,
          image: recipe.image || this.getPlaceholderImage(recipe.title),
        }));
      } catch (error) {
        console.error(error);
        this.error = "Failed to fetch recipes. Please try again later.";
      } finally {
        this.isLoading = false;
      }
    },
    exploreRecipes() {
      this.$router.push("/explore");
    },
    getPlaceholderImage(title) {
      const color = this.getColorFromString(title);
      return `https://via.placeholder.com/300x200/${color.slice(
        1
      )}/ffffff?text=${encodeURIComponent(title)}`;
    },
    getColorFromString(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      const index = Math.abs(hash) % this.placeholderColors.length;
      return this.placeholderColors[index];
    },
    onImageError(recipe) {
      recipe.image = this.getPlaceholderImage(recipe.title);
    },
  },
  filters: {
    truncate(text, length, clamp = "...") {
      return text && text.length > length
        ? text.slice(0, length) + clamp
        : text || "No description available";
    },
  },
};
</script>

<style scoped src="@/styles/GenericPage.css"></style>
