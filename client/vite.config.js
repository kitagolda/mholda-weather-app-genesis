import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "./",
  cacheDir: "../node_modules/.vite",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "./dist",
    emptyOutDir: true,
  },
  plugins: [tailwindcss()],
});
