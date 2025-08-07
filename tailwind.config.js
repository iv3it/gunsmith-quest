/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}"], // File-based routing in app/
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        tomorrow: ['Tomorrow'],
        saira: ['Saira']
      },
      colors: {
        lightOrange: '#F17F29',
        darkOrange: '#F96900',
      },
      boxShadow: {
        'orange-glow': '0 0 20px rgba(255, 165, 0, 0.3)',
      },
    },
  },
  plugins: [],
}