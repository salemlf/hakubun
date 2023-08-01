import { IonIcon, IonRow, IonSkeletonText } from "@ionic/react";
import SoundIcon from "../../images/sound.svg";
import styled from "styled-components/macro";
import { useAudio } from "../../hooks/useAudio";
import { getAudioForReading } from "../../services/MiscService";
import { getVocabReadings } from "../../services/SubjectAndAssignmentService";
import { Vocabulary, SubjectReading } from "../../types/Subject";
import {
  ReadingContainer,
  SubjDetailSubHeading,
  ReadingsStyle,
} from "../../styles/SubjectDetailsStyled";
import Button from "../Button/Button";

type AudioProps = {
  url: string;
};

// const Btn = styled.button`
//   background-color: transparent;
//   width: 1em;
//   height: 1em;
// `;

const Btn = styled(Button)`
  background-color: transparent;
  width: 1em;
  height: 1em;
`;

const AudioBtn = ({ url }: AudioProps) => {
  const [playing, toggle] = useAudio(url);

  return (
    <Btn onPress={toggle}>
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
  font-size: 1rem;
`;

type VocabReadingProps = {
  vocab: Vocabulary;
  hideReadingTxt?: boolean;
};

// TODO: map reading to the pronunciation audio
function VocabReadings({ vocab, hideReadingTxt = false }: VocabReadingProps) {
  let hasReadings = vocab.readings && vocab.readings.length !== 0;
  let readings = hasReadings ? getVocabReadings(vocab.readings!) : undefined;

  return hasReadings ? (
    <ReadingContainer>
      {!hideReadingTxt && <SubjDetailSubHeading>Readings</SubjDetailSubHeading>}
      <IonRow>
        <ReadingsStyle>
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
}

export default VocabReadings;
