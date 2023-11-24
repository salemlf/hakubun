import { Assignment, PreFlattenedAssignment } from "../../../types/Assignment";
import {
  PreFlattenedSubject,
  Subject,
  SubjectType,
} from "../../../types/Subject";
import {
  generateAssignment,
  generatePreFlattenedAssignment,
} from "./assignmentGenerator";
import {
  generatePreFlattenedSubject,
  generatePreflattenedSubjArray,
  generateSubjArray,
  generateSubject,
} from "./subjectGenerator";

export type SubjAssignmentPair = {
  subject: Subject;
  assignment: Assignment;
};

export type PreflattenedSubjAssignmentPair = {
  preflattenedSubject: PreFlattenedSubject;
  preflattenedAssignment: PreFlattenedAssignment;
};

export type SubjAssignmentPairArr = {
  subjects: Subject[];
  assignments: Assignment[];
};

export type PreflattenedSubjAssignmentPairArr = {
  preflattenedSubjects: PreFlattenedSubject[];
  preflattenedAssignments: PreFlattenedAssignment[];
};

type SubjAssignmentPairGeneratorParams = {
  subjType: SubjectType;
  imagesOnly?: boolean;
  level?: number;
  assignmentBurned?: boolean;
  assignmentResurrected?: boolean;
};

export const generateSubjAssignmentPair = ({
  subjType,
  imagesOnly = false,
  level,
  assignmentBurned = false,
  assignmentResurrected = false,
}: SubjAssignmentPairGeneratorParams): SubjAssignmentPair => {
  const subject: Subject = generateSubject({ subjType, imagesOnly, level });
  const assignment: Assignment = generateAssignment({
    isBurned: assignmentBurned,
    isResurrected: assignmentResurrected,
    correspondingSubject: { subjID: subject.id, subjType: subject.object },
  });
  return { subject, assignment };
};

export type PreflattenedSubjAssignmentPairGeneratorParams = Omit<
  SubjAssignmentPairGeneratorParams,
  "imagesOnly"
>;

export const generatePreflattenedSubjAssignmentPair = ({
  subjType,
  level,
  assignmentBurned = false,
  assignmentResurrected = false,
}: PreflattenedSubjAssignmentPairGeneratorParams): PreflattenedSubjAssignmentPair => {
  const preflattenedSubject = generatePreFlattenedSubject({ subjType, level });

  const preflattenedAssignment = generatePreFlattenedAssignment({
    isBurned: assignmentBurned,
    isResurrected: assignmentResurrected,
  });
  return { preflattenedSubject, preflattenedAssignment };
};

type SubjAssignmentPairArrGeneratorParams = {
  subjTypes: SubjectType;
  numPairs: number;
  imagesOnly?: boolean;
  level?: number;
  assignmentsStarted?: boolean;
  assignmentsBurned?: boolean;
  assignmentsResurrected?: boolean;
};

export const generateSubjAssignmentPairArray = ({
  subjTypes,
  numPairs,
  imagesOnly = false,
  level,
  assignmentsBurned = false,
  assignmentsResurrected = false,
}: SubjAssignmentPairArrGeneratorParams): SubjAssignmentPairArr => {
  const subjArr = generateSubjArray({
    numSubjects: numPairs,
    subjTypes,
    imagesOnly,
    level,
  });
  const assignArr = subjArr.map((subj) =>
    generateAssignment({
      isBurned: assignmentsBurned,
      isResurrected: assignmentsResurrected,
      correspondingSubject: { subjID: subj.id, subjType: subj.object },
    })
  );

  return { subjects: subjArr, assignments: assignArr };
};

export type PreflattenedSubjAssignmentPairArrGeneratorParams = Omit<
  SubjAssignmentPairArrGeneratorParams,
  "imagesOnly"
>;

export const generatePreflattenedSubjAssignmentPairArray = ({
  subjTypes,
  numPairs,
  level,
  assignmentsBurned = false,
  assignmentsResurrected = false,
}: PreflattenedSubjAssignmentPairArrGeneratorParams): PreflattenedSubjAssignmentPairArr => {
  const preflattenedSubjects = generatePreflattenedSubjArray({
    numSubjects: numPairs,
    subjTypes,
    level,
  });

  const preflattenedAssignments = preflattenedSubjects.map((subj) =>
    generatePreFlattenedAssignment({
      isBurned: assignmentsBurned,
      isResurrected: assignmentsResurrected,
      correspondingSubject: {
        subjID: subj.id,
        subjType: subj.object as SubjectType,
      },
    })
  );

  return { preflattenedSubjects, preflattenedAssignments };
};

type VarietySubjAssignmentPairArrGeneratorParams = {
  subjTypesToCreate: SubjectType[];
  numEachSubjType: number;
  imagesOnly?: boolean;
  level?: number;
  assignmentsStarted?: boolean;
  assignmentsBurned?: boolean;
  assignmentsResurrected?: boolean;
};

export const generateVarietySubjAssignmentPairArray = ({
  subjTypesToCreate,
  numEachSubjType,
  imagesOnly = false,
  level,
  assignmentsBurned = false,
  assignmentsResurrected = false,
}: VarietySubjAssignmentPairArrGeneratorParams): SubjAssignmentPairArr => {
  const subjArr = subjTypesToCreate
    .map((subjType) =>
      generateSubjArray({
        numSubjects: numEachSubjType,
        subjTypes: subjType,
        imagesOnly,
        level,
      })
    )
    .flat();
  const assignArr = subjArr.map((subj) =>
    generateAssignment({
      isBurned: assignmentsBurned,
      isResurrected: assignmentsResurrected,
      correspondingSubject: { subjID: subj.id, subjType: subj.object },
    })
  );

  return { subjects: subjArr, assignments: assignArr };
};
