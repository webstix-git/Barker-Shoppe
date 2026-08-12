// One-off helper: pulls the real markup out of the client's "bundled page"
// export (a self-extracting HTML file). Not part of the site build.
import { readFile, writeFile, mkdir } from "node:fs/promises";

const src = process.argv[2];
const outDir = process.argv[3] ?? "tools/out";

const html = await readFile(src, "utf8");
await mkdir(outDir, { recursive: true });

const tagRe = /<script[^>]*type=["']__bundler\/([\w]+)["'][^>]*>([\s\S]*?)<\/script>/g;

let match;
while ((match = tagRe.exec(html)) !== null) {
  const [, kind, raw] = match;
  const body = raw.trim();
  const clean = body.replace(/(base64,)[A-Za-z0-9+/=]{200,}/g, "$1[STRIPPED]");
  await writeFile(`${outDir}/${kind}.txt`, clean, "utf8");
  console.log(`${kind}: raw ${body.length} chars -> written ${clean.length}`);
}
