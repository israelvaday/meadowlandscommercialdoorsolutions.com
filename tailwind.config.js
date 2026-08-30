/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brass: {
          50:  "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
          800: "#155E75",
          900: "#164E63",
        },
        ink: {
          50:  "#F4F7FA",
          100: "#E2E8F0",
          200: "#B6C2D1",
          300: "#8494A7",
          400: "#5B6B7C",
          500: "#3A4553",
          600: "#1E2732",
          700: "#141B24",
          800: "#0C1218",
          900: "#070B10",
          950: "#030508",
        },
        danger: "#FF3B5C",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        signal: "0 0 40px -8px rgba(34,211,238,0.45)",
      },
      keyframes: {
        "pulse-ring": {
          "0%":   { boxShadow: "0 0 0 0 rgba(34,211,238,0.55)" },
          "70%":  { boxShadow: "0 0 0 12px rgba(34,211,238,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(34,211,238,0)" },
        },
        "marquee": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "scan-line": {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite",
        "marquee":     "marquee 40s linear infinite",
        "shimmer":     "shimmer 3s linear infinite",
        "scan-line":   "scan-line 7s linear infinite",
      },
    },
  },
  plugins: [],
};
