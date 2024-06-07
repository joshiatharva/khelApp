import merge from "lodash/merge";
import { useContext } from "react";
import { useWindowDimensions, StyleSheet } from "react-native";
import { Breakpoint, ThemeContext, ThemeInterface } from "../theme";

export type ThemeNamedStyles<T> = (theme: ThemeInterface) => StyleSheet.NamedStyles<T>;

export interface StyleObj<T> {
  base: ThemeNamedStyles<T>;
  xs?: ThemeNamedStyles<T> | null;
  sm?: ThemeNamedStyles<T> | null;
  md?: ThemeNamedStyles<T> | null;
};

export const useResponsiveStyles = <T>(style: StyleObj<T>): StyleSheet.NamedStyles<T> => {
  const theme = useContext(ThemeContext);
  const { width } = useWindowDimensions();
  let styles = style.base(theme);

  if (width > Breakpoint.md && style.md) {
    styles = merge(styles, style.md(theme));
  }
  return StyleSheet.flatten(styles) as StyleSheet.NamedStyles<T>;
};