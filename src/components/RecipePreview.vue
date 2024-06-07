<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-item"
  >
    <div class="recipe-image-container">
      <img
        v-if="image_load"
        :src="recipe.image"
        :alt="recipe.title"
        class="recipe-image"
        @error="onImageError"
      />
      <h3 class="image-title">{{ recipe.title }}</h3>
    </div>
    <div class="recipe-info">
      <p>{{ recipe.summary | truncate(60) }}</p>
      <div class="recipe-meta">
        <span>
          <i class="icon-clock"></i>
          {{ recipe.readyInMinutes || "N/A" }} min 🕒
        </span>
        <span>
          <i class="icon-likes"></i>
          {{ recipe.aggregateLikes || "N/A" }} likes 🩵
        </span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: true,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onImageError() {
      this.image_load = false;
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

.recipe-meta i {
  margin-right: 5px;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .recipe-item {
    width: 100%;
  }
}
</style>
