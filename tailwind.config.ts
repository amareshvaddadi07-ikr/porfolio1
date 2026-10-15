import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        paper: {
          DEFAULT: "#F5F1E8",
          aged: "#E8E2D4",
          light: "#FAF7F0",
          dark: "#DED6C3",
        },
        ink: {
          DEFAULT: "#111111",
          black: "#0A0A0A",
          muted: "#4A4742",
          faded: "#7A756D",
          border: "#111111",
          hairline: "#8C857B",
        },
        wax: {
          DEFAULT: "#8A1C14",
          dark: "#5A110B",
          light: "#A82920",
          ring: "#D4AF37",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        serif: ["var(--font-playfair)", "Georgia", "Cambria", "Times New Roman", "serif"],
      },
      boxShadow: {
        wax: "0 10px 25px -5px rgba(138, 28, 20, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.25), inset 0 -3px 6px rgba(0, 0, 0, 0.4)",
        "newspaper-frame": "0 20px 40px -15px rgba(20, 15, 10, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
