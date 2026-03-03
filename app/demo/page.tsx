import CelestialMatrixShader from "@/components/ui/martrix-shader";

export default function DemoOne() {
  return (
    <div className="app-container">
      <CelestialMatrixShader />
      <div
        className="overlay-content"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <h1
          className="title"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #60a5fa 0%, #34d399 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "1rem",
            lineHeight: 1.1,
          }}
        >
          Celestial Matrix
        </h1>
        <p
          className="description"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
            color: "rgba(255,255,255,0.6)",
            fontWeight: 400,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          An Interactive WebGL Shader
        </p>
      </div>
    </div>
  );
}
