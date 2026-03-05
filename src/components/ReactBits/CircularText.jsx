// src/components/ReactBits/CircularText.jsx
// Sumber: reactbits.dev/text-animations/circular-text
import { motion } from "motion/react";

export default function CircularText({
  text = "",
  spinDuration = 20,
  className = "",
  radius = 60,
  fontSize = 12,
  onHover = "slowDown",
}) {
  const chars = text.split("");
  const angleStep = 360 / chars.length;

  return (
    <motion.div
      className={className}
      style={{
        position: "relative",
        width: radius * 2 + 20,
        height: radius * 2 + 20,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: spinDuration, repeat: Infinity, ease: "linear" }}
      whileHover={
        onHover === "slowDown"
          ? { animationDuration: `${spinDuration * 3}s` }
          : {}
      }
    >
      {chars.map((char, i) => {
        const angle = i * angleStep;
        const rad = (angle * Math.PI) / 180;
        const x = radius + radius * Math.sin(rad);
        const y = radius - radius * Math.cos(rad);
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              fontSize,
              transformOrigin: "center",
            }}
          >
            {char}
          </span>
        );
      })}
    </motion.div>
  );
}
