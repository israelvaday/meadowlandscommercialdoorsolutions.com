import { ImageResponse } from "next/og";
import { BIZ } from "@/lib/business";

export const dynamic = "force-static";
export const alt = `${BIZ.name} — Jersey City commercial door systems`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "radial-gradient(1100px 600px at 80% -10%, rgba(34,211,238,0.22), transparent 60%)," +
            "radial-gradient(900px 700px at -10% 110%, rgba(34,211,238,0.14), transparent 55%)," +
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

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 18,
              background: "linear-gradient(135deg, #22D3EE 0%, #0E7490 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              boxShadow: "0 10px 30px rgba(34,211,238,0.35)",
            }}
          >
            🚪
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.1 }}>
              {BIZ.name.toUpperCase()}
            </div>
            <div style={{ fontSize: 18, color: "#22D3EE", marginTop: 6, letterSpacing: 2, fontWeight: 700 }}>
              JERSEY CITY · MEADOWLANDS
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: -2,
              backgroundImage: "linear-gradient(135deg, #A5F3FC 0%, #22D3EE 55%, #0E7490 100%)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
            }}
          >
            Overhead · Dock · Storefront · Repair
          </div>
          <div style={{ fontSize: 28, color: "#C8C4BB", maxWidth: 980, display: "flex" }}>
            Commercial overhead, rolling steel, dock, and storefront systems. Free estimates.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <Chip>WRITTEN SCOPES</Chip>
          <Chip>{BIZ.phone || "FREE QUOTE"}</Chip>
          <Chip>{BIZ.url.replace(/^https?:\/\//, "")}</Chip>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, fontSize: 22, color: "#C8C4BB" }}>
            Jersey City · Hudson · Meadowlands
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 18px",
        borderRadius: 999,
        border: "1px solid rgba(34,211,238,0.45)",
        background: "rgba(34,211,238,0.08)",
        color: "#67E8F9",
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: 1,
      }}
    >
      {children}
    </div>
  );
}
