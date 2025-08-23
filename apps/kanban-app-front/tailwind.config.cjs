/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    extend: {
      colors: {
        "primary": "#635FC7",
        "secondary": "#A8A4FF",
        "primary-black": "#000112",
        "secondary-black": "#20212C",
        "tertiary-black": "#2B2C37",
        "quarternary-black": "#3E3F4E",
        "primary-gray": "#828FA3",
        "secondary-gray": "#E4EBFA",
        "tertiary-gray": "#F4F7FD",
        "quarternary-gray": "#F9FAFC",
        "primary-red": "#EA5555",
        "secondary-red": "#FF9898",
        "doing-column": "#49C4E5",
        "done-column": "#8471F2",
        "todo-column": "#67E2AE",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
