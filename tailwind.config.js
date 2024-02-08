/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
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
        "inter" : "Inter, sans-serif"
      },
      fontSize: {
        "xxs": "clamp(0.75rem, 0.5vw + 0.5rem, 0.875rem)",
        "xs": "clamp(0.75rem, 0.5vw + 0.5rem, 0.875rem)",
        "sm": "clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem)",
        "md": "clamp(1rem, 0.34vw + 0.91rem, 1.19rem)",
        "lg": "clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem)",
        "xl": "clamp(1.56rem, 1vw + 1.31rem, 2.11rem)",
        "2xl": "clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)",
        "3xl": "clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem)",
        "4xl": "clamp(3.05rem, 3.54vw + 2.17rem, 5rem)",
        "5xl": "clamp(3.81rem, 5.18vw + 2.52rem, 6.66rem)",
        "6xl": "clamp(4.77rem, 7.48vw + 2.9rem, 8.88rem)",
      },
      screens: {
        '4xs': '160px',
        // => @media (min-width: 160px) { ... }
        
        '3xs': '240px',
        // => @media (min-width: 240px) { ... }

        '2xs': '320px',
        // => @media (min-width: 320px) { ... }

        'xs': '480px',
        // => @media (min-width: 480px) { ... }

        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [],
});
