const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    container: {
      center: true,
    },
    extend: {},
  },

  plugins: [daisyui],
};

module.exports = config;
