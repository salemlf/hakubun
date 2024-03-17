import {
  getReadingAudio,
  getReadingAudioFiles,
} from "../../services/AudioService/AudioService";
import useUserSettingsStoreFacade from "../../stores/useUserSettingsStore/useUserSettingsStore.facade";
import { KanaVocabulary, Subject } from "../../types/Subject";
import AudioBtn from "../AudioBtn";
import {
  ReadingContainer,
  ReadingTxt,
  SubjDetailSubHeading,
  VocabReadingContainer,
  VocabReadingsContainer,
} from "../../styles/SubjectDetailsStyled";

type KanaVocabReadingProps = {
  vocab: KanaVocabulary;
};

function KanaVocabReading({ vocab }: KanaVocabReadingProps) {
  const { pronunciationVoice } = useUserSettingsStoreFacade();
  const readingAudioItems = getReadingAudioFiles(vocab as Subject);

  const audioForReading =
    readingAudioItems && vocab.characters
      ? getReadingAudio(readingAudioItems, vocab.characters, pronunciationVoice)
      : null;

  return (
    <ReadingContainer>
      <VocabReadingsContainer>
        <SubjDetailSubHeading>Pronunciation</SubjDetailSubHeading>
        <VocabReadingContainer>
          <ReadingTxt>{vocab.characters}</ReadingTxt>
          {vocab.characters && audioForReading && (
            <AudioBtn
              reading={vocab.characters}
              audioForReading={audioForReading}
            />
          )}
        </VocabReadingContainer>
      </VocabReadingsContainer>
    </ReadingContainer>
  );
}

export default KanaVocabReading;
