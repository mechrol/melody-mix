/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#121212',
        'dark-light': '#181818',
        'dark-lighter': '#282828',
        primary: '#1DB954',
      },
    },
  },
  plugins: [],
}
