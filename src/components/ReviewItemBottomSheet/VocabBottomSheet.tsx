import { BottomSheetSubjectProps } from "../../types/ReviewSessionTypes";
import { Subject, Vocabulary } from "../../types/Subject";
import SubjectMeanings from "../SubjectMeanings/SubjectMeanings";
import KanjiUsedInVocab from "../KanjiUsedInVocab/KanjiUsedInVocab";
import PartsOfSpeech from "../PartsOfSpeech/PartsOfSpeech";
import VocabMeaningExplanation from "../VocabMeaningExplanation/VocabMeaningExplanation";
import VocabReadingExplanation from "../VocabReadingExplanation/VocabReadingExplanation";
import VocabReadings from "../VocabReadings/VocabReadings";
import ContextSentences from "../ContextSentences/ContextSentences";

import { BottomSheetContainer } from "../../styles/BaseStyledComponents";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../../styles/SubjectDetailsStyled";
import styled from "styled-components/macro";

const ReadingHeading = styled(SubjDetailSubHeading)`
  margin-bottom: 0;
`;

const VocabReadingSection = styled(SubjDetailSection)`
  margin-bottom: 0;
`;

function VocabBottomSheet({
  reviewItem,
  selectedSegment,
}: BottomSheetSubjectProps) {
  console.log(
    "🚀 ~ file: VocabBottomSheet.tsx:29 ~ selectedSegment:",
    selectedSegment
  );
  let findComponents =
    reviewItem.component_subject_ids &&
    reviewItem.component_subject_ids.length !== 0;

  return (
    <>
      {selectedSegment === "breakdown" && findComponents && (
        <KanjiUsedInVocab
          kanjiIDs={reviewItem.component_subject_ids!}
          displayQuestionTxt={true}
        />
      )}
      {selectedSegment === "meaning" && (
        <>
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
        </>
      )}
      {selectedSegment === "reading" && (
        <>
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
        </>
      )}
    </>
  );
}

export default VocabBottomSheet;
