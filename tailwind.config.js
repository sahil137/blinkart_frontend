/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  // darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '320px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        dark: '#000814',
        customBlue1: '#003566',
        customBlue2: '#001D3D',
        customYellow1: '#FFC300',
        customYellow2: '#FFD60A',
      },
    },
  },
  plugins: [],
};
