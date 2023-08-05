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
import { TabData } from "../../types/MiscTypes";
import { BottomSheetContent } from "../../styles/BaseStyledComponents";
import SwipeableTabs from "../SwipeableTabs";

// TODO: add stroke order to radicals segment
function KanjiBottomSheet({
  reviewItem,
  tabBgColor,
  tabSelectionColor,
}: BottomSheetSubjectProps) {
  let reviewTypeStr = reviewItem.review_type as string;
  const tabs: TabData[] = [
    {
      id: "radicals",
      label: "Radicals",
      tabContents: (
        <BottomSheetContent>
          <RadicalCombination
            kanji={reviewItem as Kanji}
            displayQuestionTxt={true}
          />
        </BottomSheetContent>
      ),
    },
    {
      id: "meaning",
      label: "Meaning",
      tabContents: (
        <BottomSheetContent>
          <SubjectMeanings
            subject={reviewItem as Subject}
            showPrimaryMeaning={true}
          />
          <KanjiMeaningMnemonic kanji={reviewItem as Kanji} />
        </BottomSheetContent>
      ),
    },
    {
      id: "reading",
      label: "Reading",
      tabContents: (
        <BottomSheetContent>
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
        </BottomSheetContent>
      ),
    },
  ];

  return (
    <SwipeableTabs
      tabs={tabs}
      defaultValue={reviewTypeStr}
      tabBgColor={tabBgColor}
      tabSelectionColor={tabSelectionColor}
    />
  );
}

export default KanjiBottomSheet;
