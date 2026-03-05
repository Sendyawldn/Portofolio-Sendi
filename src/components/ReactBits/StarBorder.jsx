// src/components/ReactBits/StarBorder.jsx
// Sumber: reactbits.dev/components/star-border
import "./StarBorder.css";

export default function StarBorder({
  as: Tag = "button",
  children,
  className = "",
  color = "#6366f1",
  speed = "4s",
  style = {},
  ...props
}) {
  return (
    <Tag
      className={`star-border-wrapper ${className}`}
      style={{ "--border-color": color, "--anim-speed": speed, ...style }}
      {...props}
    >
      <span className="star-border-inner">{children}</span>
    </Tag>
  );
}
