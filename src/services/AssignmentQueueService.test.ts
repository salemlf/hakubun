import { generateRandomQueueItems } from "../testing/mocks/data-generators/assignmentQueueGenerator";
import { SubjectMeaning } from "../types/Subject";
import { getAnswersForMeaningReviews } from "./AssignmentQueueService";

describe("getAnswersForMeaningReviews", () => {
  test("Accepted auxilary meanings are returned within accepted meanings", () => {
    const queueItem = generateRandomQueueItems({
      numItems: 1,
      queueProgressState: "in_progress",
    })[0];

    const acceptedAuxilaryMeanings = queueItem.auxiliary_meanings.filter(
      (auxMeaning) => auxMeaning.type === "whitelist"
    );
    const answers = getAnswersForMeaningReviews({
      reviewItem: queueItem,
      acceptedAnswersOnly: true,
    });

    const answersContainAllAcceptedAuxMeanings = acceptedAuxilaryMeanings.every(
      (auxMeaning) =>
        answers.some(
          (subjMeaning: SubjectMeaning) =>
            subjMeaning.meaning === auxMeaning.meaning
        )
    );

    expect(answersContainAllAcceptedAuxMeanings).toBe(true);
  });
  test("Forbidden auxilary meanings are NOT returned within accepted meanings", () => {
    const queueItem = generateRandomQueueItems({
      numItems: 1,
      queueProgressState: "in_progress",
    })[0];

    const forbiddenAuxilaryMeanings = queueItem.auxiliary_meanings.filter(
      (auxMeaning) => auxMeaning.type === "blacklist"
    );
    const answers = getAnswersForMeaningReviews({
      reviewItem: queueItem,
      acceptedAnswersOnly: true,
    });

    const answersContainAllAcceptedAuxMeanings =
      forbiddenAuxilaryMeanings.every((auxMeaning) =>
        answers.every(
          (subjMeaning: SubjectMeaning) =>
            subjMeaning.meaning !== auxMeaning.meaning
        )
      );

    expect(answersContainAllAcceptedAuxMeanings).toBe(true);
  });
});
