import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSkeletonText,
} from "@ionic/react";
import styled from "styled-components";
import { GroupedReviewItems } from "../../types/ReviewSessionTypes";
import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import GroupedReviewSummaryResults from "./GroupedReviewSummaryResults";

const CardHeader = styled(IonCardHeader)`
  padding: 12px;
`;

const CorrectItemsHeader = styled(CardHeader)`
  --ion-toolbar-background: var(--ion-color-success-dark);
  --ion-background-color: var(--ion-color-success-dark);
  background-color: var(--ion-color-success-dark);
`;

const CardTitle = styled(IonCardTitle)`
  font-size: 1.25rem;
  --color: white;
  color: white;
`;

const IncorrectItemsHeader = styled(CardHeader)`
  --ion-toolbar-background: var(--ion-color-danger);
  --ion-background-color: var(--ion-color-danger);
  background-color: var(--ion-color-danger);
`;

const CardContent = styled(IonCardContent)`
  --ion-background-color: var(--light-grey);
  background-color: var(--light-grey);
  /* I use !important sparingly, but overriding ionic styles is annoying lol.. */
  padding-top: 15px !important;
  padding-bottom: 15px !important;

  .card-content-md p {
    font-size: unset;
  }
  .card-content-md h1 {
    font-size: unset;
  }
`;

type Props = {
  groupedReviewItems: GroupedReviewItems;
  numWrong: number;
  numCorrect: number;
};

// TODO: change to use custom Card component
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
      <IonCard>
        <IncorrectItemsHeader>
          <CardTitle>{numWrong} Answered Incorrectly</CardTitle>
        </IncorrectItemsHeader>
        {!reviewSummaryDataLoading ? (
          <CardContent>
            {incorrectReviewSubjData && (
              <GroupedReviewSummaryResults subjData={incorrectReviewSubjData} />
            )}
          </CardContent>
        ) : (
          <CardContent>
            <IonSkeletonText
              animated={true}
              style={{ height: "50px" }}
            ></IonSkeletonText>
          </CardContent>
        )}
      </IonCard>
      <IonCard>
        <CorrectItemsHeader>
          <CardTitle>{numCorrect} Answered Correctly</CardTitle>
        </CorrectItemsHeader>
        {!reviewSummaryDataLoading ? (
          <CardContent>
            {correctReviewSubjData && (
              <GroupedReviewSummaryResults subjData={correctReviewSubjData} />
            )}
          </CardContent>
        ) : (
          <CardContent>
            <IonSkeletonText
              animated={true}
              style={{ height: "50px" }}
            ></IonSkeletonText>
          </CardContent>
        )}
      </IonCard>
    </>
  );
}

export default ReviewResults;
