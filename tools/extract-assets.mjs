// One-off helper: writes every asset embedded in the client's design bundle to
// disk, keyed by the uuid the template references. Not part of the site build.
import { readFile, writeFile, mkdir } from "node:fs/promises";

const src = process.argv[2];
const outDir = process.argv[3] ?? "tools/out/assets";

const html = await readFile(src, "utf8");
await mkdir(outDir, { recursive: true });

const tagRe = /<script[^>]*type=["']__bundler\/manifest["'][^>]*>([\s\S]*?)<\/script>/;
const raw = html.match(tagRe)?.[1];
if (!raw) throw new Error("manifest script tag not found");

const manifest = JSON.parse(raw);
const entries = Array.isArray(manifest) ? manifest : Object.entries(manifest);

const extFor = (mime) =>
  ({
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
    "font/woff2": "woff2",
    "text/javascript": "js",
    "application/javascript": "js",
  })[mime] ?? "bin";

for (const entry of entries) {
  const [key, value] = Array.isArray(entry) ? entry : [entry.id ?? entry.key, entry];
  const mime = value?.mime ?? value?.type ?? "";
  const data = typeof value === "string" ? value : (value?.data ?? value?.content ?? "");
  if (!data) continue;

  const ext = extFor(mime);
  if (!["jpg", "png", "webp", "gif", "svg"].includes(ext)) continue;

  const buf = Buffer.from(data, "base64");
  await writeFile(`${outDir}/${key}.${ext}`, buf);
  console.log(`${key}.${ext}  ${mime}  ${(buf.length / 1024).toFixed(0)}kb`);
}
