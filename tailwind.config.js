/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#2E58A6",
        secondary:"#D36314",
        darkShadow:'#3C414F',
        dark:'#111729'
      },
      animation: {
        marquee: "marquee 10s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
    fontFamily:{
      aeonik:[
        'Aeonik'
      ]
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
 
