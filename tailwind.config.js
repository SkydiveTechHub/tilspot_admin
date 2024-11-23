/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#002B6F',
        secondary: '#BADDFB'
      },
      fontFamily:{
        mont: "Montserrat, sans-serif",
      }
    },
  },
  plugins: [],
}
