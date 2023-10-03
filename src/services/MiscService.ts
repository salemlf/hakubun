import { convertToHiragana } from "./AssignmentQueueService";
import {
  ButtonSize,
  SrsLevelName,
  StudyMaterial,
  StudyMaterialPostDataWithID,
} from "../types/MiscTypes";
import { Collection } from "../types/Collection";
import {
  PopoverMessageType,
  PopoverStyles,
} from "../types/AssignmentQueueTypes";
import { PronunciationVoice } from "../types/UserSettingsTypes";
import { PronunciationAudio, Subject } from "../types/Subject";

const createTimeTillStr = (timeTill: number, timeFrame: string) => {
  if (timeTill > 0) {
    return timeTill === 1
      ? `${timeTill} ${timeFrame}`
      : `${timeTill} ${timeFrame}s`;
  }
  return undefined;
};

export const getTimeFromNow = (availableTime: Date | null) => {
  if (availableTime === null) {
    return "N/A";
  }

  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;

  let availDate = new Date(availableTime);
  let rightNow = new Date();
  let timeDiff = availDate.getTime() - rightNow.getTime();

  // TODO: display one decimal point?
  let monthsTill = Math.floor(timeDiff / month);
  let daysTill = Math.floor(timeDiff / day);
  let hrsTill = Math.floor(timeDiff / hour);
  let minsTill = Math.floor(timeDiff / minute);

  return (
    createTimeTillStr(monthsTill, "month") ||
    createTimeTillStr(daysTill, "day") ||
    createTimeTillStr(hrsTill, "hour") ||
    createTimeTillStr(minsTill, "minute") ||
    "Available Now"
  );
};

type SrsLvls = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const srsLevels: { [index: string]: SrsLvls[] } = {
  locked: [-1],
  initiate: [0],
  apprentice: [1, 2, 3, 4],
  guru: [5, 6],
  master: [7],
  enlightened: [8],
  burned: [9],
};

