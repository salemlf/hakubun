import { TabData } from "../../types/MiscTypes";
import { ReviewQueueItem } from "../../types/ReviewSessionTypes";
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

const getTabsForVocab = (vocabQueueItem: ReviewQueueItem) => {
  let isKanaVocab = vocabQueueItem.object === "kana_vocabulary";
  const tabInCommon: TabData[] = [
    {
      id: "meaning",
      label: "Meaning",
      tabContents: (
        <SubjDetailTabContainer>
          <SubjectMeanings
            subject={vocabQueueItem as Subject}
            showPrimaryMeaning={true}
          />
          <FullWidthColumn>
            <PartsOfSpeech vocab={vocabQueueItem as Vocabulary} />
          </FullWidthColumn>
          <VocabMeaningExplanation vocab={vocabQueueItem as Vocabulary} />
          {isKanaVocab && vocabQueueItem.context_sentences && (
            <ContextSentences sentences={vocabQueueItem.context_sentences} />
          )}
        </SubjDetailTabContainer>
      ),
    },
  ];

  let breakdown: TabData = {
    id: "breakdown",
    label: "Breakdown",
    tabContents: (
      <SubjDetailTabContainer>
        <KanjiUsedInVocab
          kanjiIDs={vocabQueueItem.component_subject_ids!}
          displayQuestionTxt={true}
        />
      </SubjDetailTabContainer>
    ),
  };

  let reading: TabData = {
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
    return [...tabInCommon];
  }

  return [breakdown, ...tabInCommon, reading];
};

type Props = {
  vocab: ReviewQueueItem;
  scrollToDefault: boolean;
};

function VocabDetailTabs({ vocab, scrollToDefault }: Props) {
  return (
    <SwipeableTabs
      tabs={getTabsForVocab(vocab)}
      defaultValue={vocab.review_type as string}
      scrollToDefault={scrollToDefault}
    />
  );
}

export default VocabDetailTabs;
