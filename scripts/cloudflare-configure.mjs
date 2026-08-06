/**
 * Inspect or configure Cloudflare DNS and Email Routing for the GitHub Pages
 * deployment. Credentials are loaded from .env.local and are never printed.
 *
 * Usage:
 *   node scripts/cloudflare-configure.mjs
 *   node scripts/cloudflare-configure.mjs --apply
 */
import { loadEnvLocal } from "./openrouter-lib.mjs";

loadEnvLocal();

const DOMAIN = "hillmandoorsupplyanddoorrepair.com";
const INFO_ADDRESS = `info@${DOMAIN}`;
const QUOTES_ADDRESS = `quotes@${DOMAIN}`;
const FORWARD_TO = ["israelvaday97@gmail.com", "oren.siyonov@gmail.com"];
const GITHUB_OWNER = process.env.GITHUB_PAGES_OWNER || "israelvaday";
const PAGES_TARGET = `${GITHUB_OWNER}.github.io`;
let ZONE_ID = process.env.CLOUDFLARE_ZONE_ID || "";
let ACCOUNT_ID = "";
const DNS_TOKEN = process.env.CLOUDFLARE_DNS_API_TOKEN || "";
const EMAIL_TOKEN = process.env.CLOUDFLARE_EMAIL_API_TOKEN || "";
const APPLY = process.argv.includes("--apply");
const WEB_ONLY = process.argv.includes("--web-only");
const PROXY_WEB = process.env.CLOUDFLARE_PROXY !== "0";
const API = "https://api.cloudflare.com/client/v4";

const apexRecords = [
  ["A", "185.199.108.153"],
  ["A", "185.199.109.153"],
  ["A", "185.199.110.153"],
  ["A", "185.199.111.153"],
  ["AAAA", "2606:50c0:8000::153"],
  ["AAAA", "2606:50c0:8001::153"],
  ["AAAA", "2606:50c0:8002::153"],
  ["AAAA", "2606:50c0:8003::153"],
];

if (!ZONE_ID || !DNS_TOKEN) {
  throw new Error(
    "CLOUDFLARE_ZONE_ID and CLOUDFLARE_DNS_API_TOKEN are required in .env.local"
  );
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
    const messages = [
      ...(payload.errors || []).map((item) => item.message),
      ...(payload.messages || []).map((item) => item.message),
    ].filter(Boolean);
    throw new Error(
      `Cloudflare ${response.status} ${path}: ${messages.join("; ") || "request failed"}`
    );
  }
  return payload.result;
}

async function zoneInfo() {
  const configured = await cf(DNS_TOKEN, `/zones/${ZONE_ID}`);
  if (configured.name === DOMAIN) {
    ACCOUNT_ID = configured.account?.id || "";
    return configured;
  }

  const matches = await cf(
    DNS_TOKEN,
    `/zones?name=${encodeURIComponent(DOMAIN)}&status=active`
  );
  if (!Array.isArray(matches) || matches.length !== 1) {
    throw new Error(
      `Configured zone belongs to ${configured.name}; ${DOMAIN} was not accessible with the DNS token`
    );
  }
  ZONE_ID = matches[0].id;
  ACCOUNT_ID = matches[0].account?.id || "";
  console.log(`Using discovered Cloudflare zone for ${DOMAIN}`);
  return matches[0];
}

async function dnsRecords() {
  return cf(
    DNS_TOKEN,
    `/zones/${ZONE_ID}/dns_records?per_page=500`
  );
}

function relevantRecords(records) {
  return records
    .filter(
      (record) =>
        [DOMAIN, `www.${DOMAIN}`].includes(record.name) &&
        ["A", "AAAA", "CNAME", "MX", "TXT"].includes(record.type)
    )
    .map(({ id, type, name, content, priority, proxied }) => ({
      id,
      type,
      name,
      content,
      ...(priority !== undefined ? { priority } : {}),
      ...(proxied !== undefined ? { proxied } : {}),
    }));
}

async function emailStatus() {
  if (!EMAIL_TOKEN) return { available: false };
  const [settings, rules] = await Promise.all([
    cf(EMAIL_TOKEN, `/zones/${ZONE_ID}/email/routing`).catch((error) => ({
      error: error.message,
    })),
    cf(
      EMAIL_TOKEN,
      `/zones/${ZONE_ID}/email/routing/rules?per_page=200`
    ).catch((error) => ({ error: error.message })),
  ]);
  return {
    available: true,
    settings,
    rules: Array.isArray(rules)
      ? rules.map(({ id, name, enabled, matchers, actions }) => ({
          id,
          name,
          enabled,
          matchers,
          actions,
        }))
      : rules,
  };
}

async function createDnsRecord(type, name, content) {
  return cf(DNS_TOKEN, `/zones/${ZONE_ID}/dns_records`, {
    method: "POST",
    body: JSON.stringify({
      type,
      name,
      content,
      ttl: 1,
      proxied: PROXY_WEB,
      comment: "Hillman Door Supply GitHub Pages",
    }),
  });
}

