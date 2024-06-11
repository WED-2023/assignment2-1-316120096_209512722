<template>
  <div class="title-container">
    <h1 :class="{ animated: mainTitleAnimated }" class="main-title">
      Your Main Title
    </h1>
    <p :class="{ animated: subtitleAnimated }" class="subtitle">
      Your Subtitle or Additional Information
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainTitleAnimated: false,
      subtitleAnimated: false,
    };
  },
  mounted() {
    this.animateTitle();
  },
  methods: {
    animateTitle() {
      setTimeout(() => {
        this.mainTitleAnimated = true;
      }, 100);

      setTimeout(() => {
        this.subtitleAnimated = true;
      }, 300);
    },
  },
};
</script>

<style scoped>
.title-container {
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8); /* Transparent white background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
}

.main-title {
  font-size: 2.5em;
  color: #333333; /* Dark neutral color */
  margin: 0;
  opacity: 0;
  transform: translateY(-50px);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.subtitle {
  font-size: 1.2em;
  color: #228b22; /* Green color */
  margin: 10px 0 0;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.animated {
  opacity: 1;
  transform: translateY(0);
}
</style>
