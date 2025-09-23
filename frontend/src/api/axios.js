import axios from "axios";

// Use relative path since frontend & backend are served together
const API = axios.create({
  baseURL: "/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
