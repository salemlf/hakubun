import { Assignment } from "../../../types/Assignment";
import { Subject, SubjectType } from "../../../types/Subject";
import { generateAssignment } from "./assignmentGenerator";
import { generateSubjArray, generateSubject } from "./subjectGenerator";

export type SubjAssignmentPair = {
  subject: Subject;
  assignment: Assignment;
};

type SubjAssignmentPairGeneratorParams = {
  subjType: SubjectType;
  imagesOnly?: boolean;
  level?: number;
  assignmentStarted?: boolean;
  assignmentBurned?: boolean;
  assignmentResurrected?: boolean;
};

export const generateSubjAssignmentPair = ({
  subjType,
  imagesOnly = false,
  level,
  assignmentStarted = true,
  assignmentBurned = false,
  assignmentResurrected = false,
}: SubjAssignmentPairGeneratorParams): SubjAssignmentPair => {
  const subject: Subject = generateSubject({ subjType, imagesOnly, level });
  const assignment: Assignment = generateAssignment({
    isStarted: assignmentStarted,
    isBurned: assignmentBurned,
    isResurrected: assignmentResurrected,
    correspondingSubject: { subjID: subject.id, subjType: subject.object },
  });
  return { subject, assignment };
};

export type SubjAssignmentPairArr = {
  subjects: Subject[];
  assignments: Assignment[];
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
  assignmentsStarted = true,
  assignmentsBurned = false,
  assignmentsResurrected = false,
}: SubjAssignmentPairArrGeneratorParams): SubjAssignmentPairArr => {
  const subjArr = generateSubjArray(numPairs, subjTypes, imagesOnly, level);
  const assignArr = subjArr.map((subj) =>
    generateAssignment({
      isStarted: assignmentsStarted,
      isBurned: assignmentsBurned,
      isResurrected: assignmentsResurrected,
      correspondingSubject: { subjID: subj.id, subjType: subj.object },
    })
  );

  return { subjects: subjArr, assignments: assignArr };
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
  assignmentsStarted = true,
  assignmentsBurned = false,
  assignmentsResurrected = false,
}: VarietySubjAssignmentPairArrGeneratorParams): SubjAssignmentPairArr => {
  const subjArr = subjTypesToCreate
    .map((subjType) =>
      generateSubjArray(numEachSubjType, subjType, imagesOnly, level)
    )
    .flat();
  const assignArr = subjArr.map((subj) =>
    generateAssignment({
      isStarted: assignmentsStarted,
      isBurned: assignmentsBurned,
      isResurrected: assignmentsResurrected,
      correspondingSubject: { subjID: subj.id, subjType: subj.object },
    })
  );

  return { subjects: subjArr, assignments: assignArr };
};
