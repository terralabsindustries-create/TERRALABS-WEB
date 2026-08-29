import { ImageResponse } from "next/og";
import { site } from "../src/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time, so there is no binary asset to keep in sync with the brand.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0A0A0A 0%, #141414 55%, #0F0F0F 100%)",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 14, height: 44, background: "#FF5C39", borderRadius: 2 }} />
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 6,
              color: "#FF5C39",
              fontWeight: 700,
            }}
          >
            TERRALABS INDUSTRIES
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              lineHeight: 1.05,
              color: "#FFFFFF",
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            {site.tagline}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#9A9A9A", lineHeight: 1.3 }}>
            {site.descriptionShort}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #262626",
            paddingTop: 28,
            fontSize: 24,
            color: "#6F6F6F",
          }}
        >
          <div style={{ display: "flex" }}>Dubai, UAE</div>
          <div style={{ display: "flex" }}>
            {site.authority.replace(/ \(DIEZA\)$/, "")} · No. {site.licence}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
