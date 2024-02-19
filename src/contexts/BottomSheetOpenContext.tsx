import { createContext, useContext, useState } from "react";

const INITIAL_OPEN_VALUE = false;

type BtmSheetOpenContextType = {
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: (isOpen: boolean) => void;
};

const initialContext: BtmSheetOpenContextType = {
  isBottomSheetOpen: INITIAL_OPEN_VALUE,
  setIsBottomSheetOpen: () => {},
};

const BottomSheetOpenContext = createContext<{
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: (isOpen: boolean) => void;
}>({
  ...initialContext,
});

type ProviderProps = {
  children?: React.ReactNode;
};

const BottomSheetOpenProvider = ({ children }: ProviderProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  const value = { isBottomSheetOpen, setIsBottomSheetOpen };

  return (
    <BottomSheetOpenContext.Provider value={value}>
      {children}
    </BottomSheetOpenContext.Provider>
  );
};

const useIsBottomSheetOpen = () => {
  const context = useContext(BottomSheetOpenContext);

  if (!context) {
    throw new Error("useIsBottomSheetOpen must be used within a ThemeProvider");
  }

  return context;
};

export {
  BottomSheetOpenContext,
  BottomSheetOpenProvider,
  useIsBottomSheetOpen,
};
