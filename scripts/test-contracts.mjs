import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptsDirectory, "..");
const distDirectory = path.join(repositoryRoot, "dist");
const requiredFiles = [
  "index.html",
  "404.html",
  path.join("mentions-legales", "index.html"),
];

const routeMetadata = {
  "mentions-legales/index.html": [
    "<title>Mentions légales | La clé de voûte</title>",
    '<meta name="robots" content="index, follow" />',
    '<link rel="canonical" href="https://bastienlopez.github.io/CleDeVoute/mentions-legales" />',
  ],
  "404.html": [
    "<title>Page introuvable | La clé de voûte</title>",
    '<meta name="robots" content="noindex, follow" />',
  ],
};

for (const relativeFile of requiredFiles) {
  const filePath = path.join(distDirectory, relativeFile);
  try {
    await access(filePath);
  } catch {
    console.error(`[test-contracts] Fichier de publication manquant : dist/${relativeFile}`);
    process.exit(1);
  }

  const html = await readFile(filePath, "utf8");
  if (!html.includes('id="root"') || html.includes("/src/main.tsx")) {
    console.error(`[test-contracts] Entrypoint compilé invalide : dist/${relativeFile}`);
    process.exit(1);
  }

  for (const expectedMetadata of routeMetadata[relativeFile.replaceAll("\\", "/")] ?? []) {
    if (!html.includes(expectedMetadata)) {
      console.error(`[test-contracts] Metadata de route manquante dans dist/${relativeFile}: ${expectedMetadata}`);
      process.exit(1);
    }
  }

  if (relativeFile === "404.html") {
    if (html.includes('<link rel="canonical"') || html.includes('<meta property="og:url"') || html.includes('type="application/ld+json"')) {
      console.error("[test-contracts] Le fallback 404 ne doit pas déclarer l’accueil via ses metadata ou son JSON-LD.");
      process.exit(1);
    }
  }
}

console.log("[test-contracts] PASS — entrypoint, route légale et fallback 404 présents dans dist.");
