/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#303030",
      white: "#ffffff",
      litegrey: "#D0D0D0",
      grey:"#959595",
      yellow:"#FEF563",
      darkyellow:"FEF116",
      dark_red:"#7F0000",
      light_yellow:"#FCDE70",
      dark_gray: '#686D76',
      customBlue: '#2a4255',
      'dark-yellow-gray': 'linear-gradient(90deg, #A67C00, #4A4A4A)',

    },
   
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        minionPro: ['font-family: minion-pro, serif'],
        crimson: ['"Crimson Pro"', 'serif'],
      },
      
      spacing: {
        '100': '25rem', // 400px
        '112': '28rem', // 448px
        '128': '32rem', // 512px
        '140': '35rem', // 560px
        '150': '37.5rem', // 600px
      },

      backgroundImage: {
        'contact-image': "url('./src/assets/home/Home1.jpg')",
        'road-map': "url('./src/assets/newModel/roadMap.png')",
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
