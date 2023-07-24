import { IonRow, IonSkeletonText } from "@ionic/react";
import { Kanji } from "../../types/Subject";
import ReadingsForKanji from "../ReadingsForKanji/ReadingsForKanji";
import { ReadingContainer } from "../../styles/SubjectDetailsStyled";

type KanjiReadingProps = {
  kanji: Kanji;
};

function SubjDetailsKanjiReadings({ kanji }: KanjiReadingProps) {
  return (
    <ReadingContainer>
      <IonRow>
        <ReadingsForKanji kanji={kanji} readingType="onyomi" />
      </IonRow>
      <IonRow>
        <ReadingsForKanji kanji={kanji} readingType="kunyomi" />
      </IonRow>
    </ReadingContainer>
  );
}

export default SubjDetailsKanjiReadings;
