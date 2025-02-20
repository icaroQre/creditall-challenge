import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Substituir pela URL real da API
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;