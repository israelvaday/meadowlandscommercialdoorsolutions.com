import { NextResponse } from "next/server";
import { BIZ } from "@/lib/business";

export const runtime = "nodejs";

const ALLOWED_ORIGINS = new Set([
  BIZ.url,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
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

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;
const MAX_FILES = 6;
const ALLOWED = new Set([
  "image/jpeg", "image/png", "image/webp", "image/heic", "image/heif",
  "application/pdf",
]);

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

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const withCors = (res: NextResponse) => {
    for (const [k, v] of Object.entries(corsHeaders(origin))) res.headers.set(k, v);
    return res;
  };

  const ctype = req.headers.get("content-type") || "";
  let fields: QuoteFields = { name: "", phone: "", email: "", location: "", service: "", property: "", urgency: "", message: "" };
  const attachments: { filename: string; content: string; contentType: string }[] = [];

  try {
    if (ctype.includes("multipart/form-data")) {
      const form = await req.formData();
      fields = {
        name: String(form.get("name") || ""),
        phone: String(form.get("phone") || ""),
        email: String(form.get("email") || ""),
        location: String(form.get("location") || ""),
        service: String(form.get("service") || ""),
        property: String(form.get("property") || ""),
        urgency: String(form.get("urgency") || ""),
        message: String(form.get("message") || ""),
      };
      const files = form.getAll("files");
      let total = 0;
      for (const f of files) {
        if (!(f instanceof File)) continue;
        if (attachments.length >= MAX_FILES) break;
        if (!ALLOWED.has(f.type)) {
          return withCors(NextResponse.json({ error: `Unsupported file type: ${f.type}` }, { status: 400 }));
        }
        if (f.size > MAX_FILE_BYTES) {
          return withCors(NextResponse.json({ error: `File too large: ${f.name}` }, { status: 400 }));
        }
        total += f.size;
        if (total > MAX_TOTAL_BYTES) {
          return withCors(NextResponse.json({ error: "Total upload exceeds 20 MB" }, { status: 400 }));
        }
        const buf = Buffer.from(await f.arrayBuffer());
        attachments.push({
          filename: f.name || "attachment",
          content: buf.toString("base64"),
          contentType: f.type,
        });
      }
    } else {
      const body = await req.json();
      fields = { ...fields, ...body };
    }
  } catch {
    return withCors(NextResponse.json({ error: "Invalid request" }, { status: 400 }));
  }

  if (!fields.name || !fields.phone || !fields.service) {
    return withCors(NextResponse.json({ error: "Missing required fields" }, { status: 400 }));
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = quoteRecipients();
  const from = process.env.QUOTE_FROM_EMAIL || `${BIZ.name} <onboarding@resend.dev>`;

  if (!apiKey) {
    console.warn("[quote] RESEND_API_KEY not set — accepting quote without email.", {
      ...fields,
      attachmentCount: attachments.length,
    });
    return withCors(NextResponse.json({ ok: true, queued: false }));
  }

  const html = renderQuoteEmail(fields, attachments.length);
  const text = renderQuoteText(fields, attachments.length);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `Door quote — ${fields.service} — ${fields.name}${fields.urgency ? " (" + fields.urgency + ")" : ""}`,
        html,
        text,
        reply_to: fields.email || undefined,
        attachments: attachments.length ? attachments : undefined,
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error("[quote] resend error", res.status, errText);
      return withCors(NextResponse.json({ ok: false, error: "Email failed" }, { status: 502 }));
    }
    return withCors(NextResponse.json({ ok: true }));
  } catch (err) {
    console.error("[quote] exception", err);
    return withCors(NextResponse.json({ ok: false, error: "Server error" }, { status: 500 }));
  }
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function quoteRecipients(): string[] {
  const raw = process.env.QUOTE_TO_EMAIL;
  const list = raw
    ? raw.split(/[,;]/).map((s) => s.trim()).filter(Boolean)
    : [...BIZ.quoteNotifyEmails];
  return [...new Set(list)];
}

function renderQuoteText(f: QuoteFields, count: number): string {
  return [
    `New door quote request — ${BIZ.name}`,
    "",
    `Name:     ${f.name}`,
    `Phone:    ${f.phone}`,
    `Email:    ${f.email || "—"}`,
    `Location: ${f.location || "—"}`,
    `Service:  ${f.service}`,
    `Property: ${f.property || "—"}`,
    `Timing:   ${f.urgency || "—"}`,
    `Attachments: ${count}`,
    "",
    "Details:",
    f.message || "—",
  ].join("\n");
}

function toTelHref(raw: string): string {
  const trimmed = (raw || "").trim();
  const digits = trimmed.replace(/[^0-9]/g, "");
  if (!digits) return "";
  if (trimmed.startsWith("+")) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
}

function renderQuoteEmail(f: QuoteFields, attachmentCount: number): string {
  const name = escapeHtml(f.name);
  const phone = escapeHtml(f.phone);
  const phoneHref = toTelHref(f.phone);
  const email = escapeHtml(f.email);
  const location = escapeHtml(f.location || "—");
  const service = escapeHtml(prettyLabel(f.service));
  const property = escapeHtml(prettyLabel(f.property));
  const urgency = escapeHtml(prettyLabel(f.urgency));
  const message = escapeHtml(f.message || "—").replace(/\n/g, "<br>");
  const urgencyColor = timingTone(f.urgency);
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>New quote request</title>
</head>
<body style="margin:0;padding:0;background:#0b1220;font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;color:#e6ecf5;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#0b1220">
    New quote — ${service} — ${name} — ${phone}
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0b1220;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background:#0f172a;border:1px solid #1f2a44;border-radius:20px;overflow:hidden;box-shadow:0 25px 60px -20px rgba(0,0,0,0.6);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0b1220 0%,#1a2548 60%,#3a2a10 100%);padding:28px 28px 22px 28px;border-bottom:1px solid #b58a3a33;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align:middle">
                    <div style="display:inline-block;background:#0b1220;border:1.5px solid #b58a3a;border-radius:14px;padding:8px 14px;">
                      <span style="font-family:Georgia,serif;font-size:15px;font-weight:bold;color:#e6c266;letter-spacing:0.5px">${escapeHtml(BIZ.name)}</span>
                      <span style="display:inline-block;width:6px;height:6px;background:#e6c266;border-radius:50%;margin:0 8px;vertical-align:middle"></span>
                      <span style="font-family:Georgia,serif;font-size:12px;font-weight:bold;color:#e6c266;letter-spacing:1.2px">BROOKLYN · NYC</span>
                    </div>
                  </td>
                  <td align="right" style="vertical-align:middle">
                    <span style="display:inline-block;background:${urgencyColor.bg};color:${urgencyColor.fg};border:1px solid ${urgencyColor.fg}55;border-radius:999px;padding:6px 12px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase">${urgency || "Lead"}</span>
                  </td>
                </tr>
              </table>
              <h1 style="margin:18px 0 4px 0;font-size:24px;line-height:1.25;color:#ffffff;font-weight:800;letter-spacing:-0.3px">New door quote request</h1>
              <p style="margin:0;color:#9aa6c1;font-size:13px;">Submitted ${submittedAt} • Brooklyn, NY</p>
            </td>
          </tr>

          <!-- Hero summary card -->
          <tr>
            <td style="padding:24px 28px 8px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0b1220;border:1px solid #1f2a44;border-radius:14px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <p style="margin:0 0 6px 0;font-size:11px;font-weight:700;color:#b58a3a;letter-spacing:1.5px;text-transform:uppercase">Service requested</p>
                    <p style="margin:0;font-size:20px;font-weight:800;color:#ffffff;line-height:1.3">${service}</p>
                    <p style="margin:6px 0 0 0;font-size:13px;color:#9aa6c1">${property} • ${location}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact block -->
          <tr>
            <td style="padding:8px 28px 4px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td width="50%" style="padding:10px 8px 10px 0;vertical-align:top">
                    <div style="background:#0b1220;border:1px solid #1f2a44;border-radius:12px;padding:14px 16px">
                      <p style="margin:0 0 4px 0;font-size:10px;font-weight:700;color:#b58a3a;letter-spacing:1.5px;text-transform:uppercase">Customer</p>
                      <p style="margin:0;font-size:16px;font-weight:700;color:#ffffff">${name}</p>
                    </div>
                  </td>
                  <td width="50%" style="padding:10px 0 10px 8px;vertical-align:top">
                    <div style="background:#0b1220;border:1px solid #1f2a44;border-radius:12px;padding:14px 16px">
                      <p style="margin:0 0 4px 0;font-size:10px;font-weight:700;color:#b58a3a;letter-spacing:1.5px;text-transform:uppercase">Phone</p>
                      <a href="tel:${phoneHref}" style="text-decoration:none;color:#e6c266;font-size:16px;font-weight:700;font-family:'Courier New',monospace">${phone}</a>
                    </div>
                  </td>
                </tr>
                ${
                  email
                    ? `<tr><td colspan="2" style="padding:0 0 10px 0">
                        <div style="background:#0b1220;border:1px solid #1f2a44;border-radius:12px;padding:14px 16px">
                          <p style="margin:0 0 4px 0;font-size:10px;font-weight:700;color:#b58a3a;letter-spacing:1.5px;text-transform:uppercase">Email</p>
                          <a href="mailto:${email}" style="text-decoration:none;color:#9ec5ff;font-size:14px">${email}</a>
                        </div>
                      </td></tr>`
                    : ""
                }
              </table>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding:8px 28px 16px 28px;">
              <div style="background:#0b1220;border:1px solid #1f2a44;border-radius:12px;padding:16px 18px">
                <p style="margin:0 0 8px 0;font-size:10px;font-weight:700;color:#b58a3a;letter-spacing:1.5px;text-transform:uppercase">Details from customer</p>
                <p style="margin:0;font-size:14px;line-height:1.55;color:#e6ecf5;white-space:pre-line">${message}</p>
              </div>
            </td>
          </tr>

          ${
            attachmentCount > 0
              ? `<tr><td style="padding:0 28px 16px 28px">
                  <div style="background:#1a2240;border:1px solid #b58a3a55;border-radius:12px;padding:12px 16px">
                    <p style="margin:0;font-size:13px;color:#e6c266"><b>📎 ${attachmentCount} attachment${attachmentCount === 1 ? "" : "s"}</b> — see the files included with this email.</p>
                  </div>
                </td></tr>`
              : ""
          }

          <!-- CTA -->
          <tr>
            <td style="padding:8px 28px 24px 28px;" align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:0 6px">
                    <a href="tel:${phoneHref}" style="display:inline-block;background:#e6c266;color:#0b1220;text-decoration:none;font-weight:800;font-size:14px;padding:14px 22px;border-radius:12px;letter-spacing:0.3px">📞 Call ${name.split(" ")[0]}</a>
                  </td>
                  <td style="padding:0 6px">
                    <a href="sms:${phoneHref}" style="display:inline-block;background:transparent;color:#e6c266;text-decoration:none;font-weight:700;font-size:14px;padding:13px 20px;border-radius:12px;border:1.5px solid #e6c266">💬 Text</a>
                  </td>
                  ${
                    email
                      ? `<td style="padding:0 6px">
                          <a href="mailto:${email}?subject=${encodeURIComponent(`Re: Your ${BIZ.name} door quote`)}" style="display:inline-block;background:transparent;color:#e6c266;text-decoration:none;font-weight:700;font-size:14px;padding:13px 20px;border-radius:12px;border:1.5px solid #e6c266">✉ Reply</a>
                        </td>`
                      : ""
                  }
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 28px;border-top:1px solid #1f2a44;background:#0a1020">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="font-size:11px;color:#6b7794;line-height:1.6">
                    <b style="color:#9aa6c1">${escapeHtml(BIZ.name)}</b><br>
                    Door services • Brooklyn, Manhattan & Queens, NY<br>
                    <a href="${escapeHtml(BIZ.url)}" style="color:#b58a3a;text-decoration:none">${escapeHtml(BIZ.url.replace(/^https?:\/\//, ""))}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <p style="margin:14px 0 0 0;font-size:11px;color:#4a5475">Auto-sent from your website. Reply to this email to respond to the customer directly.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function prettyLabel(s: string): string {
  if (!s) return "—";
  return s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function timingTone(u: string): { bg: string; fg: string } {
  const key = (u || "").toLowerCase();
  if (key.includes("as soon") || key.includes("asap")) return { bg: "#3a2410", fg: "#ffa94d" };
  if (key.includes("week") || key.includes("month")) return { bg: "#102a3a", fg: "#5cc4ff" };
  return { bg: "#1a2240", fg: "#e6c266" };
}
