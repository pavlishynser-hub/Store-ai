import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2.5rem",
        lg: "4rem",
      },
    },
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#1f2933",
        accent: {
          DEFAULT: "#f3f4f6",
          muted: "#eaecf0",
          dark: "#d8dce2",
        },
        primary: {
          DEFAULT: "#111827",
          soft: "#1f2937",
        },
      },
      boxShadow: {
        soft: "0 10px 35px rgba(15, 23, 42, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      borderRadius: {
        xl: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
