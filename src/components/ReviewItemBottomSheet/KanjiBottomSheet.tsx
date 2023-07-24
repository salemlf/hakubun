import { IonRow } from "@ionic/react";
import { BottomSheetSubjectProps } from "../../types/ReviewSessionTypes";
import { Kanji, Subject } from "../../types/Subject";
import KanjiMeaningMnemonic from "../KanjiMeaningMnemonic/KanjiMeaningMnemonic";
import RadicalCombination from "../RadicalCombination/RadicalCombination";
import SubjectMeanings from "../SubjectMeanings/SubjectMeanings";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../../styles/SubjectDetailsStyled";
import ReadingsForKanji from "../ReadingsForKanji/ReadingsForKanji";
import KanjiReadingMnemonic from "../KanjiReadingMnemonic/KanjiReadingMnemonic";

// TODO: add stroke order to radicals segment
function KanjiBottomSheet({
  reviewItem,
  selectedSegment,
}: BottomSheetSubjectProps) {
  return (
    <>
      {selectedSegment === "radicals" && (
        <RadicalCombination
          kanji={reviewItem as Kanji}
          displayQuestionTxt={true}
        />
      )}
      {selectedSegment === "meaning" && (
        <>
          <SubjectMeanings
            subject={reviewItem as Subject}
            showPrimaryMeaning={true}
          />
          <KanjiMeaningMnemonic kanji={reviewItem as Kanji} />
        </>
      )}
      {selectedSegment === "reading" && (
        <>
          <SubjDetailSection>
            <SubjDetailSubHeading>On'yomi Readings</SubjDetailSubHeading>
            <IonRow>
              <ReadingsForKanji
                kanji={reviewItem as Kanji}
                readingType="onyomi"
                hideReadingType={true}
              />
            </IonRow>
          </SubjDetailSection>
          <SubjDetailSection>
            <SubjDetailSubHeading>Kun'yomi Readings</SubjDetailSubHeading>
            <IonRow>
              <ReadingsForKanji
                kanji={reviewItem as Kanji}
                readingType="kunyomi"
                hideReadingType={true}
              />
            </IonRow>
          </SubjDetailSection>
          <KanjiReadingMnemonic kanji={reviewItem as Kanji} />
        </>
      )}
    </>
  );
}

export default KanjiBottomSheet;
