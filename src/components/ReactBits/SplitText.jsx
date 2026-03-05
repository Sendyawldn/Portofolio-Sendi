// src/components/ReactBits/SplitText.jsx
import { useMemo, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "motion/react";

export default function SplitText({
  text = "",
  className = "",
  style = {},
  delay = 100,
  duration = 0.6,
  ease = "easeOut",
  splitBy = "characters",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.01,
  rootMargin = "0px",
  textAlign = "left",
  animateOnMount = false, // ← hero pakai ini = true, langsung main
  onLetterAnimationComplete,
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold, rootMargin });

  useEffect(() => {
    if (animateOnMount) {
      // Langsung trigger tanpa nunggu scroll
      const t = setTimeout(() => controls.start("visible"), 100);
      return () => clearTimeout(t);
    }
  }, [animateOnMount, controls]);

  useEffect(() => {
    if (!animateOnMount && inView) controls.start("visible");
  }, [inView, controls, animateOnMount]);

  const elements = useMemo(() => {
    if (splitBy === "characters") {
      return text.split("").map((char, i) => ({
        char: char === " " ? "\u00A0" : char,
        key: i,
      }));
    }
    if (splitBy === "words") {
      return text.split(" ").map((word, i) => ({ char: word, key: i }));
    }
    return text.split("\n").map((line, i) => ({ char: line, key: i }));
  }, [text, splitBy]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: textAlign === "center" ? "center" : "flex-start",
        ...style,
      }}
    >
      {elements.map(({ char, key }) => (
        <motion.span
          key={key}
          custom={key}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: from,
            visible: {
              ...to,
              transition: {
                delay: key * (delay / 1000),
                duration,
                ease,
              },
            },
          }}
          onAnimationComplete={
            key === elements.length - 1 ? onLetterAnimationComplete : undefined
          }
          style={{ display: "inline-block" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
