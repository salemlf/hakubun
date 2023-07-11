import {
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { useReviewQueue } from "../../hooks/useReviewQueue";
import {
  getCompletedReviewSessionData,
  getReviewsGroupedByResult,
} from "../../services/ReviewService";
import { FullWidthGrid } from "../styles/BaseStyledComponents";

import styled from "styled-components/macro";

const Page = styled(IonPage)`
  --ion-background-color: var(--light-greyish-purple);
  background-color: var(--light-greyish-purple);
`;

const Title = styled(IonTitle)`
  text-align: center;
  font-size: 2rem;
`;

const Header = styled(IonHeader)`
  --ion-toolbar-background: var(--ion-color-secondary);
  --ion-background-color: var(--ion-color-secondary);
  background-color: var(--ion-color-secondary);
  padding: 30px 0;
  text-align: center;
`;

const CardHeader = styled(IonCardHeader)`
  padding: 20px 15px;
  margin-bottom: 15px;
`;

const CorrectItemsHeader = styled(CardHeader)`
  --ion-toolbar-background: var(--ion-color-tertiary-shade);
  --ion-background-color: var(--ion-color-tertiary-shade);
  background-color: var(--ion-color-tertiary-shade);
`;

const CardTitle = styled(IonCardTitle)`
  font-size: 1.25rem;
`;

const IncorrectItemsHeader = styled(CardHeader)`
  --ion-toolbar-background: var(--ion-color-danger);
  --ion-background-color: var(--ion-color-danger);
  background-color: var(--ion-color-danger);
`;

export const ReviewSummary = () => {
  const { queueDataState } = useReviewQueue();
  let reviewQueue = queueDataState.reviewQueue;
  // *testing
  console.log(
    "🚀 ~ file: ReviewSummary.tsx:7 ~ ReviewSummary ~ reviewQueue:",
    reviewQueue
  );
  // *testing
  let reviewData = getCompletedReviewSessionData(reviewQueue);
  // *testing
  console.log(
    "🚀 ~ file: ReviewSummary.tsx:37 ~ ReviewSummary ~ reviewData:",
    reviewData
  );
  // *testing

  let reviewsByResult = getReviewsGroupedByResult(reviewData);
  // *testing
  console.log(
    "🚀 ~ file: ReviewSummary.tsx:69 ~ ReviewSummary ~ reviewsByResult:",
    reviewsByResult
  );
  // *testing
  let numCorrect = reviewsByResult.correct.length;
  let numWrong = reviewsByResult.incorrect.length;

  let percentageCorrect = Math.ceil(100 * (numCorrect / reviewData.length));
  // *testing

  return (
    <Page>
      <Header>
        <IonToolbar>
          <Title>Review Summary</Title>
          <h2>{percentageCorrect}%</h2>
          <p>Answered Correctly</p>
        </IonToolbar>
      </Header>
      <IonContent className="ion-padding">
        <FullWidthGrid>
          <IonCard>
            <IncorrectItemsHeader>
              <CardTitle>{numCorrect} Answered Incorrectly</CardTitle>
            </IncorrectItemsHeader>
            <IonCardContent>
              <p>Testing</p>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <CorrectItemsHeader>
              <CardTitle>{numWrong} Answered Correctly</CardTitle>
            </CorrectItemsHeader>
            <IonCardContent>
              <p>Testing</p>
            </IonCardContent>
          </IonCard>
        </FullWidthGrid>
      </IonContent>
    </Page>
  );
};
