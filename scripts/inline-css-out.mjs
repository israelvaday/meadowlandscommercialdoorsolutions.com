#!/usr/bin/env node
/**
 * Optionally inline CSS into the homepage HTML for faster first paint.
 * Disabled by default — GitHub Pages serves _next assets when .nojekyll is present.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "out");
const HOME = path.join(OUT, "index.html");
const CSS_DIR = path.join(OUT, "_next", "static", "css");

if (process.env.INLINE_CSS_OUT !== "1") {
  console.log("[inline-css-out] skipped (set INLINE_CSS_OUT=1 to enable homepage inline)");
  process.exit(0);
}

if (!fs.existsSync(HOME) || !fs.existsSync(CSS_DIR)) {
  console.warn("[inline-css-out] out/index.html or CSS not found — skipping");
  process.exit(0);
}

const cssFiles = fs.readdirSync(CSS_DIR).filter((f) => f.endsWith(".css"));
const cssByName = Object.fromEntries(
  cssFiles.map((f) => [f, fs.readFileSync(path.join(CSS_DIR, f), "utf8")])
);

const STYLESHEET_RE =
  /<link\s+rel="stylesheet"\s+href="(\/_next\/static\/css\/([^"]+\.css))"([^>]*?)\/?>/g;

let html = fs.readFileSync(HOME, "utf8");
const original = html;

html = html.replace(STYLESHEET_RE, (match, href, fname) => {
  const css = cssByName[fname];
  if (!css) return match;
  return (
    `<style data-inline-css="${fname}">${css}</style>` +
    `<link rel="stylesheet" href="${href}" />`
  );
});

if (html !== original) {
  fs.writeFileSync(HOME, html);
  console.log("[inline-css-out] inlined CSS into homepage");
} else {
  console.log("[inline-css-out] no stylesheet link found on homepage");
}
