import React, { createContext, useContext } from "react";
import { useDarkMode } from "usehooks-ts";

const THEME_COLORS = {
  light: {
    background: "var(--offwhite-color)",
    foreground: "var(--pale-lavender)",
    text: "black",
    focus: "black",
  },
  dark: {
    background: "var(--dark-greyish-purple)",
    foreground: "var(--light-greyish-purple)",
    text: "white",
    focus: "white",
  },
};

const INITIAL_DARK_MODE = true;

type ThemeContextType = {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
};

const initialContext: ThemeContextType = {
  isDarkMode: INITIAL_DARK_MODE,
  setIsDarkMode: () => {},
};

const ThemeContext = createContext<{
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}>({
  ...initialContext,
});

type ProviderProps = {
  children?: React.ReactNode;
};

const ThemeProvider = ({ children }: ProviderProps) => {
  // uses default theme user has set for device, persists in local storage
  const { isDarkMode, enable, disable } = useDarkMode();

  // TODO: call updateCSSVariables() when isDarkMode changes
  const setIsDarkMode = (isDarkModeOn: boolean) => {
    isDarkModeOn ? enable() : disable();
    updateCSSVariables();
  };

  // TODO: map colors from THEME_COLORS object instead of individually
  const updateCSSVariables = () => {
    const root = window.document.documentElement;

    root.style.setProperty(
      "--background-color",
      isDarkMode ? THEME_COLORS.dark.background : THEME_COLORS.light.background
    );
    root.style.setProperty(
      "--foreground-color",
      isDarkMode ? THEME_COLORS.dark.foreground : THEME_COLORS.light.foreground
    );
    root.style.setProperty(
      "--text-color",
      isDarkMode ? THEME_COLORS.dark.text : THEME_COLORS.light.text
    );
    root.style.setProperty(
      "--focus-color",
      isDarkMode ? THEME_COLORS.dark.focus : THEME_COLORS.light.focus
    );
  };

  const value = { isDarkMode, setIsDarkMode };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export { ThemeContext, ThemeProvider, useTheme };
