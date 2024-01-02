/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom:
          "0 4px 6px -1px rgba(0, 0, 255, 0.1), 0 2px 4px -1px rgba(0, 0, 255, 0.06)",
      },
    },
    fontFamily: {
      Inter: ["Inter", "sans-serif"],
      joseFin: ["Josefin Sans", "sans-serif"],
      Playpen: ["Playpen Sans", "cursive"],
    },
  },
  plugins: [],
};
