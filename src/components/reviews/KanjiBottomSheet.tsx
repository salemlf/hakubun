import { IonRow } from "@ionic/react";
import { BottomSheetSubjectProps } from "../../types/ReviewSessionTypes";
import { Kanji, Subject } from "../../types/Subject";
import { KanjiMeaningMnemonic } from "../KanjiMeaningMnemonic";
import { RadicalCombination } from "../RadicalCombination";
import { SubjectMeanings } from "../SubjectMeanings";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../subject-details/SubjectDetailsStyled";
import { ReadingsForKanji } from "../subjects/ReadingsForKanji";
import { KanjiReadingMnemonic } from "../subjects/KanjiReadingMnemonic";

// TODO: add stroke order to radicals segment
export const KanjiBottomSheet = ({
  reviewItem,
  selectedSegment,
}: BottomSheetSubjectProps) => {
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
};
