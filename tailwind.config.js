module.exports = {
  mode: "jit",
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  variants: {extend: {backgroundColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],textColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],    }  },
  theme: {
    extend: {
      colors: {
        dark: "#12181B",
        carbon: "#2A2E35",
        carbontext: "#9CA3AF",
        carbonlight: "#323a42",
        carbonblue: "#393f47",
        moneygreen: "#23d183",
        yellow: "#ffcb2b",
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
