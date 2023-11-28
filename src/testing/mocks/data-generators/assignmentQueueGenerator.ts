import { faker } from "@faker-js/faker";
import { generateSubjArray } from "./subjectGenerator";
import {
  CorrespondingSubject,
  createCorrespondingSubject,
  generateAssignmentArrayFromSubjs,
} from "./assignmentGenerator";
import { generateStudyMaterialArrFromSubjs } from "./studyMaterialGenerator";
import { createAssignmentQueueItems } from "../../../services/SubjectAndAssignmentService";
import { BackToBackChoice } from "../../../components/BackToBackOption/BackToBackOption.types";
import { Assignment } from "../../../types/Assignment";
import { AssignmentQueueItem } from "../../../types/AssignmentQueueTypes";
import { Subject } from "../../../types/Subject";
import { StudyMaterial } from "../../../types/StudyMaterial";

export type QueueProgressState = "not_started" | "in_progress" | "completed";

type QueueItemsGeneratorParams = {
  assignments: Assignment[];
  subjects: Subject[];
  studyMaterials: StudyMaterial[];
  queueProgressState: QueueProgressState;
  backToBackChoice?: BackToBackChoice;
  allCorrect?: boolean;
};

export const generateQueueItems = ({
  assignments,
  subjects,
  studyMaterials,
  queueProgressState,
  backToBackChoice = "disabled",
  allCorrect = false,
}: QueueItemsGeneratorParams): AssignmentQueueItem[] => {
  const queueItems: AssignmentQueueItem[] = createAssignmentQueueItems(
    assignments,
    subjects,
    studyMaterials,
    backToBackChoice
  );

  const updatedQueue = setQueueItemsProgressState(
    queueItems,
    queueProgressState,
    allCorrect
  );

  return updatedQueue;
};

type RandomQueueItemsGeneratorParams = Omit<
  QueueItemsGeneratorParams,
  "assignments" | "subjects" | "studyMaterials"
> & {
  numItems: number;
  areLessons?: boolean;
  level?: number;
};

export const generateRandomQueueItems = ({
  numItems,
  queueProgressState,
  areLessons,
  level,
  backToBackChoice,
  allCorrect,
}: RandomQueueItemsGeneratorParams): AssignmentQueueItem[] => {
  const mockSubjects = generateSubjArray({ numSubjects: numItems, level });
  const correspondingSubjInfo: CorrespondingSubject[] = mockSubjects.map(
    (subj) => createCorrespondingSubject(subj.id, subj.object)
  );
  const studyMaterials = generateStudyMaterialArrFromSubjs({
    correspondingSubjects: correspondingSubjInfo,
  });

  const mockAssignments = generateAssignmentArrayFromSubjs({
    correspondingSubjects: correspondingSubjInfo,
    areLessons,
  });

  const queueItems: AssignmentQueueItem[] = generateQueueItems({
    assignments: mockAssignments,
    subjects: mockSubjects,
    studyMaterials,
    queueProgressState,
    backToBackChoice,
    allCorrect,
  });

  return queueItems;
};

const setQueueItemsProgressState = (
  queueItems: AssignmentQueueItem[],
  progressState: QueueProgressState,
  allCorrect: boolean
): AssignmentQueueItem[] => {
  const updatedQueue = [...queueItems];
  // this is the default state
  if (progressState === "not_started") {
    return updatedQueue;
  }

  if (progressState === "completed") {
    updatedQueue.map((item) => {
      setQueueItemAsReviewed(
        item,
        !allCorrect ? faker.datatype.boolean() : true
      );
    });
    return updatedQueue;
  }

  // a random number of items will be completed
  const indicesOfItems = [...Array(queueItems.length - 1).keys()].map(
    (i) => i + 0
  );
  const selectedIndices = faker.helpers.arrayElements(indicesOfItems, {
    min: 1,
    max: queueItems.length,
  });

  queueItems.map((item, i) => {
    if (selectedIndices.includes(i)) {
      setQueueItemAsReviewed(
        item,
        !allCorrect ? faker.datatype.boolean() : true
      );
    }
  });

  return updatedQueue;
};

const setQueueItemAsReviewed = (
  queueItem: AssignmentQueueItem,
  isCorrectAnswer: boolean
) => {
  queueItem.is_reviewed = true;
  queueItem.is_correct_answer = isCorrectAnswer;
};
