import { createContext, useContext, useState } from "react";

type TabBarHeightContextType = {
  tabBarHeight: string;
  setTabBarHeight: (height: string) => void;
};

const initialContext: TabBarHeightContextType = {
  tabBarHeight: "0",
  setTabBarHeight: () => {},
};

const TabBarHeightContext = createContext<{
  tabBarHeight: string;
  setTabBarHeight: (height: string) => void;
}>({
  ...initialContext,
});

type ProviderProps = {
  children?: React.ReactNode;
};

const TabBarHeightProvider = ({ children }: ProviderProps) => {
  const [tabBarHeight, setTabBarHeight] = useState<string>("0");

  const value = { tabBarHeight, setTabBarHeight };

  return (
    <TabBarHeightContext.Provider value={value}>
      {children}
    </TabBarHeightContext.Provider>
  );
};

const useTabBarHeight = () => {
  const context = useContext(TabBarHeightContext);

  if (!context) {
    throw new Error(
      "useTabBarHeight must be used within a TabBarHeightProvider"
    );
  }

  return context;
};

export { TabBarHeightContext, TabBarHeightProvider, useTabBarHeight };
