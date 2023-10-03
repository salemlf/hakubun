import { Kanji } from "../../types/Subject";
import ReadingsForKanji from "../ReadingsForKanji/ReadingsForKanji";

type KanjiReadingProps = {
  kanji: Kanji;
};

function SubjDetailsKanjiReadings({ kanji }: KanjiReadingProps) {
  return (
    <>
      <ReadingsForKanji kanji={kanji} readingType="onyomi" />
      <ReadingsForKanji kanji={kanji} readingType="kunyomi" />
    </>
  );
}

export default SubjDetailsKanjiReadings;
