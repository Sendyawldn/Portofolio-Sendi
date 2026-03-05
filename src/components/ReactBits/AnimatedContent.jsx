// src/components/ReactBits/AnimatedContent.jsx
// Sumber: reactbits.dev/animations/animated-content
import { useRef } from "react";
import { motion, useInView } from "motion/react";

export default function AnimatedContent({
  children,
  distance = 50,
  direction = "vertical",
  duration = 0.6,
  delay = 0,
  ease = [0.25, 0.1, 0.25, 1],
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });

  const from = {
    opacity: animateOpacity ? initialOpacity : 1,
    x: direction === "horizontal" ? distance : 0,
    y: direction === "vertical" ? distance : 0,
    scale,
  };

  const to = { opacity: 1, x: 0, y: 0, scale: 1 };

  return (
    <motion.div
      ref={ref}
      initial={from}
      animate={inView ? to : from}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
