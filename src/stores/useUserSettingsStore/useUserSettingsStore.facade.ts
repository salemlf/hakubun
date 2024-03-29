import { useShallow } from "zustand/react/shallow";
import {
  UserSettingsState,
  UserSettingsActions,
  useUserSettingsStore,
  initialState,
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
    prefersDarkModeTheme,
    setPronunciationVoice,
    setLessonBatchSize,
    setReviewBatchSize,
    setLessonSortOrderOption,
    setReviewSortOrderOption,
    setReviewBackToBackOption,
    setPrefersDarkModeTheme,
  }: UserSettingsState & UserSettingsActions = useUserSettingsStore(
    useShallow((state: UserSettingsState & UserSettingsActions) => ({
      pronunciationVoice: state.pronunciationVoice,
      lessonBatchSize: state.lessonBatchSize,
      reviewBatchSize: state.reviewBatchSize,
      lessonSortOrderOption: state.lessonSortOrderOption,
      reviewSortOrderOption: state.reviewSortOrderOption,
      reviewBackToBackOption: state.reviewBackToBackOption,
      prefersDarkModeTheme: state.prefersDarkModeTheme,
      setPronunciationVoice: state.setPronunciationVoice,
      setLessonBatchSize: state.setLessonBatchSize,
      setReviewBatchSize: state.setReviewBatchSize,
      setLessonSortOrderOption: state.setLessonSortOrderOption,
      setReviewSortOrderOption: state.setReviewSortOrderOption,
      setReviewBackToBackOption: state.setReviewBackToBackOption,
      setPrefersDarkModeTheme: state.setPrefersDarkModeTheme,
    }))
  );

  return {
    pronunciationVoice,
    lessonBatchSize,
    reviewBatchSize,
    lessonSortOrderOption,
    reviewSortOrderOption,
    reviewBackToBackOption,
    prefersDarkModeTheme,
    setPronunciationVoice,
    setLessonBatchSize,
    setReviewBatchSize,
    setLessonSortOrderOption,
    setReviewSortOrderOption,
    setReviewBackToBackOption,
    setPrefersDarkModeTheme,
    // exporting to check that state is reset properly
    initialState,
  };
};

export default useUserSettingsStoreFacade;
