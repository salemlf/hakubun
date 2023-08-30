import { create } from "zustand";
import { createSelectors } from "../utils";

interface ForeCastTotalsState {
  runningTotalAvailableReviews: number[];
}

interface ForeCastTotalsActions {
  seedRunningTotalAvailableReviews: (reviewsAvailableNow: number) => void;
  updateRunningTotalAvailableReviews: (
    totalAvailableForDay: number,
    indexToUpdate: number
  ) => void;
  resetAll: () => void;
}

const initialState: ForeCastTotalsState = {
  runningTotalAvailableReviews: [],
};

const useForecastTotalsStoreBase = create<
  ForeCastTotalsState & ForeCastTotalsActions
>((set, get) => ({
  ...initialState,
  updateRunningTotalAvailableReviews: (totalAvailableForDay, indexToUpdate) => {
    let updatedRunningTotal = get().runningTotalAvailableReviews;
    updatedRunningTotal[indexToUpdate + 1] =
      updatedRunningTotal[indexToUpdate] + totalAvailableForDay;

    set(() => ({
      runningTotalAvailableReviews: updatedRunningTotal,
    }));
  },
  seedRunningTotalAvailableReviews: (reviewsAvailableNow) => {
    set(() => ({
      runningTotalAvailableReviews: [reviewsAvailableNow],
    }));
  },
  resetAll: () => {
    set(initialState);
  },
}));

export const useForecastTotalsStore = createSelectors(
  useForecastTotalsStoreBase
);
