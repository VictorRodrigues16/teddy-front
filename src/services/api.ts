import axios from "axios";

export const api = axios.create({
  baseURL: "https://teddy-back.fly.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

