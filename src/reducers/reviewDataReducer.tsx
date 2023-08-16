import {
  ReviewSessionDataAction,
  ReviewSessionDataState,
} from "../types/ReviewSessionTypes";

export const reviewDataReducer = (
  state: ReviewSessionDataState,
  action: ReviewSessionDataAction
) => {
  switch (action.type) {
    case "RESET_REVIEW":
      return { ...state, reviewQueue: [], currQueueIndex: 0 };
    case "REVIEW_QUEUE_LOADING":
      return { ...state, isLoading: true };
    case "REVIEW_QUEUE_LOADED":
      return { ...state, isLoading: false, reviewQueue: action.payload };
    // TODO: update so no need to find last item with subject ID, should be unique now since deleting item with old data
    case "UPDATE_REVIEW_QUEUE_ITEM":
      let lastIndexOfItem =
        state.reviewQueue.length -
        1 -
        state.reviewQueue
          .slice()
          .reverse()
          .findIndex(
            (reviewItem) =>
              reviewItem.itemID === action.payload.itemID &&
              reviewItem.review_type === action.payload.review_type
          );
      let updatedQueueItem = Object.assign({}, action.payload);

      return {
        ...state,
        reviewQueue: [
          ...state.reviewQueue.slice(0, lastIndexOfItem),
          updatedQueueItem,
          ...state.reviewQueue.slice(lastIndexOfItem + 1),
        ],
      };
    case "INCREMENT_CURR_INDEX":
      return {
        ...state,
        currQueueIndex: state.currQueueIndex + 1,
      };
    case "ADD_TO_REVIEW_QUEUE":
      return {
        ...state,
        reviewQueue: [...state.reviewQueue, action.payload],
      };
    case "REMOVE_REVIEW_QUEUE_ITEM":
      let indexToRemove = state.currQueueIndex;

      return {
        ...state,
        reviewQueue: [
          ...state.reviewQueue.slice(0, indexToRemove),
          ...state.reviewQueue.slice(indexToRemove + 1),
        ],
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
