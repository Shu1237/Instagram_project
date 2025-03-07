/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gradient: {
          to: {
            r: "linear-gradient(to right, #f43f5e, #f97316, #facc15)",
          },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
