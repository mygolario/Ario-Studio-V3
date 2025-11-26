import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          purple: "#8B5CF6",
          blue: "#3B82F6",
          glow: "rgba(139, 92, 246, 0.5)",
        },
        surface: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          hover: "rgba(255, 255, 255, 0.08)",
        },
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.02em",
        normal: "0",
        wide: "0.04em",
        widest: "0.1em",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        h1: ["3.4rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
        h2: ["2.2rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "500" }],
        h3: ["1.4rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "500" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "300" }],
      },
      spacing: {
        section: "120px",
        "section-sm": "80px",
      },
      transitionTimingFunction: {
        "apple-ease": "cubic-bezier(0.32, 0, 0.67, 0)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.32, 0, 0.67, 0) forwards",
        "fade-in": "fadeIn 1s cubic-bezier(0.32, 0, 0.67, 0) forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
