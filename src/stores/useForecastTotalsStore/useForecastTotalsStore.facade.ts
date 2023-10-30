import { useShallow } from "zustand/react/shallow";
import {
  ForeCastTotalsState,
  ForeCastTotalsActions,
  useForecastTotalsStore,
} from "./useForecastTotalsStore";

// using facade pattern, cleaner to use in components and easier to replace zustand in future if necessary
const useForecastTotalsStoreFacade = () => {
  const {
    runningTotalAvailableReviews,
    seedRunningTotalAvailableReviews,
    updateRunningTotalAvailableReviews,
    resetAll,
  } = useForecastTotalsStore(
    useShallow((state: ForeCastTotalsState & ForeCastTotalsActions) => ({
      runningTotalAvailableReviews: state.runningTotalAvailableReviews,
      seedRunningTotalAvailableReviews: state.seedRunningTotalAvailableReviews,
      updateRunningTotalAvailableReviews:
        state.updateRunningTotalAvailableReviews,
      resetAll: state.resetAll,
    }))
  );

  return {
    runningTotalAvailableReviews,
    seedRunningTotalAvailableReviews,
    updateRunningTotalAvailableReviews,
    resetAll,
  };
};

export default useForecastTotalsStoreFacade;
