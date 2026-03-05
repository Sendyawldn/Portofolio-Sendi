// src/components/ReactBits/Aurora.jsx
// Sumber: reactbits.dev/backgrounds/aurora
import { useEffect, useRef } from "react";

const VERT = `
  attribute vec2 a_pos;
  void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
  precision mediump float;
  uniform float u_time;
  uniform float u_amplitude;
  uniform float u_speed;
  uniform float u_blend;
  uniform vec2 u_resolution;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float smoothnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 6; i++) {
      v += amp * smoothnoise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float t = u_time * u_speed;
    vec2 p = uv * 3.0;
    float n = fbm(p + vec2(t * 0.3, t * 0.15)) * u_amplitude;
    float n2 = fbm(p + vec2(-t * 0.2, t * 0.25) + vec2(1.7, 9.2)) * u_amplitude;
    float band = smoothstep(0.0, 0.5, uv.y - 0.3 + n * 0.4);
    float band2 = smoothstep(0.0, 0.5, uv.y - 0.5 + n2 * 0.5);
    vec3 col = mix(u_color1, u_color2, band);
    col = mix(col, u_color3, band2 * 0.6);
    col = mix(vec3(0.01, 0.02, 0.06), col, clamp(n + n2, 0.0, 1.0) * u_blend);
    gl_FragColor = vec4(col, 1.0);
  }
`;

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

export default function Aurora({
  colorStops = ["#3A1C71", "#6366f1", "#22d3ee"],
  amplitude = 1.0,
  speed = 0.5,
  blend = 0.5,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vert = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vert, VERT);
    gl.compileShader(vert);
    const frag = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(frag, FRAG);
    gl.compileShader(frag);
    const prog = gl.createProgram();
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    gl.useProgram(prog);

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

    const u = {
      time: gl.getUniformLocation(prog, "u_time"),
      amp: gl.getUniformLocation(prog, "u_amplitude"),
      speed: gl.getUniformLocation(prog, "u_speed"),
      blend: gl.getUniformLocation(prog, "u_blend"),
      res: gl.getUniformLocation(prog, "u_resolution"),
      c1: gl.getUniformLocation(prog, "u_color1"),
      c2: gl.getUniformLocation(prog, "u_color2"),
      c3: gl.getUniformLocation(prog, "u_color3"),
    };

    const [r1, g1, b1] = hexToRgb(colorStops[0]);
    const [r2, g2, b2] = hexToRgb(colorStops[1]);
    const [r3, g3, b3] = hexToRgb(colorStops[2] || colorStops[1]);

    gl.uniform3f(u.c1, r1, g1, b1);
    gl.uniform3f(u.c2, r2, g2, b2);
    gl.uniform3f(u.c3, r3, g3, b3);
    gl.uniform1f(u.amp, amplitude);
    gl.uniform1f(u.speed, speed);
    gl.uniform1f(u.blend, blend);

    let animId,
      start = null;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.res, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = (ts) => {
      if (!start) start = ts;
      gl.uniform1f(u.time, (ts - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [colorStops, amplitude, speed, blend]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
