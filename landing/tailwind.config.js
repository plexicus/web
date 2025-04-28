const { fontFamily } = require('tailwindcss/defaultTheme');
const config = require('../tailwind.config');
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  theme: {
    ...config.theme,
    extend: {
      ...config.theme.extend,
      fontFamily: {
        ...config.theme.extend.fontFamily,
        sans: ['var(--font-poppins)', ...fontFamily.sans],
        mono: fontFamily.mono,
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
