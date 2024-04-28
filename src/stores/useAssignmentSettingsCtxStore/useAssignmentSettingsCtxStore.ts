import { useContext } from "react";
import { AssignmentSettingsContext } from "../../contexts/AssignmentSettingsContext";

export const useAssignmentSettingsCtxStore = () => {
  const context = useContext(AssignmentSettingsContext);

  if (!context) {
    throw new Error(
      "useAssignmentSettings must be used within a AssignmentSettingsProvider"
    );
  }

  return context;
};
