import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Assignment } from "../types/Assignment";
import { Subject } from "../types/Subject";
import { ReviewQueueItem } from "../types/MiscTypes";
import { useStorage } from "../hooks/useStorage";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData } from "../services/MiscService";
import { setSubjectAvailImgs } from "../services/ImageSrcService";
import { findAssignmentWithSubjID } from "../services/SubjectAndAssignmentService";

// TODO: remove isReviewInProgress, just check if reviewQueue is null?
type ReviewSessionState = {
  isReviewInProgress: boolean;
  isLoading: boolean;
  reviewQueue: ReviewQueueItem[] | null;
};

type ActionType =
  | "START_REVIEW"
  | "END_REVIEW"
  | "REVIEW_QUEUE_LOADING"
  | "REVIEW_QUEUE_LOADED"
  | "UPDATE_ITEM_REVIEW_STATUS";

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
  isLoading: false,
  reviewQueue: null,
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

const getSubjectData = async (subjIDs: number[]) => {
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

    return subjReviewData;
  } catch (error) {
    console.error("OH NO, couldn't update session! Error: ", error);
    return [];
  }
};

const updateItemReviewStatus = (
  queueItemToUpdate: ReviewQueueItem,
  reviewStatus: boolean,
  state: ReviewSessionState,
  dispatch: Dispatch
) => {
  if (state.reviewQueue) {
    let updatedReviewQueue = state.reviewQueue.map((queueItem) =>
      queueItem.itemID === queueItemToUpdate.itemID
        ? { ...queueItem, is_reviewed: reviewStatus }
        : queueItem
    );

    dispatch({
      type: "UPDATE_ITEM_REVIEW_STATUS",
      payload: updatedReviewQueue,
    });
  } else {
    console.error(
      "Couldn't update item in queue, reviewQueue is somehow empty (how da hell)"
    );
    dispatch({ type: "UPDATE_ITEM_REVIEW_STATUS", payload: state.reviewQueue });
  }
};

const createMeaningAndReadingQueueItems = (
  assignments: Assignment[],
  subjects: Subject[]
): ReviewQueueItem[] => {
  const subjectsWithQueueProps = (subjects as ReviewQueueItem[]).map(
    (subject, index) => {
      let foundAssignment = findAssignmentWithSubjID(assignments, subject);

      // this should always be true since we retrieved the subjects based on the assignments
      let assignment = foundAssignment!;

      return {
        ...subject,
        assignment_id: assignment.id,
        srs_stage: assignment.srs_stage,
        is_reviewed: false,
        itemID: `meaning${index}`,
        review_type: "meaning" as const,
      };
    }
  );

  // adds reading items to queue if the subject has readings (radicals and kana vocab don't)
  const itemsWithReadings = subjectsWithQueueProps.filter(
    (queueItem) => queueItem.readings !== undefined
  );

  const meaningAndReadingQueue = [
    ...subjectsWithQueueProps,
    ...itemsWithReadings.map((itemWithReadings, index) => ({
      ...itemWithReadings,
      review_type: "reading" as const,
      itemID: `reading${index}`,
    })),
  ];

  return meaningAndReadingQueue;
};

const createReviewItems = async (
  assignments: Assignment[],
  subjIDs: number[],
  dispatch: Dispatch
) => {
  dispatch({ type: "REVIEW_QUEUE_LOADING" });
  let subjects = (await getSubjectData(subjIDs)) as Subject[];

  let reviewQueueItems = createMeaningAndReadingQueueItems(
    assignments,
    subjects
  );
  // *testing
  console.log(
    "🚀 ~ file: ReviewSessionContext.tsx:158 ~ reviewQueueItems:",
    reviewQueueItems
  );
  // *testing

  //TODO: doing a rough shuffle, change this based on user-selected sort order when that's implemented
  const shuffledReviewQueueItems = reviewQueueItems.sort(
    () => 0.5 - Math.random()
  );

  dispatch({ type: "REVIEW_QUEUE_LOADED", payload: shuffledReviewQueueItems });
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
      case "REVIEW_QUEUE_LOADING":
        return { ...state, isLoading: true };
      case "REVIEW_QUEUE_LOADED":
        setItem("reviewQueue", action.payload);
        return { ...state, isLoading: false, reviewQueue: action.payload };
      case "UPDATE_ITEM_REVIEW_STATUS":
        return { ...state, reviewQueue: action.payload };
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  };

  const getReviewQueueFromStorage = async () => {
    dispatch({ type: "REVIEW_QUEUE_LOADING" });
    const queue = await getItem("reviewQueue");
    dispatch({
      type: "REVIEW_QUEUE_LOADED",
      payload: queue,
    });
  };

  const [state, dispatch] = useReducer(reviewQueueReducer, initialState);

  useEffect(() => {
    getReviewQueueFromStorage();
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
  createReviewItems,
  updateItemReviewStatus,
};
