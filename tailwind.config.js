/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      /* ─── Цветовая палитра: Исламский стиль ─────────────────────────── */
      colors: {
        // Основной: тёмно-зелёный (цвет Ислама)
        primary: {
          50:  "#edf8f0",
          100: "#d1eeda",
          200: "#a4ddb6",
          300: "#6ec48c",
          400: "#40a86a",
          500: "#2d8f55",
          600: "#1e7344",
          700: "#1a5c38",
          800: "#174a2e",
          900: "#133d26",
          950: "#092214",
        },
        // Акцент: золотистый (цвет благородства в Исламе)
        gold: {
          50:  "#fefbec",
          100: "#fdf3c9",
          200: "#fbe58e",
          300: "#f8d253",
          400: "#f5c02b",
          500: "#efa213",
          600: "#d47c0d",
          700: "#b0590f",
          800: "#8f4513",
          900: "#763913",
          950: "#431d05",
        },
        // Нейтральные: тёплые оттенки
        neutral: {
          50:  "#faf9f7",
          100: "#f0eeea",
          200: "#e0dbd4",
          300: "#ccc4b8",
          400: "#b5a999",
          500: "#a49584",
          600: "#978575",
          700: "#7d6d62",
          800: "#685c53",
          900: "#574d46",
          950: "#2e2824",
        },
        // Поверхности
        surface: {
          light:     "#fdfcfa",
          secondary: "#f5f3ef",
          dark:      "#0c1a10",
          "dark-secondary": "#142119",
        },
        // Семантические
        success: { DEFAULT: "#2d8f55", light: "#edf8f0", dark: "#133d26" },
        warning: { DEFAULT: "#efa213", light: "#fefbec", dark: "#431d05" },
        danger:  { DEFAULT: "#dc3545", light: "#fef2f2", dark: "#7f1d1d" },
        info:    { DEFAULT: "#3b82f6", light: "#eff6ff", dark: "#1e3a5f" },
      },

      /* ─── Типографика ────────────────────────────────────────────────── */
      fontFamily: {
        sans:    ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        arabic:  ["var(--font-amiri)", "Amiri", "serif"],
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono:    ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        // Mobile-first sizes → desktop через responsive
        "display":  ["3rem",    { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-sm": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "800" }],
        "h1":       ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "700" }],
        "h2":       ["1.5rem",   { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        "h3":       ["1.25rem",  { lineHeight: "1.3", fontWeight: "600" }],
        "h4":       ["1.125rem", { lineHeight: "1.35", fontWeight: "600" }],
        "body":     ["1rem",     { lineHeight: "1.6" }],
        "body-sm":  ["0.875rem", { lineHeight: "1.5" }],
        "caption":  ["0.75rem",  { lineHeight: "1.4" }],
        "overline": ["0.6875rem",{ lineHeight: "1.3", letterSpacing: "0.08em", fontWeight: "600" }],
      },

      /* ─── Пространство и размеры ────────────────────────────────────── */
      spacing: {
        4.5: "1.125rem",
        13: "3.25rem",
        15: "3.75rem",
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      /* ─── Тени ───────────────────────────────────────────────────────── */
      boxShadow: {
        "soft":     "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
        "card":     "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(19,61,38,0.04)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.06), 0 12px 32px rgba(19,61,38,0.08)",
        "elevated": "0 8px 24px rgba(0,0,0,0.08), 0 16px 48px rgba(19,61,38,0.06)",
        "glow":     "0 0 20px rgba(45,143,85,0.15)",
        "gold":     "0 0 20px rgba(239,162,19,0.15)",
        "inner-soft": "inset 0 1px 2px rgba(0,0,0,0.06)",
      },

      /* ─── Анимации ───────────────────────────────────────────────────── */
      animation: {
        "fade-in":      "fadeIn 0.5s ease-out",
        "fade-in-up":   "fadeInUp 0.5s ease-out",
        "fade-in-down": "fadeInDown 0.4s ease-out",
        "slide-up":     "slideUp 0.4s cubic-bezier(0.16,1,0.3,1)",
        "slide-down":   "slideDown 0.4s cubic-bezier(0.16,1,0.3,1)",
        "slide-in-left":  "slideInLeft 0.3s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "scale-in":     "scaleIn 0.2s ease-out",
        "shimmer":      "shimmer 2s infinite linear",
        "pulse-soft":   "pulseSoft 2s ease-in-out infinite",
        "spin-slow":    "spin 3s linear infinite",
        "bounce-soft":  "bounceSoft 0.5s ease-out",
        "progress":     "progress 1.5s ease-out forwards",
        "counter":      "counter 0.6s cubic-bezier(0.16,1,0.3,1)",
      },
      keyframes: {
        fadeIn:      { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeInUp:    { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeInDown:  { "0%": { opacity: "0", transform: "translateY(-16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideUp:     { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideDown:   { "0%": { opacity: "0", transform: "translateY(-24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideInLeft: { "0%": { opacity: "0", transform: "translateX(-20px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        slideInRight:{ "0%": { opacity: "0", transform: "translateX(20px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        scaleIn:     { "0%": { opacity: "0", transform: "scale(0.95)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        shimmer:     { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        pulseSoft:   { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.7" } },
        bounceSoft:  { "0%": { transform: "scale(1)" }, "50%": { transform: "scale(1.05)" }, "100%": { transform: "scale(1)" } },
        progress:    { "0%": { width: "0%" }, "100%": { width: "var(--progress-width)" } },
        counter:     { "0%": { opacity: "0", transform: "translateY(8px) scale(0.9)" }, "100%": { opacity: "1", transform: "translateY(0) scale(1)" } },
      },

      /* ─── Transitions ───────────────────────────────────────────────── */
      transitionTimingFunction: {
        "bounce": "cubic-bezier(0.16, 1, 0.3, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
      },

      /* ─── Background ─────────────────────────────────────────────────── */
      backgroundImage: {
        "geometric-pattern": "url('/patterns/islamic-pattern.svg')",
        "gradient-primary":  "linear-gradient(135deg, #1a5c38 0%, #2d8f55 50%, #40a86a 100%)",
        "gradient-gold":     "linear-gradient(135deg, #b0590f 0%, #efa213 50%, #f5c02b 100%)",
        "gradient-dark":     "linear-gradient(180deg, #0c1a10 0%, #142119 100%)",
        "gradient-surface":  "linear-gradient(180deg, #fdfcfa 0%, #f5f3ef 100%)",
      },
    },
  },
  plugins: [],
};
