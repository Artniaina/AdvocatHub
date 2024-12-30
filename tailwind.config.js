/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    margin: false,
    padding: false,
    preflight: false,
  },
  prefix: "tw-",
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
