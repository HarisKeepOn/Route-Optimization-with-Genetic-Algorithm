import axios from "axios";

const instance = axios.create({
  baseURL: "https://routes.googleapis.com/", // Replace with your API base URL
  timeout: 5000, // Set an appropriate timeout
  headers: {
    "Content-Type": "application/json",
    // from env file
    "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY
  }
});

export default instance;
