/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './util/**/*.{ts,tsx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {},
    screens: {
      xs: '384px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1792px',
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
