export const colors = {
  primary: "#c89b3c",
  primaryDark: "#7b5900",
  primaryLight: "#f5e6c8",
  background: "#fcf9f8",
  surface: "#ffffff",
  success: "#53b656",
  successDark: "#006e1c",
  error: "#c75b4e",
  textPrimary: "#1b1c1c",
  textMuted: "#5e5e5b",
  border: "#E7E2DA",
  secondary: "#5e5e5b",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
} as const;

export const radius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  pill: 9999,
} as const;

export const fontFamily = {
  regular: "PlusJakartaSans_400Regular",
  medium: "PlusJakartaSans_500Medium",
  semiBold: "PlusJakartaSans_600SemiBold",
  bold: "PlusJakartaSans_700Bold",
} as const;
