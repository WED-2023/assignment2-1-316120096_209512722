<template>
  <div class="container">
    <img
      src="@/assets/images/logo-red.png"
      alt="logo"
      class="food-image mainTitleAnimated"
    />
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
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  padding: 4px;
  background-color: #ffffff7a;
}

.food-image {
  max-width: 100%;
  width: 450px;
  filter: drop-shadow(0 0 10px #ffffff);
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
}

.food-image:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 15px #ffffff);
}

.animated {
  animation: fadeIn 1s ease forwards;
}

@media (max-width: 768px) {
  .food-image {
    width: 200px;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
