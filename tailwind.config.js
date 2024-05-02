/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato'], 
        header: ['Roboto Condensed'],
      },
    },
  },
  plugins: [require("daisyui")],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: ["lofi", "dark", "cupcake"],
  },
}

