import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#02020A",
        surface: "#050511",
        primary: "#3B82F6", // Neon blue-ish placeholder, will refine
        secondary: "#DB2777", // Magenta-ish
        foreground: "#EDEDED",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        farsi: ["var(--font-vazirmatn)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
