import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = path.join(repositoryRoot, "dist");
const siteConfig = JSON.parse(await readFile(path.join(repositoryRoot, "site.config.json"), "utf8"));
const configuredSiteUrl = process.env.VITE_SITE_URL || siteConfig.siteUrl;
const parsedSiteUrl = new URL(configuredSiteUrl);
if (parsedSiteUrl.protocol !== "https:") {
  throw new Error("[check-critical-links] siteUrl doit utiliser HTTPS.");
}
const siteBaseUrl = `${parsedSiteUrl.origin}${parsedSiteUrl.pathname.endsWith("/") ? parsedSiteUrl.pathname : `${parsedSiteUrl.pathname}/`}`;
const siteBasePath = new URL(siteBaseUrl).pathname;
const failures = [];
const htmlFiles = [];

async function collectHtmlFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await collectHtmlFiles(absolutePath);
    } else if (entry.name.endsWith(".html")) {
      htmlFiles.push(absolutePath);
    }
  }
}

async function exists(relativePath) {
  try {
    await access(path.join(distDirectory, relativePath));
    return true;
  } catch {
    return false;
  }
}

function normalizedPathForCandidate(candidate, sourceRelativePath) {
  const withoutFragment = candidate.split("#", 1)[0].split("?", 1)[0];
  if (!withoutFragment) return null;

  let pathname;
  try {
    pathname = new URL(withoutFragment, `${siteBaseUrl}${sourceRelativePath}`).pathname;
  } catch {
    return null;
  }

  if (pathname === "/" || pathname === siteBasePath) return "index.html";
  if (siteBasePath !== "/" && pathname.startsWith(siteBasePath)) pathname = pathname.slice(siteBasePath.length);
  pathname = pathname.replace(/^\/+/, "");
  if (!pathname) return "index.html";
  if (pathname.endsWith("/")) return path.join(pathname, "index.html");
  return pathname;
}

await collectHtmlFiles(distDirectory);

for (const absolutePath of htmlFiles) {
  const relativePath = path.relative(distDirectory, absolutePath).replaceAll(path.sep, "/");
  const html = await readFile(absolutePath, "utf8");
  const candidates = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)].map((match) => match[1]);

  for (const candidate of candidates) {
    if (/^(?:#|mailto:|tel:|data:|javascript:|blob:)/i.test(candidate)) continue;

    let parsedCandidate;
    try {
      parsedCandidate = new URL(candidate, `${siteBaseUrl}${relativePath}`);
    } catch {
      failures.push(`${relativePath}: URL interne illisible: ${candidate}`);
      continue;
    }

    if (parsedCandidate.origin !== parsedSiteUrl.origin) continue;
    const target = normalizedPathForCandidate(candidate, relativePath);
    if (!target) continue;
    if (!(await exists(target))) failures.push(`${relativePath}: cible absente: ${candidate} -> dist/${target}`);
  }
}

if (failures.length > 0) {
  console.error("[check-critical-links] Liens internes invalides :");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`[check-critical-links] PASS — ${htmlFiles.length} document(s) HTML contrôlé(s), aucune cible interne absente.`);
}
