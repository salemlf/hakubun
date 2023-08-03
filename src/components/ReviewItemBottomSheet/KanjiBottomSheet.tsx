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
// import SwipeableTabs from "../SwipeableTabs";
import { BottomSheetContent } from "../../styles/BaseStyledComponents";

// TODO: add stroke order to radicals segment
function KanjiBottomSheet({
  reviewItem,
  selectedTabKey,
  setSelectedTabKey,
  tabBgColor,
  tabSelectionColor,
}: BottomSheetSubjectProps) {
  const tabs: TabData[] = [
    {
      key: "radicals",
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
      key: "meaning",
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
      key: "reading",
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

  // !added

  return (
    // <SwipeableTabs
    //   tabs={tabs}
    //   initialTabKey={selectedTabKey}
    //   // selectedTabKey={selectedTabKey}
    //   // setSelectedTabKey={setSelectedTabKey}
    //   tabBgColor={tabBgColor}
    //   tabSelectionColor={tabSelectionColor}
    // />
    <></>
  );
}

export default KanjiBottomSheet;
