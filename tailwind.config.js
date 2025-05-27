/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E4B7A',
          dark: '#0D2B4B',
          light: '#3A6EA5',
        },
        secondary: {
          DEFAULT: '#4CAF50',
          dark: '#2E7D32',
        },
        accent: {
          DEFAULT: '#FF9800',
          dark: '#E65100',
        },
        neutral: {
          DEFAULT: '#F5F7FA',
          light: '#FFFFFF',
        },
        text: {
          dark: '#1A1A2E',
          light: '#6B7280',
        },
      },
      boxShadow: {
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 40px -5px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
