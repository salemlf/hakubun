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
    lessonNextItemOnCorrect,
    reviewNextItemOnCorrect,
    prefersDarkModeTheme,
    shouldDisplayPitchAccent,
    setPronunciationVoice,
    setLessonBatchSize,
    setReviewBatchSize,
    setLessonSortOrderOption,
    setReviewSortOrderOption,
    setReviewBackToBackOption,
    setLessonNextItemOnCorrect,
    setReviewNextItemOnCorrect,
    setPrefersDarkModeTheme,
    setShouldDisplayPitchAccent,
  }: UserSettingsState & UserSettingsActions = useUserSettingsStore(
    useShallow((state: UserSettingsState & UserSettingsActions) => ({
      pronunciationVoice: state.pronunciationVoice,
      lessonBatchSize: state.lessonBatchSize,
      reviewBatchSize: state.reviewBatchSize,
      lessonSortOrderOption: state.lessonSortOrderOption,
      reviewSortOrderOption: state.reviewSortOrderOption,
      reviewBackToBackOption: state.reviewBackToBackOption,
      lessonNextItemOnCorrect: state.lessonNextItemOnCorrect,
      reviewNextItemOnCorrect: state.reviewNextItemOnCorrect,
      prefersDarkModeTheme: state.prefersDarkModeTheme,
      shouldDisplayPitchAccent: state.shouldDisplayPitchAccent,
      setPronunciationVoice: state.setPronunciationVoice,
      setLessonBatchSize: state.setLessonBatchSize,
      setReviewBatchSize: state.setReviewBatchSize,
      setLessonSortOrderOption: state.setLessonSortOrderOption,
      setReviewSortOrderOption: state.setReviewSortOrderOption,
      setReviewBackToBackOption: state.setReviewBackToBackOption,
      setLessonNextItemOnCorrect: state.setLessonNextItemOnCorrect,
      setReviewNextItemOnCorrect: state.setReviewNextItemOnCorrect,
      setPrefersDarkModeTheme: state.setPrefersDarkModeTheme,
      setShouldDisplayPitchAccent: state.setShouldDisplayPitchAccent,
    }))
  );

  return {
    pronunciationVoice,
    lessonBatchSize,
    reviewBatchSize,
    lessonSortOrderOption,
    reviewSortOrderOption,
    reviewBackToBackOption,
    lessonNextItemOnCorrect,
    reviewNextItemOnCorrect,
    prefersDarkModeTheme,
    shouldDisplayPitchAccent,
    setPronunciationVoice,
    setLessonBatchSize,
    setReviewBatchSize,
    setLessonSortOrderOption,
    setReviewSortOrderOption,
    setReviewBackToBackOption,
    setLessonNextItemOnCorrect,
    setReviewNextItemOnCorrect,
    setPrefersDarkModeTheme,
    setShouldDisplayPitchAccent,
    // exporting to check that state is reset properly
    initialState,
  };
};

export default useUserSettingsStoreFacade;
