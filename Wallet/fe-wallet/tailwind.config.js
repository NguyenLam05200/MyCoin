/** @type {import('tailwindcss').Config} */
const colors2 = require("./src/styles/colors.js");
const colors = require("tailwindcss/colors");

const commonColors = {
  ...colors2,
};

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        // add new font family
        montserrat: ["Montserrat", "sans-serif"],
        sansSerif: [
          "Open Sans",
          "sans-serif",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      colors: {
        dominant: commonColors.teal,
        transparent: "transparent",
        current: "currentColor",

        listItemSelected: {
          DEFAULT: commonColors.lightTeal,
          dark: commonColors.darkBlue3,
        },

        shadow: "#0c0e14",
        divider: {
          DEFAULT: commonColors.divider.DEFAULT,
          dark: commonColors.divider.dark,
        },

        hover: {
          ...commonColors.hover,
          DEFAULT: commonColors.hover.DEFAULT,
          dark: commonColors.hover.dark,
        },

        //--------------------------------------------
        black: {
          DEFAULT: "#02083D",
          5: "#F7F6FD", // 9
          50: "#F8F7FA", // 8
          100: "#F6F9FC", // 7
          200: "#EEF2FA", // 6
          300: "#E1E2ED", // 5
          400: "#C5C6D2", // 4
          500: "#8B8C9B", // 3
          600: "#3e3b3b", // 2
          700: "#02083D", // 1,
          800: "#000000",
        },
        white: colors.white,
        blue: {
          DEFAULT: "#384562",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#a7acb9",
          400: "#9198a8",
          500: "#7a8396",
          600: "#646e85",
          700: "#4e5973",
          800: "#384562",
          900: "#223050",
          crayola: "#1e77eb",
          ...commonColors.blue,
        },
        darkBlue: {
          DEFAULT: commonColors.darkBlue,
          1: commonColors.darkBlue1,
          2: commonColors.darkBlue2,
          3: commonColors.darkBlue3,
          4: commonColors.darkBlue4,
          5: commonColors.darkBlue5,
          6: commonColors.darkBlue6,
          "5a": "rgba(123, 140, 178, 0.8)",
        },
        gray: {
          DEFAULT: "#8D9091",
          ...colors.gray,
          ...commonColors.gray,
        },
        teal: {
          DEFAULT: commonColors.teal,
          5: "#03bdce17",
          50: "#b3efeb",
          100: "#99e9e4",
          200: "#80e4de",
          300: "#4dd9d0",
          400: "#33d3c9",
          500: "#1acec3",
          600: "#00C8BC",
          700: "#00C8BC",
          800: "#52EAD1",
          900: "#33FFDD",
          1000: "#80FFEA",
          1100: "#B3FFF2",
          1200: "#D9FFF8",
          lightTeal: "#E2F6F5",
          opacity: "rgba(0, 200, 188, 0.5)",
          opacitier: "rgba(0, 200, 188, 0.1)",
        },
        green: {
          DEFAULT: "#22B02E",
          opacity: "rgba(34, 176, 46, 0.18)",
          border_light: "rgba(126, 229, 174, 0.1)",
          ...commonColors.green,
        },
        purple: {
          ...commonColors.purple,
        },
        yellow: {
          DEFAULT: "#FFD965",
          100: "#FFC632",
          ...commonColors.yellow,
        },
        red: {
          DEFAULT: commonColors.red2,
          lightRed: "#E5544B19",
          ...commonColors.red,
        },
        pink: { DEFAULT: "#E5544B" },
        mint: { DEFAULT: "#00C8BC" },

        onus: {
          DEFAULT: commonColors.onus.bg,
          1: commonColors.onus.bg2,
          2: commonColors.onus.bg3,
          ...commonColors.onus,
        },
        nao: {
          DEFAULT: commonColors.nao.bg,
          ...commonColors.nao,
        },
        dark: {
          ...commonColors.dark,
          DEFAULT: commonColors.dark.dark,
        },
        orange: {
          ...commonColors.orange,
        },
      },
      textColor: {
        txtPrimary: {
          DEFAULT: commonColors.darkBlue,
          dark: commonColors.gray[4],
        },
        txtSemiPrimary: {
          DEFAULT: commonColors.gray[2],
          dark: commonColors.darkBlue4,
        },
        txtSecondary: {
          DEFAULT: commonColors.gray[1],
          dark: commonColors.darkBlue5,
        },

        txtBtnPrimary: {
          DEFAULT: commonColors.white,
          dark: commonColors.white,
        },
        txtBtnSecondary: {
          DEFAULT: commonColors.teal,
          dark: commonColors.teal,
        },
        txtTabInactive: {
          DEFAULT: commonColors.gray[1],
          dark: commonColors.darkBlue5,
        },
        txtTabActive: {
          DEFAULT: commonColors.white,
          dark: commonColors.white,
        },
        onus: {
          DEFAULT: commonColors.onus.white,
          secondary: commonColors.onus.grey,
        },
        txtDarkBlue: {
          DEFAULT: commonColors.darkBlue5,
        },
        txtTextBtn: {
          DEFAULT: "#30bf73",
          pressed: "#19a65b",
          disabled: "#b5c0c9",
          dark: "#47cc85",
          dark_pressed: "#19a65b",
          dark_disabled: "#454c5c",
          tonal: "#8593a6",
          tonal_dark: "#8694b2",
        },
        txtDisabled: {
          DEFAULT: "#b5c0c9",
          dark: "#3e4351",
        },
        txtTabHover: {
          DEFAULT: "#1e1e1e",
          dark: "#acbde5",
        },
      },
    },
  },
  plugins: [],
};
