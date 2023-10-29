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
  // *testing
  console.log(
    "🚀 ~ file: ReviewResults.tsx:58 ~ ReviewResults ~ groupedReviewItems:",
    groupedReviewItems
  );
  // *testing

  let correctSubjIDs = groupedReviewItems.correct.map(
    (reviewItem: any) => reviewItem.id
  );
  let incorrectSubjIDs = groupedReviewItems.incorrect.map(
    (reviewItem: any) => reviewItem.id
  );

  let hasCorrect = correctSubjIDs.length !== 0;
  let hasIncorrect = incorrectSubjIDs.length !== 0;

  const { isLoading: correctReviewSubjLoading, data: correctReviewSubjData } =
    useSubjectsByIDs(correctSubjIDs, hasCorrect);

  const {
    isLoading: incorrectReviewSubjLoading,
    data: incorrectReviewSubjData,
  } = useSubjectsByIDs(incorrectSubjIDs, hasIncorrect);

  let reviewSummaryDataLoading =
    (correctReviewSubjLoading && hasCorrect) ||
    (incorrectReviewSubjLoading && hasIncorrect);

  return (
    <>
      <ReviewCard
        title={`${numCorrect} Answered Correctly`}
        headerBgColor="var(--ion-color-success-dark)"
      >
        {!reviewSummaryDataLoading ? (
          correctReviewSubjData && (
            <GroupedReviewSummaryResults subjData={correctReviewSubjData} />
          )
        ) : (
          <IonSkeletonText
            animated={true}
            style={{ height: "50px" }}
          ></IonSkeletonText>
        )}
      </ReviewCard>
      <ReviewCard
        title={`${numWrong} Answered Incorrectly`}
        headerBgColor="var(--ion-color-danger)"
      >
        {!reviewSummaryDataLoading ? (
          incorrectReviewSubjData && (
            <GroupedReviewSummaryResults subjData={incorrectReviewSubjData} />
          )
        ) : (
          <IonSkeletonText
            animated={true}
            style={{ height: "50px" }}
          ></IonSkeletonText>
        )}
      </ReviewCard>
    </>
  );
}

export default ReviewResults;
