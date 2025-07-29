module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#5C6AC4', // blue-purple
          light: '#E3E8F0',   // light background
          dark: '#20214A',    // dark blue
        },
        accent: '#7C3AED',    // purple accent
        info: '#2563EB',      // blue info
        warning: '#F59E42',   // orange
        success: '#22C55E',   // green
        error: '#EF4444',     // red
      },
    },
  },
  plugins: [],
} 