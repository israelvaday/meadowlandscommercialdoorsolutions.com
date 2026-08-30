import { ImageResponse } from "next/og";
import { BIZ } from "@/lib/business";
import { AREAS_BY_SLUG, AREAS } from "@/lib/areas";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = AREAS_BY_SLUG[slug];
  return [{
    id: slug,
    alt: a ? `${a.name} door services — ${BIZ.name}` : `${BIZ.name} Service Area`,
    size,
    contentType,
  }];
}

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export default async function AreaOg({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = AREAS_BY_SLUG[slug];
  const name = a?.name ?? "Jersey City";
  const city = a?.city ?? "Jersey City";
  const sub = a && a.kind !== "city" ? `${city}` : "Jersey City, Hudson County & the Meadowlands";

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
            "radial-gradient(1000px 600px at 90% 10%, rgba(34,211,238,0.24), transparent 60%)," +
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
              COMMERCIAL DOORS · JERSEY CITY
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 40, display: "flex" }}>📍</div>
            <div style={{ fontSize: 22, color: "#22D3EE", letterSpacing: 3, fontWeight: 700, display: "flex" }}>
              SERVING
            </div>
          </div>
          <div
            style={{
              fontSize: 102,
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: -2.5,
              backgroundImage: "linear-gradient(135deg, #A5F3FC 0%, #22D3EE 55%, #0E7490 100%)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
            }}
          >
            {name}
          </div>
          <div style={{ fontSize: 28, color: "#C8C4BB", display: "flex" }}>
            Commercial overhead, dock, and entrance systems serving {sub}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <Chip>OVERHEAD</Chip>
            <Chip>DOCK</Chip>
            <Chip>FIRE-RATED</Chip>
            <Chip>REPAIR</Chip>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              padding: "12px 22px",
              borderRadius: 16,
              background: "linear-gradient(135deg, rgba(34,211,238,0.22), rgba(34,211,238,0.06))",
              border: "1px solid rgba(34,211,238,0.55)",
            }}
          >
            <div style={{ fontSize: 13, color: "#22D3EE", letterSpacing: 2, fontWeight: 700, display: "flex" }}>
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