async function reconcileDns(records) {
  const desired = [
    ...apexRecords.map(([type, content]) => ({
      type,
      name: DOMAIN,
      content,
    })),
    { type: "CNAME", name: `www.${DOMAIN}`, content: PAGES_TARGET },
  ];
  const managedTypes = new Set(["A", "AAAA", "CNAME"]);
  const currentWeb = records.filter(
    (record) =>
      [DOMAIN, `www.${DOMAIN}`].includes(record.name) &&
      managedTypes.has(record.type)
  );

  for (const record of currentWeb) {
    const keep = desired.some(
      (item) =>
        item.type === record.type &&
        item.name === record.name &&
        item.content.replace(/\.$/, "") === record.content.replace(/\.$/, "")
    );
    if (!keep) {
      await cf(DNS_TOKEN, `/zones/${ZONE_ID}/dns_records/${record.id}`, {
        method: "DELETE",
      });
      console.log(`Removed ${record.type} ${record.name} -> ${record.content}`);
    }
  }

  const refreshed = await dnsRecords();
  for (const item of desired) {
    const existing = refreshed.find(
      (record) =>
        record.type === item.type &&
        record.name === item.name &&
        record.content.replace(/\.$/, "") === item.content.replace(/\.$/, "")
    );
    if (!existing) {
      await createDnsRecord(item.type, item.name, item.content);
      console.log(`Created ${item.type} ${item.name} -> ${item.content}`);
    } else if (existing.proxied !== PROXY_WEB) {
      await cf(DNS_TOKEN, `/zones/${ZONE_ID}/dns_records/${existing.id}`, {
        method: "PATCH",
        body: JSON.stringify({ proxied: PROXY_WEB }),
      });
      console.log(
        `Set ${item.type} ${item.name} to ${PROXY_WEB ? "Cloudflare proxied" : "DNS-only"}`
      );
    }
  }
}

async function enableEmailRouting() {
  if (!EMAIL_TOKEN) {
    throw new Error("CLOUDFLARE_EMAIL_API_TOKEN is required for Email Routing");
  }
  let settings = await cf(EMAIL_TOKEN, `/zones/${ZONE_ID}/email/routing`);
  if (!settings.enabled || settings.status !== "ready") {
    settings = await cf(
      EMAIL_TOKEN,
      `/zones/${ZONE_ID}/email/routing/enable`,
      { method: "POST", body: "{}" }
    );
    console.log(`Email Routing: ${settings.status || "enabled"}`);
  }
  return settings;
}

function literalAddress(rule) {
  return rule.matchers?.find(
    (matcher) => matcher.type === "literal" && matcher.field === "to"
  )?.value;
}

async function upsertEmailRule(rules, address, destinations) {
  const existing = rules.find(
    (rule) => literalAddress(rule)?.toLocaleLowerCase() === address.toLocaleLowerCase()
  );
  const body = {
    name: `Forward ${address}`,
    enabled: true,
    matchers: [{ type: "literal", field: "to", value: address }],
    actions: [{ type: "forward", value: destinations }],
  };
  if (existing) {
    await cf(
      EMAIL_TOKEN,
      `/zones/${ZONE_ID}/email/routing/rules/${existing.id}`,
      { method: "PUT", body: JSON.stringify(body) }
    );
    console.log(`Updated email route ${address}`);
  } else {
    await cf(EMAIL_TOKEN, `/zones/${ZONE_ID}/email/routing/rules`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    console.log(`Created email route ${address}`);
  }
}

async function configureEmail() {
  await enableEmailRouting();
  if (!ACCOUNT_ID) {
    throw new Error("Cloudflare account ID was not available from the zone");
  }
  let addresses;
  try {
    addresses = await cf(
      EMAIL_TOKEN,
      `/accounts/${ACCOUNT_ID}/email/routing/addresses?per_page=200`
    );
  } catch (error) {
    throw new Error(
      `The Cloudflare email token needs account-level Email Routing Addresses: Edit permission to verify forwarding destinations. ${error.message}`
    );
  }
  const pending = [];
  for (const email of [...new Set(FORWARD_TO)]) {
    let address = addresses.find(
      (item) => item.email?.toLocaleLowerCase() === email.toLocaleLowerCase()
    );
    if (!address) {
      address = await cf(
        EMAIL_TOKEN,
        `/accounts/${ACCOUNT_ID}/email/routing/addresses`,
        { method: "POST", body: JSON.stringify({ email }) }
      );
      console.log(`Sent Cloudflare verification email to ${email}`);
    }
    if (!address.verified) pending.push(email);
  }
  if (pending.length) {
    throw new Error(
      `Verify these Cloudflare Email Routing destinations, then run --apply again: ${pending.join(", ")}`
    );
  }
  const rules = await cf(
    EMAIL_TOKEN,
    `/zones/${ZONE_ID}/email/routing/rules?per_page=200`
  );
  const destinations = [...new Set(FORWARD_TO)];
  await upsertEmailRule(rules, INFO_ADDRESS, destinations);
  await upsertEmailRule(rules, QUOTES_ADDRESS, destinations);
}

const zone = await zoneInfo();
const records = await dnsRecords();

if (!APPLY) {
  console.log(
    JSON.stringify(
      {
        mode: "inspect",
        zone: {
          name: zone.name,
          status: zone.status,
          nameServers: zone.name_servers,
        },
        pagesTarget: PAGES_TARGET,
        dns: relevantRecords(records),
        email: await emailStatus(),
      },
      null,
      2
    )
  );
} else {
  await reconcileDns(records);
  if (!WEB_ONLY) await configureEmail();
  const finalRecords = await dnsRecords();
  console.log(
    JSON.stringify(
      {
        mode: "applied",
        domain: DOMAIN,
        pagesTarget: PAGES_TARGET,
        dns: relevantRecords(finalRecords),
        email: await emailStatus(),
      },
      null,
      2
    )
  );
}
