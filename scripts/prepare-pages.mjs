import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptsDirectory, "..");
const distDirectory = path.join(repositoryRoot, "dist");
const indexPath = path.join(distDirectory, "index.html");
const siteConfigPath = path.join(repositoryRoot, "site.config.json");
const siteToken = "__SITE_URL__";

const siteConfig = JSON.parse(await readFile(siteConfigPath, "utf8"));
const configuredSiteUrl = process.env.VITE_SITE_URL || siteConfig.siteUrl;
const parsedSiteUrl = new URL(configuredSiteUrl);
if (!/^https?:$/.test(parsedSiteUrl.protocol)) {
  throw new Error("[prepare-pages] siteUrl doit utiliser HTTP ou HTTPS.");
}
const siteBaseUrl = `${parsedSiteUrl.origin}${parsedSiteUrl.pathname.endsWith("/") ? parsedSiteUrl.pathname : `${parsedSiteUrl.pathname}/`}`;

try {
  await access(indexPath);
} catch {
  console.error("[prepare-pages] dist/index.html est introuvable. Lance npm run build avant cette étape.");
  process.exit(1);
}

await mkdir(path.join(distDirectory, "mentions-legales"), { recursive: true });

function hydrateSiteUrls(content, label) {
  if (!content.includes(siteToken)) {
    if (!content.includes(siteBaseUrl)) {
      throw new Error(`[prepare-pages] Token d'URL manquant dans ${label}`);
    }
    return content;
  }
  return content.replaceAll(siteToken, siteBaseUrl);
}

const homeHtml = hydrateSiteUrls(await readFile(indexPath, "utf8"), "dist/index.html");

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
  updatedHtml = replaceRequired(updatedHtml, /(<meta name="twitter:title" content=")[^"]*("\s*\/>)/, `$1${metadata.ogTitle}$2`, "twitter:title");
  updatedHtml = replaceRequired(updatedHtml, /(<meta name="twitter:description" content=")[^"]*("\s*\/>)/, `$1${metadata.ogDescription}$2`, "twitter:description");
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

function setStructuredData(html, data) {
  const pattern = /<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/;
  if (!pattern.test(html)) {
    throw new Error("[prepare-pages] JSON-LD introuvable");
  }
  return html.replace(pattern, `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n    </script>\n`);
}

const legalUrl = new URL("mentions-legales", siteBaseUrl).href;
const legalHtml = setStructuredData(setMetadata(homeHtml, {
  title: "Mentions légales | La clé de voûte",
  description: "Mentions légales de La clé de voûte.",
  robots: "index, follow",
  canonical: legalUrl,
  ogTitle: "Mentions légales | La clé de voûte",
  ogDescription: "Informations sur l'éditeur, l'hébergement et l'utilisation du site.",
  ogUrl: legalUrl,
}), {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${legalUrl}#webpage`,
  url: legalUrl,
  name: "Mentions légales | La clé de voûte",
  description: "Informations sur l'éditeur, l'hébergement et l'utilisation du site.",
  isPartOf: { "@id": `${siteBaseUrl}#website` },
  about: { "@id": `${siteBaseUrl}#business` },
  inLanguage: "fr-FR",
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
  [/<meta name="twitter:title"[^>]*\s*\/>\s*/g, "twitter:title"],
  [/<meta name="twitter:description"[^>]*\s*\/>\s*/g, "twitter:description"],
  [/<meta name="twitter:image"[^>]*\s*\/>\s*/g, "twitter:image"],
]) {
  if (!pattern.test(notFoundHtml)) {
    throw new Error(`[prepare-pages] Balise metadata introuvable : ${label}`);
  }
  notFoundHtml = notFoundHtml.replace(pattern, "");
}

await writeFile(indexPath, homeHtml);
await writeFile(path.join(distDirectory, "mentions-legales", "index.html"), legalHtml);
await writeFile(path.join(distDirectory, "404.html"), notFoundHtml);

for (const relativeFile of ["robots.txt", "sitemap.xml", "llms.txt"]) {
  const filePath = path.join(distDirectory, relativeFile);
  const templatePath = path.join(repositoryRoot, "public", relativeFile);
  const fileContent = hydrateSiteUrls(await readFile(templatePath, "utf8"), `public/${relativeFile}`);
  await writeFile(filePath, fileContent);
}

console.log("[prepare-pages] Routes statiques préparées : /mentions-legales et 404.");
