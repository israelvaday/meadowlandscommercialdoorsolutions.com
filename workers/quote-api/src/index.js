const BIZ_NAME = "Meadowlands Commercial Door Solutions";

function corsHeaders(origin, siteOrigin) {
  const allow = origin === siteOrigin ? origin : siteOrigin;
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildText(fields) {
  return [
    `New door quote request — ${BIZ_NAME}`,
    "",
    `Name:     ${fields.name}`,
    `Phone:    ${fields.phone}`,
    `Email:    ${fields.email || "—"}`,
    `Location: ${fields.location || "—"}`,
    `Service:  ${fields.service}`,
    `Property: ${fields.property || "—"}`,
    `Timing:   ${fields.urgency || "—"}`,
    "",
    "Details:",
    fields.message || "—",
  ].join("\n");
}

function buildHtml(fields) {
  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:24px;font-family:Segoe UI,Arial,sans-serif;background:#0b0e12;color:#e7e5e4;">
  <div style="max-width:560px;margin:0 auto;background:#111827;border:1px solid #374151;border-radius:12px;padding:24px;">
    <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#d4a24c;text-transform:uppercase;letter-spacing:0.08em;">New quote request</p>
    <h1 style="margin:0 0 4px;font-size:22px;color:#fff;">${escapeHtml(fields.service)}</h1>
    <p style="margin:0 0 20px;color:#9ca3af;font-size:13px;">Submitted ${submittedAt}</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#e5e7eb;">
      <tr><td style="padding:8px 0;color:#9ca3af;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(fields.name)}</td></tr>
      <tr><td style="padding:8px 0;color:#9ca3af;">Phone</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(fields.phone)}</td></tr>
      <tr><td style="padding:8px 0;color:#9ca3af;">Email</td><td style="padding:8px 0;">${escapeHtml(fields.email || "—")}</td></tr>
      <tr><td style="padding:8px 0;color:#9ca3af;">Location</td><td style="padding:8px 0;">${escapeHtml(fields.location || "—")}</td></tr>
      <tr><td style="padding:8px 0;color:#9ca3af;">Property</td><td style="padding:8px 0;">${escapeHtml(fields.property || "—")}</td></tr>
      <tr><td style="padding:8px 0;color:#9ca3af;">Timing</td><td style="padding:8px 0;">${escapeHtml(fields.urgency || "—")}</td></tr>
    </table>
    <div style="margin-top:20px;padding:16px;background:#0b0e12;border-radius:8px;border:1px solid #374151;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;">Details</p>
      <p style="margin:0;white-space:pre-wrap;line-height:1.5;">${escapeHtml(fields.message || "—")}</p>
    </div>
  </div>
</body>
</html>`;
}

export default {
  async fetch(request, env) {
    const siteOrigin = env.SITE_ORIGIN || "https://meadowlandscommercialdoorsolutions.com";
    const origin = request.headers.get("Origin") || "";
    const headers = corsHeaders(origin, siteOrigin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers });
    }

    let fields;
    try {
      fields = await request.json();
    } catch {
      return Response.json({ error: "Invalid JSON" }, { status: 400, headers });
    }

    const name = String(fields.name || "").trim();
    const phone = String(fields.phone || "").trim();
    const location = String(fields.location || "").trim();
    const service = String(fields.service || "").trim();

    if (!name || !phone || !service || !location) {
      return Response.json({ error: "Missing required fields" }, { status: 400, headers });
    }

    const payload = {
      name,
      phone,
      email: String(fields.email || "").trim(),
      location,
      service,
      property: String(fields.property || "").trim(),
      urgency: String(fields.urgency || "").trim(),
      message: String(fields.message || "").trim(),
    };

    try {
      await env.EMAIL.send({
        from: env.FROM_EMAIL,
        to: env.QUOTE_TO,
        replyTo: payload.email || undefined,
        subject: `Door quote — ${payload.service} — ${payload.location} — ${payload.name}`,
        text: buildText(payload),
        html: buildHtml(payload),
      });
      return Response.json({ ok: true }, { headers });
    } catch (error) {
      console.error("[quote-api]", error);
      return Response.json({ ok: false, error: "Email failed" }, { status: 502, headers });
    }
  },
};
