import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/projects-data";

export const runtime = "edge";

export const alt = "Project Preview";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#030303",
            color: "white",
            fontSize: 48,
          }}
        >
          Project Not Found
        </div>
      ),
      { ...size }
    );
  }

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
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.3,
            background: `linear-gradient(to bottom right, ${
              (project.gradient || "from-gray-500/20 to-slate-500/20").split(" ")[0].replace("from-", "").replace("/20", "")
            }, ${
              (project.gradient || "from-gray-500/20 to-slate-500/20").split(" ")[1].replace("to-", "").replace("/20", "")
            })`,
            filter: "blur(100px)",
          }}
        />
        
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: "#8B5CF6",
              fontFamily: "sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            {project.category}
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              background: "linear-gradient(to bottom, #fff, #888)",
              backgroundClip: "text",
              color: "transparent",
              fontFamily: "sans-serif",
              letterSpacing: "-0.05em",
              textAlign: "center",
              lineHeight: 1,
              marginBottom: 30,
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
             <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              }}
            />
            <div
              style={{
                fontSize: 24,
                color: "#fff",
                fontFamily: "sans-serif",
              }}
            >
              Ario Studio
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
