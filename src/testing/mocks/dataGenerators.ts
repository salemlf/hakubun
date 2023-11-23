import { BackToBackChoice } from "../../components/BackToBackOption/BackToBackOption.types";
import {
  MAX_LEVEL,
  MIN_LEVEL,
  ALL_SUBJECT_TYPES,
  VALID_SRS_STAGES,
} from "../../constants";
import { createAssignmentQueueItems } from "../../services/SubjectAndAssignmentService";
import { Assignment } from "../../types/Assignment";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
import { StudyMaterial } from "../../types/MiscTypes";
import {
  Subject,
  SubjectAuxiliaryMeaning,
  SubjectCharacterImage,
  SubjectMeaning,
  SubjectMetadata,
  SubjectType,
} from "../../types/Subject";

import { faker, fakerJA } from "@faker-js/faker";
import { getRandomIntArr, getRandomIntInRange } from "../../utils";

// TODO: use areCompleted to generate completed items
export const mockQueueItems = (
  assignments: Assignment[],
  subjects: Subject[],
  studyMaterials: StudyMaterial[],
  backToBackChoice: BackToBackChoice = "disabled",
  areCompleted: boolean
): AssignmentQueueItem[] => {
  const queueItems: AssignmentQueueItem[] = createAssignmentQueueItems(
    assignments,
    subjects,
    studyMaterials,
    backToBackChoice
  );

  return queueItems;
};

// TODO: use isStarted and change date attributes based on that
export const generateAssignment = (
  isStarted: boolean = false,
  isBurned: boolean = false,
  isResurrected: boolean = false
): Assignment => {
  const mockAssignment: Assignment = {
    id: faker.number.int(),
    object: "assignment",
    created_at: faker.date.past(),
    unlocked_at: faker.date.past(),
    started_at: faker.date.past(),
    passed_at: faker.date.past(),
    burned_at: isBurned ? faker.date.past() : null,
    resurrected_at: isResurrected ? faker.date.past() : null,
    available_at: faker.date.recent(),
    hidden: faker.datatype.boolean(),
    srs_stage: faker.helpers.rangeToNumber({
      min: VALID_SRS_STAGES[0],
      max: VALID_SRS_STAGES[VALID_SRS_STAGES.length - 1],
    }),
    subject_id: faker.number.int(),
    subject_type: faker.helpers.arrayElement(ALL_SUBJECT_TYPES),
    url: faker.internet.url(),
    data_updated_at: faker.date.past(),
  };

  return mockAssignment;
};

// id: number;
// object: SubjectType;
//   amalgamation_subject_ids?: number[];
//   auxiliary_meanings: SubjectAuxiliaryMeaning[];
//   characters: string | null;
//   character_images?: SubjectCharacterImage[];
//   created_at: Date;
//   document_url: string;
//   hidden_at: Date | null;
//   lesson_position: number;
//   level: number;
//   meanings: SubjectMeaning[];
//   readings?: SubjectReading[];
//   meaning_mnemonic: string;
//   slug: string;
//   spaced_repetition_system_id: number;
//   component_subject_ids?: number[];
//   visually_similar_subject_ids?: number[];
//   reading_hint?: string | null;
//   meaning_hint?: string | null;
//   reading_mnemonic?: string;
//   pronunciation_audios?: PronunciationAudio[];
//   parts_of_speech?: string[];
//   context_sentences?: ContextSentence[];
//   availableImages?: string[];
//   useImage?: boolean;

// TODO: account for hidden subjects
export const generateSubject = (
  subjType: SubjectType,
  hasChars: boolean = true
): Subject => {
  const hasAmalgamationSubjectIds =
    subjType === "kanji" || subjType === "vocabulary";

  const hasCharImages = subjType === "radical";
  let charImages = hasCharImages ? generateSubjCharImages() : undefined;

  // TODO: call setSubjectAvailImgs for radicals

  const mockSubject: Subject = {
    id: faker.number.int(),
    object: subjType,
    amalgamation_subject_ids: hasAmalgamationSubjectIds
      ? getRandomIntArr(1, 5, 1, 100000)
      : undefined,
    auxiliary_meanings: generateAuxiliaryMeanings(),
    url: faker.internet.url(),
    characters: hasChars ? fakerJA.word.words(1) : null,
    character_images: charImages,
    created_at: faker.date.past(),
    document_url: faker.internet.url(),
    hidden_at: null,
    lesson_position: faker.number.int(),
    level: getRandomLevel(),
    meanings: generateSubjectMeanings(),
    //   readings?: SubjectReading[];
    //   meaning_mnemonic: string;
    //   slug: string;
    //   spaced_repetition_system_id: number;
    //   component_subject_ids?: number[];
    //   visually_similar_subject_ids?: number[];
    //   reading_hint?: string | null;
    //   meaning_hint?: string | null;
    //   reading_mnemonic?: string;
    //   pronunciation_audios?: PronunciationAudio[];
    //   parts_of_speech?: string[];
    //   context_sentences?: ContextSentence[];
    //   availableImages?: string[];
    //   useImage?: boolean;
  };

  return mockSubject;
};

const generateAuxiliaryMeanings = (): SubjectAuxiliaryMeaning[] => {
  // using "whitelist" and "blacklist" is icky, but they're the values in the API unfortunately
  const auxilaryMeaningType = ["whitelist", "blacklist"];
  const randomLength = getRandomIntInRange(0, 5);

  const mockAuxiliaryMeanings: SubjectAuxiliaryMeaning[] = Array.from(
    { length: randomLength },
    () => {
      return {
        meaning: faker.helpers.arrayElement(auxilaryMeaningType),
        type: faker.word.words(1),
      };
    }
  );

  return mockAuxiliaryMeanings;
};

const generateSubjCharImages = (): SubjectCharacterImage[] => {
  const randomLength = getRandomIntInRange(0, 5);

  const mockSubjCharImages: SubjectCharacterImage[] = Array.from(
    { length: randomLength },
    () => {
      return {
        url: faker.image.url(),
        metadata: generateSubjMetadata(),
        content_type: faker.image.dataUri(),
      };
    }
  );

  return mockSubjCharImages;
};

const generateSubjMetadata = (): SubjectMetadata => {
  return {
    inline_styles: faker.datatype.boolean(),
    color: faker.color.human(),
    dimensions: `${faker.number.int()}x${faker.number.int()}`,
    style_name: `${faker.number.int()}px`,
  };
};

const getRandomLevel = (): number => {
  return getRandomIntInRange(MIN_LEVEL, MAX_LEVEL);
};

const generateSubjectMeanings = (): SubjectMeaning[] => {
  const randomLength = getRandomIntInRange(1, 8);

  const mockSubjMeanings: SubjectMeaning[] = Array.from(
    { length: randomLength },
    () => {
      return {
        meaning: faker.word.words({ count: { min: 1, max: 4 } }),
        primary: faker.datatype.boolean(0.2),
        accepted_answer: faker.datatype.boolean(0.8),
      };
    }
  );

  // making sure at least one meaning is set as primary
  if (!mockSubjMeanings.some((meaning) => meaning.primary)) {
    const randomIndex = getRandomIntInRange(0, mockSubjMeanings.length - 1);
    mockSubjMeanings[randomIndex].primary = true;
  }

  // making sure there's at least one accepted meaning
  if (!mockSubjMeanings.some((meaning) => meaning.accepted_answer)) {
    const randomIndex = getRandomIntInRange(0, mockSubjMeanings.length - 1);
    mockSubjMeanings[randomIndex].accepted_answer = true;
  }

  return mockSubjMeanings;
};
