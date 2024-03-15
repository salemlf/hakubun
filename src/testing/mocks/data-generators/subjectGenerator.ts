import { faker, fakerJA } from "@faker-js/faker";
import { getRandomIntArr } from "../../../utils";
import { ALL_SUBJECT_TYPES, PARTS_OF_SPEECH } from "../../../constants";
import {
  getRandomAccent,
  getRandomLevel,
  getRandomVoiceActorID,
} from "./generatorUtils";
import { setSubjectAvailImgs } from "../../../services/ImageSrcService";
import {
  AudioMetadata,
  ContextSentence,
  PreFlattenedSubject,
  PronunciationAudio,
  ReadingType,
  Subject,
  SubjectAttrs,
  SubjectAuxiliaryMeaning,
  SubjectCharacterImage,
  SubjectMeaning,
  SubjectMetadata,
  SubjectReading,
  SubjectType,
} from "../../../types/Subject";

type GenerateSubjParams = {
  subjType?: SubjectType;
  imagesOnly?: boolean;
  level?: number;
  hasAllowedAuxMeanings?: boolean;
  hasForbiddenAuxMeanings?: boolean;
};

// TODO: account for hidden subjects
// TODO: improve generation of meaning/reading mnemonics and hints so includes tags for subjects
export const generateSubject = ({
  subjType,
  imagesOnly = false,
  hasAllowedAuxMeanings = true,
  hasForbiddenAuxMeanings = true,
  level,
}: GenerateSubjParams): Subject => {
  const selectedSubjType =
    subjType ?? faker.helpers.arrayElement(ALL_SUBJECT_TYPES);
  if (imagesOnly && selectedSubjType !== "radical") {
    throw new Error("Only radicals can have images exclusively");
  }

  const hasAmalgamationSubjectIds =
    selectedSubjType === "radical" || selectedSubjType === "kanji";
  const hasReadings =
    selectedSubjType === "kanji" || selectedSubjType === "vocabulary";
  const hasCharImages = selectedSubjType === "radical" && imagesOnly;
  const hasComponents =
    selectedSubjType === "kanji" || selectedSubjType === "vocabulary";
  const hasVisuallySimilar = selectedSubjType === "kanji";
  const isGeneralVocabType =
    selectedSubjType === "vocabulary" || selectedSubjType === "kana_vocabulary";

  const charImages = hasCharImages ? generateSubjCharImages() : undefined;

  const jaChars = fakerJA.word.words({ count: { min: 1, max: 8 } });
  const subjReadings = hasReadings ? generateSubjReadings() : undefined;

  const readingsForMockAudio = getReadingsForMockAudio(
    selectedSubjType,
    jaChars,
    subjReadings
  );

  const mockSubject: Subject = {
    id: faker.number.int(),
    object: selectedSubjType,
    amalgamation_subject_ids: hasAmalgamationSubjectIds
      ? getRandomIntArr(1, 5, 1, 100000)
      : undefined,
    auxiliary_meanings: generateAuxiliaryMeanings(
      hasAllowedAuxMeanings,
      hasForbiddenAuxMeanings
    ),
    url: faker.internet.url(),
    characters: !imagesOnly ? jaChars : null,
    character_images: charImages,
    created_at: faker.date.past(),
    document_url: faker.internet.url(),
    hidden_at: null,
    lesson_position: faker.number.int(),
    level: level ?? getRandomLevel(),
    meanings: generateSubjectMeanings(),
    readings: subjReadings,
    meaning_mnemonic: faker.lorem.paragraph({ min: 1, max: 3 }),
    slug: faker.helpers.slugify(jaChars),
    spaced_repetition_system_id: faker.number.int(),
    component_subject_ids: hasComponents
      ? generateComponentSubjectIds()
      : undefined,
    visually_similar_subject_ids: hasVisuallySimilar
      ? generateVisuallySimilarSubjectIds()
      : undefined,
    reading_hint: hasReadings ? faker.lorem.sentence({ min: 1, max: 3 }) : null,
    meaning_hint: generateMeaningHint(selectedSubjType),
    reading_mnemonic: hasReadings
      ? faker.lorem.paragraph({ min: 1, max: 3 })
      : undefined,
    pronunciation_audios: isGeneralVocabType
      ? generatePronunciationAudios(readingsForMockAudio)
      : undefined,
    parts_of_speech: isGeneralVocabType ? generatePartsOfSpeech() : undefined,
    context_sentences: isGeneralVocabType
      ? generateContextSentences()
      : undefined,
    data_updated_at: faker.date.past(),
  };

  if (selectedSubjType === "radical") {
    return setSubjectAvailImgs(mockSubject);
  }

  return mockSubject;
};

