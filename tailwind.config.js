/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--accent-color)",
          50: "var(--accent-light)",
          100: "#C8E6C9",
          200: "#A5D6A7",
          300: "#81C784",
          400: "#4CAF50",
          500: "var(--accent-color)", 
          600: "#388E3C",
          700: "#2E7D32",
          800: "#1B5E20",
          900: "#144A18",
          950: "#0D3310",
        },
        gold: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
          950: "#451A03",
        },
        secondary: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A5F",
          950: "#172554",
        },
        surface: {
          DEFAULT: "var(--surface-color)",
          background: "var(--bg-color)",
          card: "var(--surface-color)",
          secondary: "#F9FAFB",
          dark: "#1A1A2E",
          "dark-secondary": "#16213E",
        },
        border: "var(--border-color)",
      },
      textColor: {
        main: "var(--text-main)",
        muted: "var(--text-muted)",
      },
      backgroundColor: {
        background: "var(--bg-color)",
        surface: "var(--surface-color)",
        "surface-secondary": "#F9FAFB",
        "surface-dark": "#1A1A2E",
        "surface-dark-secondary": "#16213E",
      },
      boxShadow: {
        card: "0 4px 20px -2px var(--shadow-color)",
        glow: "0 0 15px -4px var(--accent-color)",
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
