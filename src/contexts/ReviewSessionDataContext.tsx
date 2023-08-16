import React, { createContext, useContext, useReducer } from "react";
import { Assignment } from "../types/Assignment";
import { Subject } from "../types/Subject";
import { StudyMaterial } from "../types/MiscTypes";
import {
  ReviewSessionDataState,
  ReviewQueueItem,
  ReviewSessionDataDispatch,
} from "../types/ReviewSessionTypes";
import { WaniKaniAPI } from "../api/WaniKaniApi";
import { flattenData, shuffleArray } from "../services/MiscService";
import { setSubjectAvailImgs } from "../services/ImageSrcService";
import { createAssignmentQueueItems } from "../services/SubjectAndAssignmentService";
import { reviewDataReducer } from "../reducers/reviewDataReducer";

const initialState: ReviewSessionDataState = {
  isLoading: false,
  reviewQueue: [],
  currQueueIndex: 0,
};

const ReviewSessionDataContext = createContext<{
  queueDataState: ReviewSessionDataState;
  dispatchQueueDataContext: ReviewSessionDataDispatch;
}>({
  queueDataState: initialState,
  dispatchQueueDataContext: () => null,
});

type ProviderProps = {
  children?: React.ReactNode;
};

// TODO: move into different file
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

// TODO: move into different file
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

const updateReviewQueueItem = (
  queueItemToUpdate: ReviewQueueItem,
  dispatchContext: ReviewSessionDataDispatch
) => {
  dispatchContext({
    type: "UPDATE_REVIEW_QUEUE_ITEM",
    payload: queueItemToUpdate,
  });
};

const addToReviewQueue = (
  queueItemToAdd: ReviewQueueItem,
  dispatchContext: ReviewSessionDataDispatch
) => {
  dispatchContext({
    type: "ADD_TO_REVIEW_QUEUE",
    payload: queueItemToAdd,
  });
};

const createReviewItems = async (
  assignments: Assignment[],
  subjIDs: number[],
  dispatchContext: ReviewSessionDataDispatch
) => {
  dispatchContext({ type: "REVIEW_QUEUE_LOADING" });
  let subjects = (await getSubjectData(subjIDs)) as Subject[];
  let studyMaterials = (await getStudyMaterials(subjIDs)) as StudyMaterial[];

  let reviewQueueItems = createAssignmentQueueItems(
    assignments,
    subjects,
    studyMaterials
  );

  //TODO: shuffling, change this based on user-selected sort order when that's implemented
  const shuffledReviewQueueItems = shuffleArray(reviewQueueItems);
  // *testing
  console.log(
    "🚀 ~ file: ReviewSessionDataContext.tsx:185 ~ shuffledReviewQueueItems:",
    shuffledReviewQueueItems
  );
  // *testing

  dispatchContext({
    type: "REVIEW_QUEUE_LOADED",
    payload: shuffledReviewQueueItems,
  });
};

const ReviewSessionDataProvider = ({ children }: ProviderProps) => {
  const [queueDataState, dispatchQueueDataContext] = useReducer(
    reviewDataReducer,
    initialState
  );

  const value = { queueDataState, dispatchQueueDataContext };

  return (
    <ReviewSessionDataContext.Provider value={value}>
      {children}
    </ReviewSessionDataContext.Provider>
  );
};

const useReviewSessionData = () => {
  const context = useContext(ReviewSessionDataContext);

  if (!context) {
    throw new Error(
      "useReviewSessionData must be used within a ReviewSessionProvider"
    );
  }

  return context;
};

export {
  ReviewSessionDataContext,
  ReviewSessionDataProvider,
  useReviewSessionData,
  createReviewItems,
  addToReviewQueue,
  updateReviewQueueItem,
};
