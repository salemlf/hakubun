import { GroupedReviewItems } from "../../types/AssignmentQueueTypes";
import GroupedReviewSummaryResults from "./GroupedReviewSummaryResults";
import Card from "../Card";

export type ReviewResultsProps = {
  groupedReviewItems: GroupedReviewItems;
};

function ReviewResults({ groupedReviewItems }: ReviewResultsProps) {
  let numCorrect = groupedReviewItems.correct.length;
  let numWrong = groupedReviewItems.incorrect.length;

  return (
    <>
      <Card
        title={`${numCorrect} Answered Correctly`}
        headerBgColor="var(--ion-color-tertiary)"
        headerFontSize="1.25rem"
        headerTextColor="black"
      >
        <GroupedReviewSummaryResults queueItems={groupedReviewItems.correct} />
      </Card>
      <Card
        title={`${numWrong} Answered Incorrectly`}
        headerBgColor="var(--ion-color-danger)"
        headerFontSize="1.25rem"
        headerTextColor="white"
      >
        <GroupedReviewSummaryResults
          queueItems={groupedReviewItems.incorrect}
        />
      </Card>
    </>
  );
}

export default ReviewResults;
