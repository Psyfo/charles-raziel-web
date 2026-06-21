import { ImageResponse } from "next/og";

export const alt = "Charles Raziel — Video & Cinematography";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0b0a08";
const BONE = "#f5f2ea";
const BRASS = "#c8a24a";
const MUTED = "#afa68e";

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
          background: INK,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              border: `4px solid ${BRASS}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: BRASS }} />
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 30,
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: INK,
              }}
            />
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Brno · Central Europe
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 124,
              fontWeight: 600,
              lineHeight: 1,
              color: BONE,
              letterSpacing: -2,
            }}
          >
            Charles Raziel
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 28 }}>
            <div style={{ width: 64, height: 3, background: BRASS }} />
            <div
              style={{
                fontSize: 30,
                letterSpacing: 10,
                textTransform: "uppercase",
                color: BRASS,
              }}
            >
              Video &amp; Cinematography
            </div>
          </div>
        </div>

        <div style={{ fontSize: 28, color: MUTED, maxWidth: 760 }}>
          Visual storytelling through movement, shadow, and atmosphere.
        </div>
      </div>
    ),
    { ...size }
  );
}
