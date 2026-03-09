// src/components/ReactBits/ShinyText.jsx
import "./ShinyText.css";

export default function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = "",
  style = {},
}) {
  // Logika untuk memisahkan titik di akhir kata agar bisa diberi warna berbeda
  const displayText = text.endsWith(".") ? (
    <>
      {text.slice(0, -1)}
      <span style={{ color: "#6366f1", WebkitTextFillColor: "#6366f1" }}>
        .
      </span>
    </>
  ) : (
    text
  );

  return (
    <span
      className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
      style={{
        "--speed": `${speed}s`,
        ...style, // Memungkinkan style tambahan dari luar tetap masuk
      }}
    >
      {displayText}
    </span>
  );
}
