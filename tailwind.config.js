module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        mobile: "url('./src/assets/mobile.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
