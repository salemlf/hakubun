import { assignmentsEndpoint, subjectsEndpoint } from "../../endpoints";
import {
  CorrespondingSubject,
  generatePreflattenedAssignmentArray,
  generatePreflattenedAssignmentArrayFromSubjs,
} from "./assignmentGenerator";
import {
  AssignmentCollection,
  SubjectCollection,
} from "../../../types/Collection";
import { faker } from "@faker-js/faker";
import { generatePreflattenedSubjArray } from "./subjectGenerator";
import { SubjectType } from "../../../types/Subject";

export const generateAssignmentCollection = (
  collectionLength: number,
  areLessons: boolean = false
): AssignmentCollection => {
  const mockPreflattenedAssignments = generatePreflattenedAssignmentArray({
    numAssignments: collectionLength,
    areLessons,
  });
  const mockAssignmentCollection: AssignmentCollection = {
    object: "collection",
    url: assignmentsEndpoint,
    data_updated_at: faker.date.past(),
    data: mockPreflattenedAssignments,
    pages: {
      per_page: 1000,
      next_url: null,
      previous_url: null,
    },
    total_count: collectionLength,
  };

  return mockAssignmentCollection;
};

type AssignmentsFromSubjsCollectionGeneratorParams = {
  correspondingSubjects: CorrespondingSubject[];
  haveBeenBurned?: boolean;
  haveBeenResurrected?: boolean;
  areLessons?: boolean;
};

export const generateAssignmentCollectionFromSubjs = ({
  correspondingSubjects,
  haveBeenBurned,
  haveBeenResurrected,
  areLessons = false,
}: AssignmentsFromSubjsCollectionGeneratorParams): AssignmentCollection => {
  const mockPreflattenedAssignments =
    generatePreflattenedAssignmentArrayFromSubjs({
      correspondingSubjects,
      haveBeenBurned,
      haveBeenResurrected,
      areLessons,
    });
  const mockAssignmentCollection: AssignmentCollection = {
    object: "collection",
    url: assignmentsEndpoint,
    data_updated_at: faker.date.past(),
    data: mockPreflattenedAssignments,
    pages: {
      per_page: 1000,
      next_url: null,
      previous_url: null,
    },
    total_count: mockPreflattenedAssignments.length,
  };

  return mockAssignmentCollection;
};

export const generateSubjectCollection = (
  subjTypes: SubjectType,
  collectionLength: number,
  level?: number
): SubjectCollection => {
  const mockPreflattenedSubjs = generatePreflattenedSubjArray({
    numSubjects: collectionLength,
    subjTypes,
    level,
  });
  const mockSubjCollection: SubjectCollection = {
    object: "collection",
    url: subjectsEndpoint,
    data_updated_at: faker.date.past(),
    data: mockPreflattenedSubjs,
    pages: {
      per_page: 1000,
      next_url: null,
      previous_url: null,
    },
    total_count: collectionLength,
  };

  return mockSubjCollection;
};

export const getIDsFromSubjOrAssignmentCollection = (
  collection: SubjectCollection | AssignmentCollection
): number[] => {
  const collectionData = collection.data;
  return collectionData.map((item) => item.id);
};
