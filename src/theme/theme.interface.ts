import { ThemeSpacing } from "@rneui/base";

export enum Themes {
    DARK = 'Dark Theme',
    LIGHT = 'Light Theme',
}

interface Typography {
    fontFamily: string,
    fontSize: number,
    lineHeight: number,
};

export interface ThemeInterface {
    name: Themes;
    dark: boolean;
    colors: {
      red: string;
      orange: string;
      yellow: string;
      green: string;
      mint: string;
      teal: string;
      cyan: string;
      blue: string;
      indigo: string;
      purple: string;
      pink: string;
      brown: string;
      text: string;
      title: string;
      invertedTitle: string;
      category: string;
      info: string;
      neutral000: string;
      neutral100: string;
      neutral200: string;
      neutral300: string;
      neutral400: string;
      neutral500: string;
      background: string;
      secondaryBackground: string;
      tertiaryBackground: string;
      altBackground: string;
    };
    fonts: {
      light: string;
      lightItalic: string;
      regular: string;
      regularItalic: string;
      medium: string;
      mediumItalic: string;
      bold: string;
      boldItalic: string;
    };
    typography: {
      default: Typography;
      xxs: Typography;
      xs: Typography;
      sm: Typography;
      md: Typography;
      lg: Typography;
      xl: Typography;
    };
    spacing: {
      xxs: number;
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    icon: {
      default: number;
      xs: number;
      sm: number;
      md: number;
      lg: number;
    };
    button: {
      backgroundColor: string;
    };
    footerButton: {
      backgroundColor: string;
    };
    categoryBadge: {
      paddingVertical: number;
      paddingHorizontal: number;
      borderRadius: number;
    }
}