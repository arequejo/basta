const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('pressed', 'button[aria-pressed="true"]');
      addVariant('group-pressed', ':merge(button[aria-pressed="true"]) &');
      addVariant('current', 'button[data-current="true"]');
      addVariant('group-current', ':merge(button[data-current="true"]) &');
      addVariant('past', 'button[data-past="true"]');
      addVariant('group-past', ':merge(button[data-past="true"]) &');
    }),
  ],
};
