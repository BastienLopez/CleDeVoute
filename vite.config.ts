import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
const DEFAULT_REPO_BASE = "/CleDeVoute/";

export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost",
    port: 8080,
  },

  // Base path: use `VITE_BASE` env var when provided, otherwise
  // use "/" for development and the repo name for production.
  base: process.env.VITE_BASE || (mode === "development" ? "/" : DEFAULT_REPO_BASE),

  plugins: [react()],

  resolve: {
    alias: {
      "@": `${import.meta.dirname}/src`,
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
}));
