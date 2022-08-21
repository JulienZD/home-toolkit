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
  daisyui: {
    // Keep in sync with themes in /src/lib/data/themes
    theme: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'halloween',
      'garden',
      'forest',
      'lofi',
      'pastel',
      'fantasy',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
    ],
  },
};

module.exports = config;
