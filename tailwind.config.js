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
        carbontext: "#9CA3AF",
        carbonlight: "#323a42",
        carbonblue: "#334E5C",
        orange: "#E27B47",
        darkred: "#ad3737",
        lightpink: "#FFDDF4",
        moneygreen: "#23d183",
        darkgreen: "#23D183",
        darkteal: "#00b6a2",
        yellow: "#ffcb2b",
        eucalyptus: "#b985f9"
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
