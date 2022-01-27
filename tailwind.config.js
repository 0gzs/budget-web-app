module.exports = {
  mode: "jit",
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html']
  },
  theme: {
    extend: {
      colors: {
        dark: "#12181B",
        carbon: "#2A2E35",
        'carbon-text': "#9CA3AF",
        softred: "#f25776",
        darkred: "#ad3737",
        lightpink: "#FFDDF4",
        moneygreen: "#23d183",
        darkgreen: "#23D183",
        blue: "#54C5F8",
        yellow: "#ffcb2b",
        carbonlight: "#323a42",
        eucalyptus: "#6675E0",
        gray: "#B0BCCB"
      },
      fontFamily: {
        source: ["'Source Sans Pro'", 'sans-serif']
      },
      fontWeight: {
        thin: "300",
        med: "400",
        big: "700",
        huge: "900"
      },
    }
  },
  plugins: [],
}
