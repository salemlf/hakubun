import { faker } from "@faker-js/faker";
import { ALL_SUBJECT_TYPES } from "../../../constants";
import { CorrespondingSubject } from "./assignmentGenerator";
import {
  PreflattenedStudyMaterial,
  StudyMaterial,
} from "../../../types/StudyMaterial";
import { SubjectType } from "../../../types/Subject";

interface StudyMaterialGeneratorParams {
  subjType?: SubjectType;
  subjID?: number;
  isHidden?: boolean;
  hasMeaningNote?: boolean;
  hasReadingNote?: boolean;
  hasMeaningSynonyms?: boolean;
  meaningSynonyms?: string[];
}

export const generateStudyMaterial = ({
  subjType,
  subjID,
  isHidden = false,
  hasMeaningNote = true,
  hasReadingNote = true,
  hasMeaningSynonyms = true,
  meaningSynonyms,
}: StudyMaterialGeneratorParams): StudyMaterial => {
  const selectedSubjType =
    subjType ?? faker.helpers.arrayElement(ALL_SUBJECT_TYPES);
  const readingNoteAllowed =
    selectedSubjType !== "radical" && selectedSubjType !== "kana_vocabulary";

  return {
    created_at: faker.date.past(),
    subject_id: subjID ?? faker.number.int(),
    subject_type:
      selectedSubjType ?? faker.helpers.arrayElement(ALL_SUBJECT_TYPES),
    meaning_note: hasMeaningNote
      ? faker.lorem.paragraph({ min: 1, max: 3 })
      : null,
    reading_note:
      readingNoteAllowed && hasReadingNote
        ? faker.lorem.paragraph({ min: 1, max: 3 })
        : null,
    meaning_synonyms: hasMeaningSynonyms
      ? generateMeaningSynonyms(meaningSynonyms)
      : [],
    hidden: isHidden,
  };
};

interface PreFlattenedStudyMaterialGeneratorParams
  extends StudyMaterialGeneratorParams {}

export const generatePreflattenedStudyMaterial = ({
  subjType,
  subjID,
  isHidden,
  hasMeaningNote,
  hasReadingNote,
  hasMeaningSynonyms,
  meaningSynonyms,
}: PreFlattenedStudyMaterialGeneratorParams): PreflattenedStudyMaterial => {
  const studyMaterial: StudyMaterial = generateStudyMaterial({
    subjType: subjType,
    subjID: subjID,
    isHidden,
    hasMeaningNote,
    hasReadingNote,
    hasMeaningSynonyms,
    meaningSynonyms,
  });
  const studyMaterialAttrs: StudyMaterial = studyMaterial as StudyMaterial;

  const mockPreFlattenedStudyMaterial: PreflattenedStudyMaterial = {
    id: faker.number.int(),
    object: "assignment",
    data: studyMaterialAttrs,
    url: faker.internet.url(),
    data_updated_at: faker.date.past(),
  };

  return mockPreFlattenedStudyMaterial;
};

interface StudyMaterialArrGeneratorParams extends StudyMaterialGeneratorParams {
  numStudyMaterials: number;
}

export const generateStudyMaterialArr = ({
  numStudyMaterials,
  subjID,
  subjType,
  isHidden,
  hasMeaningNote,
  hasReadingNote,
  hasMeaningSynonyms,
  meaningSynonyms,
}: StudyMaterialArrGeneratorParams): StudyMaterial[] => {
  const mockStudyMaterials: StudyMaterial[] = Array.from(
    { length: numStudyMaterials },
    () => {
      return generateStudyMaterial({
        subjType: subjType,
        subjID: subjID,
        isHidden,
        hasMeaningNote,
        hasReadingNote,
        hasMeaningSynonyms,
        meaningSynonyms,
      });
    }
  );

  return mockStudyMaterials;
};

export const generatePreflattenedStudyMaterialsArr = ({
  numStudyMaterials,
  subjID,
  subjType,
  isHidden,
  hasMeaningNote,
  hasReadingNote,
  hasMeaningSynonyms,
  meaningSynonyms,
}: StudyMaterialArrGeneratorParams): PreflattenedStudyMaterial[] => {
  const mockPreFlattenedStudyMaterials: PreflattenedStudyMaterial[] =
    Array.from({ length: numStudyMaterials }, () => {
      return generatePreflattenedStudyMaterial({
        subjType: subjType,
        subjID: subjID,
        isHidden,
        hasMeaningNote,
        hasReadingNote,
        hasMeaningSynonyms,
        meaningSynonyms,
      });
    });

  return mockPreFlattenedStudyMaterials;
};

export const generatePreflattenedStudyMaterialsArrFromSubjs = ({
  correspondingSubjects,
  isHidden,
  hasMeaningNote,
  hasReadingNote,
  hasMeaningSynonyms,
  meaningSynonyms,
}: StudyMaterialArrFromSubjGeneratorParams): PreflattenedStudyMaterial[] => {
  const preflattenedStudyMaterials = correspondingSubjects.map((subj) =>
    generatePreflattenedStudyMaterial({
      subjType: subj.subjType,
      subjID: subj.subjID,
      isHidden,
      hasMeaningNote,
      hasReadingNote,
      hasMeaningSynonyms,
      meaningSynonyms,
    })
  );
  return preflattenedStudyMaterials;
};

interface StudyMaterialArrFromSubjGeneratorParams
  extends StudyMaterialGeneratorParams {
  correspondingSubjects: CorrespondingSubject[];
}

export const generateStudyMaterialArrFromSubjs = ({
  correspondingSubjects,
  isHidden,
  hasMeaningNote,
  hasReadingNote,
  hasMeaningSynonyms,
  meaningSynonyms,
}: StudyMaterialArrFromSubjGeneratorParams): StudyMaterial[] => {
  const studyMaterialsFromSubjs = correspondingSubjects.map((subj) =>
    generateStudyMaterial({
      subjType: subj.subjType,
      subjID: subj.subjID,
      isHidden,
      hasMeaningNote,
      hasReadingNote,
      hasMeaningSynonyms,
      meaningSynonyms,
    })
  );

  return studyMaterialsFromSubjs;
};

const generateMeaningSynonyms = (synonyms?: string[]): string[] => {
  if (synonyms) return synonyms;
  const numSynonyms = faker.number.int({ min: 1, max: 5 });
  const generatedSynonyms = Array.from({ length: numSynonyms }, () =>
    faker.word.words({ count: { min: 1, max: 4 } })
  );
  return generatedSynonyms;
};
