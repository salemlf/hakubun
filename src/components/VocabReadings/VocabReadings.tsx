import { motion } from "framer-motion";
import { useAudio } from "../../hooks/useAudio";
import { getAudioForReading } from "../../services/MiscService/MiscService";
import { getVocabReadings } from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import useUserSettingsStoreFacade from "../../stores/useUserSettingsStore/useUserSettingsStore.facade";
import {
  Vocabulary,
  SubjectReading,
  PronunciationAudio,
} from "../../types/Subject";
import Button from "../Button/Button";
import SvgIcon from "../SvgIcon";
import SoundIcon from "../../images/sound.svg?react";
import SoundOffIcon from "../../images/sound-off.svg?react";
import {
  ReadingContainer,
  SubjDetailSubHeading,
  ReadingsStyle,
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
        <SvgIcon
          icon={playing ? <SoundIcon /> : <SoundOffIcon />}
          width="1em"
          height="1em"
        />
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
  flex-direction: column;
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

// TODO: refactor this, mehhhh rn
function VocabReadings({ vocab, hideReadingTxt = false }: VocabReadingProps) {
  const hasReadings = vocab.readings && vocab.readings.length !== 0;
  const readings = hasReadings ? getVocabReadings(vocab.readings!) : undefined;
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
      <VocabReadingsContainer>
        <SubjDetailSubHeading>Pronunciation</SubjDetailSubHeading>
        <VocabReadingContainer>
          <ReadingTxt>{vocab.characters}</ReadingTxt>
          {vocab.characters && (
            <AudioBtn
              reading={vocab.characters}
              url={getAudioForReading(
                vocab.pronunciation_audios,
                vocab.characters,
                pronunciationVoice
              )}
            />
          )}
        </VocabReadingContainer>
      </VocabReadingsContainer>
    </ReadingContainer>
  );
}

export default VocabReadings;
