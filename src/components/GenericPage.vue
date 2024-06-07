<template>
  <div class="generic-page">
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Open+Sans:wght@400;600&display=swap");

:root {
  --color-primary: #2c3e50;
  --color-accent: #3498db;
  --color-text-primary: #333;
  --color-text-secondary: #666;
  --font-family-serif: "Playfair Display", serif;
  --font-family-sans: "Open Sans", sans-serif;
}

.generic-page {
  max-width: 85%;
  margin: 0 auto;
  padding: 40px 20px;
  background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
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

.recipes-grid {
  display: flex;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 30px;
  justify-content: center;
  justify-items: center;
  align-items: center;
}

.recipe-list {
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 30px;
}

.recipe-item {
  width: 300px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.recipe-item:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
}

.recipe-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.recipe-item:hover .recipe-image {
  transform: scale(1.1);
}

.image-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  font-family: var(--font-family-serif);
  font-size: 1.4rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}
.recipe-item:hover .image-title {
  transform: translateY(0);
}
.recipe-info {
  padding: 20px;
}
.recipe-info p {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 15px;
}
.recipes-container {
  display: flex;
  justify-content: center;
}
.recipe-meta {
  display: flex;
  justify-content: space-between;
  color: var(--color-text-secondary);
  font-size: 0.8rem;
}
.recipe-meta span {
  display: flex;
  align-items: center;
}
.recipe-meta i {
  margin-right: 5px;
  font-size: 1rem;
}
.no-generic {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 40px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
}
.no-generic h2 {
  font-family: var(--font-family-serif);
  font-size: 2.2rem;
  color: var(--color-primary);
  margin-bottom: 20px;
}
.no-generic p {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 30px;
}
.explore-btn {
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
}
.explore-btn:hover {
  background-color: #2980b9;
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.6);
}
.loading,
.error {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 40px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
}
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid var(--color-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}
.error-icon {
  font-size: 3rem;
  color: #e74c3c;
  margin-bottom: 20px;
}
.retry-btn {
  font-family: var(--font-family-sans);
  font-size: 1rem;
  font-weight: 600;
  padding: 10px 20px;
  background-color: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
}
.retry-btn:hover {
  background-color: #2980b9;
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.6);
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* Icons */
[class^="icon-"]:before {
  font-family: "recipe-icons";
  font-style: normal;
  font-weight: normal;
}
.icon-heart:before {
  content: "\e800";
}
.icon-clock:before {
  content: "🕒";
}
.icon-difficulty:before {
  content: "\e802";
}
@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
  .recipes-grid {
    grid-template-columns: repeat(1, 1fr);
    gap: 25px;
  }
  .recipe-list {
    grid-template-columns: repeat(1, 1fr);
    gap: 25px;
  }
  .recipe-item {
    width: 100%;
  }
}
</style>