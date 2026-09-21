/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gunmetal: {
          950: '#0f1c1e',
          900: '#20373b', // color.md base gunmetal
          850: '#284449',
          800: '#32535a',
          700: '#426b73',
          600: '#54848f',
        },
        navy: {
          // Aliased to gunmetal palette for seamless theme adaptation across existing classes
          950: '#0f1c1e',
          900: '#20373b',
          850: '#284449',
          800: '#32535a',
          700: '#426b73',
          600: '#54848f',
        },
        saffron: {
          200: '#fff0cc',
          300: '#ffe39f',
          400: '#ffd470',
          500: '#ffc64f', // color.md base saffron
          600: '#e6a935',
          700: '#c2851a',
          800: '#9c650e',
        },
        gold: {
          // Aliased to saffron palette for seamless theme adaptation across existing classes
          200: '#fff0cc',
          300: '#ffe39f',
          400: '#ffd470',
          500: '#ffc64f',
          600: '#e6a935',
          700: '#c2851a',
          800: '#9c650e',
        },
        moonstone: {
          200: '#b3dde5',
          300: '#8ec7d2',
          400: '#6bb4c2',
          500: '#519cab', // color.md base moonstone
          600: '#3d818f',
          700: '#2c636f',
        },
        lightblue: {
          50: '#f5fbfe',
          100: '#e4f4f8',
          200: '#c3e7f1', // color.md base light blue
          300: '#9fd4e4',
          400: '#7ec2d5',
        },
        surface: {
          light: '#f4fafc',
          card: '#ffffff',
          dark: '#20373b',
        },
        heading: '#16282c',
        muted: '#4d6a70',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(32, 55, 59, 0.08), 0 0 1px 1px rgba(32, 55, 59, 0.04)',
        'card-hover': '0 25px 50px -12px rgba(32, 55, 59, 0.16)',
        'gold-glow': '0 10px 30px -10px rgba(255, 198, 79, 0.45)',
        'saffron-glow': '0 10px 30px -10px rgba(255, 198, 79, 0.45)',
        'moonstone-glow': '0 10px 30px -10px rgba(81, 156, 171, 0.4)',
      },
    },
  },
  plugins: [],
}
