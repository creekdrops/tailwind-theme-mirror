/** @type {import('tailwindcss').Config} */

//  Example of a tailwind.config.cjs file for testing
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    fontFamily: {
      sans: "Source Sans Pro, Arial, sans-serif",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1daae0",
          100: "#1a80a9",
          200: "#1daae0",
          300: "#4cbbe6",
          400: "#79cceb",
          500: "#a6def3",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
