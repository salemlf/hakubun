import { Kanji, Subject } from "../../types/Subject";
import { ReviewQueueItem } from "../../types/ReviewSessionTypes";
import KanjiMeaningMnemonic from "../KanjiMeaningMnemonic";
import RadicalCombination from "../RadicalCombination";
import SubjectMeanings from "../SubjectMeanings";
import SwipeableTabs from "../SwipeableTabs";
import ReadingsForKanji from "../ReadingsForKanji";
import KanjiReadingMnemonic from "../KanjiReadingMnemonic";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
  SubjDetailTabContainer,
} from "../../styles/SubjectDetailsStyled";
import { FullWidthColumn } from "../../styles/BaseStyledComponents";
import { useState } from "react";

type Props = {
  kanji: ReviewQueueItem;
  scrollToDefault: boolean;
};

function KanjiDetailTabs({ kanji, scrollToDefault }: Props) {
  const [selectedTabKey, setSelectedTabKey] = useState<string>(
    kanji.review_type as string
  );
  return (
    <SwipeableTabs
      selectedTabKey={selectedTabKey}
      setSelectedTabKey={setSelectedTabKey}
      tabs={[
        {
          id: "radicals",
          label: "Radicals",
          tabContents: (
            <SubjDetailTabContainer>
              <RadicalCombination
                kanji={kanji as Kanji}
                displayQuestionTxt={true}
              />
            </SubjDetailTabContainer>
          ),
        },
        {
          id: "meaning",
          label: "Meaning",
          tabContents: (
            <SubjDetailTabContainer>
              <SubjectMeanings
                subject={kanji as Subject}
                showPrimaryMeaning={true}
              />
              <KanjiMeaningMnemonic kanji={kanji as Kanji} />
            </SubjDetailTabContainer>
          ),
        },
        {
          id: "reading",
          label: "Reading",
          tabContents: (
            <SubjDetailTabContainer>
              <SubjDetailSection>
                <SubjDetailSubHeading>On'yomi Readings</SubjDetailSubHeading>
                <FullWidthColumn>
                  <ReadingsForKanji
                    kanji={kanji as Kanji}
                    readingType="onyomi"
                    hideReadingType={true}
                  />
                </FullWidthColumn>
              </SubjDetailSection>
              <SubjDetailSection>
                <SubjDetailSubHeading>Kun'yomi Readings</SubjDetailSubHeading>
                <FullWidthColumn>
                  <ReadingsForKanji
                    kanji={kanji as Kanji}
                    readingType="kunyomi"
                    hideReadingType={true}
                  />
                </FullWidthColumn>
              </SubjDetailSection>
              <KanjiReadingMnemonic kanji={kanji as Kanji} />
            </SubjDetailTabContainer>
          ),
        },
      ]}
      defaultValue={kanji.review_type as string}
      scrollToDefault={scrollToDefault}
    />
  );
}

export default KanjiDetailTabs;
