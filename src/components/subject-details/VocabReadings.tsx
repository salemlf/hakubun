import { IonIcon, IonRow, IonSkeletonText } from "@ionic/react";
import { Vocabulary, SubjectReading } from "../../types/Subject";
import { getVocabReadings } from "../../services/SubjectAndAssignmentService";
import { useAudio } from "../../hooks/useAudio";
import { ReadingsStyle, ReadingContainer } from "./SubjectDetailsStyled";
import styled from "styled-components/macro";
import SoundIcon from "../../images/sound.svg";
import { getAudioForReading } from "../../services/MiscService";

type AudioProps = {
  url: string;
};

const Btn = styled.button`
  background-color: transparent;
`;

const AudioBtn = ({ url }: AudioProps) => {
  const [playing, toggle] = useAudio(url);

  return (
    <Btn onClick={toggle}>
      <IonIcon icon={SoundIcon} />
    </Btn>
  );
};

const VocabReadingContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const ReadingTxt = styled.p`
  margin: 5px 0;
`;

type VocabReadingProps = {
  vocab: Vocabulary;
  hideReadingTxt?: boolean;
};

// TODO: map reading to the pronunciation audio
export const VocabReadings = ({
  vocab,
  hideReadingTxt = false,
}: VocabReadingProps) => {
  let hasReadings = vocab.readings && vocab.readings.length !== 0;
  let readings = hasReadings ? getVocabReadings(vocab.readings!) : undefined;

  // TODO: test layout with multiple pronunciations
  return hasReadings ? (
    <ReadingContainer>
      <IonRow>
        <ReadingsStyle>
          {!hideReadingTxt && <strong>Readings: </strong>}
          {readings && readings.length
            ? readings.map((vocabReading: SubjectReading, index: number) => {
                return (
                  <VocabReadingContainer key={`reading_${index}`}>
                    <ReadingTxt>{vocabReading.reading}</ReadingTxt>
                    {hasReadings && (
                      <AudioBtn
                        url={getAudioForReading(
                          vocab.pronunciation_audios,
                          vocabReading
                        )}
                      />
                    )}
                  </VocabReadingContainer>
                );
              })
            : "-"}
        </ReadingsStyle>
      </IonRow>
    </ReadingContainer>
  ) : (
    <ReadingContainer>
      <IonRow>
        <ReadingsStyle>
          <strong>Readings: </strong>
          {vocab.characters}
        </ReadingsStyle>
      </IonRow>
    </ReadingContainer>
  );
};
