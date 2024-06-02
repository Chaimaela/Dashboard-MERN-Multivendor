/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: '#f4f0ee',
        green:'#f7f7f7',
        textdark:"#494948",
        textlight:"#9e9c9c",
        butoncolor:"#f7f7f7",
      },
    },
  },
  plugins: [],
}
