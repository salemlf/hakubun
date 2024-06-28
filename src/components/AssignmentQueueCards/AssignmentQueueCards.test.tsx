import { faker } from "@faker-js/faker";
import {
  act,
  renderHook,
  renderWithClient,
  screen,
} from "../../testing/test-utils";
import {
  AssignmentQueueItem,
  AssignmentSubmitInfo,
} from "../../types/AssignmentQueueTypes";
import AssignmentQueueCards, { CardProps } from ".";
import { generateRandomQueueItems } from "../../testing/mocks/data-generators/assignmentQueueGenerator";
import useAssignmentQueueStoreFacade from "../../stores/useAssignmentQueueStore/useAssignmentQueueStore.facade";
import { mockReviewUpdateResponse } from "../../testing/mocks/api-responses/review-responses";
import {
  getAnswersForMeaningReviews,
  getAnswersForReadingReviews,
} from "../../services/AssignmentQueueService/AssignmentQueueService";
import { useSubmittedQueueUpdate } from "../../hooks/assignments/useSubmittedQueueUpdate";

//   const correspondingSubj = createCorrespondingSubject(
//     assignmentUpdated.subject_id,
//     assignmentUpdated.object
//   );
//   const assignmentCreatedResponse = generatePreFlattenedAssignment({
//     subjOrSubjType: {
//       correspondingSubject: correspondingSubj,
//     },
//     isLesson: true,
//   });
//   server.use(
//     http.put(`${assignmentsEndpoint}/*/start`, () => {
//       return HttpResponse.json(assignmentCreatedResponse);
//     })
//   );
// };

const settingTypes = ["reviews", "lessons"] as const;

const mockCallbackParams = (submitInfo: AssignmentSubmitInfo) => {
  const submitItemsMock = vi.fn();
  const submitBatchMock = vi.fn().mockResolvedValue(submitInfo);
  const { result: submittedQueueUpdateResult } = renderHook(() =>
    useSubmittedQueueUpdate()
  );

  return {
    submitItems: submitItemsMock,
    submitBatch: submitBatchMock,
    updateSubmitted: submittedQueueUpdateResult.current,
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

const getCorrectAnswer = (queueItem: AssignmentQueueItem): string => {
  const reviewType = queueItem.review_type as string;
  if (reviewType === "reading") {
    const readingAnswers = getAnswersForReadingReviews({
      reviewItem: queueItem,
      acceptedAnswersOnly: true,
    });

    const randomReadingAnswer = faker.helpers.arrayElement(readingAnswers);
    return randomReadingAnswer.reading;
  } else {
    const meaningAnswer = getAnswersForMeaningReviews({
      reviewItem: queueItem,
      acceptedAnswersOnly: true,
    });

    const randomMeaningAnswer = faker.helpers.arrayElement(meaningAnswer);
    return randomMeaningAnswer.meaning;
  }
};

test("AssignmentQueueCards renders", async () => {
  const emptySubmitInfo: AssignmentSubmitInfo = {
    assignmentData: [],
    submitResponses: [],
    assignmentsWithErrs: [],
  };
  const callbackParams = mockCallbackParams(emptySubmitInfo);

  const { baseElement } = await renderComponent(callbackParams);
  expect(baseElement).toBeDefined();
});

// TODO: finish this test, need to mock framer motion to get it working
test.todo("Correct review answer is marked as correct", async () => {
  const componentProps = getComponentProps("reviews");
  const queueItems = generateRandomQueueItems({
    numItems: 10,
    queueProgressState: "not_started",
  });
  const { result: assignmentQueueStoreResult } = renderHook(() =>
    useAssignmentQueueStoreFacade()
  );
  act(() =>
    assignmentQueueStoreResult.current.setAssignmentQueueData(
      queueItems,
      componentProps.settingsType
    )
  );
  const queueItem = queueItems[0];
  mockReviewUpdateResponse(queueItem);

  const queueSubmitInfo: AssignmentSubmitInfo = {
    assignmentData: assignmentQueueStoreResult.current.assignmentQueue,
    submitResponses: [],
    assignmentsWithErrs: [],
  };
  const callbackParams = mockCallbackParams(queueSubmitInfo);
  const { user } = await renderComponent(callbackParams);

  const correctAnswer = getCorrectAnswer(queueItem);
  const answerInput = await screen.findByTestId("wanakana-input");
  await user.type(answerInput, correctAnswer);

  expect(answerInput).toHaveValue(correctAnswer);

  // press twice to submit answer and move to next
  await user.keyboard("[F12]");
  await user.keyboard("[F12]");

  // TODO: check that the answer has been reviewed and marked as correct
  // const firstInQueue = assignmentQueueStoreResult.current.assignmentQueue[0];
});

test.todo(
  "Warning toast is displayed when user enters a forbidden meaning answer"
);

const renderComponent = async (props: CardProps) => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  return await act(() => renderWithClient(<AssignmentQueueCards {...props} />));
};
