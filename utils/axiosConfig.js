import axios from "axios";

const instance = axios.create({
  baseURL: "https://routes.googleapis.com/", // Replace with your API base URL
  timeout: 5000, // Set an appropriate timeout
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": "AIzaSyBjTTyY5GHxTwPGSYnJYw2wfa8EHteRN1o"
  }
});

export default instance;
