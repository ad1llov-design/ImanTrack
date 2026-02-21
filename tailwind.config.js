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
        // Islamic-inspired calm color palette
        primary: {
          50: "#f0f9f4",
          100: "#dcf2e6",
          200: "#bbe5ce",
          300: "#8dd1b0",
          400: "#58b58c",
          500: "#369970",
          600: "#267a58",
          700: "#1f6248",
          800: "#1c4f3b",
          900: "#184131",
          950: "#0c251c",
        },
        secondary: {
          50: "#fdf8f0",
          100: "#faeedd",
          200: "#f4dab9",
          300: "#ecc08b",
          400: "#e29f58",
          500: "#da843a",
          600: "#cb6c2f",
          700: "#a95428",
          800: "#884428",
          900: "#6f3924",
          950: "#3c1c0f",
        },
        neutral: {
          50: "#f8f7f4",
          100: "#eeece6",
          200: "#ddd9ce",
          300: "#c5beaf",
          400: "#aba08e",
          500: "#978978",
          600: "#89796b",
          700: "#73645a",
          800: "#5e524c",
          900: "#4d4441",
          950: "#292320",
        },
        gold: {
          50: "#fefdf5",
          100: "#fdf8e1",
          200: "#fbf0c3",
          300: "#f7e39a",
          400: "#f2cf62",
          500: "#efa213",
          600: "#d4870c",
          700: "#b16a0e",
          800: "#8e5313",
          900: "#744413",
          950: "#432306",
        },
        surface: {
          light: "#fdfcf8",
          dark: "#0f1a14",
          "dark-secondary": "#162019",
        },
      },
      boxShadow: {
        card: "0 2px 16px -2px rgba(0,0,0,0.06), 0 1px 4px -1px rgba(0,0,0,0.04)",
        glow: "0 0 20px -4px rgba(54,153,112,0.25)",
        gold: "0 0 20px -4px rgba(239,162,19,0.25)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
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
