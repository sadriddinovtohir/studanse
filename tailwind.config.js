/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "725px",
        md: "900px",
        lg: "1200px",
        xl: "1400px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        bgColor: "hsl(var(--bgColor))",
        textColor: "hsl(var(--textColor))",
        dashbordcolor: "hsl(var(--dashbordcolor))",
        titleBgColor: "var(--titleBgColors)",
        iconsColor: "var(--iconsColor)",
        cardcolor: "var(--cardcolor)",
        textGrey: "var(--textGrey)",
        btnBgPrimary: "var(--btnBgPrimary)",
        btnblue: "var(--btnblue)",
        btnBgHoverSecondry: "var(--btnBgHoverSecondry)",
        btnBgHoverPrimary: "var(--btnBgHoverPrimary)",
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
    },
  }, 
  plugins: [
    require("tailwindcss-animate"),  
    function ({ addUtilities }) {    
      addUtilities({
        ".hover-scale": {
          transform: "translateZ(0)",
          transition: "transform 300ms ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
      });
    },
  ],
};
