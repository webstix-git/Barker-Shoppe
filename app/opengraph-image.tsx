import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Barker Shoppe — Dog Daycare, Boarding & Grooming in Springfield, MO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default Open Graph / social share image. */
export default function OpenGraphImage() {
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
          background: "linear-gradient(145deg, #0d2c38 0%, #164556 48%, #2396ce 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#b4d1da",
          }}
        >
          Springfield, Missouri
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            The Barker Shoppe
          </div>
          <div style={{ fontSize: 34, fontWeight: 500, lineHeight: 1.3, color: "#e6f3f8", maxWidth: 900 }}>
            Dog daycare, overnight boarding, and professional grooming — dogs only.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#c9dbe1" }}>
          <span>barkershoppesgf.com</span>
          <span>(417) 501-1053</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
