/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        first: "#5FDD9D",
        second: "#76F7BF",
        third: "#91F9E5",
        fourth: "#499167",
        fifth: "#3F4531",
      },
    },
  },
  plugins: [],
});
