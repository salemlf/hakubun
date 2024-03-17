import { getVocabReadings } from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import {
  getReadingAudio,
  getReadingAudioFiles,
} from "../../services/AudioService/AudioService";
import useUserSettingsStoreFacade from "../../stores/useUserSettingsStore/useUserSettingsStore.facade";
import {
  Vocabulary,
  SubjectReading,
  PronunciationAudio,
  Subject,
} from "../../types/Subject";
import { ReadingAudio } from "../../types/AssignmentQueueTypes";
import { PronunciationVoice } from "../../types/UserSettingsTypes";
import AudioBtn from "../AudioBtn";
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
  const readings = getVocabReadings(subjectReadings);
  const readingAudioItems = getReadingAudioFiles(vocab as Subject);

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
