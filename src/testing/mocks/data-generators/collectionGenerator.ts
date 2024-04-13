import {
  assignmentsEndpoint,
  studyMaterialsEndpoint,
  subjectsEndpoint,
} from "../../endpoints";
import {
  CorrespondingSubject,
  generatePreflattenedAssignmentArray,
  generatePreflattenedAssignmentArrayFromSubjs,
} from "./assignmentGenerator";
import {
  AssignmentCollection,
  StudyMaterialCollection,
  SubjectCollection,
} from "../../../types/Collection";
import { faker } from "@faker-js/faker";
import { generatePreflattenedSubjArray } from "./subjectGenerator";
import { SubjectType } from "../../../types/Subject";
import {
  generatePreflattenedStudyMaterialsArr,
  generatePreflattenedStudyMaterialsArrFromSubjs,
} from "./studyMaterialGenerator";

export const generateAssignmentCollection = (
  collectionLength: number,
  areLessons: boolean = false,
  subjType?: SubjectType
): AssignmentCollection => {
  const mockPreflattenedAssignments = generatePreflattenedAssignmentArray({
    numAssignments: collectionLength,
    areLessons,
    subjType,
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
  collectionLength: number,
  subjType?: SubjectType,
  level?: number
): SubjectCollection => {
  const mockPreflattenedSubjs = generatePreflattenedSubjArray({
    numSubjects: collectionLength,
    subjType,
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

export const generateStudyMaterialCollection = (
  collectionLength: number
): StudyMaterialCollection => {
  const mockPreflattenedStudyMaterials = generatePreflattenedStudyMaterialsArr({
    numStudyMaterials: collectionLength,
  });
  const mockAssignmentCollection: StudyMaterialCollection = {
    object: "collection",
    url: studyMaterialsEndpoint,
    data_updated_at: faker.date.past(),
    data: mockPreflattenedStudyMaterials,
    pages: {
      per_page: 1000,
      next_url: null,
      previous_url: null,
    },
    total_count: collectionLength,
  };

  return mockAssignmentCollection;
};

type StudyMaterialsFromSubjsCollectionGeneratorParams = {
  correspondingSubjects: CorrespondingSubject[];
  hasMeaningNote?: boolean;
  hasReadingNote?: boolean;
  hasMeaningSynonyms?: boolean;
};

export const generateStudyMaterialCollectionFromSubjs = ({
  correspondingSubjects,
  hasMeaningNote,
  hasReadingNote,
  hasMeaningSynonyms,
}: StudyMaterialsFromSubjsCollectionGeneratorParams): StudyMaterialCollection => {
  const mockPreflattenedStudyMaterials =
    generatePreflattenedStudyMaterialsArrFromSubjs({
      correspondingSubjects,
      hasMeaningNote,
      hasReadingNote,
      hasMeaningSynonyms,
    });

  const mockAssignmentCollection: StudyMaterialCollection = {
    object: "collection",
    url: studyMaterialsEndpoint,
    data_updated_at: faker.date.past(),
    data: mockPreflattenedStudyMaterials,
    pages: {
      per_page: 1000,
      next_url: null,
      previous_url: null,
    },
    total_count: mockPreflattenedStudyMaterials.length,
  };

  return mockAssignmentCollection;
};
