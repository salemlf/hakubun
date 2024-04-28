import { useContext } from "react";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import {
  AssignmentSettingsContext,
  AssignmentSettingsStateAndActions,
} from "../../contexts/AssignmentSettingsContext";

export const useAssignmentSettingsCtxStore = <T>(
  selector: (state: AssignmentSettingsStateAndActions) => T
) => {
  const context = useContext(AssignmentSettingsContext);

  if (!context) {
    throw new Error(
      "useAssignmentSettings must be used within a AssignmentSettingsProvider"
    );
  }

  return useStoreWithEqualityFn(context, selector, shallow);
};
