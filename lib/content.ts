import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function readMarkdown(filename: string): string {
  const full = path.join(CONTENT_DIR, filename);
  let raw = fs.readFileSync(full, "utf8");

  // The source markdown was written for a GitBook repo where images live at
  // `images/...` relative to a markdown file in `public/`. In the Next.js site,
  // images are served from the web-absolute path `/images/...`. Rewrite both
  // `(images/x.png)` and `(./images/x.png)` to `(/images/x.png)`.
  raw = raw.replace(/\((\.\/)?images\//g, "(/images/");

  return raw;
}
