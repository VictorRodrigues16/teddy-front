import axios from "axios";

export const api = axios.create({
  baseURL: "https://teddy-backend-kyel.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

