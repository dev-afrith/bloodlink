import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

function renderSvg(svgPath, width, height) {
  const svg = fs.readFileSync(svgPath, "utf-8");
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: width,
    },
  });
  const pngData = resvg.render();
  return pngData.asPng();
}

function createIcoFromPng(pngBuffer, width, height) {
  // ICO header (6 bytes)
  // 0-1: Reserved (0)
  // 2-3: Image type (1 = ICO)
  // 4-5: Number of images (1)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  // Icon directory entry (16 bytes)
  const entry = Buffer.alloc(16);
  entry.writeUInt8(width >= 256 ? 0 : width, 0);   // Width
  entry.writeUInt8(height >= 256 ? 0 : height, 1); // Height
  entry.writeUInt8(0, 2);                          // Color count (0 for 256+)
  entry.writeUInt8(0, 3);                          // Reserved
  entry.writeUInt16LE(1, 4);                       // Color planes
  entry.writeUInt16LE(32, 6);                      // Bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8);        // Image size
  entry.writeUInt32LE(6 + 16, 12);                 // Image offset

  return Buffer.concat([header, entry, pngBuffer]);
}

async function main() {
  console.log("Generating SEO images from SVGs...");

  const ogSvgPath = path.join(publicDir, "og-image.svg");
  const faviconSvgPath = path.join(publicDir, "favicon.svg");

  // 1. og-image.png (1200x630)
  const ogPng = renderSvg(ogSvgPath, 1200, 630);
  const ogPngPath = path.join(publicDir, "og-image.png");
  fs.writeFileSync(ogPngPath, ogPng);
  console.log(`✓ Generated ${ogPngPath} (${ogPng.length} bytes)`);

  // 2. apple-touch-icon.png (180x180)
  const appleTouchPng = renderSvg(faviconSvgPath, 180, 180);
  const appleTouchPath = path.join(publicDir, "apple-touch-icon.png");
  fs.writeFileSync(appleTouchPath, appleTouchPng);
  console.log(`✓ Generated ${appleTouchPath} (${appleTouchPng.length} bytes)`);

  // 3. favicon.ico (32x32)
  const favicon32Png = renderSvg(faviconSvgPath, 32, 32);
  const icoBuffer = createIcoFromPng(favicon32Png, 32, 32);
  const icoPath = path.join(publicDir, "favicon.ico");
  fs.writeFileSync(icoPath, icoBuffer);
  console.log(`✓ Generated ${icoPath} (${icoBuffer.length} bytes)`);

  console.log("All SEO images generated successfully.");
}

main().catch((err) => {
  console.error("Error generating SEO images:", err);
  process.exit(1);
});
