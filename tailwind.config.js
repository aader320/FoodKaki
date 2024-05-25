// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  daisyui: {
    themes: [ "cupcake"],
  },
  theme: {
    extend: {
      colors: {
        customGreen: {
          50: '#a3e635',
          100: '#84cc16',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Add other custom colors here
      },
    },
  },
  plugins: [require('daisyui')],
}
