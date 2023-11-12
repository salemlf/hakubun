// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import { motion } from "framer-motion";
import { useAudio } from "../../hooks/useAudio";
import { getAudioForReading } from "../../services/MiscService";
import { getVocabReadings } from "../../services/SubjectAndAssignmentService";
import useUserSettingsStoreFacade from "../../stores/useUserSettingsStore/useUserSettingsStore.facade";
import {
  Vocabulary,
  SubjectReading,
  PronunciationAudio,
} from "../../types/Subject";
import Button from "../Button/Button";
import SoundIcon from "../../images/sound.svg";
import SoundOffIcon from "../../images/sound-off.svg";
import {
  ReadingContainer,
  SubjDetailSubHeading,
  ReadingsStyle,
  JapaneseTxtInline,
} from "../../styles/SubjectDetailsStyled";
import styled from "styled-components";

const Btn = styled(Button)`
  padding: 4px;
  border-radius: 8px;
  width: 100%;
  border: 1px solid black;
`;

const AudioBtnContainer = styled(motion.div)`
  margin: 0;
  margin-left: 5px;
  padding: 0;
`;

const AudioIcon = styled(IonIcon)`
  width: 1em;
  height: 1em;
`;

const AudioBtnVariants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: 1.2,
  },
};

type AudioProps = {
  reading: string;
  url: string;
};

const AudioBtn = ({ url, reading }: AudioProps) => {
  const [playing, toggle] = useAudio(url);

  return (
    <AudioBtnContainer
      variants={AudioBtnVariants}
      initial="initial"
      animate={playing ? "animate" : "initial"}
    >
      <Btn
        aria-label={`Pronunciation audio for ${reading} reading`}
        onPress={toggle}
        backgroundColor="var(--ion-color-tertiary)"
        color="black"
      >
        <AudioIcon icon={playing ? SoundIcon : SoundOffIcon} />
      </Btn>
    </AudioBtnContainer>
  );
};

const VocabReadingContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const VocabReadingsContainer = styled(ReadingsStyle)`
  flex-wrap: wrap;
`;

const ReadingTxt = styled.p`
  margin: 5px 0;
  font-size: 1rem;
  color: var(--text-color);
`;

const EnglishComma = styled.span`
  font-family: var(--ion-default-font);
`;

type VocabReadingProps = {
  vocab: Vocabulary;
  hideReadingTxt?: boolean;
};

// TODO: map reading to the pronunciation audio
function VocabReadings({ vocab, hideReadingTxt = false }: VocabReadingProps) {
  let hasReadings = vocab.readings && vocab.readings.length !== 0;
  let readings = hasReadings ? getVocabReadings(vocab.readings!) : undefined;
  const { pronunciationVoice } = useUserSettingsStoreFacade();

  return hasReadings ? (
    <ReadingContainer>
      {!hideReadingTxt && <SubjDetailSubHeading>Readings</SubjDetailSubHeading>}
      <Row>
        <VocabReadingsContainer>
          {readings && readings.length
            ? readings.map((vocabReading: SubjectReading, index: number) => {
                return (
                  <VocabReadingContainer key={`reading_${index}`}>
                    <ReadingTxt>{vocabReading.reading}</ReadingTxt>
                    {hasReadings &&
                    vocab.pronunciation_audios.some(
                      (audioOption: PronunciationAudio) =>
                        audioOption.metadata.pronunciation ===
                        vocabReading.reading
                    ) ? (
                      <AudioBtn
                        reading={vocabReading.reading}
                        url={getAudioForReading(
                          vocab.pronunciation_audios,
                          vocabReading.reading,
                          pronunciationVoice
                        )}
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
      </Row>
    </ReadingContainer>
  ) : (
    <ReadingContainer>
      <Row>
        <ReadingsStyle>
          <strong>Readings: </strong>
          <JapaneseTxtInline>{vocab.characters}</JapaneseTxtInline>
        </ReadingsStyle>
      </Row>
    </ReadingContainer>
  );
}

export default VocabReadings;
