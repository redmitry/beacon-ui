const config = require("./src/config/config.json");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
      },
      spacing: {
        "logo-w": "132px",
        "logo-h": "38px",
      },
      colors: {
        primary: config.ui.colors.primary,
        secondary: config.ui.colors.secondary,
      },
    },
  },
  plugins: [],
};
