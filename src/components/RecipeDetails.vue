<!-- RecipeDetails.vue -->
<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-preview"
  >
    <div class="recipe-body">
      <img v-if="image_load" :src="recipe.image" class="recipe-image" />
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }} likes</li>
      </ul>
    </div>
  </router-link>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then(() => {
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
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    readyInMinutes: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    _instructions: {
      type: String,
      required: true,
    },
    aggregateLikes: {
      type: Number,
      required: false,
      default() {
        return undefined;
      },
    },
  },
};
</script>

<style scoped>
.recipe-preview {
  display: block;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.recipe-preview:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.recipe-body {
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background-color: #f0f0f0;
}

.recipe-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity 0.3s;
  border-bottom: 2px solid #ff6b6b;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  font-size: 18px;
  background-color: #f0f0f0;
}

.recipe-footer {
  padding: 20px;
  text-align: center;
}

.recipe-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recipe-overview {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
  font-size: 16px;
  color: #777;
}

.recipe-overview li {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.recipe-overview li::before {
  content: "•";
  margin-right: 5px;
  color: #ff6b6b;
}

.recipe-overview li:first-child::before {
  display: none;
}
</style>
