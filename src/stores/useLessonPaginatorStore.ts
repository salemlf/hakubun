import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSelectors } from "../utils";

interface LessonPaginatorState {
  currentLessonPage: number;
  currentLessonDir: number;
}

type LessonPageAndDir = [currentPage: number, direction: number];

interface LessonPaginatorActions {
  setCurrentLessonPageAndDir: (lessonPageAndDir: LessonPageAndDir) => void;
  reset: () => void;
}

const initialState: LessonPaginatorState = {
  currentLessonPage: 0,
  currentLessonDir: 0,
};

const useLessonPaginatorStoreBase = create<
  LessonPaginatorState & LessonPaginatorActions
>()(
  persist(
    (set, get) => ({
      ...initialState,
      setCurrentLessonPageAndDir: (lessonPageAndDir: LessonPageAndDir) =>
        set({
          currentLessonPage: lessonPageAndDir[0],
          currentLessonDir: lessonPageAndDir[1],
        }),
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "lesson-paginator-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useLessonPaginatorStore = createSelectors(
  useLessonPaginatorStoreBase
);
