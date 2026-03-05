// src/components/ReactBits/Magnet.jsx
// Sumber: reactbits.dev/animations/magnet
import { useRef, useState } from "react";
import { motion } from "motion/react";

export default function Magnet({
  children,
  padding = 50,
  disabled = false,
  magnetStrength = 0.4,
  className = "",
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    if (disabled || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    setPosition({ x: dx * magnetStrength, y: dy * magnetStrength });
  };

  const onLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
      className={className}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
