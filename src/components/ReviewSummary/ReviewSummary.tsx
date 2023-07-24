import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useReviewQueue } from "../../hooks/useReviewQueue";
import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import {
  getCompletedReviewSessionData,
  getReviewsGroupedByResult,
} from "../../services/ReviewService";
import GroupedReviewSummaryResults from "./GroupedReviewSummaryResults";
import { FullWidthGrid } from "../../styles/BaseStyledComponents";
import styled from "styled-components/macro";

const Page = styled(IonPage)`
  --ion-background-color: var(--light-greyish-purple);
  background-color: var(--light-greyish-purple);
`;

const Title = styled(IonTitle)`
  text-align: center;
  font-size: 1.75rem;
`;

const Percentage = styled.h2`
  font-size: 2rem;
`;

const Header = styled(IonHeader)`
  --ion-toolbar-background: var(--ion-color-secondary);
  --ion-background-color: var(--ion-color-secondary);
  background-color: var(--ion-color-secondary);
  padding: 18px 0;
  text-align: center;
`;

const CardHeader = styled(IonCardHeader)`
  padding: 12px;
`;

const CorrectItemsHeader = styled(CardHeader)`
  --ion-toolbar-background: var(--ion-color-tertiary-shade);
  --ion-background-color: var(--ion-color-tertiary-shade);
  background-color: var(--ion-color-tertiary-shade);
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

function ReviewSummary() {
  const { queueDataState } = useReviewQueue();
  let reviewQueue = queueDataState.reviewQueue;
  // *testing
  console.log(
    "🚀 ~ file: ReviewSummary.tsx:7 ~ ReviewSummary ~ reviewQueue:",
    reviewQueue
  );
  // *testing
  let reviewData = getCompletedReviewSessionData(reviewQueue);
  let reviewsByResult = getReviewsGroupedByResult(reviewData);
  let numCorrect = reviewsByResult.correct.length;
  let numWrong = reviewsByResult.incorrect.length;
  let percentageCorrect = Math.ceil(100 * (numCorrect / reviewData.length));

  let correctSubjIDs = reviewsByResult.correct.map(
    (reviewItem: any) => reviewItem.id
  );
  let incorrectSubjIDs = reviewsByResult.incorrect.map(
    (reviewItem: any) => reviewItem.id
  );

  let hasCorrect = correctSubjIDs.length !== 0;
  let hasIncorrect = incorrectSubjIDs.length !== 0;

  const {
    isLoading: correctReviewSubjLoading,
    data: correctReviewSubjData,
    error: correctReviewSubjErr,
  } = useSubjectsByIDs(correctSubjIDs, hasCorrect);

  const {
    isLoading: incorrectReviewSubjLoading,
    data: incorrectReviewSubjData,
    error: incorrectReviewSubjErr,
  } = useSubjectsByIDs(incorrectSubjIDs, hasIncorrect);

  let reviewSummaryDataLoading =
    (correctReviewSubjLoading && hasCorrect) ||
    (incorrectReviewSubjLoading && hasIncorrect);

  return (
    <Page>
      <Header>
        <IonToolbar>
          <Title>Review Summary</Title>
          <Percentage>{percentageCorrect}%</Percentage>
          <p>Answered Correctly</p>
        </IonToolbar>
      </Header>
      <IonContent className="ion-padding">
        <FullWidthGrid>
          <IonCard>
            <IncorrectItemsHeader>
              <CardTitle>{numWrong} Answered Incorrectly</CardTitle>
            </IncorrectItemsHeader>
            {!reviewSummaryDataLoading ? (
              <CardContent>
                {incorrectReviewSubjData && (
                  <GroupedReviewSummaryResults
                    subjData={incorrectReviewSubjData}
                  />
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
                  <GroupedReviewSummaryResults
                    subjData={correctReviewSubjData}
                  />
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
        </FullWidthGrid>
      </IonContent>
    </Page>
  );
}

export default ReviewSummary;
