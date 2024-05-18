import { getKanjiReadings } from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import SvgIcon from "../SvgIcon";
import HelpSpan from "../HelpSpan";
import { Kanji, ReadingType, SubjectReading } from "../../types/Subject";
import CheckCircleIcon from "../../images/check-in-circle.svg?react";
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
  align-items: center;

  p {
    margin: 0;
  }
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
                <KanjiReading reading={kanjiReading}>
                  <p>{kanjiReading.reading}</p>
                  {kanjiReading.primary && (
                    <SvgIcon
                      icon={<CheckCircleIcon />}
                      width="1em"
                      height="1em"
                    />
                  )}
                </KanjiReading>
                {index >= 0 && index !== kanjiReadings.length - 1 && ","}
              </ReadingContainer>,
            ])
          : "-"}
      </KanjiReadings>
    </>
  );
}

const PrimaryReadingHelp = styled.div`
  font-size: 0.875rem;
  color: var(--text-color);
  p {
    margin: 0;
  }
`;

const PrimaryReadingHelpContents = (
  <PrimaryReadingHelp>
    <p>
      This is a primary reading for the kanji; it's one of the most likely
      readings to be used when the kanji is present in vocabulary.
    </p>
  </PrimaryReadingHelp>
);

type KanjiReadingProps = {
  reading: SubjectReading;
  children: React.ReactNode;
};

const KanjiReading = ({ reading, children }: KanjiReadingProps) => {
  return reading.primary ? (
    <HelpSpan
      helpPopoverContents={PrimaryReadingHelpContents}
      hidePunctuation={true}
    >
      {children}
    </HelpSpan>
  ) : (
    children
  );
};

export default ReadingsForKanji;
