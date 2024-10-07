import axios from "axios";
import state from "../store"

axios.defaults.baseURL  =state.server_domain ; // Base URL for your server

// Login function - Makes a POST request to the server's Login endpoint
export async function Login(username, password) {
  try {
    const response = await axios.post("/auth/Login", {
      username: username,
      password: password,
    });
    return response.data; // Return the server response
  } catch (error) {
    if (error.response) {
      throw error.response.data; // Forward the error message from the server
    }
    throw { message: "Network error. Please try again later." }; // Handle other errors
  }
}

// Register function - Makes a POST request to the server's Register endpoint
export async function Register(userDetails) {
  try {
    const response = await axios.post("/auth/Register", {
      username: userDetails.username,
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
      country: userDetails.country,
      password: userDetails.password,
      email: userDetails.email,
    });
    return response.data; // Return the server response
  } catch (error) {
    if (error.response) {
      throw error.response.data; // Forward the error message from the server
    }
    throw { message: "Network error. Please try again later." }; // Handle other errors
  }
}

// Logout function - Makes a POST request to the server's Logout endpoint
export async function Logout() {
  try {
    const response = await axios.post("/auth/Logout");
    return response.data; // Return the server response
  } catch (error) {
    if (error.response) {
      throw error.response.data; // Forward the error message from the server
    }
    throw { message: "Network error. Please try again later." }; // Handle other errors
  }
}