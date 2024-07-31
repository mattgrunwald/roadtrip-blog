/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './util/**/*.{ts,tsx}',
  ],
  safelist: [
    {
      pattern: /^(bg-|text-)(slate-|gray0)\w+-[45]{1}00\/(30|50)?/,
      variants: ['hover', 'active'],
    },
    {
      pattern: /^(row|col)-span-(1|2)/,
    },
    {
      pattern: /^grid-cols-(\d){1,2}/,
    },
  ],
  darkMode: ['class'],
  theme: {
    extend: {},
    screens: {
      xs: '384px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1288px',
      '2xl': '1536px',
      '3xl': '1792px',
      '4xl': '2120px',
    },
    aspectRatio: {
      '4/3': '4 / 3',
      '8/3': '8 / 3',
      '4/6': '4 / 6',
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
