import { NextResponse } from "next/server";
import { BIZ } from "@/lib/business";

export const runtime = "nodejs";

const ALLOWED_ORIGINS = new Set([
  BIZ.url,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
]);

function corsHeaders(origin: string | null) {
  const allow =
    origin && ALLOWED_ORIGINS.has(origin) ? origin : BIZ.url;
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(req.headers.get("origin")),
  });
}

type QuoteFields = {
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  property: string;
  urgency: string;
  message: string;
};

/** Local dev stub — production uses the Cloudflare Worker at QUOTE_API_URL. */
export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const withCors = (res: NextResponse) => {
    for (const [k, v] of Object.entries(corsHeaders(origin))) res.headers.set(k, v);
    return res;
  };

  let fields: QuoteFields = {
    name: "",
    phone: "",
    email: "",
    location: "",
    service: "",
    property: "",
    urgency: "",
    message: "",
  };

  try {
    fields = { ...fields, ...(await req.json()) };
  } catch {
    return withCors(NextResponse.json({ error: "Invalid request" }, { status: 400 }));
  }

  if (!fields.name || !fields.phone || !fields.service || !fields.location) {
    return withCors(NextResponse.json({ error: "Missing required fields" }, { status: 400 }));
  }

  console.info("[quote] local stub — deploy Cloudflare Worker for email delivery", fields);
  return withCors(NextResponse.json({ ok: true, stub: true }));
}
