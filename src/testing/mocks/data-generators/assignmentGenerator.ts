import { faker } from "@faker-js/faker";
import { ALL_SUBJECT_TYPES, VALID_SRS_STAGES } from "../../../constants";
import {
  Assignment,
  AssignmentAttrs,
  PreFlattenedAssignment,
} from "../../../types/Assignment";
import { SubjectType } from "../../../types/Subject";

type CorrespondingSubject = {
  subjID: number;
  subjType: SubjectType;
};

type AssignmentGeneratorParams = {
  isStarted?: boolean;
  isBurned?: boolean;
  isResurrected?: boolean;
  correspondingSubject?: CorrespondingSubject;
};

// TODO: use isStarted and change date attributes based on that
export const generateAssignment = ({
  isStarted = true,
  isBurned = false,
  isResurrected = false,
  correspondingSubject,
}: AssignmentGeneratorParams): Assignment => {
  // TODO: change so dates are all possible, rn could have nonsensenical combos
  const mockAssignment: Assignment = {
    id: faker.number.int(),
    object: "assignment",
    created_at: faker.date.past(),
    unlocked_at: faker.date.past(),
    started_at: isStarted ? faker.date.past() : null,
    passed_at: isStarted ? faker.date.past() : null,
    burned_at: isBurned ? faker.date.past() : null,
    resurrected_at: isResurrected ? faker.date.past() : null,
    available_at: faker.date.recent(),
    hidden: faker.datatype.boolean(),
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
  isStarted?: boolean;
  isBurned?: boolean;
  isResurrected?: boolean;
  correspondingSubject?: CorrespondingSubject;
};

export const generatePreFlattenedAssignment = ({
  isStarted = true,
  isBurned = false,
  isResurrected = false,
  correspondingSubject,
}: PreFlattenedAssignmentGeneratorParams): PreFlattenedAssignment => {
  const assignment: Assignment = generateAssignment({
    isStarted,
    isBurned,
    isResurrected,
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

export const generateAssignmentArray = (
  numAssignments: number,
  haveBeenStarted: boolean = true,
  haveBeenBurned: boolean = false,
  haveBeenResurrected: boolean = false
): Assignment[] => {
  const mockAssignments: Assignment[] = Array.from(
    { length: numAssignments },
    () => {
      return generateAssignment({
        isStarted: haveBeenStarted,
        isBurned: haveBeenBurned,
        isResurrected: haveBeenResurrected,
      });
    }
  );

  return mockAssignments;
};

export const generatePreflattenedAssignmentArray = (
  numAssignments: number,
  haveBeenStarted: boolean = true,
  haveBeenBurned: boolean = false,
  haveBeenResurrected: boolean = false
): PreFlattenedAssignment[] => {
  const mockPreFlattenedAssignments: PreFlattenedAssignment[] = Array.from(
    { length: numAssignments },
    () => {
      return generatePreFlattenedAssignment({
        isStarted: haveBeenStarted,
        isBurned: haveBeenBurned,
        isResurrected: haveBeenResurrected,
      });
    }
  );

  return mockPreFlattenedAssignments;
};
