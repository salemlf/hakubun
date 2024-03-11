import {
  getReadingAudio,
  getReadingAudioFiles,
} from "../../services/AudioService/AudioService";
import useUserSettingsStoreFacade from "../../stores/useUserSettingsStore/useUserSettingsStore.facade";
import AudioBtn from "../AudioBtn";
import {
  ReadingContainer,
  ReadingTxt,
  SubjDetailSubHeading,
  VocabReadingContainer,
  VocabReadingsContainer,
} from "../../styles/SubjectDetailsStyled";
import { KanaVocabulary, Subject } from "../../types/Subject";

type KanaVocabReadingProps = {
  vocab: KanaVocabulary;
};

function KanaVocabReading({ vocab }: KanaVocabReadingProps) {
  const { pronunciationVoice } = useUserSettingsStoreFacade();
  const readingAudioItems = getReadingAudioFiles(vocab as Subject);

  return (
    <ReadingContainer>
      <VocabReadingsContainer>
        <SubjDetailSubHeading>Pronunciation</SubjDetailSubHeading>
        <VocabReadingContainer>
          <ReadingTxt>{vocab.characters}</ReadingTxt>
          {readingAudioItems && vocab.characters && (
            <AudioBtn
              reading={vocab.characters}
              audioForReading={
                getReadingAudio(
                  readingAudioItems,
                  vocab.characters,
                  pronunciationVoice
                )[0]
              }
            />
          )}
        </VocabReadingContainer>
      </VocabReadingsContainer>
    </ReadingContainer>
  );
}

export default KanaVocabReading;