type GeneratePreFlattenedSubjParams = {
  subjType?: SubjectType;
  imagesOnly?: boolean;
  level?: number;
  hasAllowedAuxMeanings?: boolean;
  hasForbiddenAuxMeanings?: boolean;
};

export const generatePreFlattenedSubject = ({
  subjType,
  level,
  hasAllowedAuxMeanings,
  hasForbiddenAuxMeanings,
}: GeneratePreFlattenedSubjParams): PreFlattenedSubject => {
  const subject: Subject = generateSubject({
    subjType,
    level,
    hasAllowedAuxMeanings,
    hasForbiddenAuxMeanings,
  });

  const subjectAttrs: SubjectAttrs = subject as SubjectAttrs;
  delete subject.useImage;
  delete subject.availableImages;
  delete subject.availableImages;

  const mockPreFlattenedSubject: PreFlattenedSubject = {
    id: subject.id,
    object: subject.object,
    data: subjectAttrs,
    url: subject.url,
    data_updated_at: subject.data_updated_at,
  };

  return mockPreFlattenedSubject;
};

type PreFlattenedSubjArrGeneratorParams = {
  numSubjects: number;
  subjTypes?: SubjectType;
  level?: number;
  hasAllowedAuxMeanings?: boolean;
  hasForbiddenAuxMeanings?: boolean;
};

export const generatePreflattenedSubjArray = ({
  numSubjects,
  subjTypes,
  level,
  hasAllowedAuxMeanings,
  hasForbiddenAuxMeanings,
}: PreFlattenedSubjArrGeneratorParams): PreFlattenedSubject[] => {
  const mockPreFlattenedSubjs: PreFlattenedSubject[] = Array.from(
    { length: numSubjects },
    () => {
      return generatePreFlattenedSubject({
        subjType: subjTypes,
        level,
        hasAllowedAuxMeanings,
        hasForbiddenAuxMeanings,
      });
    }
  );

  return mockPreFlattenedSubjs;
};

type SubjArrGeneratorParams = {
  numSubjects: number;
  subjTypes?: SubjectType;
  imagesOnly?: boolean;
  level?: number;
  hasAllowedAuxMeanings?: boolean;
  hasForbiddenAuxMeanings?: boolean;
};

export const generateSubjArray = ({
  numSubjects,
  subjTypes,
  imagesOnly = false,
  level,
  hasAllowedAuxMeanings,
  hasForbiddenAuxMeanings,
}: SubjArrGeneratorParams): Subject[] => {
  const mockSubjs: Subject[] = Array.from({ length: numSubjects }, () => {
    return generateSubject({
      subjType: subjTypes,
      imagesOnly,
      level,
      hasAllowedAuxMeanings,
      hasForbiddenAuxMeanings,
    });
  });

  return mockSubjs;
};

