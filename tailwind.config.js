/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        first: "#192428",
        second: "#2d383c",
        third: "#414c50",
        fourth: "#353535",
        fifth: "#39ace7",
        sixth : "#F8F6F0"  // for text pearl white
      },
      fontFamily : {
        "inter" : "Inter, sans-serif",
        "ninja" : ['Ninja','sans']
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
  plugins: [
    require('tailwindcss-animated')
  ],
});
