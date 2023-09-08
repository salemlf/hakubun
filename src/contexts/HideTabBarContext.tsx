import React, { createContext, useContext, useState } from "react";

type HideTabBarData = {
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
};

const HideTabBarContext = createContext<HideTabBarData>({} as HideTabBarData);

type ProviderProps = {
  children?: React.ReactNode;
};

const HideTabBarProvider = ({ children }: ProviderProps) => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  //* testing
  console.log(
    "🚀 ~ file: HideTabBarContext.tsx:16 ~ HideTabBarProvider ~ isHidden:",
    isHidden
  );
  //* testing

  return (
    <HideTabBarContext.Provider value={{ isHidden, setIsHidden }}>
      {children}
    </HideTabBarContext.Provider>
  );
};

const useHideTabBar = () => {
  const context = useContext(HideTabBarContext);

  if (!context) {
    throw new Error("useHideTabBar must be used within an HideTabBarProvider");
  }

  return context;
};

export { HideTabBarContext, HideTabBarProvider, useHideTabBar };
