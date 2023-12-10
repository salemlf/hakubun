import { Howl } from "howler";
import { convertToHiragana } from "./AssignmentQueueService";
import { PronunciationAudio, Subject, SubjectReading } from "../types/Subject";
import { PronunciationVoice } from "../types/UserSettingsTypes";
import {
  AssignmentQueueItem,
  ReadingAudio,
} from "../types/AssignmentQueueTypes";

type GroupedByReadingAndActor = {
  [readingAndActor: string]: PronunciationAudio[];
};

export const getAudioUrlByGender = (
  audioArray: PronunciationAudio[],
  gender: string
) => {
  const audio = audioArray.find((audio) => audio.metadata.gender === gender);
  return audio?.url;
};

export const getReadingAudio = (
  audioItems: ReadingAudio[],
  reading: string,
  voice: PronunciationVoice,
  primaryReadingFallback?: string
): ReadingAudio[] => {
  const hiraganaFallback =
    primaryReadingFallback && convertToHiragana(primaryReadingFallback);

  const audioByReading = findAudioByPronunciationTemp(reading, audioItems);

  if (audioByReading.length > 0) {
    return findVoiceInPronunciationAudiosTemp(voice, audioByReading);
  }

  if (primaryReadingFallback) {
    const foundWithPrimary = findAudioByPronunciationTemp(
      primaryReadingFallback,
      audioItems
    );

    if (foundWithPrimary.length > 0) {
      return findVoiceInPronunciationAudiosTemp(voice, foundWithPrimary);
    }

    if (hiraganaFallback) {
      const audioFilesFound = findAudioByPronunciationTemp(
        hiraganaFallback,
        audioItems
      );

      if (audioFilesFound.length > 0) {
        return findVoiceInPronunciationAudiosTemp(voice, audioFilesFound);
      }
    }
  }

  // rn just returning empty array as last fallback, don't think this should ever happen?
  return [];
};

export const findAudioByPronunciationTemp = (
  pronunciation: string,
  readingAudios: ReadingAudio[]
) => {
  return readingAudios.filter(
    (audioOption: ReadingAudio) => audioOption.reading === pronunciation
  );
};

export const findVoiceInPronunciationAudiosTemp = (
  voice: PronunciationVoice,
  audioItems: ReadingAudio[]
): ReadingAudio[] => {
  const exactMatches = audioItems.filter(
    (audioOption: ReadingAudio) =>
      audioOption.gender === voice.details.gender &&
      audioOption.accent === `${voice.details.accent} accent`
  );

  if (exactMatches) {
    return exactMatches;
  }

  const sameGenderAudioBackup = audioItems.filter(
    (audioOption: ReadingAudio) => audioOption.gender === voice.details.gender
  );

  if (sameGenderAudioBackup) {
    return sameGenderAudioBackup;
  }

  const backupMatch = audioItems;
  return backupMatch;
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

export const findVoiceInPronunciationAudios = (
  voice: PronunciationVoice,
  audioItems: PronunciationAudio[]
): PronunciationAudio[] => {
  const exactMatches = audioItems.filter(
    (audioOption: PronunciationAudio) =>
      audioOption.metadata.gender === voice.details.gender &&
      audioOption.metadata.voice_description ===
        `${voice.details.accent} accent`
  );

  if (exactMatches) {
    return exactMatches;
  }

  let sameGenderAudioBackup = audioItems.filter(
    (audioOption: PronunciationAudio) =>
      audioOption.metadata.gender === voice.details.gender
  );

  if (sameGenderAudioBackup) {
    return sameGenderAudioBackup;
  }

  let backupMatch = audioItems;
  return backupMatch;
};

export const createReadingAudioFiles = (
  // assignmentQueueItem: AssignmentQueueItem,
  pronunciationAudios: PronunciationAudio[],
  isKanaVocab: boolean,
  readings?: SubjectReading[]
): ReadingAudio[] => {
  // const pronunciationAudios = assignmentQueueItem.pronunciation_audios!;

  const nonOggAudioItems = pronunciationAudios.filter(
    (audioItem) => audioItem.content_type !== "audio/ogg"
  );

  const mergedByPronunciationAndActor: GroupedByReadingAndActor =
    nonOggAudioItems.reduce((r: any, { metadata, ...rest }) => {
      const { pronunciation, voice_actor_id } = metadata;
      const key = `${pronunciation}-${voice_actor_id}`;
      r[key as keyof object] = r[key as keyof object] || [];
      r[key as keyof object].push({
        metadata,
        ...rest,
      });
      return r;
    }, {});
  // *testing
  console.log(
    "🚀 ~ file: AudioService.ts:171 ~ mergedByPronunciationAndActor ~ mergedByPronunciationAndActor:",
    mergedByPronunciationAndActor
  );
  // *testing

  const groupedByPronunciationAndActor = Object.values(
    mergedByPronunciationAndActor
  );
  // *testing
  console.log(
    "🚀 ~ file: AudioService.ts:169 ~ groupedByPronunciationAndActor:",
    groupedByPronunciationAndActor
  );
  // *testing

  return groupedByPronunciationAndActor.map(
    (pronunciationAudioArr: PronunciationAudio[]) => {
      const sampleFromGroup = pronunciationAudioArr[0];

      let isPrimaryPronunciation: boolean = false;
      if (isKanaVocab) {
        isPrimaryPronunciation = true;
      } else {
        isPrimaryPronunciation =
          sampleFromGroup.metadata.pronunciation ===
          readings?.find((reading: SubjectReading) => reading.primary === true)
            ?.reading;
      }

      const audioSources = pronunciationAudioArr.map(
        (audioItem) => audioItem.url
      );

      const audioFormats = pronunciationAudioArr.map(
        (audioItem) => audioItem.content_type.split("/")[1]
      );
      return {
        reading: sampleFromGroup.metadata.pronunciation,
        isPrimary: isPrimaryPronunciation,
        gender: sampleFromGroup.metadata.gender,
        accent: sampleFromGroup.metadata.voice_description,
        audioFile: new Howl({
          src: [...audioSources],
          format: [...audioFormats],
          preload: true,
          html5: true,
          volume: 1.0,
        }),
      };
    }
  );
};

// convertQueueItemsToSubjects
// export const addAudioFiles = (
//   assignmentQueueItem: AssignmentQueueItem
// ): ReadingAudio[] | undefined => {
export const getReadingAudioFiles = (
  subjOrQueueItem: AssignmentQueueItem | Subject,
  isQueueItem: boolean
): ReadingAudio[] | undefined => {
  const item = isQueueItem
    ? (subjOrQueueItem as AssignmentQueueItem)
    : (subjOrQueueItem as Subject);
  const validReviewType = isQueueItem
    ? (item as AssignmentQueueItem).review_type === "reading"
    : true;
  if (
    (validReviewType &&
      subjOrQueueItem.object === "vocabulary" &&
      subjOrQueueItem.pronunciation_audios) ||
    (subjOrQueueItem.object === "kana_vocabulary" &&
      subjOrQueueItem.pronunciation_audios !== undefined)
  ) {
    const isKanaVocab = subjOrQueueItem.object === "kana_vocabulary";
    const pronunciationAudios = subjOrQueueItem.pronunciation_audios!;
    const readings = subjOrQueueItem.readings;

    return createReadingAudioFiles(pronunciationAudios, isKanaVocab, readings);
  }

  return undefined;
};
