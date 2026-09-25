/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffdf0',
          100: '#fff9c2',
          200: '#fff085',
          300: '#ffe247',
          400: '#ffd426',
          500: '#ffc64f', // Main primary yellow / saffron from color.md
          600: '#e5a800',
          700: '#b87b00',
          800: '#8c5900',
          900: '#5c3800',
          950: '#331d00',
        },
        yellow: {
          50: '#fffdf0',
          100: '#fff9c2',
          200: '#fff085',
          300: '#ffe247',
          400: '#ffd426',
          500: '#ffc64f', // Main primary yellow / saffron
          600: '#e5a800',
          700: '#b87b00',
          800: '#8c5900',
          900: '#5c3800',
          950: '#331d00',
        },
        gunmetal: {
          950: '#0f1c1e',
          900: '#20373b', // color.md base gunmetal
          850: '#284449',
          800: '#32535a',
          700: '#426b73',
          600: '#54848f',
        },
        navy: {
          // Aliased to gunmetal palette for backwards compatibility
          950: '#0f1c1e',
          900: '#20373b',
          850: '#284449',
          800: '#32535a',
          700: '#426b73',
          600: '#54848f',
        },
        saffron: {
          200: '#fff085',
          300: '#ffe247',
          400: '#ffd426',
          500: '#ffc64f', // color.md base saffron / yellow
          600: '#e5a800',
          700: '#b87b00',
          800: '#8c5900',
        },
        gold: {
          // Aliased to primary yellow palette
          200: '#fff085',
          300: '#ffe247',
          400: '#ffd426',
          500: '#ffc64f',
          600: '#e5a800',
          700: '#b87b00',
          800: '#8c5900',
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
        'primary-glow': '0 10px 30px -10px rgba(255, 198, 79, 0.55)',
        'yellow-glow': '0 10px 30px -10px rgba(255, 198, 79, 0.55)',
        'gold-glow': '0 10px 30px -10px rgba(255, 198, 79, 0.55)',
        'saffron-glow': '0 10px 30px -10px rgba(255, 198, 79, 0.55)',
        'moonstone-glow': '0 10px 30px -10px rgba(81, 156, 171, 0.4)',
      },
    },
  },
  plugins: [],
}
