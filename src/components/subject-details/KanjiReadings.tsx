import { IonRow, IonSkeletonText } from "@ionic/react";
import { Kanji } from "../../types/Subject";

import { getKanjiReadings } from "../../services/SubjectAndAssignmentService";
import { Readings, ReadingContainer } from "./SubjectDetailsStyled";

type KanjiReadingProps = {
  kanji: Kanji;
};

export const KanjiReadings = ({ kanji }: KanjiReadingProps) => {
  let onyomiReadings = getKanjiReadings(kanji.readings, "onyomi");
  let kunyomiReadings = getKanjiReadings(kanji.readings, "kunyomi");

  return (
    <ReadingContainer>
      <IonRow>
        <Readings>
          <strong>On'yomi: </strong>
          {onyomiReadings && onyomiReadings.length
            ? onyomiReadings
                .map((onyomiReading: any) => {
                  return onyomiReading.reading;
                })
                .join(", ")
            : "-"}
        </Readings>
      </IonRow>
      <IonRow>
        <Readings>
          <strong>Kun'yomi: </strong>
          {kunyomiReadings && kunyomiReadings.length
            ? kunyomiReadings
                .map((kunyomiReading: any) => {
                  return kunyomiReading.reading;
                })
                .join(", ")
            : "-"}
        </Readings>
      </IonRow>
    </ReadingContainer>
  );
};
