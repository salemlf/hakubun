import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getReadingAudio,
  getReadingAudioFiles,
} from "../../services/AudioService";
import { getVocabReadings } from "../../services/SubjectAndAssignmentService";
import useUserSettingsStoreFacade from "../../stores/useUserSettingsStore/useUserSettingsStore.facade";
import {
  Vocabulary,
  SubjectReading,
  PronunciationAudio,
  Subject,
} from "../../types/Subject";
import { ReadingAudio } from "../../types/AssignmentQueueTypes";
import Button from "../Button/Button";
import SvgIcon from "../SvgIcon";
import SoundIcon from "../../images/sound.svg?react";
import SoundOffIcon from "../../images/sound-off.svg?react";
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
  audioForReading: ReadingAudio;
};

const AudioBtn = ({ audioForReading, reading }: AudioProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioFile = audioForReading.audioFile;

    audioFile.on("end", function () {
      setIsPlaying(false);
    });
  }, []);

  const playAudio = () => {
    setIsPlaying(true);
    audioForReading.audioFile.play();
  };

  return (
    <AudioBtnContainer
      variants={AudioBtnVariants}
      initial="initial"
      animate={isPlaying ? "animate" : "initial"}
    >
      <Btn
        aria-label={`Pronunciation audio for ${reading} reading`}
        onPress={playAudio}
        backgroundColor="var(--ion-color-tertiary)"
        color="black"
      >
        <SvgIcon
          icon={isPlaying ? <SoundIcon /> : <SoundOffIcon />}
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
  const hasReadings = vocab.readings && vocab.readings.length !== 0;
  const readings = hasReadings ? getVocabReadings(vocab.readings!) : undefined;
  const { pronunciationVoice } = useUserSettingsStoreFacade();

  const readingAudioItems = getReadingAudioFiles(vocab as Subject, false);

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
                    readingAudioItems &&
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
