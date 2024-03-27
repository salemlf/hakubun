import { faker } from "@faker-js/faker";
import { ALL_SUBJECT_TYPES, VALID_SRS_STAGES } from "../../../constants";
import {
  Assignment,
  AssignmentAttrs,
  PreFlattenedAssignment,
} from "../../../types/Assignment";
import { SubjectType } from "../../../types/Subject";
import { RequireExactlyOne } from "type-fest";

export type CorrespondingSubject = {
  subjID: number;
  subjType: SubjectType;
};

type CorrespondingSubjAndSubjType = {
  correspondingSubject: CorrespondingSubject;
  subjType: SubjectType;
};

// TODO: change to use type-fest's RequireOneOrNone, prob simpler
export type CorrespondingSubjOrSubjType = RequireExactlyOne<
  CorrespondingSubjAndSubjType,
  "correspondingSubject" | "subjType"
>;

type AssignmentGeneratorParams = {
  isBurned?: boolean;
  isResurrected?: boolean;
  isLesson?: boolean;
  subjOrSubjType?: CorrespondingSubjOrSubjType;
};

export const generateAssignment = ({
  isBurned = false,
  isResurrected = false,
  isLesson = false,
  subjOrSubjType,
}: AssignmentGeneratorParams): Assignment => {
  const subjID =
    subjOrSubjType?.correspondingSubject?.subjID ?? faker.number.int();
  const subjType =
    subjOrSubjType?.correspondingSubject?.subjType ??
    subjOrSubjType?.subjType ??
    faker.helpers.arrayElement(ALL_SUBJECT_TYPES);

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
    subject_id: subjID,
    subject_type: subjType,
    url: faker.internet.url(),
    data_updated_at: faker.date.past(),
  };

  return mockAssignment;
};

type PreFlattenedAssignmentGeneratorParams = {
  isBurned?: boolean;
  isResurrected?: boolean;
  isLesson?: boolean;
  subjOrSubjType?: CorrespondingSubjOrSubjType;
};

export const generatePreFlattenedAssignment = ({
  isBurned = false,
  isResurrected = false,
  isLesson = false,
  subjOrSubjType,
}: PreFlattenedAssignmentGeneratorParams): PreFlattenedAssignment => {
  const assignment: Assignment = generateAssignment({
    isBurned,
    isResurrected,
    isLesson,
    subjOrSubjType,
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
  subjOrSubjType?: CorrespondingSubjOrSubjType;
};

export const generateAssignmentArray = ({
  numAssignments,
  haveBeenBurned = false,
  haveBeenResurrected = false,
  areLessons = false,
  subjOrSubjType,
}: AssignmentArrayGeneratorParams): Assignment[] => {
  const mockAssignments: Assignment[] = Array.from(
    { length: numAssignments },
    () => {
      return generateAssignment({
        isBurned: haveBeenBurned,
        isResurrected: haveBeenResurrected,
        isLesson: areLessons,
        subjOrSubjType,
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
      subjOrSubjType: {
        correspondingSubject: {
          subjID: subj.subjID,
          subjType: subj.subjType as SubjectType,
        },
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
      subjOrSubjType: {
        correspondingSubject: {
          subjID: subj.subjID,
          subjType: subj.subjType as SubjectType,
        },
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
  subjType?: SubjectType;
};

export const generatePreflattenedAssignmentArray = ({
  numAssignments,
  haveBeenBurned = false,
  haveBeenResurrected = false,
  areLessons = false,
  subjType,
}: PreFlattenedAssignmentArrayGeneratorParams): PreFlattenedAssignment[] => {
  const mockPreFlattenedAssignments: PreFlattenedAssignment[] = Array.from(
    { length: numAssignments },
    () => {
      return generatePreFlattenedAssignment({
        isBurned: haveBeenBurned,
        isResurrected: haveBeenResurrected,
        isLesson: areLessons,
        subjOrSubjType: subjType && { subjType },
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
