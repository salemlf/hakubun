import { Howl } from "howler";
import { convertToHiragana } from "../AssignmentQueueService/AssignmentQueueService";
import {
  PronunciationAudio,
  Subject,
  SubjectReading,
} from "../../types/Subject";
import { PronunciationVoice } from "../../types/UserSettingsTypes";
import { ReadingAudio } from "../../types/AssignmentQueueTypes";

type AudioByPronunciationAndActor = {
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

  const audioByReading = findAudioByPronunciation(reading, audioItems);

  if (audioByReading.length > 0) {
    return findVoiceInPronunciationAudios(voice, audioByReading);
  }

  if (primaryReadingFallback) {
    const foundWithPrimary = findAudioByPronunciation(
      primaryReadingFallback,
      audioItems
    );

    if (foundWithPrimary.length > 0) {
      return findVoiceInPronunciationAudios(voice, foundWithPrimary);
    }

    if (hiraganaFallback) {
      const audioFilesFound = findAudioByPronunciation(
        hiraganaFallback,
        audioItems
      );

      if (audioFilesFound.length > 0) {
        return findVoiceInPronunciationAudios(voice, audioFilesFound);
      }
    }
  }

  // rn just returning empty array as last fallback, don't think this should ever happen?
  return [];
};

export const findAudioByPronunciation = (
  pronunciation: string,
  readingAudios: ReadingAudio[]
) => {
  return readingAudios.filter(
    (audioOption: ReadingAudio) => audioOption.reading === pronunciation
  );
};

export const findVoiceInPronunciationAudios = (
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

export const createReadingAudioFiles = (
  pronunciationAudios: PronunciationAudio[],
  isKanaVocab: boolean,
  readings?: SubjectReading[]
): ReadingAudio[] => {
  const nonOggAudioItems = pronunciationAudios.filter(
    (audioItem) => audioItem.content_type !== "audio/ogg"
  );

  const mergedByPronunciationAndActor: AudioByPronunciationAndActor =
    nonOggAudioItems.reduce(
      (audioGroup: AudioByPronunciationAndActor, { metadata, ...rest }) => {
        const { pronunciation, voice_actor_id } = metadata;
        const key = `${pronunciation}-${voice_actor_id}`;
        audioGroup[key as keyof AudioByPronunciationAndActor] =
          audioGroup[key as keyof AudioByPronunciationAndActor] || [];
        audioGroup[key as keyof AudioByPronunciationAndActor].push({
          metadata,
          ...rest,
        });
        return audioGroup;
      },
      {}
    );
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
          preload: false,
          html5: true,
          volume: 1.0,
        }),
      };
    }
  );
};

export const getReadingAudioFiles = (
  subject: Subject
): ReadingAudio[] | undefined => {
  const shouldAddAudio =
    (subject.object === "vocabulary" && subject.pronunciation_audios) ||
    (subject.object === "kana_vocabulary" &&
      subject.pronunciation_audios !== undefined);

  if (shouldAddAudio) {
    const isKanaVocab = subject.object === "kana_vocabulary";
    const pronunciationAudios = subject.pronunciation_audios!;
    const readings = subject.readings;

    return createReadingAudioFiles(pronunciationAudios, isKanaVocab, readings);
  }

  return undefined;
};
