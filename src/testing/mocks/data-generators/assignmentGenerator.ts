import { faker } from "@faker-js/faker";
import { ALL_SUBJECT_TYPES, VALID_SRS_STAGES } from "../../../constants";
import {
  Assignment,
  AssignmentAttrs,
  PreFlattenedAssignment,
} from "../../../types/Assignment";
import { SubjectType } from "../../../types/Subject";

export type CorrespondingSubject = {
  subjID: number;
  subjType: SubjectType;
};

type AssignmentGeneratorParams = {
  isBurned?: boolean;
  isResurrected?: boolean;
  isLesson?: boolean;
  correspondingSubject?: CorrespondingSubject;
};

export const generateAssignment = ({
  isBurned = false,
  isResurrected = false,
  isLesson = false,
  correspondingSubject,
}: AssignmentGeneratorParams): Assignment => {
  // TODO: change so dates are all possible, rn could have nonsensenical combos
  const mockAssignment: Assignment = {
    id: faker.number.int(),
    object: "assignment",
    created_at: faker.date.past(),
    unlocked_at: faker.date.past(),
    started_at: !isLesson ? faker.date.past() : null,
    passed_at: !isLesson ? faker.date.past() : null,
    burned_at: isBurned ? faker.date.past() : null,
    resurrected_at: isResurrected ? faker.date.past() : null,
    available_at: !isLesson ? faker.date.recent() : null,
    hidden: faker.datatype.boolean({ probability: 0.9 }),
    srs_stage: faker.helpers.rangeToNumber({
      min: VALID_SRS_STAGES[0],
      max: VALID_SRS_STAGES[VALID_SRS_STAGES.length - 1],
    }),
    subject_id: correspondingSubject?.subjID ?? faker.number.int(),
    subject_type:
      correspondingSubject?.subjType ??
      faker.helpers.arrayElement(ALL_SUBJECT_TYPES),
    url: faker.internet.url(),
    data_updated_at: faker.date.past(),
  };

  return mockAssignment;
};

type PreFlattenedAssignmentGeneratorParams = {
  isBurned?: boolean;
  isResurrected?: boolean;
  isLesson?: boolean;
  correspondingSubject?: CorrespondingSubject;
};

export const generatePreFlattenedAssignment = ({
  isBurned = false,
  isResurrected = false,
  isLesson = false,
  correspondingSubject,
}: PreFlattenedAssignmentGeneratorParams): PreFlattenedAssignment => {
  const assignment: Assignment = generateAssignment({
    isBurned,
    isResurrected,
    isLesson,
    correspondingSubject,
  });
  const assignmentAttrs: AssignmentAttrs = assignment as AssignmentAttrs;

  const mockPreFlattenedAssignment: PreFlattenedAssignment = {
    id: assignment.id,
    object: "assignment",
    data: assignmentAttrs,
    url: assignment.url,
    data_updated_at: assignment.data_updated_at,
  };

  return mockPreFlattenedAssignment;
};

type AssignmentArrayGeneratorParams = {
  numAssignments: number;
  haveBeenStarted?: boolean;
  haveBeenBurned?: boolean;
  haveBeenResurrected?: boolean;
  areLessons?: boolean;
};

export const generateAssignmentArray = ({
  numAssignments,
  haveBeenBurned = false,
  haveBeenResurrected = false,
  areLessons = false,
}: AssignmentArrayGeneratorParams): Assignment[] => {
  const mockAssignments: Assignment[] = Array.from(
    { length: numAssignments },
    () => {
      return generateAssignment({
        isBurned: haveBeenBurned,
        isResurrected: haveBeenResurrected,
        isLesson: areLessons,
      });
    }
  );

  return mockAssignments;
};

type AssignmentArrayFromSubjGeneratorParams = Omit<
  AssignmentArrayGeneratorParams,
  "numAssignments"
> & {
  correspondingSubjects: CorrespondingSubject[];
};

export const generateAssignmentArrayFromSubjs = ({
  correspondingSubjects,
  haveBeenBurned = false,
  haveBeenResurrected = false,
  areLessons = false,
}: AssignmentArrayFromSubjGeneratorParams) => {
  const assignmentsFromSubjs = correspondingSubjects.map((subj) =>
    generateAssignment({
      isBurned: haveBeenBurned,
      isResurrected: haveBeenResurrected,
      correspondingSubject: {
        subjID: subj.subjID,
        subjType: subj.subjType as SubjectType,
      },
      isLesson: areLessons,
    })
  );

  return assignmentsFromSubjs;
};

export const generatePreflattenedAssignmentArrayFromSubjs = ({
  correspondingSubjects,
  haveBeenBurned = false,
  haveBeenResurrected = false,
  areLessons = false,
}: AssignmentArrayFromSubjGeneratorParams) => {
  const assignmentsFromSubjs = correspondingSubjects.map((subj) =>
    generatePreFlattenedAssignment({
      isBurned: haveBeenBurned,
      isResurrected: haveBeenResurrected,
      correspondingSubject: {
        subjID: subj.subjID,
        subjType: subj.subjType as SubjectType,
      },
      isLesson: areLessons,
    })
  );

  return assignmentsFromSubjs;
};

type PreFlattenedAssignmentArrayGeneratorParams = {
  numAssignments: number;
  haveBeenStarted?: boolean;
  haveBeenBurned?: boolean;
  haveBeenResurrected?: boolean;
  areLessons?: boolean;
};

export const generatePreflattenedAssignmentArray = ({
  numAssignments,
  haveBeenBurned = false,
  haveBeenResurrected = false,
  areLessons = false,
}: PreFlattenedAssignmentArrayGeneratorParams): PreFlattenedAssignment[] => {
  const mockPreFlattenedAssignments: PreFlattenedAssignment[] = Array.from(
    { length: numAssignments },
    () => {
      return generatePreFlattenedAssignment({
        isBurned: haveBeenBurned,
        isResurrected: haveBeenResurrected,
        isLesson: areLessons,
      });
    }
  );

  return mockPreFlattenedAssignments;
};

export const createCorrespondingSubject = (
  subjID: number,
  subjType: SubjectType
): CorrespondingSubject => {
  return {
    subjID,
    subjType,
  };
};
