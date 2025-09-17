/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"], // File-based routing in app/ & components/
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        tomorrow: ['Tomorrow'],
        saira: ['Saira']
      },
      colors: {
        darkRed: 'rgb(154, 29, 29)',
        darkGreen: 'rgb(26, 123, 55)',
      },
      boxShadow: {
        'red-glow': '0 0 20px rgba(154, 29, 29, 0.3)',
        'green-glow': '0 0 20px rgba(26, 153, 55, 0.3)',
      },
    },
  },
  plugins: [],
}