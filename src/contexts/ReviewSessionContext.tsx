import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Assignment } from "../types/Assignment";
import { Subject } from "../types/Subject";
import { useStorage } from "../hooks/useStorage";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData } from "../services/MiscService";
import { setSubjectAvailImgs } from "../services/ImageSrcService";

interface Session {
  reviewAssignments: Assignment[];
  reviewSubjects: Subject[];
}

type ReviewSessionState = {
  isReviewInProgress: boolean;
  reviewData: Session | null;
  isLoading: boolean;
};

type ActionType =
  | "START_REVIEW"
  | "END_REVIEW"
  | "REVIEW_DATA_LOADING"
  | "REVIEW_DATA_LOADED";

type Dispatch = (action: ReviewSessionAction) => void;

type ReviewSessionAction = {
  type: ActionType;
  payload?: any;
};

type ReviewSessionContext = {
  state: ReviewSessionState;
  dispatch: Dispatch;
};

const initialState: ReviewSessionState = {
  isReviewInProgress: false,
  reviewData: null,
  isLoading: false,
};

const ReviewSessionContext = createContext<{
  state: ReviewSessionState;
  dispatch: Dispatch;
}>({
  state: initialState,
  dispatch: () => null,
});

type ProviderProps = {
  children?: React.ReactNode;
};

// TODO: eventually use useSubjectsByID query instead, this is kinda icky
const updateSession = async (
  subjIDs: number[],
  assignmentData: Assignment[],
  dispatch: Dispatch
) => {
  dispatch({ type: "REVIEW_DATA_LOADING" });
  try {
    const subjData = await WaniKaniAPI.getSubjectsBySubjIDs(subjIDs);
    let flattened = flattenData(subjData);

    let subjReviewData = flattened.reduce(function (
      filtered: any,
      subject: any
    ) {
      let updatedSubj = setSubjectAvailImgs(subject);
      filtered.push(updatedSubj);
      return filtered;
    },
    []);

    let session = {
      reviewAssignments: assignmentData,
      reviewSubjects: subjReviewData,
    };

    dispatch({ type: "REVIEW_DATA_LOADED", payload: session });
  } catch (error) {
    console.error("OH NO, couldn't update session! Error: ", error);
  }
};

const ReviewSessionProvider = ({ children }: ProviderProps) => {
  const { getItem, setItem, removeItem } = useStorage();

  const reviewQueueReducer = (
    state: ReviewSessionState,
    action: ReviewSessionAction
  ) => {
    switch (action.type) {
      case "START_REVIEW":
        return { ...state, isReviewInProgress: true };
      case "END_REVIEW":
        removeItem("reviewData");
        return { ...state, isReviewInProgress: false };
      case "REVIEW_DATA_LOADING":
        return { ...state, isLoading: true };
      case "REVIEW_DATA_LOADED":
        setItem("reviewData", action.payload);
        return { ...state, isLoading: false, reviewData: action.payload };
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  };

  const getSessionFromStorage = async () => {
    dispatch({ type: "REVIEW_DATA_LOADING" });
    const session = await getItem("reviewData");
    dispatch({
      type: "REVIEW_DATA_LOADED",
      payload: session,
    });
  };

  const [state, dispatch] = useReducer(reviewQueueReducer, initialState);

  useEffect(() => {
    getSessionFromStorage();
  }, []);

  const value = { state, dispatch };

  return (
    <ReviewSessionContext.Provider value={value}>
      {children}
    </ReviewSessionContext.Provider>
  );
};

const useReviewSession = () => {
  const context = useContext(ReviewSessionContext);

  if (!context) {
    throw new Error(
      "useReviewSession must be used within a ReviewSessionProvider"
    );
  }

  return context;
};

export {
  ReviewSessionContext,
  ReviewSessionProvider,
  useReviewSession,
  updateSession,
};
