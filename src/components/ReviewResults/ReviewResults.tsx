import styled from "styled-components";
import { GroupedReviewItems } from "../../types/AssignmentQueueTypes";
import GroupedReviewSummaryResults from "./GroupedReviewSummaryResults";
import Card from "../Card";

const ReviewCard = styled(Card)`
  display: flex;
`;

export type ReviewResultsProps = {
  groupedReviewItems: GroupedReviewItems;
};

function ReviewResults({ groupedReviewItems }: ReviewResultsProps) {
  let numCorrect = groupedReviewItems.correct.length;
  let numWrong = groupedReviewItems.incorrect.length;

  return (
    <>
      <ReviewCard
        title={`${numCorrect} Answered Correctly`}
        headerBgColor="var(--ion-color-success-dark)"
        headerFontSize="1.25rem"
      >
        <GroupedReviewSummaryResults queueItems={groupedReviewItems.correct} />
      </ReviewCard>
      <ReviewCard
        title={`${numWrong} Answered Incorrectly`}
        headerBgColor="var(--ion-color-danger)"
        headerFontSize="1.25rem"
      >
        <GroupedReviewSummaryResults
          queueItems={groupedReviewItems.incorrect}
        />
      </ReviewCard>
    </>
  );
}

export default ReviewResults;
