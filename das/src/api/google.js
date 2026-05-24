import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5000", // Backend API URL
    withCredentials: true, // Include cookies for authentication
})

export const googleAuth = (code) => api.get(`/api/auth/google?code=${code}`)