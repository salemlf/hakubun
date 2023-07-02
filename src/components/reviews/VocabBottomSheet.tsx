import { BottomSheetSubjectProps } from "../../types/ReviewSessionTypes";
import { Subject } from "../../types/Subject";
import { SubjectMeanings } from "../SubjectMeanings";
import { KanjiUsedInVocab } from "../subjects/KanjiUsedInVocab";

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
          <SubjectMeanings
            subject={reviewItem as Subject}
            showPrimaryMeaning={true}
          />
        </>
      )}
      {selectedSegment === "reading" && <p>Nothing here rn</p>}
    </>
  );
};
