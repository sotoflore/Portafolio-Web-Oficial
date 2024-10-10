/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom': 'linear-gradient(-45deg, #bd34fe 50%, #47caff 50% )',
        'custom-gradient': 'linear-gradient(140deg, rgb(255, 100, 50) 12.8%, rgb(255, 0, 101) 43.52%, rgb(123, 46, 255) 84.34%)',
      },
      background: {
        'custom-background': 'rgba(255,255,255,0.45)',
      },
      boxShadow: {
          '3xl': 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
      }
    },
  },
  plugins: []
}

