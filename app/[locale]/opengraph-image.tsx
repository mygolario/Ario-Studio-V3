import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Ario Studio | Premium Digital Experiences";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#030303",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              boxShadow: "0 0 40px rgba(139, 92, 246, 0.5)",
            }}
          />
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            background: "linear-gradient(to right, #fff, #aaa)",
            backgroundClip: "text",
            color: "transparent",
            fontFamily: "sans-serif",
            letterSpacing: "-0.05em",
            marginBottom: 20,
          }}
        >
          Ario Studio
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#888",
            fontFamily: "sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          Premium Digital Experiences
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
