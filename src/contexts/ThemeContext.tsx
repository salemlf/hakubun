import { createContext, useContext, useEffect } from "react";
import { useDarkMode } from "usehooks-ts";
import useUserSettingsStoreFacade from "../stores/useUserSettingsStore/useUserSettingsStore.facade";

type ThemeColors = {
  background: string;
  foreground: string;
  secondaryForeground: string;
  contrast: string;
  boxShadow: string;
  text: string;
  contrastText: string;
  linkText: string;
  focus: string;
};

const THEME_COLORS: { [index: string]: ThemeColors } = {
  light: {
    background: "var(--light-mauve)",
    foreground: "var(--offwhite-color)",
    secondaryForeground: "var(--pale-grey)",
    contrast: "var(--light-grey)",
    boxShadow: "var(--pale-grey)",
    text: "black",
    contrastText: "white",
    linkText: "var(--ion-color-secondary-darkest)",
    focus: "black",
  },
  dark: {
    background: "var(--dark-greyish-purple)",
    foreground: "var(--light-greyish-purple)",
    secondaryForeground: "var(--light-grey)",
    contrast: "var(--offwhite-color)",
    boxShadow: "var(--darkest-purple)",
    text: "white",
    contrastText: "black",
    linkText: "var(--ion-color-primary-tint)",
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
  const { prefersDarkModeTheme } = useUserSettingsStoreFacade();

  useEffect(() => {
    setIsDarkMode(prefersDarkModeTheme);
  }, [prefersDarkModeTheme]);

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
    root.style.setProperty("--contrast-color", themeColors.contrast);
    root.style.setProperty("--box-shadow-color", themeColors.boxShadow);
    root.style.setProperty("--text-color", themeColors.text);
    root.style.setProperty("--contrast-text-color", themeColors.contrastText);
    root.style.setProperty("--link-text-color", themeColors.linkText);
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
