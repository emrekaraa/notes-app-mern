/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBg: "#f2e9e4",
        headerBg: "#ddbea9",
        mainBlue: "#669bbc",
        mainText: "#555",
      },
    },
  },
  plugins: [],
};
