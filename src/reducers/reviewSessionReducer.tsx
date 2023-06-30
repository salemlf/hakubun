export type PopoverMessageType = "correct" | "incorrect" | "invalid";

export type PopoverInfo = {
  message: string;
  messageType: PopoverMessageType;
};

type SessionStateProps = {
  currReviewCardIndex: number;
  // TODO: change below to more generic name, swiping will also toggle value
  isSecondClick: boolean;
  isBottomSheetVisible: boolean;
  showRetryButton: boolean;
  popoverInfo: PopoverInfo;
  displayPopoverMsg: boolean;
};

type ActionType =
  | "CORRECT_MOVE_TO_NEXT"
  | "WRONG_MOVE_TO_NEXT"
  | "CORRECT_SHOW_RESULT"
  | "WRONG_SHOW_RESULT"
  | "SUBMIT_CHOICE"
  | "RETRY_REVIEW"
  | "SHOW_POPOVER_MSG";

type SessionAction = {
  type: ActionType;
  payload?: any;
};

export const reviewSessionReducer = (
  state: SessionStateProps,
  action: SessionAction
) => {
  switch (action.type) {
    case "CORRECT_SHOW_RESULT":
      return { ...state, isBottomSheetVisible: true };
    case "CORRECT_MOVE_TO_NEXT":
      // TODO: rn just adding to back of queue, change to add to some random spot
      return {
        ...state,
        isBottomSheetVisible: false,
        displayPopoverMsg: false,
        currReviewCardIndex: state.currReviewCardIndex + 1,
      };
    case "WRONG_SHOW_RESULT":
      return {
        ...state,
        isBottomSheetVisible: true,
        showRetryButton: true,
      };
    case "WRONG_MOVE_TO_NEXT":
      // TODO: rn just adding to back of queue, change to add to some random spot
      return {
        ...state,
        isBottomSheetVisible: false,
        showRetryButton: false,
        displayPopoverMsg: false,
        currReviewCardIndex: state.currReviewCardIndex + 1,
      };
    case "WRONG_SHOW_RESULT":
      return {
        ...state,
        isBottomSheetVisible: true,
        showRetryButton: true,
      };
    case "SUBMIT_CHOICE":
      return {
        ...state,
        isSecondClick: !state.isSecondClick,
      };
    case "RETRY_REVIEW":
      return {
        ...state,
        isSecondClick: false,
        displayPopoverMsg: false,
        isBottomSheetVisible: false,
        showRetryButton: false,
      };
    case "SHOW_POPOVER_MSG":
      return {
        ...state,
        popoverInfo: action.payload,
        displayPopoverMsg: true,
      };
    default: {
      throw new Error(
        `Unhandled review session reducer action type: ${action.type}`
      );
    }
  }
};
