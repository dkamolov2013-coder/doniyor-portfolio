import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        "neon-cyan": "#00ffff",
        "neon-purple": "#ff00ff",
        "neon-lime": "#00ff00",
        "neon-pink": "#ff0080",
      },
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "serif"],
        body: ["var(--font-body)", "DM Sans", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        "neon-cyan": "0 0 10px #00ffff, 0 0 20px rgba(0,255,255,0.6), 0 0 40px rgba(0,255,255,0.3)",
        "neon-cyan-sm": "0 0 5px #00ffff, 0 0 10px rgba(0,255,255,0.4)",
        "neon-purple": "0 0 10px #ff00ff, 0 0 20px rgba(255,0,255,0.6), 0 0 40px rgba(255,0,255,0.3)",
        "neon-purple-sm": "0 0 5px #ff00ff, 0 0 10px rgba(255,0,255,0.4)",
        "neon-lime": "0 0 10px #00ff00, 0 0 20px rgba(0,255,0,0.6), 0 0 40px rgba(0,255,0,0.3)",
        "neon-lime-sm": "0 0 5px #00ff00, 0 0 10px rgba(0,255,0,0.4)",
        "neon-pink": "0 0 10px #ff0080, 0 0 20px rgba(255,0,128,0.6), 0 0 40px rgba(255,0,128,0.3)",
        "neon-pink-sm": "0 0 5px #ff0080, 0 0 10px rgba(255,0,128,0.4)",
        "glass-glow": "0 8px 32px 0 rgba(0,255,255,0.08), 0 4px 16px rgba(0,0,0,0.4)",
        "glass-card": "0 4px 30px rgba(0,0,0,0.3), 0 0 1px rgba(255,255,255,0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "neon-flicker": {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": {
            "box-shadow": "0 0 10px #00ffff, 0 0 20px rgba(0,255,255,0.6), 0 0 40px rgba(0,255,255,0.3)",
            opacity: "1",
          },
          "20%, 24%, 55%": {
            "box-shadow": "none",
            opacity: "0.8",
          },
        },
        "pulse-neon": {
          "0%, 100%": {
            opacity: "1",
            "box-shadow": "0 0 20px rgba(0,255,255,0.6)",
          },
          "50%": {
            opacity: "0.8",
            "box-shadow": "0 0 40px rgba(0,255,255,0.9), 0 0 80px rgba(0,255,255,0.4)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-shift": {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "glow-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "neon-flicker": "neon-flicker 3s ease-in-out infinite",
        "pulse-neon": "pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 4s ease infinite",
        "slide-down": "slide-down 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "glow-rotate": "glow-rotate 8s linear infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
