import {
  BottomSheetSubjectProps,
  ReviewQueueItem,
} from "../../types/ReviewSessionTypes";
import { Subject, Vocabulary } from "../../types/Subject";
import SubjectMeanings from "../SubjectMeanings/SubjectMeanings";
import KanjiUsedInVocab from "../KanjiUsedInVocab/KanjiUsedInVocab";
import PartsOfSpeech from "../PartsOfSpeech/PartsOfSpeech";
import VocabMeaningExplanation from "../VocabMeaningExplanation/VocabMeaningExplanation";
import VocabReadingExplanation from "../VocabReadingExplanation/VocabReadingExplanation";
import VocabReadings from "../VocabReadings/VocabReadings";
import ContextSentences from "../ContextSentences/ContextSentences";
// import SwipeableTabs, { TabsComponentRef } from "../SwipeableTabs";

import {
  BottomSheetContainer,
  BottomSheetContent,
} from "../../styles/BaseStyledComponents";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../../styles/SubjectDetailsStyled";
import styled from "styled-components/macro";
import { TabData } from "../../types/MiscTypes";
import React, { useEffect, useRef, useState } from "react";

const ReadingHeading = styled(SubjDetailSubHeading)`
  margin-bottom: 0;
`;

const VocabReadingSection = styled(SubjDetailSection)`
  margin-bottom: 0;
`;

const getTabsForVocab = (
  commonTabs: TabData[],
  reviewItem: ReviewQueueItem
) => {
  let isKanaVocab = reviewItem.object === "kana_vocabulary";

  let breakdown: TabData = {
    key: "breakdown",
    label: "Breakdown",
    tabContents: (
      <BottomSheetContent>
        <KanjiUsedInVocab
          kanjiIDs={reviewItem.component_subject_ids!}
          displayQuestionTxt={true}
        />
      </BottomSheetContent>
    ),
  };

  let reading = {
    id: "reading",
    label: "Reading",
    tabContents: (
      <BottomSheetContent>
        <VocabReadingSection>
          <ReadingHeading>Vocab Reading</ReadingHeading>
          <VocabReadings
            vocab={reviewItem as Vocabulary}
            hideReadingTxt={true}
          />
        </VocabReadingSection>
        <VocabReadingExplanation vocab={reviewItem as Vocabulary} />
        {reviewItem.context_sentences && (
          <ContextSentences sentences={reviewItem.context_sentences} />
        )}
      </BottomSheetContent>
    ),
  };

  if (isKanaVocab) {
    return [...commonTabs];
  }

  return [breakdown, ...commonTabs, reading];
};

function VocabBottomSheet({
  reviewItem,
  selectedTabKey,
  setSelectedTabKey,
  tabBgColor,
  tabSelectionColor,
}: BottomSheetSubjectProps) {
  // !added
  // const tabsComponentRef = useRef<TabsComponentRef>(null);

  // useEffect(() => {
  //   let reviewType = reviewItem.review_type as React.Key;
  //   // if ((reviewType as React.Key) !== selectedTabKey) {
  //   //   let selected =
  //   //     currentReviewItem.object == "radical" ? "name" : reviewType;
  //   //   setSelectedTabKey(selected as React.Key);
  //   // }
  //   // *testing
  //   console.log("reviewType: ", reviewType);
  //   tabsComponentRef.current &&
  //     console.log(
  //       "tabsComponentRef.current.selectedTabKey: ",
  //       tabsComponentRef.current.selectedTabKeyFromParent
  //     );
  //   // *testing

  //   if (
  //     tabsComponentRef.current &&
  //     reviewType !== tabsComponentRef.current.selectedTabKeyFromParent
  //   ) {
  //     console.log(
  //       `Changing selectedTabKey from ${tabsComponentRef.current.selectedTabKeyFromParent} to ${reviewType}`
  //     );
  //     // tabsComponentRef.current.setSelectedTabKey(reviewType);
  //     tabsComponentRef.current.onSelectionChangeFromParent(reviewType);
  //   }
  // }, [reviewItem.review_type]);

  let [animals, setAnimals] = useState([
    { id: 1, name: "Aardvark" },
    { id: 2, name: "Kangaroo" },
    { id: 3, name: "Snake" },
  ]);
  // !added

  // *testing
  console.log(
    "🚀 ~ file: VocabBottomSheet.tsx:87 ~ selectedTabKey:",
    selectedTabKey
  );
  // *testing
  const tabsInCommon: TabData[] = [
    {
      key: "meaning",
      label: "Meaning",
      tabContents: (
        <BottomSheetContent>
          <SubjectMeanings
            subject={reviewItem as Subject}
            showPrimaryMeaning={true}
          />
          <BottomSheetContainer>
            <PartsOfSpeech vocab={reviewItem as Vocabulary} />
          </BottomSheetContainer>
          <VocabMeaningExplanation vocab={reviewItem as Vocabulary} />
          {reviewItem.object === "kana_vocabulary" &&
            reviewItem.context_sentences && (
              <ContextSentences sentences={reviewItem.context_sentences} />
            )}
        </BottomSheetContent>
      ),
    },
  ];

  let tabs = getTabsForVocab(tabsInCommon, reviewItem);

  return (
    // <SwipeableTabs
    //   ref={tabsComponentRef}
    //   tabs={tabs}
    //   initialTabKey={selectedTabKey}
    //   // selectedTabKey={selectedTabKey}
    //   // setSelectedTabKey={setSelectedTabKey}
    //   tabBgColor={tabBgColor}
    //   tabSelectionColor={tabSelectionColor}
    // />
    // <Tabs selectedKey={selectedTabKey} />
    <></>
  );
}

export default VocabBottomSheet;
