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

type VocabReadingProps = {
  vocab: Vocabulary;
  subjectReadings: SubjectReading[];
  hideReadingTxt?: boolean;
};

function VocabReadings({
  vocab,
  subjectReadings,
  hideReadingTxt = false,
}: VocabReadingProps) {
  const { pronunciationVoice } = useUserSettingsStoreFacade();
  const readings = getVocabReadings(subjectReadings);
  const readingAudioItems = getReadingAudioFiles(vocab as Subject);

  return (
    <ReadingContainer>
      {!hideReadingTxt && <SubjDetailSubHeading>Readings</SubjDetailSubHeading>}
      <VocabReadingsContainer>
        {readings.length
          ? readings.map((vocabReading: SubjectReading, index: number) => {
              return (
                <VocabReadingContainer key={`reading_${index}`}>
                  <ReadingTxt>{vocabReading.reading}</ReadingTxt>
                  {readingAudioItems &&
                  vocab.pronunciation_audios.some(
                    (audioOption: PronunciationAudio) =>
                      audioOption.metadata.pronunciation ===
                      vocabReading.reading
                  ) ? (
                    <AudioBtn
                      reading={vocabReading.reading}
                      audioForReading={
                        getReadingAudio(
                          readingAudioItems,
                          vocabReading.reading,
                          pronunciationVoice
                        )[0]
                      }
                    />
                  ) : (
                    index !== readings!.length - 1 && (
                      <EnglishComma>, </EnglishComma>
                    )
                  )}
                </VocabReadingContainer>
              );
            })
          : "-"}
      </VocabReadingsContainer>
    </ReadingContainer>
  );
}

export default VocabReadings;
