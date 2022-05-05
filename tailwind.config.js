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
        blueStone: {
          1100: '#ccdee0',
          200: '#99bdc2',
          300: '#669da3',
          400: '#337c85',
          500: '#005b66',
          600: '#00525c',
          700: '#004952',
          800: '#002e33',
          900: '#001214',
        },
        slate:{
          100: '#f7f7f2',
          200: '#f3f1e9',
          300: '#dbd9d2',
          400: '#aaa9a3',
          500: '#92918c',
          600: '#7a7975',
          700: '#61605d',
          800: '#31302f',
          900: '#181817',
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