// TODO: maybe make sure mockAllowedMeanings and mockForbiddenMeanings don't overlap in meanings?...
// TODO: ...very unlikely to happen though
const generateAuxiliaryMeanings = (
  hasAllowed: boolean,
  hasForbidden: boolean
): SubjectAuxiliaryMeaning[] => {
  // using "whitelist" and "blacklist" is icky, but they're the values in the API unfortunately
  const numAuxMeaningsPerType = faker.number.int({ min: 1, max: 5 });
  const numAllowedAux = hasAllowed ? numAuxMeaningsPerType : 0;
  const numForbiddenAux = hasForbidden ? numAuxMeaningsPerType : 0;

  const mockAllowedMeanings: SubjectAuxiliaryMeaning[] = Array.from(
    { length: numAllowedAux },
    () => {
      return {
        meaning: faker.word.words({ count: { min: 1, max: 4 } }),
        type: "whitelist",
      };
    }
  );

  const mockForbiddenMeanings: SubjectAuxiliaryMeaning[] = Array.from(
    { length: numForbiddenAux },
    () => {
      return {
        meaning: faker.word.words({ count: { min: 1, max: 4 } }),
        type: "blacklist",
      };
    }
  );

  const mockAuxiliaryMeanings = [
    ...mockAllowedMeanings,
    ...mockForbiddenMeanings,
  ];

  return mockAuxiliaryMeanings;
};

