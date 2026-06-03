/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#c89b3c",
          dark: "#7b5900",
          light: "#f5e6c8",
        },
        background: "#fcf9f8",
        surface: "#ffffff",
        success: "#53b656",
        "success-dark": "#006e1c",
        error: "#c75b4e",
        "text-primary": "#1b1c1c",
        "text-muted": "#5e5e5b",
        border: "#E7E2DA",
        secondary: "#5e5e5b",
      },
      fontFamily: {
        jakarta: ["PlusJakartaSans_400Regular"],
        "jakarta-medium": ["PlusJakartaSans_500Medium"],
        "jakarta-semibold": ["PlusJakartaSans_600SemiBold"],
        "jakarta-bold": ["PlusJakartaSans_700Bold"],
      },
      borderRadius: {
        "4xl": "32px",
        pill: "9999px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};
