import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Copy the committed entry.txt into the grader's output directory.
// The entry text itself lives only in entry.txt; this program never
// renders, rewrites, or alters a single character of it on the way out.
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const repoDir = dirname(fileURLToPath(import.meta.url));
const entryPath = join(repoDir, "entry.txt");

let text;
try {
  text = readFileSync(entryPath, "utf8");
} catch (err) {
  console.error(`failed to read entry.txt: ${err}`);
  process.exit(1);
}

try {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
} catch (err) {
  console.error(`failed to write output entry.txt: ${err}`);
  process.exit(1);
}
