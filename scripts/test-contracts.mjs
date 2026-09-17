import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptsDirectory, "..");
const distDirectory = path.join(repositoryRoot, "dist");
const siteConfig = JSON.parse(await readFile(path.join(repositoryRoot, "site.config.json"), "utf8"));
const parsedSiteUrl = new URL(process.env.VITE_SITE_URL || siteConfig.siteUrl);
if (parsedSiteUrl.protocol !== "https:") {
  console.error("[test-contracts] siteUrl doit utiliser HTTPS.");
  process.exit(1);
}
const siteBaseUrl = `${parsedSiteUrl.origin}${parsedSiteUrl.pathname.endsWith("/") ? parsedSiteUrl.pathname : `${parsedSiteUrl.pathname}/`}`;
const legalUrl = new URL("mentions-legales", siteBaseUrl).href;
const privacyUrl = new URL("politique-confidentialite", siteBaseUrl).href;
const termsUrl = new URL("cgu", siteBaseUrl).href;
const requiredFiles = [
  "index.html",
  "404.html",
  path.join("mentions-legales", "index.html"),
  path.join("politique-confidentialite", "index.html"),
  path.join("cgu", "index.html"),
];

const routeMetadata = {
  "index.html": [
    `<meta property="og:image" content="${siteBaseUrl}og-image.jpg" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:image" content="${siteBaseUrl}og-image.jpg" />`,
  ],
  "mentions-legales/index.html": [
    "<title>Mentions légales | La clé de voûte</title>",
    '<meta name="robots" content="index, follow" />',
    `<link rel="canonical" href="${legalUrl}" />`,
  ],
  "politique-confidentialite/index.html": [
    "<title>Politique de confidentialité | La clé de voûte</title>",
    '<meta name="robots" content="index, follow" />',
    `<link rel="canonical" href="${privacyUrl}" />`,
  ],
  "cgu/index.html": [
    "<title>Conditions générales d'utilisation | La clé de voûte</title>",
    '<meta name="robots" content="index, follow" />',
    `<link rel="canonical" href="${termsUrl}" />`,
  ],
  "404.html": [
    "<title>Page introuvable | La clé de voûte</title>",
    '<meta name="robots" content="noindex, follow" />',
  ],
};

try {
  await access(path.join(distDirectory, "og-image.jpg"));
} catch {
  console.error("[test-contracts] Image sociale manquante : dist/og-image.jpg");
  process.exit(1);
}

for (const relativeFile of requiredFiles) {
  const filePath = path.join(distDirectory, relativeFile);
  try {
    await access(filePath);
  } catch {
    console.error(`[test-contracts] Fichier de publication manquant : dist/${relativeFile}`);
    process.exit(1);
  }

  const html = await readFile(filePath, "utf8");
  if (html.includes("__SITE_URL__")) {
    console.error(`[test-contracts] Token d'URL non remplacé dans dist/${relativeFile}`);
    process.exit(1);
  }
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
    if (html.includes('<link rel="canonical"') || html.includes('<meta property="og:url"') || html.includes('<meta property="og:image"') || html.includes('<meta name="twitter:title"') || html.includes('<meta name="twitter:description"') || html.includes('<meta name="twitter:image"') || html.includes('<meta name="twitter:url"') || html.includes('type="application/ld+json"')) {
      console.error("[test-contracts] Le fallback 404 ne doit pas déclarer l’accueil via ses metadata sociales ou son JSON-LD.");
      process.exit(1);
    }
  }
}

for (const relativeFile of ["robots.txt", "sitemap.xml", "llms.txt", "llms-full.txt"]) {
  const filePath = path.join(distDirectory, relativeFile);
  try {
    await access(filePath);
  } catch {
    console.error(`[test-contracts] Fichier SEO manquant : dist/${relativeFile}`);
    process.exit(1);
  }

  const content = await readFile(filePath, "utf8");
  if (content.includes("__SITE_URL__")) {
    console.error(`[test-contracts] Token d'URL non remplacé dans dist/${relativeFile}`);
    process.exit(1);
  }
}

const robots = await readFile(path.join(distDirectory, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${siteBaseUrl}sitemap.xml`)) {
  console.error("[test-contracts] robots.txt ne référence pas le sitemap canonique.");
  process.exit(1);
}
for (const crawler of ["OAI-SearchBot", "GPTBot", "Google-Extended"]) {
  if (!robots.includes(`User-agent: ${crawler}`) || !robots.includes("Allow: /")) {
    console.error(`[test-contracts] robots.txt ne documente pas l'accès de ${crawler}.`);
    process.exit(1);
  }
}

const sitemap = await readFile(path.join(distDirectory, "sitemap.xml"), "utf8");
for (const expectedUrl of [siteBaseUrl, legalUrl, privacyUrl, termsUrl]) {
  if (!sitemap.includes(`<loc>${expectedUrl}</loc>`)) {
    console.error(`[test-contracts] URL absente du sitemap : ${expectedUrl}`);
    process.exit(1);
  }
}

const indexHtml = await readFile(path.join(distDirectory, "index.html"), "utf8");
if (!indexHtml.includes('<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />') || !indexHtml.includes('<meta name="twitter:url"')) {
  console.error("[test-contracts] Métadonnées de diffusion SEO incomplètes sur l'accueil.");
  process.exit(1);
}
const jsonLdMatch = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!jsonLdMatch) {
  console.error("[test-contracts] JSON-LD de l'accueil manquant.");
  process.exit(1);
}

try {
  const graph = JSON.parse(jsonLdMatch[1])["@graph"];
  const graphTypes = new Set(graph.map((entry) => entry["@type"]));
  const business = graph.find((entry) => entry["@type"] === "GeneralContractor");
  if (!graphTypes.has("GeneralContractor") || !graphTypes.has("WebSite") || !graphTypes.has("WebPage") || !business?.contactPoint || !business?.knowsAbout) {
    throw new Error("types JSON-LD incomplets");
  }
} catch (error) {
  console.error(`[test-contracts] JSON-LD de l'accueil invalide : ${error.message}`);
  process.exit(1);
}

const contactFormSource = await readFile(path.join(repositoryRoot, "src", "components", "ContactForm.tsx"), "utf8");
for (const expectedField of ['name="name"', 'name="email"', 'name="phone"', 'name="subject"', 'name="message"', 'name="website"']) {
  if (!contactFormSource.includes(expectedField)) {
    console.error(`[test-contracts] Champ de formulaire absent : ${expectedField}`);
    process.exit(1);
  }
}
if (!contactFormSource.includes("mailto:") || !contactFormSource.includes("name=\"website\"")) {
  console.error("[test-contracts] Le flux de contact ou le champ piège invisible est absent.");
  process.exit(1);
}

const llmsFull = await readFile(path.join(distDirectory, "llms-full.txt"), "utf8");
if (!llmsFull.includes(`${siteBaseUrl}politique-confidentialite`) || !llmsFull.includes(`${siteBaseUrl}cgu`) || !llmsFull.includes("Réalisations présentées")) {
  console.error("[test-contracts] llms-full.txt ne contient pas les routes et le contexte éditorial attendus.");
  process.exit(1);
}

console.log("[test-contracts] PASS — entrypoint, route légale et fallback 404 présents dans dist.");
