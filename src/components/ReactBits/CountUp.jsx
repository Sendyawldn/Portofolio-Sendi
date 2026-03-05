// src/components/ReactBits/CountUp.jsx
// Sumber: reactbits.dev/text-animations/count-up
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const [displayValue, setDisplayValue] = useState(
    direction === "down" ? to : from,
  );

  useEffect(() => {
    if (!inView || !startWhen) return;
    if (typeof onStart === "function") onStart();

    let startTime = null;
    const startVal = direction === "down" ? to : from;
    const endVal = direction === "down" ? from : to;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (endVal - startVal) * ease);
      setDisplayValue(current);
      if (progress < 1) requestAnimationFrame(step);
      else if (typeof onEnd === "function") onEnd();
    };

    const timer = setTimeout(() => requestAnimationFrame(step), delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, startWhen]);

  const format = (n) => {
    if (!separator) return n.toString();
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  };

  return (
    <span ref={ref} className={className}>
      {format(displayValue)}
    </span>
  );
}
