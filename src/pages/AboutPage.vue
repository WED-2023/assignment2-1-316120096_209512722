<template>
  <div class="about-container">
    <div class="content">
      <h1>About Us</h1>

      <!-- Section: Our Journey -->
      <div
        class="section-container"
        v-for="section in sections"
        :key="section.title"
      >
        <h2>{{ section.title }}</h2>
        <p>{{ section.content }}</p>
        <!-- Add LinkedIn button for the Contact Us section -->
        <div v-if="section.title === 'Contact Us'" class="button-container">
          <button @click="redirectToLinkedIn" class="linkedin-button">
            Connect with us on LinkedIn
          </button>
        </div>
      </div>

      <!-- Section: Contact Us -->
    </div>

    <div class="image-gallery">
      <img
        src="@/assets/images/download.jpg"
        alt="Helping an old man"
        class="side-image"
      />
      <img
        src="@/assets/images/1_7.jpg"
        alt="Helping an old man"
        class="side-image"
      />
      <img
        src="@/assets/images/incredible-woman-assisting-elderly-lady-260nw-683238484.webp"
        alt="Assisting elderly"
        class="side-image"
      />
      <img
        src="@/assets/images/istockphoto-500674888-612x612.jpg"
        alt="Assisting elderly"
        class="side-image"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      sections: [
        {
          title: "Our Journey",
          content: `Our collaboration started with a shared interest in technology and coding. 
          Over time, we found a common passion for creating digital solutions that make a difference. 
          This journey led us to develop a project that combines our love for food and technology:
           a recipe site that celebrates family traditions and culinary heritage.`,
        },
        {
          title: "Professional Background",
          content: `We are both third-year students majoring in Software and Information
            systems Engineering. Our academic journey has been marked by
            excellence and ambition, consistently ranking as the top students in
            our class. This drive for knowledge and growth has not only honed our
            technical skills but also prepared us to tackle complex challenges in
            the tech world.`,
        },
        {
          title: "Fullstack Engineers",
          content: `Through rigorous coursework and hands-on projects, we have expanded
            our expertise to become proficient fullstack engineers. Our skills
            span across front-end and back-end development, enabling us to build
            comprehensive and robust applications. We take pride in our ability to
            turn ideas into functional and user-friendly solutions.`,
        },
        {
          title: "Our Passion Projects",
          content: `Outside of our academic achievements, 
          we are always exploring new technologies and working on various side projects.
           This recipe site is one of our favorite projects, as it not only showcases our 
           technical skills but also our creativity and love for food. We have designed it to
            make it easy for users 
          to share and discover recipes that have been passed down through generations.`,
        },
        {
          title: "Vision and Goals",
          content: `We envision a future where technology enhances everyday life by 
          preserving and sharing valuable traditions like family recipes.
           Our goal is to leverage our skills to create solutions that bring people together and make daily tasks more enjoyable. We are driven by a desire to continue learning, growing, and contributing to the tech community`,
        },
        {
          title: "Contact Us ",

          content: `We envision a future where technology seamlessly integrates into daily
            life, enhancing productivity and bringing people together. Our goal is
            to leverage our skills to create impactful solutions that address
            real-world problems. We are driven by a desire to learn, grow, and
            contribute to the tech community.`,
        },
      ],
    };
  },
  methods: {
    redirectToLinkedIn() {
      window.open("https://www.linkedin.com/in/omer-laufer/", "_blank");
    },
  },
};
</script>

<style scoped>
.about-container {
  display: flex;
  color: #333333;
  font-family: "Arial", sans-serif;
  padding: 50px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 50px auto;
  transition: background 0.5s ease-in-out;
}

.content {
  background: rgba(255, 255, 255, 0.7);
  padding: 30px;
  border-radius: 10px;
  flex: 1;
  animation: fadeIn 1s ease-in-out;
  z-index: 2; /* Ensure it is above other elements */
}

.image-gallery {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 20px;
  animation: fadeIn 1s ease-in-out;
}

.side-image {
  width: 150px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}

.side-image:hover {
  transform: scale(1.05);
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  text-align: center;
  color: #ff6f00;
  animation: fadeInDown 1s ease-in-out;
}

h2 {
  font-size: 1.8em;
  margin-top: 30px;
  margin-bottom: 10px;
  color: #ff6f00;
}

p {
  font-size: 1.1em;
  line-height: 1.8;
  margin-bottom: 20px;
}

p:last-child {
  margin-bottom: 0;
}

.section-container {
  background: rgba(255, 255, 255, 0.6);
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, background 0.5s ease-in-out;
}

.section-container:hover {
  transform: scale(1.02);
  background: rgba(255, 255, 255, 0.9);
}

.button-container {
  margin-top: 20px;
}

.linkedin-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #0077b5;
  color: #ffffff;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1em;
  margin-top: 10px;
  transition: background-color 0.3s ease-in-out;
  z-index: 3; /* Ensure the button is above other elements */
  position: relative; /* Ensure it can be above other elements */
}

.linkedin-button:hover {
  background-color: #005582;
}
</style>
