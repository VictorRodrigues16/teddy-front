import axios from "axios";

// https://teddy-back.fly.dev

const api = axios.create({
  baseURL: "https://teddy-back.fly.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
