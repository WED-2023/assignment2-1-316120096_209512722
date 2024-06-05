<template>
  <div class="about-container">
    <div class="content">
      <h1>About Us</h1>
      <p>
        Welcome to our recipe app! We are Omer and Omer, two passionate and
        dedicated individuals who share a love for Fortnite, badminton, and
        technology. Here's a little more about us:
      </p>

      <h2>Our Journey</h2>
      <p>
        Our friendship and collaboration started on the badminton court and in
        the virtual world of Fortnite. These shared interests laid the
        foundation for our teamwork and synergy. Over time, our passion for
        technology and coding grew, leading us to pursue careers in software
        engineering.
      </p>

      <h2>Professional Background</h2>
      <p>
        We are both third-year students majoring in Software and Information
        systems Engineering. Our academic journey has been marked by excellence
        and ambition, consistently ranking as the top students in our class.
        This drive for knowledge and growth has not only honed our technical
        skills but also prepared us to tackle complex challenges in the tech
        world.
      </p>

      <h2>Fullstack Engineers</h2>
      <p>
        Through rigorous coursework and hands-on projects, we have expanded our
        expertise to become proficient fullstack engineers. Our skills span
        across front-end and back-end development, enabling us to build
        comprehensive and robust applications. We take pride in our ability to
        turn ideas into functional and user-friendly solutions.
      </p>

      <h2>Our Passion Projects</h2>
      <p>
        Beyond our academic achievements, we are continuously working on various
        side projects. These include developing innovative web applications,
        contributing to open-source projects, and exploring new technologies.
        Our recipe app is a testament to our creativity and commitment to making
        everyday tasks more enjoyable and efficient.
      </p>

      <h2>Vision and Goals</h2>
      <p>
        We envision a future where technology seamlessly integrates into daily
        life, enhancing productivity and bringing people together. Our goal is
        to leverage our skills to create impactful solutions that address
        real-world problems. We are driven by a desire to learn, grow, and
        contribute to the tech community.
      </p>

      <h2>Contact Us</h2>
      <p>
        We love connecting with like-minded individuals and sharing our journey.
        Feel free to reach out to us through our social media channels or via
        email. Whether you have a project idea, need collaboration, or just want
        to chat about technology, we are always open to new opportunities and
        conversations.
      </p>

      <h2>Thank You</h2>
      <p>
        Thank you for visiting our app. We hope you find it useful and
        enjoyable. Stay tuned for more updates and features as we continue to
        innovate and improve.
      </p>
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
};
</script>

<style scoped>
.about-container {
  display: flex;
  background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
  color: #f5f5f5;
  font-family: "Arial", sans-serif;
  padding: 50px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 50px auto;
}

.content {
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 10px;
  flex: 1;
}

.image-gallery {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 20px;
}

.side-image {
  width: 150px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  text-align: center;
  color: #f0db4f;
}

h2 {
  font-size: 1.8em;
  margin-top: 30px;
  margin-bottom: 10px;
  color: #f0db4f;
}

p {
  font-size: 1.1em;
  line-height: 1.8;
  margin-bottom: 20px;
}

p:last-child {
  margin-bottom: 0;
}
</style>
