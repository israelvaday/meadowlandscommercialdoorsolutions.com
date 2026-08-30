/**
 * Add Google Workspace verification + mail DNS for
 * meadowlandscommercialdoorsolutions.com. Tokens stay in .env.local.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnvLocal } from "./openrouter-lib.mjs";

loadEnvLocal();

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOMAIN = "meadowlandscommercialdoorsolutions.com";
const VERIFY =
  "google-site-verification=6FW3OicKnHtfYjkojSJ7UAVRf0aAHZvrRsmKp18ixxA";
const SPF = "v=spf1 include:_spf.google.com ~all";
const API = "https://api.cloudflare.com/client/v4";
const GITHUB_OWNER = process.env.GITHUB_PAGES_OWNER || "israelvaday";
const PAGES_TARGET = `${GITHUB_OWNER}.github.io`;

const GOOGLE_MX = [
  { content: "aspmx.l.google.com", priority: 1 },
  { content: "alt1.aspmx.l.google.com", priority: 5 },
  { content: "alt2.aspmx.l.google.com", priority: 5 },
  { content: "alt3.aspmx.l.google.com", priority: 10 },
  { content: "alt4.aspmx.l.google.com", priority: 10 },
];

const WEB_RECORDS = [
  ["A", "185.199.108.153"],
  ["A", "185.199.109.153"],
  ["A", "185.199.110.153"],
  ["A", "185.199.111.153"],
  ["AAAA", "2606:50c0:8000::153"],
  ["AAAA", "2606:50c0:8001::153"],
  ["AAAA", "2606:50c0:8002::153"],
  ["AAAA", "2606:50c0:8003::153"],
];

const TOKENS = [
  ...new Set(
    [
      process.env.CLOUDFLARE_API_TOKEN,
      process.env.CLOUDFLARE_DNS_API_TOKEN,
    ]
      .map((value) => (value || "").trim())
      .filter(Boolean)
  ),
];

if (!TOKENS.length) {
  throw new Error("Set CLOUDFLARE_API_TOKEN in .env.local");
}

async function cf(token, path, init = {}) {
  const response = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  const payload = await response.json();
  if (!response.ok || payload.success === false) {
    const messages = (payload.errors || [])
      .map((item) => item.message)
      .filter(Boolean);
    const error = new Error(
      `Cloudflare ${response.status} ${path}: ${messages.join("; ") || "request failed"}`
    );
    error.status = response.status;
    throw error;
  }
  return payload.result;
}

function txtValue(content) {
  return String(content || "").replace(/^"|"$/g, "");
}

function updateEnvZoneId(zoneId) {
  const envPath = join(ROOT, ".env.local");
  const current = readFileSync(envPath, "utf8");
  const next = current
    .replace(/^# Cloudflare \(zone .*\)$/m, `# Cloudflare (zone ${DOMAIN})`)
    .replace(/^CLOUDFLARE_ZONE_ID=.*$/m, `CLOUDFLARE_ZONE_ID=${zoneId}`);
  if (next !== current) writeFileSync(envPath, next);
}

async function findZone(token) {
  const byName = await cf(
    token,
    `/zones?name=${encodeURIComponent(DOMAIN)}`
  ).catch(() => []);
  if (Array.isArray(byName) && byName[0]) return byName[0];

  const all = await cf(token, "/zones?per_page=50").catch(() => []);
  if (Array.isArray(all)) {
    const match = all.find((item) => item.name === DOMAIN);
    if (match) return match;
  }

  const configuredId = (process.env.CLOUDFLARE_ZONE_ID || "").trim();
  if (configuredId) {
    const configured = await cf(token, `/zones/${configuredId}`).catch(() => null);
    if (configured?.name === DOMAIN) return configured;
  }
  return null;
}

async function createZone(token) {
  const accounts = await cf(token, "/accounts?per_page=50").catch(() => []);
  const accountId = Array.isArray(accounts) && accounts[0]?.id;
  if (!accountId) return null;
  return cf(token, "/zones", {
    method: "POST",
    body: JSON.stringify({
      name: DOMAIN,
      account: { id: accountId },
      type: "full",
    }),
  });
}

async function upsertTxt(token, zoneId, records, content, comment) {
  const existing = records.filter(
    (record) =>
      record.type === "TXT" &&
      record.name === DOMAIN &&
      txtValue(record.content).startsWith(content.split("=")[0] + "=")
  );
  const exact = existing.find((record) => txtValue(record.content) === content);
  if (exact) return "already present";
  for (const record of existing) {
    await cf(token, `/zones/${zoneId}/dns_records/${record.id}`, {
      method: "DELETE",
    });
  }
  await cf(token, `/zones/${zoneId}/dns_records`, {
    method: "POST",
    body: JSON.stringify({
      type: "TXT",
      name: DOMAIN,
      content,
      ttl: 3600,
      proxied: false,
      comment,
    }),
  });
  return existing.length ? "updated" : "created";
}

async function upsertMx(token, zoneId, records) {
  const current = records.filter(
    (record) => record.type === "MX" && record.name === DOMAIN
  );
  const wanted = new Set(
    GOOGLE_MX.map((item) => `${item.priority}:${item.content}`)
  );
  for (const record of current) {
    const key = `${record.priority}:${String(record.content).replace(/\.$/, "").toLowerCase()}`;
    if (!wanted.has(key)) {
      await cf(token, `/zones/${zoneId}/dns_records/${record.id}`, {
        method: "DELETE",
      });
    }
  }
  const after = current.filter((record) =>
    wanted.has(
      `${record.priority}:${String(record.content).replace(/\.$/, "").toLowerCase()}`
    )
  );
  let created = 0;
  for (const item of GOOGLE_MX) {
    const have = after.some(
      (record) =>
        record.priority === item.priority &&
        String(record.content).replace(/\.$/, "").toLowerCase() === item.content
    );
    if (have) continue;
    await cf(token, `/zones/${zoneId}/dns_records`, {
      method: "POST",
      body: JSON.stringify({
        type: "MX",
        name: DOMAIN,
        content: item.content,
        priority: item.priority,
        ttl: 3600,
        proxied: false,
        comment: "Google Workspace mail",
      }),
    });
    created += 1;
  }
  return created ? `created ${created}` : "already present";
}

async function upsertWeb(token, zoneId, records) {
  const changes = [];
  const desired = [
    ...WEB_RECORDS.map(([type, content]) => ({
      type,
      name: DOMAIN,
      content,
      proxied: true,
    })),
    {
      type: "CNAME",
      name: `www.${DOMAIN}`,
      content: PAGES_TARGET,
      proxied: true,
    },
  ];
  for (const item of desired) {
    const existing = records.find(
      (record) =>
        record.type === item.type &&
        record.name === item.name &&
        record.content.replace(/\.$/, "") === item.content.replace(/\.$/, "")
    );
    if (!existing) {
      await cf(token, `/zones/${zoneId}/dns_records`, {
        method: "POST",
        body: JSON.stringify({
          type: item.type,
          name: item.name,
          content: item.content,
          ttl: 1,
          proxied: item.proxied,
          comment: "Meadowlands Commercial Door Solutions GitHub Pages",
        }),
      });
      changes.push(`created ${item.type} ${item.name}`);
    } else if (existing.proxied !== item.proxied) {
      await cf(token, `/zones/${zoneId}/dns_records/${existing.id}`, {
        method: "PATCH",
        body: JSON.stringify({ proxied: item.proxied }),
      });
      changes.push(`proxied ${item.type} ${item.name}`);
    }
  }
  return changes;
}

let token = null;
let zone = null;
const attempts = [];

for (const candidate of TOKENS) {
  const status = await cf(candidate, "/user/tokens/verify").catch((error) => {
    attempts.push(error.message);
    return null;
  });
  if (!status) continue;
  token = candidate;
  zone = await findZone(candidate);
  if (zone) break;
  zone = await createZone(candidate);
  if (zone) break;
  attempts.push("token is valid but cannot see or create the Meadowlands zone");
}

if (!token || !zone) {
  throw new Error(
    `Could not reach the Cloudflare zone for ${DOMAIN}. ${attempts.join(" | ") || "No usable token."}`
  );
}

updateEnvZoneId(zone.id);
const records = await cf(token, `/zones/${zone.id}/dns_records?per_page=500`);

const googleTxt = await upsertTxt(
  token,
  zone.id,
  records,
  VERIFY,
  "Google Workspace domain verification"
);
const spf = await upsertTxt(
  token,
  zone.id,
  records,
  SPF,
  "Google Workspace SPF"
);
const mx = await upsertMx(token, zone.id, records);
const webDns = await upsertWeb(token, zone.id, records);

console.log(
  JSON.stringify(
    {
      domain: DOMAIN,
      zoneStatus: zone.status,
      nameServers: zone.name_servers || [],
      workspace: {
        verificationTxt: googleTxt,
        spf,
        mx,
      },
      webDns: webDns.length ? webDns : ["already connected"],
    },
    null,
    2
  )
);
