import { createContext, useRef } from "react";
import { createStore } from "zustand";
import { LAST_UPDATE_CHOICES } from "../components/LastUpdateOption/LastUpdateOption.constants";
import { BackToBackChoice } from "../components/BackToBackOption/BackToBackOption.types";
import { AssignmentSortOption } from "../components/SortOrderOption/SortOrderOption.types";
import { LastUpdateChoice } from "../components/LastUpdateOption/LastUpdateOption.types";
import { AssignmentSessionType } from "../types/AssignmentQueueTypes";

interface AssignmentSettingsProps {
  batchSize: string;
  backToBackChoice: BackToBackChoice;
  sortOption: AssignmentSortOption;
  settingsType: AssignmentSessionType;
}

interface AssignmentSettingsState extends AssignmentSettingsProps {
  lastUpdateChoice: LastUpdateChoice;
}

interface AssignmentSettingsActions {
  setBatchSize: (batchSize: string) => void;
  setBackToBackChoice: (backToBackChoice: BackToBackChoice) => void;
  setSortOption: (sortOption: AssignmentSortOption) => void;
  setLastUpdateChoice: (lastUpdateChoice: LastUpdateChoice) => void;
  resetAll: () => void;
}

export type AssignmentSettingsStateAndActions = AssignmentSettingsState &
  AssignmentSettingsActions;

type AssignmentSettingsStore = ReturnType<typeof createAssignmentSettingsStore>;

const createAssignmentSettingsStore = (initProps: AssignmentSettingsProps) => {
  const initialState: AssignmentSettingsState = {
    ...initProps,
    lastUpdateChoice: LAST_UPDATE_CHOICES[0],
  };

  return createStore<AssignmentSettingsStateAndActions>()((set) => ({
    ...initialState,
    setBatchSize: (size: string) => set({ batchSize: size }),
    setBackToBackChoice: (choice: BackToBackChoice) =>
      set({ backToBackChoice: choice }),
    setSortOption: (option: AssignmentSortOption) =>
      set({ sortOption: option }),
    setLastUpdateChoice: (choice: LastUpdateChoice) =>
      set({ lastUpdateChoice: choice }),
    resetAll: () => {
      set(initialState);
    },
  }));
};

const AssignmentSettingsContext = createContext<AssignmentSettingsStore | null>(
  null
);

interface ProviderProps extends AssignmentSettingsProps {
  children?: React.ReactNode;
}

const AssignmentSettingsProvider = ({
  batchSize,
  backToBackChoice,
  sortOption,
  settingsType,
  children,
}: ProviderProps) => {
  const store = useRef(
    createAssignmentSettingsStore({
      batchSize,
      backToBackChoice,
      sortOption,
      settingsType,
    })
  ).current;

  return (
    <AssignmentSettingsContext.Provider value={store}>
      {children}
    </AssignmentSettingsContext.Provider>
  );
};
export { AssignmentSettingsContext, AssignmentSettingsProvider };
