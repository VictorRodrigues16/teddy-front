import axios from "axios";

const api = axios.create({
  baseURL: "https://teddy-backend-kyel.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
