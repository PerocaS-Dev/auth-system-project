/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          azure: "#2d8292",
          dark_gray_green: "#2f5832",
          gray_green: "#6f9d83",
          light_turquoise: "#c4dfda",
          light_green: "#e4e8e0",
          light_red: "#f8c0b6",
          light_orange: "#f8d6ca",
          lighter_orange: "#f4e8db",
        },
      },
    },
  },
  plugins: [],
};
