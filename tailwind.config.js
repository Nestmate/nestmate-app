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
        },
        eastern:{
          100: '#ECF3F4',
          200: '#DAEAEC',
          300: '#C0DCE0',
          400: '#9ED4DB',
          500: '#84CBD4',
          600: '#60BFCC',
          700: '#3EB3C2',
          800: '#149CAE',
          900: '#028799',
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