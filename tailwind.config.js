/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#F89B2A",
        white: "#ffffff",
        black: "#1f1f1f",
        bg: "#282828",
        bg0: "#32302f",
        fg: "#ebdbb2",
        fg0: "#fbf1c7",
      },
    },
  },
  plugins: [],
};
