// src/components/ReactBits/LiquidMetal.jsx
// Terinspirasi dari ReactBits "Liquid Metal" / "Aurora" background
// WebGL shader — efek liquid ether mengalir

import { useEffect, useRef } from "react";

// ── Vertex Shader ──
const VERT = `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

// ── Fragment Shader: Liquid Metal / Ether ──
const FRAG = `
  precision highp float;
  uniform float u_time;
  uniform vec2  u_resolution;
  uniform vec3  u_color1;
  uniform vec3  u_color2;
  uniform vec3  u_color3;
  uniform float u_speed;
  uniform float u_intensity;

  // Hash / noise helpers
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
          dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
      mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
          dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2  shift = vec2(100.0);
    mat2  rot   = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 7; i++) {
      v += a * noise(p);
      p  = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;

    float t = u_time * u_speed;

    // ── Domain-warped FBM ──
    vec2 q = vec2(fbm(uv + vec2(0.0, 0.0)),
                  fbm(uv + vec2(5.2, 1.3)));

    vec2 r = vec2(fbm(uv + 4.0 * q + vec2(1.7 + t * 0.15, 9.2 + t * 0.10)),
                  fbm(uv + 4.0 * q + vec2(8.3 + t * 0.12, 2.8 + t * 0.18)));

    float f = fbm(uv + 4.5 * r + vec2(t * 0.08));
    f = (f + 1.0) * 0.5; // remap to [0,1]

    // ── Metallic sheen overlay ──
    float sheen = pow(clamp(noise(uv * 3.0 + t * 0.4), 0.0, 1.0), 2.0) * 0.4;
    float rim   = 1.0 - smoothstep(0.3, 0.9, length(uv * 0.5));

    // ── Color mixing ──
    vec3 col = mix(u_color1, u_color2, clamp(f * f * 4.0, 0.0, 1.0));
    col = mix(col, u_color3, clamp(length(q), 0.0, 1.0));
    col += sheen * vec3(0.8, 0.85, 1.0);
    col *= 0.6 + 0.4 * f;
    col *= rim;

    // ── Dark base ──
    col = mix(vec3(0.01, 0.02, 0.05), col, u_intensity * clamp(f + 0.15, 0.0, 1.0));

    // ── Vignette ──
    float vignette = 1.0 - smoothstep(0.5, 1.4, length(uv * 0.6));
    col *= vignette;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function hexToVec3(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

function compileShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function LiquidMetal({
  colors = ["#0a0a2e", "#6366f1", "#22d3ee"],
  speed = 0.25,
  intensity = 0.85,
  style = {},
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    // Compile
    const vert = compileShader(gl, gl.VERTEX_SHADER, VERT);
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Geometry (full-screen quad)
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const U = {
      time: gl.getUniformLocation(prog, "u_time"),
      res: gl.getUniformLocation(prog, "u_resolution"),
      c1: gl.getUniformLocation(prog, "u_color1"),
      c2: gl.getUniformLocation(prog, "u_color2"),
      c3: gl.getUniformLocation(prog, "u_color3"),
      spd: gl.getUniformLocation(prog, "u_speed"),
      inten: gl.getUniformLocation(prog, "u_intensity"),
    };

    const [c1, c2, c3] = colors.map(hexToVec3);
    gl.uniform3fv(U.c1, c1);
    gl.uniform3fv(U.c2, c2);
    gl.uniform3fv(U.c3, c3);
    gl.uniform1f(U.spd, speed);
    gl.uniform1f(U.inten, intensity);

    const resize = () => {
      // Render at half resolution for perf, display full size
      canvas.width = Math.floor(canvas.offsetWidth * 0.6);
      canvas.height = Math.floor(canvas.offsetHeight * 0.6);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(U.res, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let animId,
      start = null;
    const render = (ts) => {
      if (!start) start = ts;
      gl.uniform1f(U.time, (ts - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      gl.deleteProgram(prog);
    };
  }, [colors, speed, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        imageRendering: "auto",
        ...style,
      }}
    />
  );
}
