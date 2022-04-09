module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans': ['GT Flexa', 'system-ui'],
      'display': ['GT Flexa'],
      'body': ['GT Flexa'],
    },
    extend: {
      colors: {
        slate:{
          100: '#F6F6F6',
          200: '#ECECEC',
          300: '#D7D6D6',
          400: '#C0BEBE',
          500: '#9C999C',
          600: '#898789',
          700: '#605C60',
          800: '#423F42',
          900: '#181718',
        }
      }
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1380px',
    }
  },
  plugins: [],
}