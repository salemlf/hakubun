import { useEffect } from "react";
import { IonIcon, IonRow, IonSkeletonText } from "@ionic/react";
import { Vocabulary } from "../../types/Subject";
import { useState } from "react";

import { getVocabReadings } from "../../services/SubjectAndAssignmentService";
import { Readings, ReadingContainer } from "./SubjectDetailsStyled";
import styled from "styled-components/macro";
import SoundIcon from "../../images/sound.svg";
import { PronunciationAudio } from "../../types/Subject";
import { SubjectReading } from "../../types/Subject";

const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle] as const;
};

type AudioProps = {
  url: string;
};

const AudioBtn = ({ url }: AudioProps) => {
  const [playing, toggle] = useAudio(url);

  return (
    <button onClick={toggle}>
      <IonIcon icon={SoundIcon} />
    </button>
  );
};

const getAudioForReading = (
  audioItems: PronunciationAudio[],
  reading: SubjectReading
) => {
  let audioOptions = audioItems.filter(
    (audioOption: PronunciationAudio) =>
      audioOption.metadata.pronunciation === reading.reading
  );

  // TODO: change so not just getting first audio file, allow selecting based on voice in settings
  return audioOptions[0].url;
};

type VocabReadingProps = {
  vocab: Vocabulary;
};

const VocabReadingContainer = styled.div`
  display: flex;
  gap: 6px;
`;

// TODO: map reading to the pronunciation audio
export const VocabReadings = ({ vocab }: VocabReadingProps) => {
  let hasReadings = vocab.readings && vocab.readings.length !== 0;
  // TODO: refactor this, it's icky
  let readings;
  if (hasReadings) {
    readings = getVocabReadings(vocab.readings!);
    console.log(
      "🚀 ~ file: VocabReadings.tsx:113 ~ VocabReadings ~ readings:",
      readings
    );
  }
  // TODO: test layout with multiple pronunciations
  return hasReadings ? (
    <ReadingContainer>
      <IonRow>
        <Readings>
          <strong>Readings: </strong>
          {readings && readings.length
            ? readings.map((vocabReading: SubjectReading, index: number) => {
                return (
                  <VocabReadingContainer key={`reading_${index}`}>
                    <p>{vocabReading.reading}</p>
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
        </Readings>
      </IonRow>
    </ReadingContainer>
  ) : (
    <ReadingContainer>
      <IonRow>
        <Readings>
          <strong>Readings: </strong>
          {vocab.characters}
        </Readings>
      </IonRow>
    </ReadingContainer>
  );
};
