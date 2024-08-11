/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import svgToDataUri from "mini-svg-data-uri";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app//*.{js,ts,jsx,tsx,mdx}",
    "./pages//*.{js,ts,jsx,tsx,mdx}",
    "./components//*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    // colors: {
    //   "t-theme": "#e20074",
    //   "t-theme-light": "#ff52a3",
    //   "t-theme-hover": "#770141",
    //   "t-black": "#000000",
    //   "t-black-shade": "#121212",
    //   "t-black-shade-2" : "#1c1c1c",
    //   "t-gray": "#333333",
       
    // },
    extend: {},
  },
  plugins: [
    // Plugin to add CSS variables for each Tailwind color
    function addVariablesForColors({ addBase, theme }) {
      const allColors = flattenColorPalette(theme("colors"));
      const newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
      );

      addBase({
        ":root": newVars,
      });
    },
    
    // Plugin to add a custom background utility
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-dot-thick": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
}

