/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xlg' : '900px',
        'Mlg' : '1440px',
        '2xl': '1536px',
        '3xl' : '1800px',
      },
    },
  },
  plugins: [],
}