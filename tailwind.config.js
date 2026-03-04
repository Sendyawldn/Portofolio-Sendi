import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/ReactBits/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        portfolioDark: {
          primary: "#6366f1",
          "primary-content": "#ffffff",
          secondary: "#8b5cf6",
          "secondary-content": "#ffffff",
          accent: "#22d3ee",
          "accent-content": "#ffffff",
          neutral: "#131830",
          "neutral-content": "#f1f5f9",
          "base-100": "#0a0e1a",
          "base-200": "#131830",
          "base-300": "#1e2340",
          "base-content": "#f1f5f9",
          info: "#3b82f6",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    ],
    darkTheme: "portfolioDark",
    base: false,
    styled: false,
    utils: true,
    logs: false,
  },
};
