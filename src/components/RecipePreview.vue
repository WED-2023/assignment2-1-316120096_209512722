<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-item"
  >
    <div class="recipe-image-container">
      <span v-if="isWatched && $root.store.username" class="watched-indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="#000000"
          version="1.1"
          id="Capa_1"
          width="800px"
          height="800px"
          viewBox="0 0 442.04 442.04"
          xml:space="preserve"
        >
          <g>
            <g>
              <path
                d="M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203    c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219    c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367    c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021    c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212    c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071    c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z"
              />
            </g>
            <g>
              <path
                d="M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188    c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993    c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5    s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z"
              />
            </g>
            <g>
              <path
                d="M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z"
              />
            </g>
          </g>
        </svg>
      </span>
      <span
        v-if="!isFavorite && $root.store.username"
        class="favorite-indicator"
        @click.prevent="addFavoriteRecipe(recipe.id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xml:space="preserve"
          version="1.1"
          style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;"
          viewBox="0 0 408.16 452.4125"
          x="0px"
          y="0px"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <g>
            <path
              class="fil0"
              d="M204.08 361.93c-55.09,-70.07 -151.31,-110.99 -188.55,-182.34 -63.71,-122.25 82.3,-245.9 188.55,-138.62 106.24,-107.29 252.24,16.37 188.54,138.62 -37.24,71.35 -133.46,112.27 -188.54,182.34zm0 -28.37c53.68,-56.64 140.9,-102.87 172.03,-162.58 54.17,-103.88 -67.86,-208.73 -158.8,-116.91l-13.23 13.36 -13.23 -13.36c-90.94,-91.83 -212.97,13.03 -158.81,116.91 31.13,59.71 118.35,105.94 172.04,162.58z"
            />
          </g>
        </svg>
      </span>
      <span v-else-if="$root.store.username" class="favorite-indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          />
        </svg>
      </span>
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

        <span v-if="recipe.vegan"
          ><svg
            xmlns:x="http://ns.adobe.com/Extensibility/1.0/"
            xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/"
            xmlns:graph="http://ns.adobe.com/Graphs/1.0/"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 100 125"
            style="enable-background:new 0 0 100 100;"
            xml:space="preserve"
          >
            <switch>
              <foreignObject
                requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/"
                x="0"
                y="0"
                width="1"
                height="1"
              />
              <g i:extraneous="self">
                <path
                  d="M84.4,4.3c-0.7-2.2-3.7-2.5-4.9-0.5C70.2,20.8,49.9,26,52.5,40.4c0.6,3.1,2.4,5.7,5,7.7c4.5-8,10-13.3,13.4-16.2    L45.6,84.2L18.2,27.7c-1-2-3.4-2.8-5.4-1.9c-2,1-2.8,3.4-1.9,5.4l31,64c0.7,1.4,2.1,2.3,3.6,2.3s3-0.9,3.6-2.3l20.7-42.6    c6,0.5,12.1-1.1,15.7-5.3C92.8,38.7,88.6,16.7,84.4,4.3z"
                />
              </g>
            </switch>
          </svg>
        </span>
        <span v-if="recipe.vegetarian">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 100 125"
            style="enable-background:new 0 0 100 100;"
            xml:space="preserve"
          >
            <path
              d="M50,7.2c-9.7,0-18.6,3.2-25.8,8.5c-0.2,0.1-0.3,0.1-0.4,0.2c-0.1,0.1-0.2,0.2-0.2,0.3c-10.4,8-17.1,20.5-17.1,34.6  c0,24.1,19.5,43.6,43.6,43.6s43.6-19.5,43.6-43.6S74,7.2,50,7.2z M9.4,50.8c0-12.7,5.9-24.1,15.1-31.5l12.7,15.2  c-0.6,0.1-1.2,0.1-1.8,0.2c-1.4,0.1-2.7,0.3-4,0.7C21,38.2,13.9,49.5,15.9,60c0.8,4.5,3,8.5,6.2,11.6l8.3,8.9  c1.3,1.4,2.8,2.3,4.6,2.7c1.7,0.4,3.5,0.6,5.3,0.6c1.7,0,3.4-0.2,5.1-0.6c4.5-1.1,8.4-3.5,11.4-7l8.2-8.8l11.7,14  c-7.1,6.2-16.4,9.9-26.5,9.9C27.6,91.4,9.4,73.2,9.4,50.8z M77.6,33.6c1.8,5.1,0,10.8-4.5,13.8v0c-4.8,3.2-8.3,6.2-11.2,9.3  l-1.2,1.3l-18-21.5c2-0.5,3.9-1.2,5.8-2l2.5-1.1c2.7-1.1,5.3-2.7,8.2-5c1.7-1.4,3.8-2.2,6.1-2.5c0.4,0,0.8-0.1,1.2-0.1  C71.4,25.8,76,28.9,77.6,33.6C77.6,33.6,77.6,33.6,77.6,33.6L77.6,33.6L77.6,33.6z M80.9,42.7c0.4,1.1,0.5,2.2,0.3,3.3  c-0.6,3.1-2.5,6-5.1,7.7c-4.4,2.9-7.8,5.6-10.5,8.6L64.9,63l-2.3-2.7l1.4-1.6c2.7-2.9,6.1-5.8,10.7-8.8c2.9-1.9,4.9-4.8,5.8-7.9  L80.9,42.7z M62.9,65.2l-8.5,9.2c-2.6,3-6,5.1-9.8,6.1c-2.9,0.7-6,0.7-8.9,0c-1.2-0.3-2.3-1-3.1-1.9L31,76.8c2,0.6,4,0.9,6,0.9  c1.7,0,3.4-0.2,5.1-0.6c4.5-1.1,8.4-3.5,11.4-7l7.1-7.6L62.9,65.2z M58.7,60.2l-7.4,8c-2.6,3-6,5.1-9.8,6.1  c-5,1.2-10.1,0.3-14.5-2.5c-1-0.7-2-1.4-2.8-2.2l-1.5-1.6l0,0c-2-2.4-3.3-5.3-3.9-8.4c-1.7-8.9,4.6-18.9,13.3-21.3  c1.1-0.3,2.3-0.5,3.5-0.6c1.3-0.1,2.5-0.3,3.8-0.5L58.7,60.2z M78.7,79.4L66.9,65.3l0.9-1c2.6-2.8,5.8-5.4,10-8.1  c3.4-2.2,5.7-5.7,6.4-9.7c0.3-1.6,0.1-3.3-0.4-4.9l-3.3-9.1l0,0c-2.3-6.3-8.8-10.4-15.4-9.6c-2.8,0.3-5.4,1.4-7.6,3.1  c-2.7,2.1-5.1,3.6-7.5,4.6l-2.5,1.1c-2.2,0.9-4.4,1.6-6.8,2.1L26.9,17.5c6.6-4.6,14.5-7.2,23.1-7.2c22.4,0,40.6,18.2,40.6,40.6  C90.6,62,86,72.1,78.7,79.4z"
            />
            <path
              d="M34,51.6c-1.9,0.5-3.5,1.6-4.5,3.3c-1,1.6-1.3,3.6-0.9,5.5c0.5,1.9,1.6,3.5,3.3,4.5c1.1,0.7,2.4,1.1,3.8,1.1  c0.6,0,1.1-0.1,1.7-0.2c1.9-0.5,3.5-1.6,4.5-3.3c1-1.6,1.3-3.6,0.9-5.5c-0.5-1.9-1.6-3.5-3.3-4.5C37.8,51.4,35.9,51.1,34,51.6z   M37.9,55c1,0.6,1.6,1.5,1.9,2.6c0.3,1.1,0.1,2.2-0.5,3.2c-0.6,1-1.5,1.6-2.6,1.9s-2.2,0.1-3.2-0.5c-1-0.6-1.6-1.5-1.9-2.6  c-0.3-1.1-0.1-2.2,0.5-3.2c0.6-1,1.5-1.6,2.6-1.9c0.3-0.1,0.7-0.1,1-0.1C36.5,54.4,37.2,54.6,37.9,55z"
            />
            <path
              d="M26.1,44.5c-6.2,5.5-5.4,12-5.4,12.3c0.1,0.6,0.6,1.1,1.2,1.1c0.1,0,0.1,0,0.2,0c0.7-0.1,1.2-0.7,1.1-1.4  c0-0.2-0.7-5.4,4.5-10c0.5-0.5,0.6-1.2,0.1-1.8C27.4,44.1,26.6,44,26.1,44.5z"
            />
            <circle cx="31.2" cy="42.4" r="1.5" />
          </svg>
        </span>
        <span v-if="recipe.glutenFree">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 90 112.5"
            enable-background="new 0 0 90 90"
            xml:space="preserve"
          >
            <path
              d="M53.28,58.418c0.957,0.027,1.9,0.188,2.755,0.423c-0.901,2.968-2.885,5.239-4.385,6.036  c-1.645,0.869-3.833,0.921-5.505-0.312c-0.077-2.235,0.937-3.959,2.5-4.975C50.024,58.689,51.676,58.377,53.28,58.418z   M36.723,58.418c1.599-0.041,3.255,0.271,4.635,1.172c1.563,1.016,2.579,2.74,2.495,4.975c-1.667,1.233-3.853,1.181-5.5,0.312  c-1.5-0.797-3.489-3.068-4.385-6.036C34.821,58.606,35.759,58.445,36.723,58.418z M36.743,56.221  c-1.375,0.016-2.864,0.229-4.443,0.667c-0.604,0.167-0.957,0.776-0.801,1.375c1.109,4.281,3.224,7.208,5.853,8.599  c2.052,1.089,4.391,1.125,6.511,0.209v7.224c0,1.515,2.271,1.515,2.271,0V67.07c2.12,0.916,4.464,0.88,6.516-0.209  c2.625-1.391,4.745-4.317,5.855-8.599c0.156-0.599-0.199-1.208-0.803-1.375c-2.104-0.584-4.047-0.771-5.781-0.609  c-1.735,0.156-3.255,0.656-4.505,1.468c-1.02,0.661-1.828,1.537-2.411,2.543c-0.589-1.005-1.396-1.881-2.417-2.543  c-1.249-0.812-2.771-1.312-4.505-1.468C37.649,56.237,37.201,56.221,36.743,56.221z"
            />
            <path
              d="M53.28,45.617c0.957,0.025,1.9,0.181,2.755,0.421c-0.901,2.964-2.885,5.24-4.385,6.036  c-1.645,0.871-3.833,0.917-5.505-0.317c-0.077-2.235,0.937-3.953,2.5-4.973C50.024,45.888,51.676,45.57,53.28,45.617z   M36.723,45.617c1.599-0.047,3.255,0.271,4.635,1.167c1.563,1.02,2.579,2.739,2.495,4.973c-1.667,1.235-3.853,1.188-5.5,0.317  c-1.5-0.796-3.489-3.072-4.385-6.036C34.821,45.798,35.759,45.642,36.723,45.617z M36.743,43.418  c-1.375,0.011-2.864,0.229-4.443,0.667c-0.604,0.161-0.957,0.776-0.801,1.371c1.109,4.281,3.224,7.213,5.853,8.604  c2.428,1.287,5.261,1.115,7.652-0.385c2.385,1.5,5.219,1.672,7.645,0.385c2.625-1.391,4.745-4.323,5.855-8.604  c0.156-0.595-0.199-1.209-0.803-1.371c-2.104-0.583-4.047-0.771-5.781-0.615c-1.735,0.157-3.255,0.661-4.505,1.469  c-1.02,0.661-1.828,1.536-2.411,2.547c-0.589-1.011-1.396-1.885-2.417-2.547c-1.249-0.808-2.771-1.312-4.505-1.469  C37.649,43.429,37.201,43.413,36.743,43.418z"
            />
            <path
              d="M53.28,33.298c0.957,0.032,1.9,0.188,2.755,0.423c-0.901,2.968-2.885,5.24-4.385,6.036  c-1.645,0.871-3.833,0.923-5.505-0.312c-0.077-2.235,0.937-3.959,2.5-4.975C50.024,33.57,51.676,33.257,53.28,33.298z   M36.723,33.298c1.599-0.041,3.255,0.272,4.635,1.172c1.563,1.016,2.579,2.74,2.495,4.975c-1.667,1.235-3.853,1.183-5.5,0.312  c-1.5-0.796-3.489-3.068-4.385-6.036C34.821,33.486,35.759,33.33,36.723,33.298z M36.743,31.101  c-1.375,0.016-2.864,0.229-4.443,0.667c-0.604,0.167-0.957,0.776-0.801,1.375c1.109,4.281,3.224,7.208,5.853,8.599  c2.428,1.292,5.261,1.12,7.652-0.38c2.385,1.5,5.219,1.672,7.645,0.38c2.625-1.391,4.745-4.317,5.855-8.599  c0.156-0.599-0.199-1.208-0.803-1.375c-2.104-0.584-4.047-0.771-5.781-0.609c-1.735,0.156-3.255,0.656-4.505,1.469  c-1.02,0.661-1.828,1.536-2.411,2.541c-0.589-1.005-1.396-1.88-2.417-2.541c-1.249-0.813-2.771-1.313-4.505-1.469  C37.649,31.117,37.201,31.101,36.743,31.101z"
            />
            <path
              d="M44.993,17.407c2.125,2.453,3.172,4.855,3.093,6.808c-0.083,1.989-1.219,3.579-3.073,4.583  c-1.859-1.004-3.009-2.609-3.099-4.599C41.832,22.246,42.879,19.855,44.993,17.407z M44.972,14.57  c-0.292,0.004-0.572,0.129-0.776,0.333c-3.115,3.104-4.563,6.411-4.427,9.391c0.131,2.979,1.932,5.531,4.781,6.791  c0.292,0.125,0.625,0.125,0.916,0c2.849-1.26,4.641-3.807,4.767-6.787c0.124-2.973-1.324-6.285-4.444-9.395  C45.571,14.689,45.275,14.565,44.972,14.57z"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M45.004,6.065c10.348,0,19.739,4.036,26.708,10.615L59.556,28.841  c-0.453,0.443-0.459,1.167-0.016,1.615c0.448,0.448,1.172,0.443,1.615-0.005l12.161-12.161c6.579,6.968,10.615,16.364,10.615,26.708  c0,21.516-17.417,38.937-38.927,38.937c-10.349,0-19.745-4.041-26.715-10.62l11.324-11.323c0.744-0.719,0.213-1.984-0.828-1.948  c-0.297,0.011-0.579,0.136-0.781,0.349L16.685,71.705C10.108,64.737,6.071,55.346,6.071,44.997  C6.071,23.486,23.488,6.065,45.004,6.065z M45.004,3.798c-22.74,0-41.199,18.459-41.199,41.199s18.459,41.197,41.199,41.197  c22.739,0,41.192-18.457,41.192-41.197S67.743,3.798,45.004,3.798z"
            />
          </svg>
        </span>
      </div>
    </div>
  </router-link>
