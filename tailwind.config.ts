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
        // Keep existing sky utility classes aligned with the app's teal identity.
        sky: {
          50: "#eff9f6",
          100: "#d9f0e8",
          200: "#b8e2d4",
          300: "#87cdb8",
          400: "#4eae96",
          500: "#278f7c",
          600: "#137c70",
          700: "#11665d",
          800: "#12534d",
          900: "#12453f",
          950: "#082c29",
        },
        clinic: {
          50: "#eff9f6",
          100: "#d9f0e8",
          200: "#b8e2d4",
          300: "#87cdb8",
          400: "#4eae96",
          500: "#278f7c",
          600: "#137c70",
          700: "#11665d",
          800: "#12534d",
          900: "#12453f",
          950: "#082c29",
        },
        teal: {
          500: "#14b8a6",
          600: "#0d9488",
        },
      },
    },
  },
  plugins: [],
};
export default config;
