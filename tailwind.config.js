import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],
  experimental: {
    // see https://github.com/tailwindlabs/tailwindcss/discussions/7317
    // this config can keep chrome devtools from showing too much inherited styles,
    // which can be helpful for debugging, and also avoid devtool crashes
    optimizeUniversalDefaults: true,
  },
}
