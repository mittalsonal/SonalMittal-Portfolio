import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F0E8",
        foreground: "#1A1612",
        walnut: "#8B6B4A",
        muted: "#9A8F82",
        line: "#D4C9B8",
        deep: "#0F0F1A",
        panel: "#EFE7DA"
      },
      fontFamily: {
        display: [
          "var(--font-cormorant)"
        ],
        sans: [
          "var(--font-dm-sans)"
        ]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(26, 22, 18, 0.08)",
        glow: "0 12px 40px rgba(139, 107, 74, 0.18)"
      },
      borderRadius: {
        xl2: "1.5rem",
        xl3: "1.75rem"
      },
      backgroundImage: {
        "luxury-grid": "linear-gradient(rgba(212, 201, 184, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 201, 184, 0.2) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
