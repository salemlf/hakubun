import { assignmentsEndpoint, subjectsEndpoint } from "../../endpoints";
import { generatePreflattenedAssignmentArray } from "./assignmentGenerator";
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
