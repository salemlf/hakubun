import { create } from "zustand";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import { createSelectors } from "../utils";

interface LessonQuizState {
  isLoading: boolean;
  lessonQuizQueue: ReviewQueueItem[];
  currQueueIndex: number;
}

interface LessonQuizActions {
  updateLessonQuizItem: (item: ReviewQueueItem) => void;
  removeLessonQuizItem: () => void;
  resetLessonQuiz: () => void;
  setLessonQuizLoaded: (queueData: ReviewQueueItem[]) => void;
  setLessonQuizLoading: () => void;
}

const useLessonQuizStoreBase = create<LessonQuizState & LessonQuizActions>(
  (set, get) => ({
    isLoading: true,
    currQueueIndex: 0,
    lessonQuizQueue: [],

    incrementCurrQueueIndex: () =>
      set((state) => ({ currQueueIndex: state.currQueueIndex + 1 })),
    resetQueueIndex: () => set({ currQueueIndex: 0 }),
    updateLessonQuizItem: (item) => {
      const lastIndexOfItem =
        get().lessonQuizQueue.length -
        1 -
        get()
          .lessonQuizQueue.slice()
          .reverse()
          .findIndex(
            (lessonItem) =>
              lessonItem.itemID === item.itemID &&
              lessonItem.review_type === item.review_type
          );
      const updatedQueueItem = { ...item };

      set((state) => ({
        ...state,
        lessonQuizQueue: [
          ...state.lessonQuizQueue.slice(0, lastIndexOfItem),
          updatedQueueItem,
          ...state.lessonQuizQueue.slice(lastIndexOfItem + 1),
        ],
      }));
    },
    addLessonQuizItem: (lessonItem: ReviewQueueItem) => {
      set((state) => ({
        ...state,
        lessonQuizQueue: [...state.lessonQuizQueue, lessonItem],
      }));
    },
    removeLessonQuizItem: () => {
      const indexToRemove = get().currQueueIndex;

      set((state) => ({
        ...state,
        lessonQuizQueue: [
          ...state.lessonQuizQueue.slice(0, indexToRemove),
          ...state.lessonQuizQueue.slice(indexToRemove + 1),
        ],
      }));
    },
    resetLessonQuiz: () => {
      set((state) => ({ ...state, lessonQuizQueue: [], currQueueIndex: 0 }));
    },

    setLessonQuizLoaded: (queueData: ReviewQueueItem[]) => {
      set((state) => ({
        ...state,
        isLoading: false,
        lessonQuizQueue: queueData,
      }));
    },

    setLessonQuizLoading: () => {
      set((state) => ({ ...state, isLoading: true }));
    },
  })
);

export const useLessonQuizStore = createSelectors(useLessonQuizStoreBase);
