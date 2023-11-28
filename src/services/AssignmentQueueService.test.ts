import { generateRandomQueueItems } from "../testing/mocks/data-generators/assignmentQueueGenerator";
import { SubjectMeaning } from "../types/Subject";
import { getAnswersForMeaningReviews } from "./AssignmentQueueService";

describe("getAnswersForMeaningReviews", () => {
  test("Accepted auxiliary meanings are returned within accepted meanings", () => {
    const queueItem = generateRandomQueueItems({
      numItems: 1,
      queueProgressState: "in_progress",
    })[0];

    const acceptedAuxiliaryMeanings = queueItem.auxiliary_meanings.filter(
      (auxMeaning) => auxMeaning.type === "whitelist"
    );
    const answers = getAnswersForMeaningReviews({
      reviewItem: queueItem,
      acceptedAnswersOnly: true,
    });

    const answersContainAllAcceptedAuxMeanings =
      acceptedAuxiliaryMeanings.every((auxMeaning) =>
        answers.some(
          (subjMeaning: SubjectMeaning) =>
            subjMeaning.meaning === auxMeaning.meaning
        )
      );

    expect(answersContainAllAcceptedAuxMeanings).toBe(true);
  });
  test("Forbidden auxiliary meanings are NOT returned within accepted meanings", () => {
    const queueItem = generateRandomQueueItems({
      numItems: 1,
      queueProgressState: "in_progress",
    })[0];

    const forbiddenAuxiliaryMeanings = queueItem.auxiliary_meanings.filter(
      (auxMeaning) => auxMeaning.type === "blacklist"
    );
    const answers = getAnswersForMeaningReviews({
      reviewItem: queueItem,
      acceptedAnswersOnly: true,
    });

    const answersContainAllAcceptedAuxMeanings =
      forbiddenAuxiliaryMeanings.every((auxMeaning) =>
        answers.every(
          (subjMeaning: SubjectMeaning) =>
            subjMeaning.meaning !== auxMeaning.meaning
        )
      );

    expect(answersContainAllAcceptedAuxMeanings).toBe(true);
  });
});
