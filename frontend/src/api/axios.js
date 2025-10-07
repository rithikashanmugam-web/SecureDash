// src/api/axios.js
import axios from "axios";

// ✅ Create axios instance with correct baseURL
const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://securedash-6.onrender.com/api" // your deployed backend + /api
      : "http://localhost:5000/api",            // local backend
  withCredentials: true, // send cookies if any (optional)
});

// ✅ Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ✅ Optional: global response/error handler
API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err);
    return Promise.reject(err);
  }
);

export default API;
