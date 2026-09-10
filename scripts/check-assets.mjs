import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptsDirectory, "..");
const imageDirectories = ["src/assets", "public"];
const rasterExtensions = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);
const maximumBytes = 512 * 1024;

async function collectImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      images.push(...(await collectImages(entryPath)));
      continue;
    }

    if (rasterExtensions.has(path.extname(entry.name).toLowerCase())) {
      images.push(entryPath);
    }
  }

  return images;
}

const images = [];
for (const relativeDirectory of imageDirectories) {
  images.push(...(await collectImages(path.join(repositoryRoot, relativeDirectory))));
}

const oversized = [];
const invalidDimensions = [];

function readDimensions(buffer, extension) {
  if (extension === ".png" && buffer.length >= 24 && buffer.toString("ascii", 1, 4) === "PNG") {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  if ((extension === ".jpg" || extension === ".jpeg") && buffer.length >= 4 && buffer.readUInt16BE(0) === 0xffd8) {
    let offset = 2;
    const startOfFrameMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);

    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }

      const marker = buffer[offset + 1];
      if (startOfFrameMarkers.has(marker)) {
        return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
      }

      const segmentLength = buffer.readUInt16BE(offset + 2);
      if (segmentLength < 2) break;
      offset += 2 + segmentLength;
    }
  }

  return null;
}

for (const imagePath of images) {
  const imageStats = await stat(imagePath);
  if (imageStats.size > maximumBytes) {
    oversized.push(`${path.relative(repositoryRoot, imagePath)} (${imageStats.size} octets)`);
  }

  const dimensions = readDimensions(await readFile(imagePath), path.extname(imagePath).toLowerCase());
  if (!dimensions || dimensions.width <= 0 || dimensions.height <= 0) {
    invalidDimensions.push(path.relative(repositoryRoot, imagePath));
  }
}

if (oversized.length > 0) {
  console.error("[check-assets] Images trop lourdes :");
  for (const image of oversized) console.error(`- ${image}`);
  process.exit(1);
}

if (invalidDimensions.length > 0) {
  console.error("[check-assets] Dimensions introuvables ou invalides :");
  for (const image of invalidDimensions) console.error(`- ${image}`);
  process.exit(1);
}

console.log(`[check-assets] PASS — ${images.length} image(s) raster sous 512 Ko avec dimensions lisibles.`);
