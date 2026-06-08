import axios from "axios";

const api = axios.create({
  baseURL: "https://docbook-57yh.onrender.com", // Backend API URL
  withCredentials: true, // Include cookies for authentication
});

export const googleAuth = (code) => api.get(`/api/auth/google?code=${code}`);
