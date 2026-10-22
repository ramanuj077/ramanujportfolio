/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        orbital: {
          bg:     "#03050A",
          panel:  "#080D14",
          card:   "#0C1520",
          cyan:   "#64DCFF",
          green:  "#4FFFA0",
          amber:  "#FFB347",
          purple: "#A78BFA",
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
        sans:    ['"Space Grotesk"', 'sans-serif'],
      },
      backgroundImage: {
        "radial-glow": "radial-gradient(ellipse at center, rgba(100,220,255,0.15) 0%, transparent 70%)",
      },
      animation: {
        "spin-slow":       "spin 120s linear infinite",
        "pulse-subtle":    "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "float":           "float-y 5s ease-in-out infinite",
        "shimmer":         "shimmer 4s linear infinite",
        "scan":            "scan-beam 4s linear infinite",
      },
      keyframes: {
        "float-y": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-10px)" },
        },
        "shimmer": {
          from: { backgroundPosition: "-400% 0" },
          to:   { backgroundPosition: "400% 0" },
        },
        "scan-beam": {
          "0%":   { transform: "translateY(-100%)", opacity: "0" },
          "5%":   { opacity: "0.4" },
          "95%":  { opacity: "0.4" },
          "100%": { transform: "translateY(200%)", opacity: "0" },
        },
      },
      boxShadow: {
        "glow-cyan":  "0 0 30px rgba(100,220,255,0.35)",
        "glow-cyan-h":"0 0 50px rgba(100,220,255,0.55), 0 0 15px rgba(100,220,255,0.8)",
        "glow-green": "0 0 25px rgba(79,255,160,0.4)",
        "panel":      "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
    },
  },
  plugins: [],
}
