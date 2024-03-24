import { useState } from "react";
import { Kanji, Subject } from "../../types/Subject";
import { IonSkeletonText } from "@ionic/react";
import { ReviewType } from "../../types/AssignmentQueueTypes";
import { useSubjectsByIDs } from "../../hooks/subjects/useSubjectsByIDs";
import KanjiMeaningMnemonic from "../KanjiMeaningMnemonic";
import RadicalCombination from "../RadicalCombination";
import SubjectMeanings from "../SubjectMeanings";
import SwipeableTabs from "../SwipeableTabs";
import ReadingsForKanji from "../ReadingsForKanji";
import KanjiReadingMnemonic from "../KanjiReadingMnemonic";
import SubjectWideBtnList from "../SubjectWideBtnList";
import SvgIcon from "../SvgIcon";
import MagnifyingGlassIcon from "../../images/magnifying-glass-color.svg?react";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
  SubjDetailTabContainer,
} from "../../styles/SubjectDetailsStyled";
import {
  FullWidthColumn,
  SvgIconHeadingContainer,
} from "../../styles/BaseStyledComponents";
import styled from "styled-components";

const FoundInHeadingContainer = styled(SvgIconHeadingContainer)`
  margin-bottom: 10px;
`;

type Props = {
  kanji: Subject;
  reviewType: ReviewType;
  scrollToDefault: boolean;
};

function KanjiDetailTabs({ kanji, reviewType, scrollToDefault }: Props) {
  const defaultTabKey = scrollToDefault ? (reviewType as string) : "radicals";

  const [selectedTabKey, setSelectedTabKey] = useState<string>(defaultTabKey);
  let findVocab =
    kanji.amalgamation_subject_ids &&
    kanji.amalgamation_subject_ids.length !== 0;

  let kanjiAmalgamationIDs = kanji.amalgamation_subject_ids
    ? kanji.amalgamation_subject_ids
    : [];

  const {
    isLoading: vocabFoundSubjLoading,
    data: vocabFoundSubjData,
    error: vocabFoundSubjErr,
  } = useSubjectsByIDs(kanjiAmalgamationIDs, findVocab, true);

  if (vocabFoundSubjLoading) {
    return (
      <div className="ion-padding">
        <IonSkeletonText animated={true}></IonSkeletonText>
        <IonSkeletonText animated={true}></IonSkeletonText>
      </div>
    );
  }

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
              <SubjectMeanings subject={kanji} showPrimaryMeaning={true} />
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
        {
          id: "examples",
          label: "Examples",
          tabContents: (
            <SubjDetailTabContainer>
              <SubjDetailSection>
                <FoundInHeadingContainer>
                  <SvgIcon
                    icon={<MagnifyingGlassIcon />}
                    width="1.5em"
                    height="1.5em"
                  />
                  <SubjDetailSubHeading>
                    Found in Vocabulary
                  </SubjDetailSubHeading>
                </FoundInHeadingContainer>
                <p>
                  Here's a glimpse of some of the vocabulary you'll be learning
                  in the future that utilize the kanji:
                </p>
                {vocabFoundSubjLoading ? (
                  <IonSkeletonText animated={true}></IonSkeletonText>
                ) : (
                  findVocab && (
                    <SubjectWideBtnList subjList={vocabFoundSubjData} />
                  )
                )}
              </SubjDetailSection>
            </SubjDetailTabContainer>
          ),
        },
      ]}
      defaultValue={reviewType as string}
      scrollToDefault={scrollToDefault}
    />
  );
}

export default KanjiDetailTabs;
