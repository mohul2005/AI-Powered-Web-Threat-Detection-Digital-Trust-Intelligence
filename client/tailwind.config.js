/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        emeraldDark: {
          950: '#040d0d',
          900: '#071515',
          850: '#0a1d1d',
          800: '#0e2626',
          750: '#123131',
          700: '#183e3e',
          600: '#235555',
        },
        neonEmerald: {
          300: '#5eead4',
          400: '#2dd4bf',
          450: '#00f2c3',
          500: '#10b981',
          600: '#059669',
        },
        turquoise: {
          400: '#00f2c3',
          500: '#00d2aa',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'neon': '0 0 20px -3px rgba(0, 242, 195, 0.3), 0 0 8px -2px rgba(0, 242, 195, 0.4)',
        'neon-sm': '0 0 10px -2px rgba(0, 242, 195, 0.35)',
        'card-dark': '0 8px 30px -4px rgba(4, 13, 13, 0.8)',
      }
    },
  },
  plugins: [],
}
