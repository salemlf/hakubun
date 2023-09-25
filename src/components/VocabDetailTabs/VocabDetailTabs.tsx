import { TabData } from "../../types/MiscTypes";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
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
import { useState } from "react";

const ReadingHeading = styled(SubjDetailSubHeading)`
  margin-bottom: 0;
`;

const VocabReadingSection = styled(SubjDetailSection)`
  margin-bottom: 0;
`;

const PartsOfSpeechContainer = styled(FullWidthColumn)`
  margin-bottom: 10px;
`;

const getTabsForVocab = (vocabQueueItem: AssignmentQueueItem) => {
  let isKanaVocab = vocabQueueItem.object === "kana_vocabulary";
  const meaningTab: TabData[] = [
    {
      id: "meaning",
      label: "Meaning",
      tabContents: (
        <SubjDetailTabContainer>
          <SubjectMeanings
            subject={vocabQueueItem as Subject}
            showPrimaryMeaning={true}
          />
          <PartsOfSpeechContainer>
            <PartsOfSpeech vocab={vocabQueueItem as Vocabulary} />
          </PartsOfSpeechContainer>
          <VocabMeaningExplanation vocab={vocabQueueItem as Vocabulary} />
          {isKanaVocab && vocabQueueItem.context_sentences && (
            <ContextSentences sentences={vocabQueueItem.context_sentences} />
          )}
        </SubjDetailTabContainer>
      ),
    },
  ];

  let breakdownTab: TabData = {
    id: "breakdown",
    label: "Breakdown",
    tabContents: (
      <SubjDetailTabContainer>
        <KanjiUsedInVocab
          kanjiIDs={vocabQueueItem.component_subject_ids!}
          displayQuestionTxt={true}
          vocabSlug={vocabQueueItem.slug}
        />
      </SubjDetailTabContainer>
    ),
  };

  let readingTab: TabData = {
    id: "reading",
    label: "Reading",
    tabContents: (
      <SubjDetailTabContainer>
        <VocabReadingSection>
          <ReadingHeading>Vocab Reading</ReadingHeading>
          <VocabReadings
            vocab={vocabQueueItem as Vocabulary}
            hideReadingTxt={true}
          />
        </VocabReadingSection>
        <VocabReadingExplanation vocab={vocabQueueItem as Vocabulary} />
        {vocabQueueItem.context_sentences && (
          <ContextSentences sentences={vocabQueueItem.context_sentences} />
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
  vocab: AssignmentQueueItem;
  scrollToDefault: boolean;
};

function VocabDetailTabs({ vocab, scrollToDefault }: Props) {
  let tabData = getTabsForVocab(vocab);
  const defaultTabKey = scrollToDefault
    ? (vocab.review_type as string)
    : tabData[0].id;
  const [selectedTabKey, setSelectedTabKey] = useState<string>(defaultTabKey);

  return (
    <SwipeableTabs
      selectedTabKey={selectedTabKey}
      setSelectedTabKey={setSelectedTabKey}
      tabs={tabData}
      defaultValue={vocab.review_type as string}
      scrollToDefault={scrollToDefault}
    />
  );
}

export default VocabDetailTabs;
