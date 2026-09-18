/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forme: {
          cream: '#F6F2EC',
          sand: '#ECE5DB',
          card: '#FAF7F2',
          green: '#5E7261',
          'green-light': '#6E8371',
          'green-dark': '#48584B',
          navy: '#12243A',
          'navy-dark': '#0B1726',
          terracotta: '#BA5D40',
          'terracotta-hover': '#A34F35',
          border: '#DFD8CE',
          muted: '#7A7A7A'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        condensed: ['"Oswald"', '"League Gothic"', '"Arial Narrow"', 'sans-serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
      }
    },
  },
  plugins: [],
};
