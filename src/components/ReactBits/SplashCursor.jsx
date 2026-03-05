// src/components/ReactBits/SplashCursor.jsx
// Sumber: reactbits.dev/animations/splash-cursor
import { useEffect, useRef } from "react";

export default function SplashCursor({ color = "0.2, 0.5, 1.0" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let ripples = [];
    let mouse = { x: 0, y: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (Math.random() > 0.7) {
        ripples.push({
          x: mouse.x,
          y: mouse.y,
          r: 1,
          alpha: 0.6,
          maxR: 30 + Math.random() * 20,
        });
      }
    };
    window.addEventListener("mousemove", onMove);

    const onClick = (e) => {
      for (let i = 0; i < 5; i++) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          r: 1,
          alpha: 0.9,
          maxR: 60 + Math.random() * 40,
        });
      }
    };
    window.addEventListener("click", onClick);

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripples = ripples.filter((r) => r.alpha > 0.01);
      ripples.forEach((r) => {
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${color}, ${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        r.r += (r.maxR - r.r) * 0.1;
        r.alpha *= 0.92;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "screen",
      }}
    />
  );
}
