import { IonSkeletonText } from "@ionic/react";
import styled from "styled-components";
import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { GroupedReviewItems } from "../../types/AssignmentQueueTypes";
import GroupedReviewSummaryResults from "./GroupedReviewSummaryResults";
import Card from "../Card";

const ReviewCard = styled(Card)`
  display: flex;
`;

type Props = {
  groupedReviewItems: GroupedReviewItems;
  numWrong: number;
  numCorrect: number;
};

function ReviewResults({ groupedReviewItems, numWrong, numCorrect }: Props) {
  return (
    <>
      <ReviewCard
        title={`${numCorrect} Answered Correctly`}
        headerBgColor="var(--ion-color-success-dark)"
      >
        <GroupedReviewSummaryResults queueItems={groupedReviewItems.correct} />
      </ReviewCard>
      <ReviewCard
        title={`${numWrong} Answered Incorrectly`}
        headerBgColor="var(--ion-color-danger)"
      >
        <GroupedReviewSummaryResults
          queueItems={groupedReviewItems.incorrect}
        />
      </ReviewCard>
    </>
  );
}

export default ReviewResults;
