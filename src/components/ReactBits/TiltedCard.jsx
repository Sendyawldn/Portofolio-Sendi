// src/components/ReactBits/TiltedCard.jsx
// Sumber: reactbits.dev/components/tilted-card
import { useRef, useState } from "react";
import { motion } from "motion/react";

export default function TiltedCard({
  children,
  className = "",
  containerClassName = "",
  rotateAmplitude = 12,
  scaleOnHover = 1.05,
  borderRadius = "16px",
  showGlare = true,
}) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const onMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: -y * rotateAmplitude, y: x * rotateAmplitude });
    setGlare({
      x: ((e.clientX - left) / width) * 100,
      y: ((e.clientY - top) / height) * 100,
      opacity: 0.15,
    });
  };

  const onLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      className={containerClassName}
      style={{ perspective: "1000px", display: "inline-block", width: "100%" }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: tilt.x !== 0 || tilt.y !== 0 ? scaleOnHover : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={className}
        style={{
          transformStyle: "preserve-3d",
          borderRadius,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {children}
        {showGlare && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              borderRadius,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
              transition: "opacity 0.3s",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
