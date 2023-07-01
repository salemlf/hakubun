import React, { createContext, useContext, useReducer } from "react";
import { reviewSessionQueueReducer } from "../reducers/reviewSessionQueueReducer";

import {
  ReviewSessionQueueState,
  ReviewSessionQueueDispatch,
} from "../types/ReviewSessionTypes";
import { useReviewSessionData } from "./ReviewSessionDataContext";

const initialState: ReviewSessionQueueState = {
  currReviewCardIndex: 0,
  isSecondClick: false,
  isBottomSheetVisible: false,
  showRetryButton: false,
  popoverInfo: { message: "", messageType: "invalid" },
  displayPopoverMsg: false,
};

const ReviewSessionQueueContext = createContext<{
  queueState: ReviewSessionQueueState;
  dispatchQueueContext: ReviewSessionQueueDispatch;
}>({
  queueState: initialState,
  dispatchQueueContext: () => null,
});

type ProviderProps = {
  children?: React.ReactNode;
};

const ReviewSessionQueueProvider = ({ children }: ProviderProps) => {
  const [queueState, dispatchQueueContext] = useReducer(
    reviewSessionQueueReducer,
    initialState
  );

  //   context for the queue data
  const { queueDataState, dispatchQueueDataContext } = useReviewSessionData();

  const value = {
    queueState,
    queueDataState,
    dispatchQueueContext,
    dispatchQueueDataContext,
  };

  return (
    <ReviewSessionQueueContext.Provider value={value}>
      {children}
    </ReviewSessionQueueContext.Provider>
  );
};

const useReviewSessionQueue = () => {
  const context = useContext(ReviewSessionQueueContext);

  if (!context) {
    throw new Error(
      "useReviewSessionQueue must be used within an ReviewSessionQueueProvider"
    );
  }

  return context;
};

export {
  ReviewSessionQueueContext,
  ReviewSessionQueueProvider,
  useReviewSessionQueue,
};
