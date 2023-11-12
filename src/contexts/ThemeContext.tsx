import { createContext, useContext } from "react";
import { useDarkMode } from "usehooks-ts";

type ThemeColors = {
  background: string;
  foreground: string;
  secondaryForeground: string;
  boxShadow: string;
  text: string;
  focus: string;
};

const THEME_COLORS: { [index: string]: ThemeColors } = {
  light: {
    background: "var(--light-mauve)",
    foreground: "var(--offwhite-color)",
    secondaryForeground: "var(--pale-grey)",
    boxShadow: "var(--pale-grey)",
    text: "black",
    focus: "black",
  },
  dark: {
    background: "var(--dark-greyish-purple)",
    foreground: "var(--light-greyish-purple)",
    secondaryForeground: "var(--light-grey)",
    boxShadow: "var(--darkest-purple)",
    text: "white",
    focus: "white",
  },
};

// this doesn't actually set the default theme, it just sets the default value to make TypeScript happy
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

  const updateCSSVariables = () => {
    const root = window.document.documentElement;
    let themeColors = isDarkMode ? THEME_COLORS.dark : THEME_COLORS.light;

    root.style.setProperty("--background-color", themeColors.background);
    root.style.setProperty("--foreground-color", themeColors.foreground);
    root.style.setProperty(
      "--secondary-foreground-color",
      themeColors.secondaryForeground
    );
    root.style.setProperty("--box-shadow-color", themeColors.boxShadow);
    root.style.setProperty("--text-color", themeColors.text);
    root.style.setProperty("--focus-color", themeColors.focus);
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