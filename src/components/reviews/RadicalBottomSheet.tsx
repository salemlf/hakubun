import { BottomSheetSubjectProps } from "../../types/ReviewSessionTypes";
import { Subject } from "../../types/Subject";
import { SubjectMeanings } from "../SubjectMeanings";

// TODO: add meaning mnemonics
export const RadicalBottomSheet = ({
  reviewItem,
  selectedSegment,
}: BottomSheetSubjectProps) => {
  return (
    <>
      {selectedSegment === "meaning" && (
        <>
          <SubjectMeanings
            subject={reviewItem as Subject}
            showPrimaryMeaning={true}
          />
        </>
      )}
    </>
  );
};
