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

const ReadingContainer = styled.div`
  display: flex;
`;

const readingTypeDisplayNameMap: Record<ReadingType, string> = {
  onyomi: "On'yomi",
  kunyomi: "Kun'yomi",
  nanori: "Nanori",
};

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
  const readingTypeDisplayName = `${readingTypeDisplayNameMap[readingType]} Readings`;

  return (
    <>
      {!hideReadingType && (
        <ReadingTypeHeading>{readingTypeDisplayName}</ReadingTypeHeading>
      )}
      <KanjiReadings>
        {kanjiReadings && kanjiReadings.length
          ? kanjiReadings.map((kanjiReading, index) => [
              <ReadingContainer key={`${kanjiReading.reading}_${index}`}>
                {kanjiReading.reading}
                {index >= 0 && index !== kanjiReadings.length - 1 && ","}
              </ReadingContainer>,
            ])
          : "-"}
      </KanjiReadings>
    </>
  );
}

export default ReadingsForKanji;
