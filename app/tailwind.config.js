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
        // Catppuccin Mocha palette
        "ctp-rosewater": "#f5e0dc",
        "ctp-flamingo": "#f2cdcd",
        "ctp-pink": "#f5c2e7",
        "ctp-mauve": "#cba6f7",
        "ctp-red": "#f38ba8",
        "ctp-maroon": "#eba0ac",
        "ctp-peach": "#fab387",
        "ctp-yellow": "#f9e2af",
        "ctp-green": "#a6e3a1",
        "ctp-teal": "#94e2d5",
        "ctp-sky": "#89dceb",
        "ctp-sapphire": "#74c7ec",
        "ctp-blue": "#89b4fa",
        "ctp-lavender": "#b4befe",
        "ctp-text": "#cdd6f4",
        "ctp-subtext1": "#bac2de",
        "ctp-subtext0": "#a6adc8",
        "ctp-overlay2": "#9399b2",
        "ctp-overlay1": "#7f849c",
        "ctp-overlay0": "#6c7086",
        "ctp-surface2": "#585b70",
        "ctp-surface1": "#45475a",
        "ctp-surface0": "#313244",
        "ctp-base": "#1e1e2e",
        "ctp-mantle": "#181825",
        "ctp-crust": "#11111b",
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
        sans: ["Source Code Pro", "sans-serif"],
        serif: ["Source Code Pro", "serif"],
        mono: ["Cascadia Code", "monospace"],
        source: ["Source Code Pro", "monospace"],
        "roboto-mono": ["Cascadia Code", "monospace"],
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
  safelist: [
    {
      pattern:
        /bg-ctp-(blue|lavender|mauve|pink|red|maroon|peach|yellow|green|teal|sapphire|sky)/,
      variants: ["hover", "focus", "/10", "/20", "/30", "/40", "/50"],
    },
    {
      pattern:
        /border-ctp-(blue|lavender|mauve|pink|red|maroon|peach|yellow|green|teal|sapphire|sky)/,
      variants: ["hover", "focus", "/10", "/20", "/30", "/40", "/50"],
    },
    {
      pattern:
        /from-ctp-(blue|lavender|mauve|pink|red|maroon|peach|yellow|green|teal|sapphire|sky)/,
      variants: ["/10", "/20", "/30", "/40", "/50"],
    },
    {
      pattern:
        /to-ctp-(blue|lavender|mauve|pink|red|maroon|peach|yellow|green|teal|sapphire|sky)/,
      variants: ["/10", "/20", "/30", "/40", "/50"],
    },
    {
      pattern:
        /text-ctp-(blue|lavender|mauve|pink|red|maroon|peach|yellow|green|teal|sapphire|sky)/,
      variants: ["hover", "focus"],
    },
    {
      pattern:
        /shadow-ctp-(blue|lavender|mauve|pink|red|maroon|peach|yellow|green|teal|sapphire|sky)/,
      variants: ["hover", "focus", "/10", "/20", "/30", "/40", "/50"],
    },
  ],
};
