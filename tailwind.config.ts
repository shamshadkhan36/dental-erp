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
        background: "#ffffff",
        foreground: "#333333",
        // Client Specified Brand Colors
        brand: {
          primary: "#4f98db",   // Primary colour
          secondary: "#333333", // Secondary colour
          cta: "#e97538",       // CTA highlight colour
          light: "#f0f7fd",     // Tinted background
          border: "#e2e8f0",
        },
        clinic: {
          50: "#f0f7fd",
          100: "#e0effb",
          200: "#b9ddf7",
          300: "#7ebef1",
          400: "#4f98db",
          500: "#3282cc",
          600: "#2267ad",
          700: "#1d528c",
          800: "#1b4674",
          900: "#1b3c62",
          950: "#112641",
        },
      },
    },
  },
  plugins: [],
};
export default config;
