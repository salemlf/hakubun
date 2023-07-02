import { BottomSheetSubjectProps } from "../../types/ReviewSessionTypes";
import { Subject, Vocabulary } from "../../types/Subject";
import { SubjectMeanings } from "../SubjectMeanings";
import { KanjiUsedInVocab } from "../subjects/KanjiUsedInVocab";
import { PartsOfSpeech } from "../subject-details/PartsOfSpeech";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../subject-details/SubjectDetailsStyled";

// TODO: add meaning mnemonics
export const VocabBottomSheet = ({
  reviewItem,
  selectedSegment,
}: BottomSheetSubjectProps) => {
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
          <SubjDetailSection>
            <SubjectMeanings
              subject={reviewItem as Subject}
              showPrimaryMeaning={true}
            />
          </SubjDetailSection>
          <SubjDetailSection>
            <SubjDetailSubHeading>Parts of Speech</SubjDetailSubHeading>
            <PartsOfSpeech vocab={reviewItem as Vocabulary} alignLeft={true} />
          </SubjDetailSection>
        </>
      )}
      {selectedSegment === "reading" && <p>Nothing here rn</p>}
    </>
  );
};
