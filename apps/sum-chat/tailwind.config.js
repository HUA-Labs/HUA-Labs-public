/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: '#3977F2',
          50:  '#EAF2FE',
          100: '#D4E4FD',
          200: '#A9C9FB',
          300: '#7EAEF9',
          400: '#5393F7',
          500: '#3977F2',
          600: '#2C5FC2',
          700: '#204792',
          800: '#142F61',
          900: '#081731',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addBase }) {
      addBase({
        ':root': {
          '--primary': '#6366f1',
          '--primary-foreground': '#ffffff',
          '--ring': '#6366f1',
          '--background': '#ffffff',
          '--foreground': '#18181b',
          '--muted': '#f4f4f5',
          '--muted-foreground': '#71717a',
          '--accent': '#f1f5f9',
          '--accent-foreground': '#18181b',
        },
        '.theme-sum-prism': {
          '--primary': '#f472b6',
          '--primary-foreground': '#fff1f5',
          '--ring': '#be185d',
          '--background': '#fff1f5',
          '--foreground': '#be185d',
          '--muted': '#fce7f3',
          '--muted-foreground': '#be185d',
          '--accent': '#f9a8d4',
          '--accent-foreground': '#be185d',
        },
      });
    },
  ],
} 