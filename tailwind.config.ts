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
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          DEFAULT: "#1a2744",
          dark: "#0e1628",
          light: "#2a3b61",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#e5be41",
          dark: "#a5811c",
        },
      },
    },
  },
  plugins: [],
};
export default config;
