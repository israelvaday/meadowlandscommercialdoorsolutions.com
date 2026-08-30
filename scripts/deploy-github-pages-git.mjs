#!/usr/bin/env node
/**
 * Push only out/ to gh-pages using an orphan branch. Avoids gh-pages npm
 * accidentally including source files from the repo root.
 */
import { cpSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
const OUT = join(ROOT, "out");
const REMOTE = process.env.GH_PAGES_REMOTE ?? "origin";
const BRANCH = process.env.GH_PAGES_BRANCH ?? "gh-pages";
const MESSAGE = process.env.GH_PAGES_MESSAGE ?? "Deploy GitHub Pages";

if (!existsSync(OUT)) {
  throw new Error("out/ is missing — run npm run build:pages first");
}

function remoteUrl(name) {
  const result = spawnSync("git", ["remote", "get-url", name], {
    cwd: ROOT,
    encoding: "utf8",
    shell: false,
  });
  if (result.status !== 0 || !result.stdout?.trim()) {
    throw new Error(`Could not resolve git remote "${name}"`);
  }
  return result.stdout.trim();
}

const remote = remoteUrl(REMOTE);

const work = mkdtempSync(join(tmpdir(), "mcds-pages-"));

function run(cmd, args, options = {}) {
  const result = spawnSync(cmd, args, {
    cwd: options.cwd ?? work,
    stdio: "inherit",
    shell: false,
    env: options.env ?? process.env,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${cmd} ${args.join(" ")} exited with ${result.status}`);
  }
}

try {
  cpSync(OUT, work, { recursive: true });

  run("git", ["init"]);
  run("git", ["checkout", "-b", BRANCH]);
  run("git", ["remote", "add", "origin", remote]);
  run("git", ["add", "-A"]);
  run("git", ["commit", "-m", MESSAGE], {
    env: {
      ...process.env,
      GIT_AUTHOR_NAME: "MCDS Deploy",
      GIT_AUTHOR_EMAIL: "deploy@meadowlandscommercialdoorsolutions.com",
      GIT_COMMITTER_NAME: "MCDS Deploy",
      GIT_COMMITTER_EMAIL: "deploy@meadowlandscommercialdoorsolutions.com",
    },
  });
  run("git", ["push", "--force", "origin", `HEAD:${BRANCH}`], { cwd: work });
} finally {
  rmSync(work, { recursive: true, force: true });
}

console.log(`[deploy-github-pages-git] pushed ${BRANCH} from out/`);
