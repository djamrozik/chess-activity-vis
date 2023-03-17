import { createContext } from "react";

type ThemeContextFields = {
  themeClass: "dark" | "light";
  setThemeClass: (s: "dark" | "light") => void;
};

const ThemeContext = createContext<ThemeContextFields>({
  themeClass: "dark",
  setThemeClass: (_: string) => {},
});

export default ThemeContext;
