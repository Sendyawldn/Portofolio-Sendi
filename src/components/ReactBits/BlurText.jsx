// src/components/ReactBits/BlurText.jsx
import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "motion/react";

function buildVariants(direction, delay, stepDelay, duration) {
  const yOffset = direction === "top" ? -20 : direction === "bottom" ? 20 : 0;
  const xOffset = direction === "left" ? -20 : direction === "right" ? 20 : 0;
  return (i) => ({
    hidden: { filter: "blur(10px)", opacity: 0, x: xOffset, y: yOffset },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: delay / 1000 + i * (stepDelay / 1000),
        duration,
        ease: "easeOut",
      },
    },
  });
}

export default function BlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  stepDelay = 80,
  duration = 0.5,
  onAnimationComplete,
  style = {}, // ← destructure style agar tidak masuk ke ...rest
  ...rest // ← sisa props (TIDAK termasuk style)
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold, rootMargin });
  const items = animateBy === "words" ? text.split(" ") : text.split("");
  const variants = buildVariants(direction, delay, stepDelay, duration);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <p
      ref={ref}
      className={className}
      style={{
        // ── base layout — HARUS di sini agar tidak bisa tertimpa ──
        display: "flex",
        flexWrap: "wrap",
        // gap antar kata: gabungkan rowGap dan columnGap
        rowGap: "0.1em",
        columnGap: "0.35em",
        // ── style dari props di-merge setelahnya ──
        ...style,
      }}
      {...rest}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate={controls}
          variants={variants(i)}
          onAnimationComplete={
            i === items.length - 1 ? onAnimationComplete : undefined
          }
          style={{ display: "inline-block" }}
        >
          {item}
        </motion.span>
      ))}
    </p>
  );
}
