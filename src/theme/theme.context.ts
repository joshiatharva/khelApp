import { createContext } from "react";
import { ThemeInterface } from "./theme.interface";
import { LightTheme } from "./main-theme";


export const ThemeContext = createContext<ThemeInterface>(LightTheme);

export default { ThemeContext };