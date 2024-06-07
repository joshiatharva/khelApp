import { useContext } from "react";
import { ThemeContext, Themes } from "../theme";

export const useThemeName = (): Themes => {
    const theme = useContext(ThemeContext);
    return theme.name;
  };