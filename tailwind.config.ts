import type { Config } from "tailwindcss";

/**
 * Tokens taken from the attached Barker Shoppe homepage design.
 * Cream ground, charcoal type, plaque blue + wine red from the logo.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7fb",
          100: "#d6ecf5",
          200: "#b1d0d8",
          300: "#7ebed6",
          400: "#4eafd0",
          500: "#2396ce",
          600: "#1f7ba6",
          700: "#1a6488",
          800: "#174f6b",
          900: "#0d2c38",
        },
        ink: "#16262e",
        navy: "#0d2c38",
        wine: {
          DEFAULT: "#8b1c25",
          soft: "#f0cdd0",
          dark: "#6e151c",
        },
        cream: {
          DEFAULT: "#FEFBF5",
          dark: "#eadfcc",
          line: "#eadfcc",
        },
        muted: "#4a5f6a",
        soft: "#5a6f79",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["3.5rem", { lineHeight: "1.02", letterSpacing: "-0.035em" }], // 56px
        "display-lg": ["clamp(2.25rem, 4vw, 3rem)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.75rem, 2.5vw, 2.25rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.375rem, 2vw, 1.875rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        subhead: ["1.1875rem", { lineHeight: "1.68" }],
        body: ["1.125rem", { lineHeight: "1.7" }], // 18px
        "body-sm": ["16px", { lineHeight: "1.7" }],
        overline: ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.16em" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        arch: "200px 200px 24px 24px",
        "arch-lg": "300px 300px 28px 28px",
        pill: "999px",
      },
      boxShadow: {
        photo: "0 22px 46px rgba(13, 44, 56, 0.16)",
        "photo-lg": "0 28px 58px rgba(13, 44, 56, 0.2)",
        "photo-hover": "0 30px 60px rgba(13, 44, 56, 0.26)",
        cta: "0 12px 28px rgba(139, 28, 37, 0.28)",
        badge: "0 16px 34px rgba(139, 28, 37, 0.35)",
        header: "0 1px 0 rgba(22, 38, 46, 0.06)",
      },
      backgroundImage: {
        "pole-stripes":
          "repeating-linear-gradient(115deg, #8b1c25 0 16px, #ffffff 16px 32px, #2396ce 32px 48px, #ffffff 48px 64px)",
      },
      maxWidth: {
        prose: "68ch",
        site: "1280px",
      },
      transitionTimingFunction: {
        gentle: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
