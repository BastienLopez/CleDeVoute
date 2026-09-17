import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
type SiteConfig = { siteUrl: string };

const siteConfig = JSON.parse(
  readFileSync(fileURLToPath(new URL("./site.config.json", import.meta.url)), "utf8"),
) as SiteConfig;
const configuredSiteUrl = process.env.VITE_SITE_URL || siteConfig.siteUrl;

const getSiteUrl = () => {
  const parsedUrl = new URL(configuredSiteUrl);
  if (parsedUrl.protocol !== "https:") {
    throw new Error("siteUrl doit utiliser HTTPS pour produire les URLs canoniques du site.");
  }
  const pathname = parsedUrl.pathname.endsWith("/") ? parsedUrl.pathname : `${parsedUrl.pathname}/`;
  return `${parsedUrl.origin}${pathname}`;
};

export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost",
    port: 8080,
  },

  // Base path: use `VITE_BASE` env var when provided, otherwise
  // use "/" for development and the path declared by site.config.json for production.
  base: process.env.VITE_BASE || (mode === "development" ? "/" : new URL(getSiteUrl()).pathname),

  plugins: [
    {
      name: "site-url-metadata",
      transformIndexHtml(html) {
        return html.replaceAll("__SITE_URL__", getSiteUrl());
      },
    },
    react(),
  ],

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
