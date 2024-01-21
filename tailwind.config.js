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
      fontFamily : {
        "inter" : "Inter, sans-serif"
      },
      screens:{
          xxs: "300px",
          xs: "400px",
          sm: "540px",
          smd: "620px",
          md: "720px",
          lg: "960px",
          xl: "1140px",
          "2xl": "1320px",
          px1400 : "1400px",
      }
    },
  },
  plugins: [],
});
