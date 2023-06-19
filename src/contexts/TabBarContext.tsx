import React, { createContext, useContext } from "react";
import { useBoolean } from "../hooks/useBoolean";

type TabBarSettings = {
  showTabBar: boolean;
  setShowTabBar: (showTabBar: boolean) => void;
};

const TabBarContext = createContext<TabBarSettings>({} as TabBarSettings);

type ProviderProps = {
  children?: React.ReactNode;
};

const TabBarProvider = ({ children }: ProviderProps) => {
  const { value: showTabBar, setValue: setShowTabBar } = useBoolean(true);

  return (
    <TabBarContext.Provider value={{ showTabBar, setShowTabBar }}>
      {children}
    </TabBarContext.Provider>
  );
};

function useTabBarContext() {
  const context = useContext(TabBarContext);

  if (!context) {
    throw new Error("useTabBarContext must be used within an TabBarProvider");
  }

  return context;
}

export { TabBarContext, TabBarProvider, useTabBarContext };
