import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    watch: {
      usePolling: true,
    },
    host: true, // trengs for at Docker Container port mapping skal fungere
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://0.0.0.0:8081",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
})
