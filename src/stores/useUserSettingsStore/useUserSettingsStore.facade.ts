import { useShallow } from "zustand/react/shallow";
import {
  UserSettingsState,
  UserSettingsActions,
  useUserSettingsStore,
} from "./useUserSettingsStore";

// using facade pattern, cleaner to use in components and easier to replace zustand in future if necessary
const useUserSettingsStoreFacade = () => {
  const {
    pronunciationVoice,
    lessonBatchSize,
    reviewBatchSize,
    lessonSortOrderOption,
    reviewSortOrderOption,
    reviewBackToBackOption,
    setPronunciationVoice,
    setLessonBatchSize,
    setReviewBatchSize,
    setLessonSortOrderOption,
    setReviewSortOrderOption,
    setReviewBackToBackOption,
  } = useUserSettingsStore(
    useShallow((state: UserSettingsState & UserSettingsActions) => ({
      pronunciationVoice: state.pronunciationVoice,
      lessonBatchSize: state.lessonBatchSize,
      reviewBatchSize: state.reviewBatchSize,
      lessonSortOrderOption: state.lessonSortOrderOption,
      reviewSortOrderOption: state.reviewSortOrderOption,
      reviewBackToBackOption: state.reviewBackToBackOption,
      setPronunciationVoice: state.setPronunciationVoice,
      setLessonBatchSize: state.setLessonBatchSize,
      setReviewBatchSize: state.setReviewBatchSize,
      setLessonSortOrderOption: state.setLessonSortOrderOption,
      setReviewSortOrderOption: state.setReviewSortOrderOption,
      setReviewBackToBackOption: state.setReviewBackToBackOption,
    }))
  );

  return {
    pronunciationVoice,
    lessonBatchSize,
    reviewBatchSize,
    lessonSortOrderOption,
    reviewSortOrderOption,
    reviewBackToBackOption,
    setPronunciationVoice,
    setLessonBatchSize,
    setReviewBatchSize,
    setLessonSortOrderOption,
    setReviewSortOrderOption,
    setReviewBackToBackOption,
  };
};

export default useUserSettingsStoreFacade;
