import { useState } from "react";
import { TabData } from "../../types/MiscTypes";
import { ReviewType } from "../../types/AssignmentQueueTypes";
import { Subject, Vocabulary } from "../../types/Subject";
import ContextSentences from "../ContextSentences";
import KanjiUsedInVocab from "../KanjiUsedInVocab";
import PartsOfSpeech from "../PartsOfSpeech";
import SubjectMeanings from "../SubjectMeanings";
import VocabMeaningExplanation from "../VocabMeaningExplanation";
import VocabReadings from "../VocabReadings";
import VocabReadingExplanation from "../VocabReadingExplanation";
import SwipeableTabs from "../SwipeableTabs";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
  SubjDetailTabContainer,
} from "../../styles/SubjectDetailsStyled";
import { FullWidthColumn } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

const ReadingHeading = styled(SubjDetailSubHeading)`
  margin-bottom: 0;
`;

const VocabReadingSection = styled(SubjDetailSection)`
  margin-bottom: 0;
`;

const PartsOfSpeechContainer = styled(FullWidthColumn)`
  margin-bottom: 15px;
`;

const getTabsForVocab = (vocab: Subject) => {
  const isKanaVocab = vocab.object === "kana_vocabulary";

  const meaningTab: TabData[] = [
    {
      id: "meaning",
      label: "Meaning",
      tabContents: (
        <SubjDetailTabContainer>
          <SubjectMeanings subject={vocab} showPrimaryMeaning={true} />
          <PartsOfSpeechContainer>
            <PartsOfSpeech vocab={vocab as Vocabulary} />
          </PartsOfSpeechContainer>
          <VocabReadings vocab={vocab as Vocabulary} />
          <VocabMeaningExplanation vocab={vocab as Vocabulary} />
          {isKanaVocab && vocab.context_sentences && (
            <ContextSentences sentences={vocab.context_sentences} />
          )}
        </SubjDetailTabContainer>
      ),
    },
  ];

  const breakdownTab: TabData = {
    id: "breakdown",
    label: "Breakdown",
    tabContents: (
      <SubjDetailTabContainer>
        <KanjiUsedInVocab
          kanjiIDs={vocab.component_subject_ids!}
          displayQuestionTxt={true}
          vocabSlug={vocab.slug}
        />
      </SubjDetailTabContainer>
    ),
  };

  const readingTab: TabData = {
    id: "reading",
    label: "Reading",
    tabContents: (
      <SubjDetailTabContainer>
        <VocabReadingSection>
          <ReadingHeading>Vocab Reading</ReadingHeading>
          <VocabReadings vocab={vocab as Vocabulary} hideReadingTxt={true} />
        </VocabReadingSection>
        <VocabReadingExplanation vocab={vocab as Vocabulary} />
        {vocab.context_sentences && (
          <ContextSentences sentences={vocab.context_sentences} />
        )}
      </SubjDetailTabContainer>
    ),
  };

  if (isKanaVocab) {
    return [...meaningTab];
  }

  return [breakdownTab, ...meaningTab, readingTab];
};

type Props = {
  vocab: Subject;
  reviewType: ReviewType;
  scrollToDefault: boolean;
};

function VocabDetailTabs({ vocab, reviewType, scrollToDefault }: Props) {
  const tabData = getTabsForVocab(vocab);
  const defaultTabKey = scrollToDefault
    ? (reviewType as string)
    : tabData[0].id;
  const [selectedTabKey, setSelectedTabKey] = useState<string>(defaultTabKey);

  return (
    <SwipeableTabs
      selectedTabKey={selectedTabKey}
      setSelectedTabKey={setSelectedTabKey}
      tabs={tabData}
      defaultValue={reviewType as string}
      scrollToDefault={scrollToDefault}
    />
  );
}

export default VocabDetailTabs;
