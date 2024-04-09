/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        generalColors :{
          "light-gray" : "#BEBCBF",
          "medium-gray" : "#727271",
          "dark-gray" : "#2B2A29",
          "medium-yellow" : "#FFE75C",
          "dark-red" : "#Ff4500",
          "medium-green" : "#4EC49D",
          "light-blue" : "#94C0EB",
          "medium-blue" : "#1E90FF",
          "dark-blue" : "#174072",
        },
        secondaryColors : {
          "light-purple" : "#C7CEFF", 
          "medium-purple" : "#6974FB",
          "dark-purple" : "#2D3ACC",
          "light-green" : "#92D4BE",
          "medium-green" : "#4EC49D",
          "dark-green" : "#18966C",
          "light-orange" : "#FFAA5A",
          "regular-orange" : "#FA885F",
          "dark-red" : "#Ff4500"
        }
      },
      fontFamily : {
        "inter" : "Inter, sans-serif",
        "ninja" : ['Ninja','sans']
      },
      screens:{
          "xxs": "300px",
          "xs": "400px",
          "sm": "540px",
          "smd": "620px",
          "md": "720px",
          "lg": "960px",
          "xl": "1140px",
          "2xl": "1320px",
          "px1400" : "1400px",
          "px1669" : "1669px"
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
});
