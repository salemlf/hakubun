import { getKanjiReadings } from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import { Kanji, ReadingType } from "../../types/Subject";
import { ReadingsStyle } from "../../styles/SubjectDetailsStyled";
import styled from "styled-components";

const ReadingTypeHeading = styled.h5`
  font-size: 1rem;
  margin: 10px 0 5px 0;
`;

const KanjiReadings = styled(ReadingsStyle)`
  flex-wrap: wrap;
`;

type Props = {
  kanji: Kanji;
  readingType: ReadingType;
  hideReadingType?: boolean;
};

function ReadingsForKanji({
  kanji,
  readingType,
  hideReadingType = false,
}: Props) {
  const kanjiReadings = getKanjiReadings(kanji.readings, readingType);
  const readingDisplayName =
    readingType === "onyomi" ? "On'yomi Readings" : "Kun'yomi Readings";

  return (
    <>
      {!hideReadingType && (
        <ReadingTypeHeading>{readingDisplayName}</ReadingTypeHeading>
      )}
      <KanjiReadings>
        {kanjiReadings && kanjiReadings.length
          ? kanjiReadings
              .map((kanjiReading) => {
                return kanjiReading.reading;
              })
              .join(", ")
          : "-"}
      </KanjiReadings>
    </>
  );
}

export default ReadingsForKanji;
