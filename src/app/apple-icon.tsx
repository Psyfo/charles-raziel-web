import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0a08",
        }}
      >
        <div
          style={{
            width: 112,
            height: 112,
            borderRadius: "50%",
            border: "7px solid #c8a24a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#c8a24a" }} />
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 50,
              width: 62,
              height: 62,
              borderRadius: "50%",
              background: "#0b0a08",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
