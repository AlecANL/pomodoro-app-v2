module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      xs: "360px",
      // => @media (min-width: 360px) { ... }
      sm: "480px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      "kumbh-sans": ["Kumbh Sans", "sans-serif"],
      "space-mono": ["Space Mono", "monospace"],
      "roboto-slab": ["Roboto Slab", "serif"],
    },
    colors: {
      moonraker: "#d7e0ff",
      magenta: "#d881f8",
      cyan: "#70f3f8",
      "radical-red": "#f87070",
      violet: "#1e213f",
      white: "#fff",
      black: "#000",
      selago: "#eff1fa",
      haiti: "#161932",
      topaz: "#7a748c",
      "santas-grey": "#a7a2b2",
    },
    extend: {},
  },
  plugins: [],
};
