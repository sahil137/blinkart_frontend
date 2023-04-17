/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#000814',
        customBlue1: '#003566',
        customeBlue2: '#001D3D',
        customYellow1: '#FFC300',
        customYellow2: '#FFD60A',
      },
    },
  },
  plugins: [],
};
