/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",

          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      animation: {
        "gradient-x": "gradient-x 1s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        fadeIn: "fadeIn 0.5s ease-out forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "smoke-1": "smoke-1 20s ease-in-out infinite",
        "smoke-2": "smoke-2 25s ease-in-out infinite",
        "smoke-3": "smoke-3 30s ease-in-out infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%": {
            "background-position": "0% 50%",
          },
          "20%": {
            "background-position": "50% 50%",
          },
          "100%": {
            "background-position": "100% 50%",
          },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "smoke-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1.5)" },
          "50%": { transform: "translate(20%, 10%) scale(1.3)" },
        },
        "smoke-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1.4)" },
          "50%": { transform: "translate(-15%, 5%) scale(1.6)" },
        },
        "smoke-3": {
          "0%, 100%": { transform: "translate(0, 0) scale(1.3)" },
          "50%": { transform: "translate(15%, -10%) scale(1.5)" },
        },
      },
      fontFamily: {
        'source': ['"Source Code Pro"', 'monospace'],
        'roboto-mono': ['"Roboto Mono"', 'monospace'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* Hide scrollbar for Chrome, Safari and Opera */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    },
  ],
};
