/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './node_modules/@fullcalendar/**/*.js',
    './node_modules/@fullcalendar/**/*.jsx',
  ],
  theme: {
    extend: {
      translate: {
        '2xl': '32rem', // Giá trị tùy chỉnh với đơn vị rem
        '60': '15rem', //
        '72': '18rem', // Giá trị tùy chỉnh với đơn vị rem

      },
    },
  },
  plugins: [],
}