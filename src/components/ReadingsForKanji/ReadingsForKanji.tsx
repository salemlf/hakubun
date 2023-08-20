import { getKanjiReadings } from "../../services/SubjectAndAssignmentService";
import { Kanji } from "../../types/Subject";
import { ReadingsStyle } from "../../styles/SubjectDetailsStyled";

type Props = {
  kanji: Kanji;
  readingType: "onyomi" | "kunyomi";
  hideReadingType?: boolean;
};

// TODO: sort readings with primary first
function ReadingsForKanji({
  kanji,
  readingType,
  hideReadingType = false,
}: Props) {
  let kanjiReadings = getKanjiReadings(kanji.readings, readingType);
  let readingDisplayName = readingType === "onyomi" ? "On'yomi" : "Kun'yomi";

  return (
    <ReadingsStyle>
      {!hideReadingType && <strong>{readingDisplayName}: </strong>}
      {kanjiReadings && kanjiReadings.length
        ? kanjiReadings
            .map((kanjiReading: any) => {
              return kanjiReading.reading;
            })
            .join(", ")
        : "-"}
    </ReadingsStyle>
  );
}

export default ReadingsForKanji;
