import { ImageResponse } from "next/og";
import { BIZ } from "@/lib/business";
import { SERVICES } from "@/content/services";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  return [{ id: slug, alt: s ? `${s.name} — ${BIZ.name}` : BIZ.name, size, contentType }];
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

const ICONS: Record<string, string> = {
  "commercial-overhead-doors": "🏭",
  "rolling-steel-doors": "🏢",
  "loading-dock-equipment": "🚚",
  "high-speed-doors": "⚡",
  "fire-rated-doors": "🛡️",
  "hollow-metal-doors": "🚪",
  "automatic-operators": "⚙️",
  "storefront-entrances": "🪟",
  "security-grilles": "🔒",
  "emergency-commercial-repair": "🚨",
};

export default async function ServiceOg({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  const headline = s?.name ?? "Commercial door services";
  const tagline = s?.tagline ?? "Commercial door systems across Jersey City and the Meadowlands.";
  const icon = (s && ICONS[s.slug]) ?? "🚪";
  const bullets = (s?.bullets ?? []).slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          background:
            "radial-gradient(1100px 600px at 85% -10%, rgba(34,211,238,0.28), transparent 60%)," +
            "radial-gradient(900px 700px at -10% 110%, rgba(34,211,238,0.16), transparent 55%)," +
            "linear-gradient(180deg, #0B0E12 0%, #0B0E12 100%)",
          color: "#F4F1EA",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #0E7490 0%, #22D3EE 35%, #67E8F9 55%, #22D3EE 70%, #0E7490 100%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "linear-gradient(135deg, #22D3EE 0%, #0E7490 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
              }}
            >
              🚪
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1 }}>
                {BIZ.name.toUpperCase()}
              </div>
              <div style={{ fontSize: 15, color: "#22D3EE", marginTop: 4, letterSpacing: 2, fontWeight: 700 }}>
                JERSEY CITY · MEADOWLANDS
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid rgba(34,211,238,0.45)",
              background: "rgba(34,211,238,0.10)",
              color: "#67E8F9",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            SUPPLY · INSTALL · REPAIR
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: 36,
              background: "linear-gradient(135deg, rgba(34,211,238,0.18), rgba(34,211,238,0.04))",
              border: "2px solid rgba(34,211,238,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 110,
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: -1.5,
                backgroundImage: "linear-gradient(135deg, #A5F3FC 0%, #22D3EE 55%, #0E7490 100%)",
                backgroundClip: "text",
                color: "transparent",
                display: "flex",
              }}
            >
              {headline}
            </div>
            <div style={{ fontSize: 26, color: "#C8C4BB", display: "flex", maxWidth: 820 }}>
              {tagline}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", flex: 1 }}>
            {bullets.map((b) => (
              <div
                key={b}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 18px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#E2DED5",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                ✓ {b}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              padding: "14px 22px",
              borderRadius: 16,
              background: "linear-gradient(135deg, rgba(34,211,238,0.22), rgba(34,211,238,0.06))",
              border: "1px solid rgba(34,211,238,0.55)",
            }}
          >
            <div style={{ fontSize: 14, color: "#22D3EE", letterSpacing: 2, fontWeight: 700, display: "flex" }}>
              {BIZ.phone ? "CALL" : "FREE QUOTE"}
            </div>
            <div style={{ fontSize: 22, color: "#A5F3FC", fontWeight: 900, letterSpacing: -0.5, display: "flex" }}>
              {BIZ.phone || BIZ.url.replace(/^https?:\/\//, "")}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