const generateSubjCharImages = (): SubjectCharacterImage[] => {
  const numSubjCharImgs = faker.number.int({ min: 0, max: 5 });

  const mockSubjCharImages: SubjectCharacterImage[] = Array.from(
    { length: numSubjCharImgs },
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

const generateSubjectMeanings = (): SubjectMeaning[] => {
  const numSubjMeanings = faker.number.int({ min: 1, max: 8 });

  const mockSubjMeanings: SubjectMeaning[] = Array.from(
    { length: numSubjMeanings },
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
    const randomIndex = faker.number.int({
      min: 0,
      max: mockSubjMeanings.length - 1,
    });
    mockSubjMeanings[randomIndex].primary = true;
  }

  // making sure there's at least one accepted meaning
  if (!mockSubjMeanings.some((meaning) => meaning.accepted_answer)) {
    const randomIndex = faker.number.int({
      min: 0,
      max: mockSubjMeanings.length - 1,
    });
    mockSubjMeanings[randomIndex].accepted_answer = true;
  }

  const mockSubjMeaningsWithMinPrimaryAndAccepted =
    ensureMinPrimaryAndAcceptedMeanings(mockSubjMeanings) as SubjectMeaning[];

  return mockSubjMeaningsWithMinPrimaryAndAccepted;
};

const generateSubjReadings = (): SubjectReading[] => {
  const numReadings = faker.number.int({ min: 1, max: 5 });
  const mockSubjReadings: SubjectReading[] = Array.from(
    { length: numReadings },
    () => {
      return {
        type: generateReadingType(),
        primary: faker.datatype.boolean(0.2),
        accepted_answer: faker.datatype.boolean(0.8),
        reading: fakerJA.word.words({ count: { min: 1, max: 4 } }),
      };
    }
  );

  const mockSubjReadingsWithMinPrimaryAndAccepted =
    ensureMinPrimaryAndAcceptedMeanings(mockSubjReadings) as SubjectReading[];

  const meaningsArrToUpdate = [...mockSubjReadingsWithMinPrimaryAndAccepted];

  // making sure there's at least one onyomi or kunyomi reading
  if (
    !mockSubjReadingsWithMinPrimaryAndAccepted.some(
      (meaning) => meaning.type === "onyomi" || meaning.type === "kunyomi"
    )
  ) {
    const readingTypesToAdd: ReadingType[] = ["onyomi", "kunyomi"];
    const onyomiOrKunyomi = faker.helpers.arrayElement(readingTypesToAdd);
    const randomIndex = faker.number.int({
      min: 0,
      max: meaningsArrToUpdate.length - 1,
    });
    meaningsArrToUpdate[randomIndex].type = onyomiOrKunyomi;
  }

  return meaningsArrToUpdate;
};

const generateReadingType = (): ReadingType => {
  type WeightedReading = { value: ReadingType; weight: number };
  const weightedReadingTypes: WeightedReading[] = [
    { value: "kunyomi", weight: 5 },
    { value: "onyomi", weight: 6 },
    { value: "nanori", weight: 1 },
  ];
  return faker.helpers.weightedArrayElement(weightedReadingTypes);
};

const ensureMinPrimaryAndAcceptedMeanings = (
  readingsOrMeaningsArr: SubjectMeaning[] | SubjectReading[]
) => {
  const arrToUpdate = [...readingsOrMeaningsArr];
  if (!arrToUpdate.some((meaning) => meaning.primary)) {
    const randomIndex = faker.number.int({
      min: 0,
      max: arrToUpdate.length - 1,
    });
    arrToUpdate[randomIndex].primary = true;
  }

  if (!arrToUpdate.some((meaning) => meaning.accepted_answer)) {
    const randomIndex = faker.number.int({
      min: 0,
      max: arrToUpdate.length - 1,
    });
    arrToUpdate[randomIndex].accepted_answer = true;
  }

  return arrToUpdate;
};

const generateComponentSubjectIds = (): number[] => {
  return getRandomIntArr(1, 5, 1, 100000);
};

const generateVisuallySimilarSubjectIds = (): number[] => {
  return getRandomIntArr(0, 5, 1, 100000);
};

const generateMeaningHint = (subjType: SubjectType): string | null => {
  // I don't think radicals ever have meaning hints, but generating them on rare occasions just in case
  if (subjType === "radical") {
    const hasMeaningHintProbability = faker.number.int({
      min: 0,
      max: 10,
    });
    if (hasMeaningHintProbability > 8) {
      return faker.lorem.paragraph({ min: 1, max: 3 });
    }
    return null;
  }

  return faker.lorem.paragraph({ min: 1, max: 3 });
};

const getReadingsForMockAudio = (
  subjType: SubjectType,
  characters: string | null,
  readings?: SubjectReading[]
): string[] => {
  if (readings) {
    if (subjType === "vocabulary") {
      return readings.map((reading) => reading.reading);
    }
    if (subjType === "kana_vocabulary" && characters) {
      return [characters];
    }
  }

  return [];
};

// TODO: make sure pronunciationsForReading for each reading is unique
const generatePronunciationAudios = (
  readings: string[]
): PronunciationAudio[] => {
  const mockPronunciations: PronunciationAudio[] = [];
  readings.forEach((reading) => {
    const numPronunciations = faker.number.int({
      min: 2,
      max: 5,
    });

    const pronunciationsForReading: PronunciationAudio[] = Array.from(
      { length: numPronunciations },
      () => {
        return {
          url: faker.internet.url(),
          content_type: faker.image.dataUri(),
          metadata: generateAudioMetadata(reading),
        };
      }
    );
    mockPronunciations.push(...pronunciationsForReading);
  });

  return mockPronunciations;
};

// TODO: specify allow specifying accent and gender for function
const generateAudioMetadata = (pronunciation: string): AudioMetadata => {
  const audioAccent = getRandomAccent();

  const mockAudioMetadata: AudioMetadata = {
    // gotta use this binary shit cuz it's what the API returns lol
    gender: faker.person.sex(),
    source_id: faker.number.int(),
    voice_actor_id: getRandomVoiceActorID(),
    pronunciation,
    voice_actor_name: fakerJA.person.firstName(),
    voice_description: `${audioAccent} accent`,
  };

  return mockAudioMetadata;
};

const generatePartsOfSpeech = (): string[] => {
  return faker.helpers.arrayElements(PARTS_OF_SPEECH, { min: 1, max: 4 });
};

const generateContextSentences = (): ContextSentence[] => {
  const numSentences = faker.number.int({
    min: 1,
    max: 4,
  });

  const mockContextSentences: ContextSentence[] = Array.from(
    { length: numSentences },
    () => {
      return {
        en: faker.word.words({ count: { min: 7, max: 15 } }),
        ja: fakerJA.word.words({ count: { min: 5, max: 10 } }),
      };
    }
  );

  return mockContextSentences;
};
