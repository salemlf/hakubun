import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface LessonPaginatorState {
  currentLessonPage: number;
  currentLessonDir: number;
}

type LessonPageAndDir = [currentLessonPage: number, currentLessonDir: number];

export interface LessonPaginatorActions {
  setCurrentLessonPageAndDir: (lessonPageAndDir: LessonPageAndDir) => void;
  reset: () => void;
}

const initialState: LessonPaginatorState = {
  currentLessonPage: 0,
  currentLessonDir: 0,
};

export const useLessonPaginatorStore = create<
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
