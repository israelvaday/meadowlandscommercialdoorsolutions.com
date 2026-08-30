/**
 * Build the static GitHub Pages site while preserving the server-only quote
 * route in the source tree. The route is restored even if the build fails.
 */
import {
  existsSync,
  mkdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const API_DIR = join(ROOT, "app", "api");
const STASH_ROOT = join(ROOT, ".static-build-stash");
const STASHED_API = join(STASH_ROOT, "api");
const nextBin = join(
  ROOT,
  "node_modules",
  "next",
  "dist",
  "bin",
  "next"
);

if (existsSync(STASH_ROOT)) {
  throw new Error(
    "Static build stash already exists; restore app/api before trying again"
  );
}

let movedApi = false;
let result;

try {
  const prune = spawnSync(
    process.execPath,
    [join(ROOT, "scripts", "prune-stale-public-assets.mjs")],
    { cwd: ROOT, stdio: "inherit" }
  );
  if (prune.error) throw prune.error;
  if (prune.status !== 0) {
    throw new Error(`prune-stale-public-assets exited with ${prune.status}`);
  }

  if (existsSync(API_DIR)) {
    mkdirSync(STASH_ROOT, { recursive: true });
    renameSync(API_DIR, STASHED_API);
    movedApi = true;
  }

  result = spawnSync(process.execPath, [nextBin, "build"], {
    cwd: ROOT,
    env: {
      ...process.env,
      NEXT_EXPORT: "1",
      NEXT_PUBLIC_GH_PAGES: "1",
      NEXT_PUBLIC_SITE_URL:
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://meadowlandscommercialdoorsolutions.com",
      NEXT_PUBLIC_QUOTE_API_URL:
        process.env.NEXT_PUBLIC_QUOTE_API_URL ||
        "https://meadowlandscommercialdoorsolutions.com/api/quote",
    },
    stdio: "inherit",
    shell: false,
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`Static Next.js build exited with ${result.status}`);
  }

  const sync = spawnSync(
    process.execPath,
    [join(ROOT, "scripts", "sync-static-assets.mjs")],
    { cwd: ROOT, stdio: "inherit" }
  );
  if (sync.error) throw sync.error;
  if (sync.status !== 0) {
    throw new Error(`Static asset sync exited with ${sync.status}`);
  }

  writeFileSync(join(ROOT, "out", ".nojekyll"), "");

  for (const step of ["inline-css-out.mjs"]) {
    const script = join(ROOT, "scripts", step);
    if (!existsSync(script)) continue;
    const post = spawnSync(process.execPath, [script], {
      cwd: ROOT,
      env: { ...process.env, NEXT_EXPORT: "1" },
      stdio: "inherit",
    });
    if (post.error) throw post.error;
    if (post.status !== 0) {
      throw new Error(`Post-build ${step} exited with ${post.status}`);
    }
  }
} finally {
  if (movedApi && existsSync(STASHED_API)) {
    renameSync(STASHED_API, API_DIR);
  }
  if (existsSync(STASH_ROOT)) {
    rmSync(STASH_ROOT, { recursive: true, force: true });
  }
}

console.log("GitHub Pages static build complete");
