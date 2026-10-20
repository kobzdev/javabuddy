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
        buddy: {
          purple: {
            50: '#f5f3ff',
            100: '#ede9fe',
            200: '#ddd6fe',
            300: '#c4b5fd',
            400: '#a78bfa',
            500: '#8b5cf6',
            600: '#7c3aed',
            700: '#6d28d9',
            800: '#5b21b6',
            900: '#4c1d95',
          },
          blue: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
          },
          yellow: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
          },
          green: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            500: '#10b981',
            600: '#059669',
          },
          coral: {
            50: '#fff1f2',
            100: '#ffe4e6',
            500: '#f43f5e',
            600: '#e11d48',
          }
        }
      },
      fontFamily: {
        sans: ['"Comic Neue"', 'Quicksand', 'Nunito', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        code: ['"Fira Code"', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'bubble': '0 8px 0 0 rgba(0, 0, 0, 0.08)',
        'bubble-active': '0 2px 0 0 rgba(0, 0, 0, 0.08)',
        'bubble-purple': '0 8px 0 0 rgba(109, 40, 217, 0.4)',
        'bubble-blue': '0 8px 0 0 rgba(2, 132, 199, 0.4)',
        'bubble-yellow': '0 8px 0 0 rgba(217, 119, 6, 0.4)',
      }
    },
  },
  plugins: [],
}
