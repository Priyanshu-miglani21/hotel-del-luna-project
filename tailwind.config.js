const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        " .no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    }),
  ],
};
