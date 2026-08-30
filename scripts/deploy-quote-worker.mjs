/**
 * Deploy the Cloudflare quote API worker using credentials from .env.local.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnvLocal } from "./openrouter-lib.mjs";

loadEnvLocal();

const token =
  process.env.CLOUDFLARE_API_TOKEN ||
  process.env.CLOUDFLARE_DNS_API_TOKEN ||
  "";

if (!token) {
  throw new Error(
    "Set CLOUDFLARE_API_TOKEN (Workers deploy + Email send) in .env.local"
  );
}

async function resolveAccountId() {
  const configured = (process.env.CLOUDFLARE_ACCOUNT_ID || "").trim();
  if (configured && !configured.includes("REPLACE")) {
    return configured;
  }
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  if (!zoneId) return "";
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const payload = await response.json();
  if (!response.ok || !payload.success) {
    throw new Error("Could not resolve Cloudflare account ID from zone");
  }
  return payload.result?.account?.id || "";
}

const accountId = await resolveAccountId();
if (!accountId) {
  throw new Error("Set CLOUDFLARE_ACCOUNT_ID in .env.local or fix zone token scope");
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const config = join(ROOT, "workers", "quote-api", "wrangler.toml");
const original = readFileSync(config, "utf8");
const patched = original.includes("account_id =")
  ? original.replace(/account_id = ".*"/, `account_id = "${accountId}"`)
  : original.replace(
      'compatibility_date = "2024-08-01"',
      `compatibility_date = "2024-08-01"\naccount_id = "${accountId}"`
    );

writeFileSync(config, patched, "utf8");

try {
  const result = spawnSync(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["wrangler", "deploy", "--config", config],
    {
      cwd: ROOT,
      stdio: "inherit",
      env: { ...process.env, CLOUDFLARE_API_TOKEN: token },
      shell: process.platform === "win32",
    }
  );

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
} finally {
  writeFileSync(config, original, "utf8");
}

console.log("Quote worker deployed at /api/quote");
