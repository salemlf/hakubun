import { IonRow, IonSkeletonText } from "@ionic/react";
import { Kanji } from "../../types/Subject";
import { ReadingsForKanji } from "../subjects/ReadingsForKanji";
import { ReadingContainer } from "./SubjectDetailsStyled";

type KanjiReadingProps = {
  kanji: Kanji;
};

export const SubjDetailsKanjiReadings = ({ kanji }: KanjiReadingProps) => {
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
};
