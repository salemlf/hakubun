import { HttpResponse, http } from "msw";
import { faker } from "@faker-js/faker";
import { assignmentsEndpoint, reviewsEndpoint } from "../../testing/endpoints";
import { server } from "../../testing/mocks/server";
import { generateRandomQueueItems } from "../../testing/mocks/data-generators/assignmentQueueGenerator";
import { act, renderHook, renderWithRouter } from "../../testing/test-utils";
import {
  createCorrespondingSubject,
  generatePreFlattenedAssignment,
} from "../../testing/mocks/data-generators/assignmentGenerator";
import { fakeReviewUpdatedResponse } from "../../testing/mocks/data-generators/reviewGenerator";
import { useAssignmentQueueStore } from "../../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import useAssignmentSubmitStoreFacade from "../../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import useQueueStoreFacade from "../../stores/useQueueStore/useQueueStore.facade";
import { useAssignmentQueue } from "./AssignmentQueueCards.hooks";
import {
  AssignmentQueueItem,
  AssignmentSubmitInfo,
} from "../../types/AssignmentQueueTypes";
import AssignmentQueueCards, { CardProps } from ".";

const mockReviewAndLessonResponses = (
  assignmentUpdated: AssignmentQueueItem
) => {
  const reviewUpdateResponse = fakeReviewUpdatedResponse(
    assignmentUpdated.subject_id,
    assignmentUpdated.object,
    assignmentUpdated.assignment_id
  );
  server.use(
    http.post(reviewsEndpoint, () => {
      return HttpResponse.json(reviewUpdateResponse);
    })
  );

  const correspondingSubj = createCorrespondingSubject(
    assignmentUpdated.subject_id,
    assignmentUpdated.object
  );
  const assignmentCreatedResponse = generatePreFlattenedAssignment({
    subjOrSubjType: {
      correspondingSubject: correspondingSubj,
    },
    isLesson: true,
  });
  server.use(
    http.put(`${assignmentsEndpoint}/*/start`, () => {
      return HttpResponse.json(assignmentCreatedResponse);
    })
  );
};

const settingTypes = ["reviews", "lessons"] as const;

const mockCallbackParams = (submitInfo: AssignmentSubmitInfo) => {
  const submitItemsMock = vi.fn();
  const submitBatchMock = vi.fn().mockResolvedValue(submitInfo);
  const updateSubmittedMock = vi.fn();

  return {
    submitItems: submitItemsMock,
    submitBatch: submitBatchMock,
    updateSubmitted: updateSubmittedMock,
  };
};

const getComponentProps = (page: "reviews" | "lessons") => {
  if (page === "reviews") {
    return {
      currPath: "/reviews/session" as const,
      settingsType: "review" as const,
    };
  }

  return {
    currPath: "/lessons/quiz" as const,
    settingsType: "lesson" as const,
  };
};

test("AssignmentQueueCards renders", () => {
  const emptySubmitInfo: AssignmentSubmitInfo = {
    assignmentData: [],
    submitResponses: [],
    errors: [],
  };
  const callbackParams = mockCallbackParams(emptySubmitInfo);
  const selectedSettingType = faker.helpers.arrayElement(settingTypes);
  const componentProps = getComponentProps(selectedSettingType);

  const { baseElement } = renderComponent(
    callbackParams,
    componentProps.currPath
  );
  expect(baseElement).toBeDefined();
});

// TODO: finish this test, user will enter answer and check it's been marked as correct
test.todo("Correct answer is marked as correct", () => {
  const selectedSettingType = faker.helpers.arrayElement(settingTypes);
  const componentProps = getComponentProps(selectedSettingType);
  const queueItems = generateRandomQueueItems({
    numItems: 10,
    queueProgressState: "not_started",
  });
  const { result: assignmentQueueStoreResult } = renderHook(() =>
    useAssignmentQueueStore()
  );
  act(() =>
    assignmentQueueStoreResult.current.setAssignmentQueueData(
      queueItems,
      componentProps.settingsType
    )
  );

  const queueItem = queueItems[0];
  mockReviewAndLessonResponses(queueItem);
  // *testing
  console.log(
    "🚀 ~ file: AssignmentQueueCards.test.tsx:115 ~ test ~ queueItem:",
    queueItem
  );
  // *testing

  const { result: queueStoreResult } = renderHook(() => useQueueStoreFacade());
  const { result: assignmentSubmitStoreResult } = renderHook(() =>
    useAssignmentSubmitStoreFacade()
  );
  const { result: assignmentQueueResult } = renderHook(() =>
    useAssignmentQueue()
  );
  // const { handleNextCard, handleRetryCard } = useAssignmentQueue();

  const queueSubmitInfo: AssignmentSubmitInfo = {
    assignmentData: assignmentQueueStoreResult.current.assignmentQueue,
    submitResponses: [],
    errors: [],
  };
  const callbackParams = mockCallbackParams(queueSubmitInfo);

  const { user } = renderComponent(callbackParams, componentProps.currPath);
});

test.todo(
  "Warning toast is displayed when user enters a forbidden meaning answer"
);

const renderComponent = (
  props: CardProps,
  currPath: "/reviews/session" | "/lessons/quiz"
) => {
  return renderWithRouter({
    routeObj: {
      path: currPath,
      element: <AssignmentQueueCards {...props} />,
    },
    mockHome: true,
  });
};
