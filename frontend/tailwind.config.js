/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0284c7',
          dark: '#0369a1',
          light: '#38bdf8'
        },
        navy: {
          900: '#0B132B',
          800: '#1C2541',
          700: '#3A506B'
        }
      }
    },
  },
  plugins: [],
}
