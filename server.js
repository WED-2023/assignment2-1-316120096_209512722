const express = require("express");
const mysql = require("mysql2/promise");
const axios = require("axios");
const app = express();
const port = 3000; // Choose a different port or use an environment variable
const apiKey = process.env.API_KEY || "82d181759f064ccb9fb29c272c319613"; // Api key

// Middleware to parse JSON
app.use(express.json());
const cors = require("cors");
app.use(cors());
// Create MySQL database connection
async function createDBConnection() {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "users",
    });
    console.log("Connected to MySQL Database");
    return db;
  } catch (err) {
    console.error("Error connecting to MySQL Database:", err);
    throw err;
  }
}

// Default route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// External API Route 1: Search for recipes
app.get("/search-recipe", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching recipe data:", error);
    res.status(500).send("Error fetching recipe data");
  }
});

// External API Route 2: Get recipe information
app.get("/recipe-info/:id", async (req, res) => {
  const recipeId = req.params.id;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching recipe information:", error);
    res.status(500).send("Error fetching recipe information");
  }
});

// External API Route 3: Get random recipes
app.get("/random-recipes", async (req, res) => {
  const number = req.query.number || 5; // Default to 5 random recipes if none specified
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random?number=${number}&apiKey=${apiKey}`
    );
    res.json({ recipes: response.data.recipes }); // Ensure this returns { recipes: [...] }
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    res.status(500).send("Error fetching random recipes");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Create the MySQL connection and use it
createDBConnection()
  .then((db) => {
    // Your logic to use the database connection goes here
    // e.g., db.query("SELECT * FROM users");
  })
  .catch((err) => {
    console.error("Error creating database connection:", err);
  });
