<!-- RecipeDetails.vue -->
<template>
  <div class="recipe-details">
    <h2>{{ recipe.title }}</h2>
    <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />
    <p>
      <span class="ready-in">Ready in:</span>
      {{ recipe.readyInMinutes }} minutes
    </p>
    <p><span class="likes">Likes:</span> {{ recipe.aggregateLikes }}</p>
    <h3>Instructions:</h3>
    <ol>
      <li v-for="(s, index) in recipe._instructions" :key="s.number">
        {{ s.step }} <br />
        {{ console.log(`Step ${index + 1}: ${s.step}`) }}
      </li>
    </ol>
  </div>
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
.recipe-details {
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.recipe-image {
  display: block;
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
}

.ready-in,
.likes {
  font-weight: bold;
  color: #ff6b6b;
}

h3 {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

ol {
  list-style-type: decimal;
  padding-left: 20px;
  margin-bottom: 20px;
}

li {
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
  line-height: 1.5;
}
</style>
