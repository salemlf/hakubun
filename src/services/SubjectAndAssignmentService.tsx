import Fuse from "fuse.js";
import {
  ReadingType,
  Subject,
  SubjectMeaning,
  SubjectReading,
  SubjectType,
} from "../types/Subject";
import { Assignment, AssignmentType } from "../types/Assignment";
import {
  ReviewQueueItem,
  ReviewType,
  StudyMaterial,
  TagType,
} from "../types/MiscTypes";
import { capitalizeWord } from "./MiscService";
import { toKana } from "wanakana";

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

export const findStudyMaterialWithSubjID = (
  studyMaterials: StudyMaterial[],
  subject: Subject
) => {
  return studyMaterials.find(
    (studyMaterial: StudyMaterial) => studyMaterial.subject_id === subject.id
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

const assignmentTypeText: { [index: string]: {} } = {
  radical: { singular: "Radical", plural: "Radicals" },
  kanji: { singular: "Kanji", plural: "Kanji" },
  vocabulary: { singular: "Vocabulary", plural: "Vocabulary" },
  kana_vocabulary: { singular: "Kana Vocabulary", plural: "Kana Vocabulary" },
};

export const getSubjectTypeDisplayText = (
  assignmentType: SubjectType,
  plural: boolean
) => {
  let assignmentTypeObj = assignmentTypeText[assignmentType as keyof {}];
  let displayText = plural
    ? assignmentTypeObj["plural" as keyof {}]
    : assignmentTypeObj["singular" as keyof {}];
  return displayText;
};

// TODO: change kana vocab to some other color?
const subjColors: { [index: string]: string } = {
  radical: `var(--wanikani-radical)`,
  kanji: `var(--wanikani-kanji)`,
  vocabulary: `var(--wanikani-vocab)`,
  kana_vocabulary: `var(--wanikani-vocab)`,
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

// TODO: finish implementing
export const isUserAnswerValid = (
  currReviewItem: ReviewQueueItem,
  userAnswer: string
) => {
  let answerValidInfo = {
    isValid: true,
    message: "",
  };
  // TODO: return an object with boolean on whether or not valid answer, along with message (if answer isn't valid) on why invalid
  if (userAnswer === "") {
    answerValidInfo.isValid = false;
    answerValidInfo.message = "SHAKE-EDY SHAKE, PLEASE ENTER ANSWER!";
    return answerValidInfo;
  }
  /*
  examples of invalid answers
  -------------------
  any subject
  - no answer entered
  - entered kanji/kana for meaning
  - entered unacceptable character in input (kanji, special char, symbol, number, etc... Basically anything other than kana, romaji, or "normal English letters" - apostrophes, -, and some other chars should be allowed)
  
  kanji
  - entered onyomi instead of kunyomi, or vice versa

  meaning review type
  - entered kanji/kana

  reading review type
  - romaji that can't be converted to kana
  */

  return answerValidInfo;
};

export const isUserMeaningAnswerCorrect = (
  reviewItem: ReviewQueueItem,
  userAnswer: string
) => {
  let answers = reviewItem["meanings"] as SubjectMeaning[];
  let userSynonyms = reviewItem["meaning_synonyms"];
  let acceptedAnswers = answers.filter((answer) => answer.accepted_answer);

  let answersWithSynonyms = [...acceptedAnswers, { synonyms: userSynonyms }];
  // *testing
  console.log(
    "🚀 ~ file: SubjectAndAssignmentService.tsx:200 ~ answersWithSynonyms:",
    answersWithSynonyms
  );
  // *testing

  // TODO: update this based on user settings once those are implemented, allow strict meanings (0.0 threshold, and prob just apply to vocab)
  // meanings allow some typos/mistakes
  let options = {
    keys: ["meaning", "synonyms"],
    threshold: 0.3,
  };
  let fuse = new Fuse(answersWithSynonyms, options);
  let meaningsMatched = fuse.search(userAnswer);
  return meaningsMatched.length !== 0;
};

export const isUserReadingAnswerCorrect = (
  reviewItem: ReviewQueueItem,
  userAnswer: string
) => {
  // so "ん" is converted properly
  let userReading = toKana(userAnswer);
  let answers = reviewItem["readings"] as SubjectReading[];

  let acceptedAnswers = answers.filter((answer) => answer.accepted_answer);
  // *testing
  console.log(
    "🚀 ~ file: SubjectAndAssignmentService.tsx:193 ~ acceptedAnswers:",
    acceptedAnswers
  );
  // *testing

  // readings shouldn't allow any typos/mistakes
  let options = {
    keys: ["reading"],
    threshold: 0.0,
  };
  let fuse = new Fuse(acceptedAnswers, options);
  let readingsMatched = fuse.search(userReading);
  // *testing
  console.log(
    "🚀 ~ file: SubjectAndAssignmentService.tsx:200 ~ readingsMatched:",
    readingsMatched
  );
  // *testing
  return readingsMatched.length !== 0;
};

export const isUserAnswerCorrect = (
  reviewItem: ReviewQueueItem,
  userAnswer: string
) => {
  let reviewType = reviewItem.review_type as string;
  if (reviewType === "reading") {
    return isUserReadingAnswerCorrect(reviewItem, userAnswer);
  } else {
    return isUserMeaningAnswerCorrect(reviewItem, userAnswer);
  }
};
