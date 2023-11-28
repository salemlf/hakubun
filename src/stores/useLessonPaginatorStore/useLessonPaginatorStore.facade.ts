import { useShallow } from "zustand/react/shallow";
import {
  LessonPaginatorState,
  LessonPaginatorActions,
  useLessonPaginatorStore,
  initialState,
} from "./useLessonPaginatorStore";

// using facade pattern, cleaner to use in components and easier to replace zustand in future if necessary
const useLessonPaginatorStoreFacade = () => {
  const {
    currentLessonPage,
    currentLessonDir,
    setCurrentLessonPageAndDir,
    reset,
  }: LessonPaginatorState & LessonPaginatorActions = useLessonPaginatorStore(
    useShallow((state: LessonPaginatorState & LessonPaginatorActions) => ({
      currentLessonPage: state.currentLessonPage,
      currentLessonDir: state.currentLessonDir,
      setCurrentLessonPageAndDir: state.setCurrentLessonPageAndDir,
      reset: state.reset,
    }))
  );

  return {
    currentLessonPage,
    currentLessonDir,
    setCurrentLessonPageAndDir,
    reset,
    // exporting to check that state is reset properly
    initialState,
  };
};

export default useLessonPaginatorStoreFacade;
