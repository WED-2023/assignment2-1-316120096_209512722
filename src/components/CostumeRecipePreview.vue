<template>
    <div>
      <router-link
        :to="{ name: 'recipe', params: { recipeId: recipe.id , fetchData: false , recipe:recipe} }"
        class="recipe-item"
      >
        <div class="recipe-image-container">
          <!-- Favorite Indicator -->
          <span
            v-if="$root.store.username"
            class="favorite-indicator"
            @click.stop.prevent="toggleFavorite(recipe.id)"
          >
            <!-- SVG Icon for Favorite (Filled Heart) -->
            <svg
              v-if="isFavorite"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="favorite-icon"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 
                3.5 4 6 4c1.54 0 3.04.99 3.54 2.44h1.92C14.96 
                4.99 16.46 4 18 4c2.5 0 4 2 4 4.5 0 3.78-3.4 
                6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            <!-- SVG Icon for Not Favorite (Outlined Heart) -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="favorite-icon"
            >
              <path
                d="M16.5,3C14.36,3,12.45,4.1,11.5,5.6C10.55,4.1,8.64,3,
                6.5,3C3.42,3,1,5.42,1,8.5C1,12.28,4.4,15.36,9.55,
                20.04L11,21.35L12.45,20.03C17.6,15.36,21,12.28,21,
                8.5C21,5.42,18.58,3,15.5,3H16.5z"
              />
            </svg>
          </span>
          <!-- Recipe Image -->
          <img
            v-if="image_load"
            :src="recipe.image"
            :alt="recipe.title"
            class="recipe-image"
            @error="onImageError"
          />
          <h3 class="image-title">{{ recipe.title }}</h3>
        </div>
        <div class="recipe-info" v-if="!currentUrl.includes('search')">
          <p>{{ recipe.summary | truncate(60) }}</p>
          <div class="recipe-meta">
            <span>
              🕒 {{ recipe.readyInMinutes || "N/A" }} min
            </span>
            <span>
              🩵 {{ recipe.aggregateLikes || "N/A" }} likes
            </span>
  
            <span v-if="recipe.vegan">
              <!-- Vegan Icon -->
              🌱 Vegan
            </span>
            <span v-if="recipe.vegetarian">
              <!-- Vegetarian Icon -->
              🥕 Vegetarian
            </span>
            <span v-if="recipe.glutenFree">
              <!-- Gluten-Free Icon -->
              🌾 Gluten-Free
            </span>
          </div>
        </div>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name:"CostumeRecipePreview",
    props: {
      recipe: {
        type: Object,
        required: true,
      },
      isFavorite: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        image_load: true,
        currentUrl: this.$route.fullPath,
      };
    },
    methods: {
      toggleFavorite(recipeId) {
        // Emit an event to the parent component to handle favorite logic
        this.$emit('toggle-favorite', recipeId);
      },
      onImageError() {
        this.image_load = false;
      },
    },
    filters: {
      truncate(text, length, clamp = '...') {
        return text && text.length > length
          ? text.slice(0, length) + clamp
          : text || 'No description available';
      },
    },
  };
  </script>
  
  <style scoped>
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
  
  .favorite-indicator {
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
  }
  
  .favorite-icon {
    width: 24px;
    height: 24px;
    fill: #ff0000; /* Red color for favorite */
  }
  
  @media (max-width: 768px) {
    .recipe-item {
      width: 100%;
    }
  }
  </style>