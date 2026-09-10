/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // VICKZ Design System
        navy: {
          DEFAULT: '#001F5B',
          dark: '#0b1220',
          light: '#1e293b',
        },
        orange: {
          DEFAULT: '#FF6600',
          light: '#FF8533',
        },
        red: {
          DEFAULT: '#E62117',
        },
        slate: {
          muted: '#5C6770',
          light: '#cbd5e1',
          lighter: '#94a3b8',
          dark: '#334155',
          darker: '#1e293b',
        },
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundColor: {
        dark: '#0b1220',
        'dark-secondary': '#0f1628',
      },
      borderColor: {
        subtle: '#334155',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
