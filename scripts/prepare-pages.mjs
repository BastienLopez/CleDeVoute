import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptsDirectory, "..");
const distDirectory = path.join(repositoryRoot, "dist");
const indexPath = path.join(distDirectory, "index.html");
const siteBaseUrl = "https://bastienlopez.github.io/CleDeVoute/";

try {
  await access(indexPath);
} catch {
  console.error("[prepare-pages] dist/index.html est introuvable. Lance npm run build avant cette étape.");
  process.exit(1);
}

await mkdir(path.join(distDirectory, "mentions-legales"), { recursive: true });

const homeHtml = await readFile(indexPath, "utf8");

function replaceRequired(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`[prepare-pages] Balise metadata introuvable : ${label}`);
  }
  return html.replace(pattern, replacement);
}

function removeMetadata(html, pattern, label) {
  if (!pattern.test(html)) {
    throw new Error(`[prepare-pages] Balise metadata introuvable : ${label}`);
  }
  return html.replace(pattern, "");
}

function setMetadata(html, metadata) {
  let updatedHtml = replaceRequired(html, /<title>[^<]*<\/title>/, `<title>${metadata.title}</title>`, "title");
  updatedHtml = replaceRequired(updatedHtml, /(<meta name="description" content=")[^"]*("\s*\/>)/, `$1${metadata.description}$2`, "description");
  updatedHtml = replaceRequired(updatedHtml, /(<meta name="robots" content=")[^"]*("\s*\/>)/, `$1${metadata.robots}$2`, "robots");
  updatedHtml = replaceRequired(updatedHtml, /(<meta property="og:title" content=")[^"]*("\s*\/>)/, `$1${metadata.ogTitle}$2`, "og:title");
  updatedHtml = replaceRequired(updatedHtml, /(<meta property="og:description" content=")[^"]*("\s*\/>)/, `$1${metadata.ogDescription}$2`, "og:description");
  if (metadata.canonical) {
    updatedHtml = replaceRequired(updatedHtml, /(<link rel="canonical" href=")[^"]*("\s*\/>)/, `$1${metadata.canonical}$2`, "canonical");
  } else {
    updatedHtml = removeMetadata(updatedHtml, /<link rel="canonical" href="[^"]*"\s*\/>/, "canonical");
  }
  if (metadata.ogUrl) {
    updatedHtml = replaceRequired(updatedHtml, /(<meta property="og:url" content=")[^"]*("\s*\/>)/, `$1${metadata.ogUrl}$2`, "og:url");
  } else {
    updatedHtml = removeMetadata(updatedHtml, /<meta property="og:url" content="[^"]*"\s*\/>/, "og:url");
  }
  return updatedHtml;
}

const legalUrl = `${siteBaseUrl}mentions-legales`;
const legalHtml = setMetadata(homeHtml, {
  title: "Mentions légales | La clé de voûte",
  description: "Mentions légales de La clé de voûte.",
  robots: "index, follow",
  canonical: legalUrl,
  ogTitle: "Mentions légales | La clé de voûte",
  ogDescription: "Informations sur l'éditeur, l'hébergement et l'utilisation du site.",
  ogUrl: legalUrl,
});

let notFoundHtml = setMetadata(homeHtml, {
  title: "Page introuvable | La clé de voûte",
  description: "La page demandée n'existe pas sur le site de La clé de voûte.",
  robots: "noindex, follow",
  canonical: null,
  ogTitle: "Page introuvable | La clé de voûte",
  ogDescription: "La page demandée n'existe pas sur le site de La clé de voûte.",
  ogUrl: null,
}).replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/, "");

for (const [pattern, label] of [
  [/<meta property="og:image(?::[^"]+)?"[^>]*\s*\/>\s*/g, "og:image"],
  [/<meta name="twitter:card"[^>]*\s*\/>\s*/g, "twitter:card"],
  [/<meta name="twitter:image"[^>]*\s*\/>\s*/g, "twitter:image"],
]) {
  if (!pattern.test(notFoundHtml)) {
    throw new Error(`[prepare-pages] Balise metadata introuvable : ${label}`);
  }
  notFoundHtml = notFoundHtml.replace(pattern, "");
}

await writeFile(path.join(distDirectory, "mentions-legales", "index.html"), legalHtml);
await writeFile(path.join(distDirectory, "404.html"), notFoundHtml);

console.log("[prepare-pages] Routes statiques préparées : /mentions-legales et 404.");
