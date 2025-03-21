/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          600: '#6B46C1',
          700: '#5B3A9B',
          800: '#4C2F7A',
        },
        yellow: {
          300: '#F6E05E',
          400: '#ECC94B',
          500: '#D69E2E',
        },
      },
    },
  },
  plugins: [],
};
