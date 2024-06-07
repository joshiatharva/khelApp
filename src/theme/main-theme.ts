import { ThemeInterface, Themes } from "./theme.interface";
import { LightPalette, DarkPalette } from "./colours";
import { Fonts } from "./fonts";

export const baseTheme: Omit<ThemeInterface, 'colors' | 'colorsFixed' | 'dark'> = {
  name: Themes.LIGHT,
  fonts: {
    light: Fonts.Light,
    lightItalic: Fonts.LightItalic,
    regular: Fonts.Regular,
    regularItalic: Fonts.RegularItalic,
    medium: Fonts.Medium,
    mediumItalic: Fonts.MediumItalic,
    bold: Fonts.Bold,
    boldItalic: Fonts.BoldItalic,
  },
  typography: {
    default: {
      fontFamily: Fonts.Regular,
      fontSize: 16,
      lineHeight: 22,
    },
    xxs: {
      fontFamily: Fonts.Regular,
      fontSize: 8,
      lineHeight: 10,
    },
    xs: {
      fontFamily: Fonts.Regular,
      fontSize: 12,
      lineHeight: 14,
    },
    sm: {
      fontFamily: Fonts.Regular,
      fontSize: 14,
      lineHeight: 18,
    },
    md: {
      fontFamily: Fonts.Medium,
      fontSize: 18,
      lineHeight: 22,
    },
    lg: {
      fontFamily: Fonts.Medium,
      fontSize: 24,
      lineHeight: 28,
    },
    xl: {
      fontFamily: Fonts.Medium,
      fontSize: 30,
      lineHeight: 34,
    },
  },
  icon: {
    default: 16,
    xs: 12,
    sm: 14,
    md: 18,
    lg: 24,
  },
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },
  button: {
    backgroundColor: '',
  },
  footerButton: {
    backgroundColor: '',
  },
  categoryBadge: {
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 6,
  }
};

export const LightTheme: ThemeInterface = {
    ...baseTheme,
    name: Themes.LIGHT,
    dark: false,
    colors: LightPalette,
};

export const DarkTheme: ThemeInterface = {
    ...baseTheme,
    name: Themes.DARK,
    dark: true,
    colors: DarkPalette,
}