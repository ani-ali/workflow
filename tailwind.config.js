/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'border': '#5D5D5D',
        'bg': '#171717',
        'inner': '#212121',
        "text":"#909090"
      },
    },
  },
  plugins: [],
}