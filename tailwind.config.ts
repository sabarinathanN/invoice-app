import colors from 'tailwindcss/colors'
export default {
  content: [
    "./src/**/*.{scss,js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js'
  ],
  darkMode: ['class'],
  theme: {

    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '1rem',
        lg: '1rem',
        xl: '3rem',
        '2xl': '14rem',
      },
    },
    screens: {
      xs: '420px',         
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1142px',
        dxl: '1281px',
      xxl: '1400px',
        xxxl: '1600px',
    },

    fontFamily: {
      'body': ['Be Vietnam Pro', 'sans-serif'],
    },

    extend: {
      colors: {
        'primary': colors.blue[600],
      },
    },
  },

  plugins: [
    require('preline/plugin'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
