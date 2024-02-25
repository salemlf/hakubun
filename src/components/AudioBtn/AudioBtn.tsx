import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ReadingAudio } from "../../types/AssignmentQueueTypes";
import Button from "../Button/Button";
import SvgIcon from "../SvgIcon";
import SoundIcon from "../../images/sound.svg?react";
import SoundOffIcon from "../../images/sound-off.svg?react";
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

function AudioBtn({ audioForReading, reading }: AudioProps) {
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
}

export default AudioBtn;
