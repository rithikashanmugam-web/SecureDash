import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['securedash-frontend.onrender.com'],
    port: 4173, // optional, Render will override $PORT
    host: true, // to allow network access
  },
})
