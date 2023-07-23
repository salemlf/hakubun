import { BottomSheetSubjectProps } from "../../types/ReviewSessionTypes";
import { Radical, Subject } from "../../types/Subject";
import { SubjectMeanings } from "../SubjectMeanings";
import { RadicalNameMnemonic } from "../subjects/RadicalNameMnemonic";

function RadicalBottomSheet({
  reviewItem,
  selectedSegment,
}: BottomSheetSubjectProps) {
  return (
    <>
      {selectedSegment === "name" && (
        <>
          <SubjectMeanings
            subject={reviewItem as Subject}
            showPrimaryMeaning={true}
          />
          <RadicalNameMnemonic radical={reviewItem as Radical} />
        </>
      )}
    </>
  );
}

export default RadicalBottomSheet;
