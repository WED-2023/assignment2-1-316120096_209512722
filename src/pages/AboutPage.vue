<template>
  <div class="about-container">
    <div class="content">
      <h1>About Us</h1>

      <div class="section-container contact-container">
        <h2>Our Team</h2>
        <div
          v-for="member in teamMembers"
          :key="member.name"
          class="team-member"
        >
          <img :src="member.image" :alt="member.name" class="member-photo" />
          <div class="team-info">
            <h3>{{ member.name }}</h3>
            <p>{{ member.occupation }}</p>
            <p>{{ member.bio }}</p>
          </div>
          <div class="linkedin-buttons">
            <button class="linkedin-button" @click="redirectToLinkedIn(member)">
              <img
                src="@/assets/mocks/linkedin-svgrepo-com.svg"
                alt="LinkedIn Logo"
                class="logo-svg"
              />
              <span>Connect </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Section: Our Journey -->
      <div
        class="section-container"
        v-for="section in sections"
        :key="section.title"
      >
        <h2>{{ section.title }}</h2>
        <p>{{ section.content }}</p>
        <!-- Add LinkedIn button for the Contact Us section -->
      </div>

      <!-- Section: Contact Us -->
    </div>

    <div class="image-gallery"></div>
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
      ],
      teamMembers: [
        {
          name: "Omer Laufer",
          image: require("@/assets/images/OmerLauferPic.png"),
          occupation: "Software Engineer",
          bio:
            "I'm a Third-year student studying software and information systems engineering with Python, Java, C, C++, and C# skills. I'm passionate about leveraging my abilities to have a positive influence, which is why I volunteer as a System Implementer with Code For Israel. I'm committed to producing outstanding results and i eager to seek chances in software development,",
          linkedin: "https://www.linkedin.com/in/omer-laufer/",
        },
        {
          name: "Omer Adam",
          image: require("@/assets/images/OmerAdamPic.png"),
          occupation: "Software Engineer",
          bio:
            "I'm a 3rd Year Software and Information Systems Engineering Student at Ben Gurion University and also a Software Engineer at Global Remit. As a high-energy, autodidact, and collaborative team player who loves challenges and learning new fields, I'm constantly seeking opportunities to expand my knowledge and skills. In addition to my studies and work, I'm also passionate about exploring new technologies and working on side projects that showcase my technical abilities and creativity.",
          linkedin: "https://www.linkedin.com/in/omer-adam-735ba1258/",
        },
      ],
    };
  },
  methods: {
    redirectToLinkedIn(member) {
      window.open(member.linkedin, "_blank");
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

.logo-svg {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 10px;
}

.team-member {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
.team-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.member-info {
  display: flex;
}

.member-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
}

.team-info {
  flex: 1;
}

.linkedin-button {
  background-color: #0077b5;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.linkedin-button:hover {
  background-color: #005582;
  transform: scale(1.05);
}

.linkedin-button img {
  margin-right: 10px;
}
:root {
  --primary-color: #ff6f00;
  --secondary-color: #333333;
  --content-padding: 30px;
  --section-margin-bottom: 20px;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
