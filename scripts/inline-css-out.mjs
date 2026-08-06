#!/usr/bin/env node
/**
 * Inline exported CSS into all HTML under out/ for GitHub Pages.
 * Ensures first paint has styles even when _next assets are slow to propagate.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "out");
const CSS_DIR = path.join(OUT, "_next", "static", "css");

if (!fs.existsSync(OUT) || !fs.existsSync(CSS_DIR)) {
  console.warn("[inline-css-out] out/ or CSS not found — skipping");
  process.exit(0);
}

const cssFiles = fs.readdirSync(CSS_DIR).filter((f) => f.endsWith(".css"));
const cssByName = Object.fromEntries(
  cssFiles.map((f) => [f, fs.readFileSync(path.join(CSS_DIR, f), "utf8")])
);

const STYLESHEET_RE =
  /<link\s+rel="stylesheet"\s+href="(\/_next\/static\/css\/([^"]+\.css))"([^>]*?)\/?>/g;

let processed = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) processHtml(full);
  }
}

function processHtml(file) {
  let html = fs.readFileSync(file, "utf8");
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
    fs.writeFileSync(file, html);
    processed++;
  }
}

walk(OUT);
console.log(`[inline-css-out] inlined CSS into ${processed} HTML file(s)`);
