import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Assignment } from "../types/Assignment";
import { Subject } from "../types/Subject";
import { ReviewQueueItem, StudyMaterial } from "../types/MiscTypes";
import { useStorage } from "../hooks/useStorage";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData, shuffleArray } from "../services/MiscService";
import { setSubjectAvailImgs } from "../services/ImageSrcService";
import {
  findAssignmentWithSubjID,
  findStudyMaterialWithSubjID,
} from "../services/SubjectAndAssignmentService";

type ReviewSessionState = {
  isLoading: boolean;
  reviewQueue: ReviewQueueItem[] | null;
  completedReviews: ReviewQueueItem[];
};

type ActionType =
  | "END_REVIEW"
  | "REVIEW_QUEUE_LOADING"
  | "REVIEW_QUEUE_LOADED"
  | "UPDATE_REVIEW_QUEUE"
  | "MARK_ITEM_AS_REVIEWED"
  | "COMPLETED_REVIEWS_LOADING"
  | "COMPLETED_REVIEWS_LOADED"
  | "UPDATE_COMPLETED_REVIEWS_QUEUE";

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
  isLoading: false,
  reviewQueue: null,
  completedReviews: [],
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
    console.error(
      "OH NO, couldn't get subject data for review session! Error: ",
      error
    );
    return [];
  }
};

const getStudyMaterials = async (subjIDs: number[]) => {
  try {
    const studyMaterialData = await WaniKaniAPI.getStudyMaterialsBySubjIDs(
      subjIDs
    );
    let flattenedStudyMaterial = flattenData(studyMaterialData);
    return flattenedStudyMaterial;
  } catch (error) {
    console.error(
      "OH NO, couldn't get study material data for review session! Error: ",
      error
    );
    return [];
  }
};

// const updateReviewQueue = (
//   queueItemToUpdate: ReviewQueueItem,
//   propertiesToUpdate: {},
//   state: ReviewSessionState,
//   dispatch: Dispatch
// ) => {
//   // TODO: remove this if statement, shouldn't ever be needed
//   if (state.reviewQueue) {
//     let updatedReviewQueue = state.reviewQueue.map((queueItem) =>
//       queueItem.itemID === queueItemToUpdate.itemID
//         ? { ...queueItem, ...propertiesToUpdate }
//         : queueItem
//     );

//     dispatch({
//       type: "UPDATE_REVIEW_QUEUE",
//       payload: updatedReviewQueue,
//     });
//   } else {
//     console.error(
//       "Couldn't update item in queue, reviewQueue is somehow empty (how da hell)"
//     );
//     dispatch({ type: "UPDATE_REVIEW_QUEUE", payload: state.reviewQueue });
//   }
// };

const dequeueFromReviewQueue = (
  state: ReviewSessionState,
  dispatch: Dispatch
) => {
  // TODO: remove this if statement, shouldn't ever be needed
  if (state.reviewQueue) {
    let updatedReviewQueue = state.reviewQueue.slice(1);

    dispatch({
      type: "UPDATE_REVIEW_QUEUE",
      payload: updatedReviewQueue,
    });
  } else {
    console.error(
      "Couldn't update item in queue, reviewQueue is somehow empty (how da hell)"
    );
    dispatch({ type: "UPDATE_REVIEW_QUEUE", payload: state.reviewQueue });
  }
};

const addToCompletedQueue = (
  queueItemToAdd: ReviewQueueItem,
  state: ReviewSessionState,
  dispatch: Dispatch
) => {
  let updatedCompletedReviews = state.completedReviews.concat(queueItemToAdd);
  dispatch({
    type: "UPDATE_COMPLETED_REVIEWS_QUEUE",
    payload: updatedCompletedReviews,
  });
};

const createMeaningAndReadingQueueItems = (
  assignments: Assignment[],
  subjects: Subject[],
  studyMaterials: StudyMaterial[]
): ReviewQueueItem[] => {
  const subjectsWithQueueProps = (subjects as ReviewQueueItem[]).map(
    (subject, index) => {
      let foundAssignment = findAssignmentWithSubjID(assignments, subject);
      let foundStudyMaterial = findStudyMaterialWithSubjID(
        studyMaterials,
        subject
      );

      // this should always be true since we retrieved the subjects based on the assignments
      let assignment = foundAssignment!;

      return {
        ...subject,
        assignment_id: assignment.id,
        srs_stage: assignment.srs_stage,
        is_reviewed: false,
        itemID: `meaning${index}`,
        is_correct_answer: null,
        meaning_synonyms: foundStudyMaterial
          ? foundStudyMaterial.meaning_synonyms
          : [],
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
  let studyMaterials = (await getStudyMaterials(subjIDs)) as StudyMaterial[];

  let reviewQueueItems = createMeaningAndReadingQueueItems(
    assignments,
    subjects,
    studyMaterials
  );
  // *testing
  console.log(
    "🚀 ~ file: ReviewSessionContext.tsx:158 ~ reviewQueueItems:",
    reviewQueueItems
  );
  // *testing

  //TODO: shuffling, change this based on user-selected sort order when that's implemented
  const shuffledReviewQueueItems = shuffleArray(reviewQueueItems);

  dispatch({ type: "REVIEW_QUEUE_LOADED", payload: shuffledReviewQueueItems });
};

const ReviewSessionProvider = ({ children }: ProviderProps) => {
  const { getItem, setItem, removeItem } = useStorage();

  const reviewQueueReducer = (
    state: ReviewSessionState,
    action: ReviewSessionAction
  ) => {
    switch (action.type) {
      case "MARK_ITEM_AS_REVIEWED":
        return { ...state, completedReviews: action.payload };
      case "END_REVIEW":
        removeItem("reviewData");
        removeItem("completedReviews");
        return { ...state, reviewQueue: null, completedReviews: [] };
      case "REVIEW_QUEUE_LOADING":
        return { ...state, isLoading: true };
      case "REVIEW_QUEUE_LOADED":
        // TODO: change so setItem not called here since usually pulled from cache
        setItem("reviewQueue", action.payload);
        return { ...state, isLoading: false, reviewQueue: action.payload };
      case "COMPLETED_REVIEWS_LOADING":
        return { ...state, isLoading: true };
      case "COMPLETED_REVIEWS_LOADED":
        // TODO: change so setItem not called here since usually pulled from cache
        setItem("completedReviews", action.payload);
        return { ...state, isLoading: false, completedReviews: action.payload };
      case "UPDATE_REVIEW_QUEUE":
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

  const getCompletedReviewsFromStorage = async () => {
    dispatch({ type: "COMPLETED_REVIEWS_LOADING" });
    const queue = await getItem("completedReviews");
    dispatch({
      type: "COMPLETED_REVIEWS_LOADED",
      payload: queue,
    });
  };

  const [state, dispatch] = useReducer(reviewQueueReducer, initialState);

  useEffect(() => {
    getReviewQueueFromStorage();
    getCompletedReviewsFromStorage();
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
  dequeueFromReviewQueue,
  addToCompletedQueue,
};
