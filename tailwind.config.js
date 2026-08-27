/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sungold: {
          50: '#FDFBF4',
          100: '#FAF3DC',
          200: '#F5E6B5',
          300: '#EECD88',
          400: '#E4B456',
          500: '#C89D42', // Signature Sun Gold
          600: '#B08432',
          700: '#8E6723',
          800: '#6E4E18',
          900: '#4D360E',
        },
        sunblue: {
          50: '#F0F4FA',
          100: '#DCE6F3',
          200: '#B8CDE6',
          300: '#8AAFD5',
          400: '#528BC0',
          500: '#08214D', // Signature Sun Deep Sapphire Navy
          600: '#06193B',
          700: '#05132D',
          800: '#030C1D',
          900: '#020610',
        },
        sunstone: {
          50: '#FAF9F6',
          100: '#F3EFEA',
          200: '#E5DFD7',
          300: '#CCC3B6',
          400: '#AFA393',
          500: '#8E7F6E',
          600: '#6F6253',
          700: '#51473C',
          800: '#362E27',
          900: '#1C1713',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'sun-sm': '0 2px 8px -2px rgba(8, 33, 77, 0.08)',
        'sun-md': '0 6px 20px -4px rgba(8, 33, 77, 0.12)',
        'sun-lg': '0 12px 32px -6px rgba(8, 33, 77, 0.16)',
        'sun-gold': '0 8px 24px -4px rgba(200, 157, 66, 0.35)',
      },
    },
  },
  plugins: [],
};