</template>

<script>
import {
  mockGetWatchedRecipes,
  mockAddWatchedRecipe,
  mockGetFavorites,
  mockAddFavorite,
} from "@/services/user";

export default {
  mounted() {
    if (this.recipe.image) {
      this.axios
        .get(this.recipe.image)
        .then(() => {
          this.image_load = true;
        })
        .catch((error) => {
          console.error("Error loading image:", error);
        });
    }
    this.fetchData();
  },
  data() {
    return {
      userName: "",
      image_load: true,
      watchedRecipes: [],
      favoriteRecipes: [],
    };
  },
  props: {
    userName: {
      type: String,
      required: true,
    },
    recipe: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isWatched() {
      return this.watchedRecipes.some((r) => r === this.recipe.id);
    },
    isFavorite() {
      return this.favoriteRecipes.some((r) => r === this.recipe.id);
    },
  },

  updated: {
    alerting() {
      alert(this.store.username);
    },
  },
  methods: {
    async fetchData() {
      // Make fetchData method asynchronous
      try {
        await this.fetchWatchedRecipes(); // Await completion of fetchWatchedRecipes
        await this.fetchFavoriteRecipes(); // Await completion of fetchFavoriteRecipes
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async fetchWatchedRecipes() {
      // Make fetchWatchedRecipes asynchronous
      try {
        const { response } = await mockGetWatchedRecipes(this.userName || "");
        this.watchedRecipes = response.data.recipes.map((r) => r.id);
      } catch (error) {
        console.error("Error fetching watched recipes:", error);
      }
    },
    async fetchFavoriteRecipes() {
      // Make fetchFavoriteRecipes asynchronous
      try {
        const { response } = await mockGetFavorites(this.userName || "");
        this.favoriteRecipes = response.data.recipes.map((r) => r.id);
      } catch (error) {
        console.log("error");
        console.error("Error fetching favorite recipes:", error);
      }
    },
    addWatchedRecipe(recipeId) {
      mockAddWatchedRecipe($root.store.username, recipeId);
      this.fetchWatchedRecipes();
    },
    addFavoriteRecipe: async function(recipeId) {
      console.log("userName", this.$root.store.username);
      alert(
        `addFavoriteRecipe for user ${this.$root.store.username} and recipeId ${recipeId}`
      );
      if (recipeId && this.favoriteRecipes.includes(recipeId)) {
        return;
      }
      await mockAddFavorite(this.$store.username, recipeId);
      await this.fetchFavoriteRecipes();
    },
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
.recipe-meta svg {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.watched-indicator,
.favorite-indicator {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  color: var(--color-primary);
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 1;
}

.watched-indicator svg,
.favorite-indicator svg {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  fill: currentColor;
}

.watched-indicator {
  left: auto;
  right: 10px;
}
</style>
