/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Nordic Deep Green Spiritual Minimalism
        primary: {
          DEFAULT: "#0F3D2E",
          50: "#e7f6f1",
          100: "#cfece3",
          200: "#9fd9c6",
          300: "#6fc6a9",
          400: "#3fb38c",
          500: "#0F3D2E", // Base Primary
          600: "#0b2e23",
          700: "#08211a",
          800: "#051611",
          900: "#030b08",
          950: "#010504",
        },
        accent: {
          DEFAULT: "#145A3A",
          light: "#1c7d51",
          dark: "#0c3723",
        },
        neutral: {
          50: "#fcfcfc",
          100: "#f5f5f5", // Base Text
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0B0F0E", // Base Background
        },
        surface: {
          background: "#0B0F0E",
          card: "#111716",
          light: "#F5F5F5",
          dark: "#0B0F0E",
        },
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(0,0,0,0.5)",
        glow: "0 0 15px -4px rgba(15,61,46,0.5)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
        arabic: ["var(--font-amiri)", "serif"],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
        shimmer: "shimmer 2s infinite linear",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
      backgroundImage: {
        "geometric-pattern":
          "url('/patterns/islamic-pattern.svg')",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/typography"),
  ],
};
