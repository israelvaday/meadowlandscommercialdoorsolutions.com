/** Cloudflare Worker endpoint — sends quote emails via Email Routing (no Resend). */
export const QUOTE_API_URL = (
  process.env.NEXT_PUBLIC_QUOTE_API_URL ||
  "https://meadowlandscommercialdoorsolutions.com/api/quote"
).replace(/\/$/, "");
