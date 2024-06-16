import { useEffect, useState } from "react";
import useUserSettingsStoreFacade from "../../stores/useUserSettingsStore/useUserSettingsStore.facade";
import { getVocabReadings } from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import {
  getReadingAudio,
  getReadingAudioFiles,
} from "../../services/AudioService/AudioService";
import { displayToast } from "../Toast/Toast.service";
import { useSearchWord } from "../../hooks/jotoba/useSearchWord";
import {
  Vocabulary,
  SubjectReading,
  PronunciationAudio,
  Subject,
} from "../../types/Subject";
import { ReadingAudio } from "../../types/AssignmentQueueTypes";
import { PronunciationVoice } from "../../types/UserSettingsTypes";
import { WordSearchResult } from "../../types/Jotoba";
import AudioBtn from "../AudioBtn";
import PitchIllustration, { PitchForReading } from "../PitchIllustration";
import {
  ReadingContainer,
  SubjDetailSubHeading,
  VocabReadingsContainer,
  VocabReadingContainer,
  ReadingTxt,
} from "../../styles/SubjectDetailsStyled";
import styled from "styled-components";

const EnglishComma = styled.span`
  font-family: var(--ion-default-font);
`;

type VocabWithAudio = {
  pronunciationAudioExists: boolean;
  readingAudio: ReadingAudio | null;
  reading: string;
};

const getVocabWithAudioList = (
  readings: SubjectReading[],
  audioItems: ReadingAudio[] | undefined,
  vocab: Vocabulary,
  pronunciationVoice: PronunciationVoice
): VocabWithAudio[] => {
  return readings.map((reading) => {
    return {
      pronunciationAudioExists: vocab.pronunciation_audios.some(
        (audioOption: PronunciationAudio) =>
          audioOption.metadata.pronunciation === reading.reading
      ),
      readingAudio: audioItems
        ? getReadingAudio(audioItems, reading.reading, pronunciationVoice)
        : null,
      reading: reading.reading,
    };
  });
};

type VocabReadingsProps = {
  vocab: Vocabulary;
  subjectReadings: SubjectReading[];
  hideReadingTxt?: boolean;
};

function VocabReadings({
  vocab,
  subjectReadings,
  hideReadingTxt = false,
}: VocabReadingsProps) {
  const { pronunciationVoice } = useUserSettingsStoreFacade();
  // TODO: check if shouldDisplayPitchAccent setting is true
  const [readingPitchInfo, setReadingPitchInfo] = useState<PitchForReading[]>(
    []
  );

  const [isPitchInfoLoading, setIsPitchInfoLoading] = useState(true);
  const readings = getVocabReadings(subjectReadings);
  const readingAudioItems = getReadingAudioFiles(vocab as Subject);

  const { mutateAsync: findWordInfo } = useSearchWord();

  useEffect(() => {
    if (vocab.characters) {
      findWordInfo({ word: vocab.characters })
        .then((searchResult: WordSearchResult) => {
          const wordsWithPitch = searchResult.words.filter(
            (word) => word.pitch !== undefined && word.pitch.length > 0
          );
          const readingsWithPitch: PitchForReading[] = wordsWithPitch.map(
            (word) => {
              return {
                reading: word.reading.kana || "",
                pitch: word.pitch || [],
              };
            }
          );

          setReadingPitchInfo(readingsWithPitch);
          setIsPitchInfoLoading(false);
        })
        .catch((error) => {
          setIsPitchInfoLoading(false);
          displayToast({
            title: `Error Getting Pitch Accent Info`,
            content: `An error occurred while trying to get pitch accent info for ${vocab.characters}. Error: \n${JSON.stringify(error)}`,
            toastType: "error",
            timeout: 10000,
          });
        });
    } else {
      setIsPitchInfoLoading(false);
    }
  }, []);

  const vocabWithAudio = getVocabWithAudioList(
    readings,
    readingAudioItems,
    vocab,
    pronunciationVoice
  );

  return (
    <ReadingContainer>
      {!hideReadingTxt && <SubjDetailSubHeading>Readings</SubjDetailSubHeading>}
      <VocabReadingsContainer>
        {vocabWithAudio.length
          ? vocabWithAudio.map(
              (vocabReading: VocabWithAudio, index: number) => {
                return (
                  <VocabReadingContainer key={`reading_${index}`}>
                    {!isPitchInfoLoading &&
                    readingPitchInfo.find(
                      (pitch) => pitch.reading === vocabReading.reading
                    ) !== undefined ? (
                      <PitchIllustration
                        pitchForReading={
                          readingPitchInfo.find(
                            (pitch) => pitch.reading === vocabReading.reading
                          )!
                        }
                      >
                        {readingAudioItems &&
                        vocab.pronunciation_audios.some(
                          (audioOption: PronunciationAudio) =>
                            audioOption.metadata.pronunciation ===
                            vocabReading.reading
                        )
                          ? vocabReading.readingAudio && (
                              <AudioBtn
                                reading={vocabReading.reading}
                                audioForReading={vocabReading.readingAudio}
                              />
                            )
                          : index !== readings!.length - 1 && (
                              <EnglishComma>, </EnglishComma>
                            )}
                      </PitchIllustration>
                    ) : (
                      <>
                        <ReadingTxt>{vocabReading.reading}</ReadingTxt>
                        {readingAudioItems &&
                        vocab.pronunciation_audios.some(
                          (audioOption: PronunciationAudio) =>
                            audioOption.metadata.pronunciation ===
                            vocabReading.reading
                        )
                          ? vocabReading.readingAudio && (
                              <AudioBtn
                                reading={vocabReading.reading}
                                audioForReading={vocabReading.readingAudio}
                              />
                            )
                          : index !== readings!.length - 1 && (
                              <EnglishComma>, </EnglishComma>
                            )}
                      </>
                    )}
                  </VocabReadingContainer>
                );
              }
            )
          : "-"}
      </VocabReadingsContainer>
    </ReadingContainer>
  );
}

export default VocabReadings;
