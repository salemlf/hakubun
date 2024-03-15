import { getKanjiReadings } from "../../services/SubjectAndAssignmentService";
import { Kanji } from "../../types/Subject";
import { ReadingsStyle } from "../../styles/SubjectDetailsStyled";
import styled from "styled-components";

const ReadingType = styled.h5`
  font-size: 1rem;
  margin: 10px 0 5px 0;
`;

const KanjiReadings = styled(ReadingsStyle)`
  flex-wrap: wrap;
`;

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
  let readingDisplayName =
    readingType === "onyomi" ? "On'yomi Readings" : "Kun'yomi Readings";

  return (
    <>
      {!hideReadingType && <ReadingType>{readingDisplayName}</ReadingType>}
      <KanjiReadings>
        {kanjiReadings && kanjiReadings.length
          ? kanjiReadings
              .map((kanjiReading: any) => {
                return kanjiReading.reading;
              })
              .join(", ")
          : "-"}
      </KanjiReadings>
    </>
  );
}

export default ReadingsForKanji;
