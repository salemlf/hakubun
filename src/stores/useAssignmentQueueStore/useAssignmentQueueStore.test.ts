import { faker } from "@faker-js/faker";
import { generateRandomQueueItems } from "../../testing/mocks/data-generators/assignmentQueueGenerator";
import { act, renderHook } from "../../testing/test-utils";
import useAssignmentQueueStoreFacade from "./useAssignmentQueueStore.facade";
import { getLastIndexOfQueueItem } from "../../services/AssignmentQueueService/AssignmentQueueService";
import {
  AssignmentQueueItem,
  AssignmentSessionType,
} from "../../types/AssignmentQueueTypes";

// TODO: add tests for lesson queue too

const notStartedMockAssignmentQueueItems = generateRandomQueueItems({
  numItems: 20,
  queueProgressState: "not_started",
});

const createQueueStoreWithItems = (
  queueItems: AssignmentQueueItem[],
  sessionType: AssignmentSessionType
) => {
  const { result } = renderHook(() => useAssignmentQueueStoreFacade());

  // adding some mock assignments to the queue
  act(() => result.current.setAssignmentQueueData(queueItems, sessionType));

  return result;
};

test("Initial values are as expected", () => {
  const { result } = renderHook(() => useAssignmentQueueStoreFacade());
  expect(result.current.currQueueIndex).toEqual(
    result.current.initialState.currQueueIndex
  );
  expect(result.current.sessionInProgress).toEqual(
    result.current.initialState.sessionInProgress
  );
  expect(result.current.sessionType).toEqual(
    result.current.initialState.sessionType
  );
});

describe("incrementCurrQueueIndex", () => {
  test("currQueueIndex increments", () => {
    const { result } = renderHook(() => useAssignmentQueueStoreFacade());
    expect(result.current.currQueueIndex).toEqual(0);
    act(() => result.current.incrementCurrQueueIndex());
    expect(result.current.currQueueIndex).toEqual(1);
    act(() => result.current.incrementCurrQueueIndex());
    expect(result.current.currQueueIndex).toEqual(2);
  });
});

describe("resetAll", () => {
  test("currQueueIndex resets", () => {
    const { result } = renderHook(() => useAssignmentQueueStoreFacade());
    expect(result.current.currQueueIndex).toEqual(0);
    act(() => result.current.incrementCurrQueueIndex());
    expect(result.current.currQueueIndex).toEqual(1);
    act(() => result.current.resetAll());
    expect(result.current.currQueueIndex).toEqual(0);
  });
});
describe("updateAssignmentSubmittedStates", () => {
  test("Submitted states for queue items update", () => {
    const result = createQueueStoreWithItems(
      notStartedMockAssignmentQueueItems,
      "review"
    );

    const randomQueueItem =
      result.current.assignmentQueue[
        Math.floor(Math.random() * result.current.assignmentQueue.length)
      ];
    const assignmentIDOfRandomQueueItem = randomQueueItem.assignment_id;

    // all submitted states should be false at first
    expect(
      result.current.assignmentQueue.find(
        (queueItem) => queueItem.isSubmitted === true
      )
    ).toEqual(undefined);

    act(() =>
      result.current.updateAssignmentSubmittedStates([
        assignmentIDOfRandomQueueItem,
      ])
    );

    // the submitted state of the random queue item should now be true
    expect(
      result.current.assignmentQueue.find(
        (queueItem) => queueItem.assignment_id === assignmentIDOfRandomQueueItem
      )?.isSubmitted
    ).toEqual(true);
  });
});

describe("updateQueueItemAltMeanings", () => {
  test("Alternative meanings/meaning synonyms are updated for queue items", () => {
    const result = createQueueStoreWithItems(
      notStartedMockAssignmentQueueItems,
      "review"
    );

    const fakeAltMeaningToAdd = faker.word.words({ count: { min: 1, max: 4 } });
    const itemToUpdate =
      result.current.assignmentQueue[
        Math.floor(Math.random() * result.current.assignmentQueue.length)
      ];

    const synonymsWithUpdate = [
      ...itemToUpdate.meaning_synonyms,
      fakeAltMeaningToAdd,
    ];

    act(() =>
      result.current.updateQueueItemAltMeanings(
        itemToUpdate.subject_id,
        synonymsWithUpdate
      )
    );

    expect(
      result.current.assignmentQueue.find(
        (queueItem) => queueItem.subject_id === itemToUpdate.subject_id
      )?.meaning_synonyms
    ).toEqual(synonymsWithUpdate);
  });
});

describe("updateQueueItem", () => {
  test("Updates incorrect meaning answers for item in queue", () => {
    const result = createQueueStoreWithItems(
      notStartedMockAssignmentQueueItems,
      "review"
    );

    const itemToUpdate =
      result.current.assignmentQueue[
        Math.floor(Math.random() * result.current.assignmentQueue.length)
      ];

    expect(itemToUpdate.incorrect_meaning_answers).toEqual(0);

    const numIncorrectMeaningAnswers = faker.number.int({ min: 1 });
    const itemUpdatedMeaningAnswers = {
      ...itemToUpdate,
      incorrect_meaning_answers: numIncorrectMeaningAnswers,
    };

    act(() => result.current.updateQueueItem(itemUpdatedMeaningAnswers));
    const lastIndexOfItem = getLastIndexOfQueueItem(
      result.current.assignmentQueue,
      itemUpdatedMeaningAnswers
    );

    expect(
      result.current.assignmentQueue[lastIndexOfItem].incorrect_meaning_answers
    ).toEqual(numIncorrectMeaningAnswers);
  });

  test("Updates incorrect reading answers for item in queue", () => {
    const result = createQueueStoreWithItems(
      notStartedMockAssignmentQueueItems,
      "review"
    );

    const itemToUpdate =
      result.current.assignmentQueue[
        Math.floor(Math.random() * result.current.assignmentQueue.length)
      ];

    expect(itemToUpdate.incorrect_reading_answers).toEqual(0);

    const numIncorrectReadingAnswers = faker.number.int({ min: 1 });
    const itemUpdatedReadingAnswers = {
      ...itemToUpdate,
      incorrect_reading_answers: numIncorrectReadingAnswers,
    };

    act(() => result.current.updateQueueItem(itemUpdatedReadingAnswers));
    const lastIndexOfItem = getLastIndexOfQueueItem(
      result.current.assignmentQueue,
      itemUpdatedReadingAnswers
    );

    expect(
      result.current.assignmentQueue[lastIndexOfItem].incorrect_reading_answers
    ).toEqual(numIncorrectReadingAnswers);
  });
});
