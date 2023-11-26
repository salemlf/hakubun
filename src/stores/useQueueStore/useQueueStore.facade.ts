import { useShallow } from "zustand/react/shallow";
import {
  QueueState,
  QueueActions,
  useQueueStore,
  initialState,
} from "./useQueueStore";

// using facade pattern, cleaner to use in components and easier to replace zustand in future if necessary
const useQueueStoreFacade = () => {
  const {
    isSubmittingAnswer,
    isBottomSheetVisible,
    popoverInfo,
    displayPopoverMsg,
    savedUserAnswer,
    setIsSubmittingAnswer,
    retryReview,
    showPopoverMsg,
    setSavedUserAnswer,
    correctShowResult,
    correctMoveToNext,
    wrongMoveToNext,
    wrongShowResult,
    submitChoice,
    resetAll,
  }: QueueState & QueueActions = useQueueStore(
    useShallow((state: QueueState & QueueActions) => ({
      isSubmittingAnswer: state.isSubmittingAnswer,
      isBottomSheetVisible: state.isBottomSheetVisible,
      popoverInfo: state.popoverInfo,
      displayPopoverMsg: state.displayPopoverMsg,
      savedUserAnswer: state.savedUserAnswer,
      setIsSubmittingAnswer: state.setIsSubmittingAnswer,
      retryReview: state.retryReview,
      showPopoverMsg: state.showPopoverMsg,
      setSavedUserAnswer: state.setSavedUserAnswer,
      correctShowResult: state.correctShowResult,
      correctMoveToNext: state.correctMoveToNext,
      wrongMoveToNext: state.wrongMoveToNext,
      wrongShowResult: state.wrongShowResult,
      submitChoice: state.submitChoice,
      resetAll: state.resetAll,
    }))
  );

  return {
    isSubmittingAnswer,
    isBottomSheetVisible,
    popoverInfo,
    displayPopoverMsg,
    savedUserAnswer,
    setIsSubmittingAnswer,
    retryReview,
    showPopoverMsg,
    setSavedUserAnswer,
    correctShowResult,
    correctMoveToNext,
    wrongMoveToNext,
    wrongShowResult,
    submitChoice,
    resetAll,
    // exporting to check that state is reset properly
    initialState,
  };
};

export default useQueueStoreFacade;
