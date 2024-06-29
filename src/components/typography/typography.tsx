import React, { ReactNode, useContext } from 'react';
import { TextProps, Text, Platform } from "react-native";
import { ThemeInterface, ThemeContext } from '../../theme';
import { useResponsiveStyles } from '../../utils';

export interface TypeProps extends TextProps {
    children?: ReactNode;
    weight?: 'light' | 'regular' | 'medium' | 'bold';
    color?: 'error' | 'success' | 'category' | 'interactive' | 'title' | 'warning' | 'info' | 'inverted';
    size?: 'xxs'| 'xs' | 'sm' | 'md' | 'lg'; 
    italic?: boolean;
    underline?: boolean;
};

const base = (theme: ThemeInterface) => ({
  default: {
    color: theme.colors.text,
    fontFamily: theme.typography.default.fontFamily,
    fontSize: theme.typography.default.fontSize,
    lineHeight: theme.typography.default.lineHeight,
    flexWrap: 'wrap' as const,
    flexShrink: 1,
  },
  error: {
    color: theme.colors.red,
  },
  success: {
    color: theme.colors.green,
  },
  warning: {
    color: theme.colors.orange,
  },
  title: {
    color: theme.colors.title,
  },
  inverted: {
    color: theme.colors.invertedTitle,
  },
  info: {
    color: theme.colors.info,
  },
  interactive: {
    color: theme.colors.cyan,
  },
  category: {
    color: theme.colors.category,
  }, 
  weight_light: {
    fontFamily: theme.fonts.light,
  },
  weight_medium: {
    fontFamily: theme.fonts.medium,
  },
  weight_regular: {
    fontFamily: theme.fonts.regular,
  },
  weight_bold: {
    fontFamily: theme.fonts.bold,
  },
  size_xxs: {
    fontFamily: theme.typography.xxs.fontFamily,
    fontSize: theme.typography.xxs.fontSize,
    lineHeight: theme.typography.xxs.lineHeight,
  },
  size_xs: {
    fontFamily: theme.typography.xs.fontFamily,
    fontSize: theme.typography.xs.fontSize,
    lineHeight: theme.typography.xs.lineHeight,
  },
  size_sm: {
    fontFamily: theme.typography.sm.fontFamily,
    fontSize: theme.typography.sm.fontSize,
    lineHeight: theme.typography.sm.lineHeight,
  },
  size_md: {
    fontFamily: theme.typography.md.fontFamily,
    fontSize: theme.typography.md.fontSize,
    lineHeight: theme.typography.md.lineHeight,
  },
  size_lg: {
    fontFamily: theme.typography.lg.fontFamily,
    fontSize: theme.typography.lg.fontSize,
    lineHeight: theme.typography.lg.lineHeight,
  },
  italic: {
    fontStyle: 'italic' as const,
  },
  underline: {
    textDecorationLine: 'underline' as const,
  }
});

export const Type = ({
  children,
  weight,
  color,
  size,
  italic,
  underline,
  ...props
}: TypeProps) => {

  const styles = useResponsiveStyles({ base });
  const theme = useContext(ThemeContext);

  const italicPicker = () => {
    if (weight) {
      switch (weight) {
        case 'light':
          return { fontFamily: theme.fonts.lightItalic };
        case 'regular':
          return { fontFamily: theme.fonts.regularItalic };
        case 'medium':
          return { fontFamily: theme.fonts.mediumItalic };
        case 'bold':
          return { fontFamily: theme.fonts.boldItalic };
        default:
          return {};
      };
    }
    switch (size) {
      case 'xxs':
      case 'xs':
      case 'sm':
        return { fontFamily: theme.fonts.regularItalic };
      case 'md':
      case 'lg':
      default:
        return { fontFamily: theme.fonts.regularItalic };
    }
  }

  const textStyles = [
    styles.default,
    color === 'category' && styles.category,
    color === 'error' && styles.error,
    color === 'success' && styles.success,
    color === 'interactive' && styles.interactive,
    color === 'warning' && styles.warning,
    color === 'title' && styles.title,
    color === 'inverted' && styles.inverted,
    size === 'xxs' && styles.size_xxs,
    size === 'xs' && styles.size_xs,
    size === 'sm' && styles.size_sm,
    size === 'md' && styles.size_md,
    size === 'lg' && styles.size_lg,
    weight === 'light' && styles.weight_light,
    weight === 'regular' && styles.weight_regular,
    weight === 'medium' && styles.weight_medium,
    weight === 'bold' && styles.weight_bold,
    italic && (Platform.OS === 'android' ? italicPicker() : styles.italic),
    underline && styles.underline,
  ];

  return (
    <Text style={textStyles}>{children}</Text>
  )
}

export default { Type };