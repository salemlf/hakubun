import {
  ReadingType,
  Subject,
  SubjectReading,
  SubjectType,
} from "../types/Subject";
import { Assignment, AssignmentType } from "../types/Assignment";
import { ReviewType, TagType } from "../types/MiscTypes";
import { capitalizeWord } from "./MiscService";

export const getAssignmentStatuses = (assignments: Assignment[]) => {
  return Object.values(assignments).reduce(
    (acc, item) => {
      acc.passed += item.passed_at !== null ? 1 : 0;
      acc.total += 1;
      return acc;
    },
    { passed: 0, total: 0 }
  );
};

export const getSubjectDisplayName = (subj: Subject) => {
  let subjType = subj["object"];

  if (subjType === "radical") {
    return capitalizeWord(subj["slug" as keyof {}]);
  } else {
    let primary = subj["meanings"]?.filter(
      (meaning: any) => meaning.primary === true
    );

    return primary ? primary[0].meaning : "";
  }
};

export const getAlternativeMeanings = (subj: Subject) => {
  return subj["meanings"]?.filter((meaning: any) => meaning.primary === false);
};

export const getPrimaryReading = (readings: SubjectReading[]) => {
  let primaryReading = readings.filter(
    (reading: any) => reading.primary === true
  );
  return primaryReading[0].reading;
};

export const getKanjiReadings = (
  readings: SubjectReading[],
  readingType: ReadingType
) => {
  let readingsOfType = readings.filter(
    (reading: any) => reading.type === readingType
  );
  readingsOfType = readingsOfType.sort((a, b) => (a.primary === true ? 1 : -1));
  return readingsOfType;
};

export const getVocabReadings = (readings: SubjectReading[]) => {
  return readings.sort((a, b) => (a.primary === true ? 1 : -1));
};

export const isAssignmentLocked = (
  assignmentsData: Assignment[],
  subject: Subject
) => {
  return findAssignmentWithSubjID(assignmentsData, subject) === undefined;
};

export const findAssignmentWithSubjID = (
  assignmentsData: Assignment[],
  subject: Subject
) => {
  return assignmentsData.find(
    (assignment: Assignment) => assignment.subject_id === subject.id
  );
};

export const filterAssignmentsByType = (
  assignments: Assignment[],
  assignmentTypes: AssignmentType[]
) => {
  let filteredAssignments = assignments.filter(function (assignment) {
    return assignmentTypes.indexOf(assignment.subject_type) !== -1;
  });
  console.log(
    "🚀 ~ file: SubjectAndAssignmentService.tsx:86 ~ filteredAssignments ~ filteredAssignments:",
    filteredAssignments
  );

  return filteredAssignments;
};

/**
 * @description Determines whether an array of assignments contains a certain assignment type
 * @param {Assignment[]} assignmentsData array of assignments to search through
 * @param {AssignmentType} assignmentType  type of assignment to look for
 * @returns {boolean} whether or not assignment type is in queue
 */
export const checkIfAssignmentTypeInQueue = (
  assignmentsData: Assignment[],
  assignmentType: AssignmentType
) => {
  return assignmentsData.some(
    (assignment: Assignment) => assignment.subject_type === assignmentType
  );
};

export const getAssignmentTypeDisplayText = (
  assignmentType: AssignmentType,
  plural: boolean
) => {
  let uppercaseAssignmentType = capitalizeWord(assignmentType);
  return plural ? `${uppercaseAssignmentType}s` : uppercaseAssignmentType;
};

const subjColors: { [index: string]: string } = {
  radical: `var(--wanikani-radical)`,
  kanji: `var(--wanikani-kanji)`,
  vocabulary: `var(--wanikani-vocab)`,
};

const reviewColors: { [index: string]: string } = {
  reading: `var(--ion-color-primary)`,
  meaning: `var(--ion-color-secondary)`,
};

const tagColors: { [index: string]: string } = {
  reading: `var(--wanikani-reading)`,
  meaning: `var(--deep-purple-accent)`,
};

const subjAndTagColors = { ...subjColors, ...tagColors };

export const getSubjectColor = (subjType: SubjectType) => {
  return subjColors[subjType as keyof {}];
};

export const getReviewTypeColor = (reviewType: ReviewType) => {
  return reviewColors[reviewType as keyof {}];
};

export const getTagColor = (tagType: TagType) => {
  return subjAndTagColors[tagType as keyof {}];
};

export const getSubjIDsFromAssignments = (assignments: Assignment[]) => {
  return assignments.map((assignment) => assignment.subject_id);
};

export const compareAssignmentsByAvailableDate = (
  assignment1: Assignment,
  assignment2: Assignment
) => {
  if (assignment1.available_at === null) return -1;
  if (assignment2.available_at === null) return 1;

  // older sorted before newer
  return (
    new Date(assignment1.available_at).getTime() -
    new Date(assignment2.available_at).getTime()
  );
};