// used when there's no circumstance where undefined/null should be possible
function ensure<T>(
  argument: T | undefined | null,
  message: string = "Value is not allowed to be undefined or null."
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

export const getSrsLvlBySrsName = (key: SrsLevelName) => {
  return srsLevels[key as keyof {}];
};

export const getSrsNameBySrsLvl = (srsNum: number) => {
  return ensure(
    Object.keys(srsLevels).find((key) =>
      srsLevels[key].some((lvl: number) => lvl === srsNum)
    )
  );
};

export const capitalizeWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const flattenData = (data: any, nested: boolean = true) => {
  let iteratingLevel = nested ? data.data : data;

  let flattened = iteratingLevel.map((elem: any) => {
    elem = Object.assign({}, elem, elem.data);
    delete elem.data;
    return elem;
  });

  return flattened;
};

export const flattenCollectionOfOne = (data: Collection) => {
  let flattenedCollection = Object.assign({}, data, data.data);
  let innerDataItem = flattenedCollection.data[0];
  let flattenedInnerData = Object.assign({}, innerDataItem, innerDataItem.data);

  delete flattenedInnerData.data;
  return flattenedInnerData;
};

export const flattenPagesOfData = (data: any) => {
  let flattenedData = data.pages.map((elem: any) => {
    return [...elem.data];
  });

  let flattenedPages = flattenedData.flat(1);
  return flattenedPages;
};

export const flattenSearchResults = (data: any) => {
  let flattenedResults = data.map((elem: any) => {
    const { item } = elem;
    let flattenedSearchResult = {
      ...item,
      ...item.data,
      data_updated_at: item.data.created_at,
    };
    delete flattenedSearchResult.data;

    return flattenedSearchResult;
  });

  return flattenedResults;
};

export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const popoverStyles: { [index: string]: PopoverStyles } = {
  correct: {
    bgColor: "var(--ion-color-tertiary)",
    fontColor: "black",
  },
  incorrect: {
    bgColor: "var(--ion-color-danger)",
    fontColor: "white",
  },
  invalid: {
    bgColor: "var(--ion-color-warning)",
    fontColor: "black",
  },
};

export const getPopoverStyles = (messageType: PopoverMessageType) => {
  return popoverStyles[messageType as keyof {}];
};

export const getAudioUrlByGender = (
  audioArray: PronunciationAudio[],
  gender: string
) => {
  const audio = audioArray.find((audio) => audio.metadata.gender === gender);
  return audio?.url;
};

export const getAudioForReading = (
  audioItems: PronunciationAudio[],
  userAnswer: string,
  voice: PronunciationVoice,
  primaryReadingFallback?: string
) => {
  const hiraganaFallback =
    primaryReadingFallback && convertToHiragana(primaryReadingFallback);

  const audioByReading = findAudioByPronunciation(userAnswer, audioItems);

  if (audioByReading.length > 0) {
    return findVoiceInPronunciationAudio(voice, audioByReading).url;
  }

  if (primaryReadingFallback) {
    const foundWithPrimary = findAudioByPronunciation(
      primaryReadingFallback,
      audioItems
    );

    if (foundWithPrimary.length > 0) {
      return findVoiceInPronunciationAudio(voice, foundWithPrimary).url;
    }

    if (hiraganaFallback) {
      const audioFilesFound = findAudioByPronunciation(
        hiraganaFallback,
        audioItems
      );

      if (audioFilesFound.length > 0) {
        return findVoiceInPronunciationAudio(voice, audioFilesFound).url;
      }
    }
  }

  // rn just returning empty string as last fallback, don't think this should ever happen?
  return "";
};

export const findAudioByPronunciation = (
  pronunciation: string,
  audioItems: PronunciationAudio[]
) => {
  return audioItems.filter(
    (audioOption: PronunciationAudio) =>
      audioOption.metadata.pronunciation === pronunciation
  );
};

export const findVoiceInPronunciationAudio = (
  voice: PronunciationVoice,
  audioItems: PronunciationAudio[]
) => {
  let foundExactMatch = audioItems.find(
    (audioOption: PronunciationAudio) =>
      audioOption.metadata.gender === voice.details.gender &&
      audioOption.metadata.voice_description ===
        `${voice.details.accent} accent`
  );

  if (foundExactMatch) {
    return foundExactMatch;
  }

  let sameGenderAudioBackup = audioItems.find(
    (audioOption: PronunciationAudio) =>
      audioOption.metadata.gender === voice.details.gender
  );

  if (sameGenderAudioBackup) {
    return sameGenderAudioBackup;
  }

  let backupMatch = audioItems[0];
  return backupMatch;
};

export const constructStudyMaterialData = ({
  subject_id,
  meaning_synonyms = [],
  meaning_note = null,
  reading_note = null,
}: StudyMaterialPostDataWithID) => {
  return {
    study_material: {
      subject_id: subject_id,
      meaning_note: meaning_note,
      reading_note: reading_note,
      meaning_synonyms: meaning_synonyms,
    },
  };
};

export const getUpdatedAltMeanings = (
  studyMaterial: StudyMaterial,
  meaning: string,
  action: "add" | "remove"
) => {
  let updatedMeanings;
  if (action == "add") {
    updatedMeanings = [...studyMaterial.meaning_synonyms, meaning];
  } else {
    updatedMeanings = studyMaterial.meaning_synonyms.filter(
      (string) => string !== meaning
    );
  }
  return updatedMeanings;
};

export const getUpdatedNote = (note: string, action: "add" | "remove") => {
  return action == "add" ? note : null;
};

type UpdateStudyMaterialProps = {
  studyMaterial: StudyMaterial;
  action: "add" | "remove";
  meaningToUpdate?: string;
  meaningNoteToUpdate?: string;
  readingNoteToUpdate?: string;
};

export const updateValsInStudyMaterialData = ({
  studyMaterial,
  action,
  meaningToUpdate,
  meaningNoteToUpdate,
  readingNoteToUpdate,
}: UpdateStudyMaterialProps): StudyMaterial => {
  return {
    meaning_synonyms:
      meaningToUpdate !== undefined
        ? getUpdatedAltMeanings(studyMaterial, meaningToUpdate, action)
        : studyMaterial.meaning_synonyms,
    meaning_note:
      meaningNoteToUpdate !== undefined
        ? getUpdatedNote(meaningNoteToUpdate, action)
        : studyMaterial.meaning_note,
    reading_note:
      readingNoteToUpdate !== undefined
        ? getUpdatedNote(readingNoteToUpdate, action)
        : studyMaterial.reading_note,
    created_at: studyMaterial.created_at,
    hidden: studyMaterial.hidden,
    subject_id: studyMaterial.subject_id,
    subject_type: studyMaterial.subject_type,
  };
};

export const findStudyMaterialWithSubjID = (
  studyMaterials: StudyMaterial[],
  subject: Subject
) => {
  return studyMaterials.find(
    (studyMaterial: StudyMaterial) => studyMaterial.subject_id === subject.id
  );
};

type BtnSizeStyles = {
  containerSize: string;
  fontSize: string;
  fontSizeNoDetails: string;
  detailFontSize: string;
};

const btnSizeInfo: { [index: string]: BtnSizeStyles } = {
  sm: {
    containerSize: "3rem",
    fontSize: "1rem",
    fontSizeNoDetails: "1.75rem",
    detailFontSize: ".5rem",
  },
  md: {
    containerSize: "4rem",
    fontSize: "1.25rem",
    fontSizeNoDetails: "2rem",
    detailFontSize: ".7rem",
  },
  lg: {
    containerSize: "5.25rem",
    fontSize: "1.5rem",
    fontSizeNoDetails: "2.25rem",
    detailFontSize: ".8rem",
  },
};

export const getSubjectBtnSize = (size: ButtonSize) => {
  return btnSizeInfo[size as keyof {}];
};

export const getPageIndex = (
  currentPageNum: number,
  updatedPageNum: number,
  numPages: number
) => {
  // Using modulo so it loops back around if we go past the first or last page
  const index = (currentPageNum + (updatedPageNum - currentPageNum)) % numPages;
  return index < 0 ? index + numPages : index;
};
