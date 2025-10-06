import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true, // allows network access
    port: 4173, // optional, can use default
    allowedHosts: ["securedash-frontend.onrender.com"], // add your deployed URL
  },
});
