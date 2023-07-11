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
  IonSkeletonText,
} from "@ionic/react";
import { useReviewQueue } from "../../hooks/useReviewQueue";
import {
  getCompletedReviewSessionData,
  getReviewsGroupedByResult,
} from "../../services/ReviewService";
import { FullWidthGrid } from "../styles/BaseStyledComponents";

import styled from "styled-components/macro";
import { useAssignmentsBySubjIDs } from "../../hooks/useAssignmentsBySubjIDs";
import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { SubjectButtonList } from "../SubjectButtonList";
import { SubjNameAndCharacterList } from "../subjects/SubjNameAndCharacterList";

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

export const ReviewSummary = () => {
  const { queueDataState } = useReviewQueue();
  // *testing
  let reviewQueue = queueDataState.reviewQueue;
  // *testing
  console.log(
    "🚀 ~ file: ReviewSummary.tsx:7 ~ ReviewSummary ~ reviewQueue:",
    reviewQueue
  );
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

  let correctSubjIDs = reviewsByResult.correct.map(
    (reviewItem: any) => reviewItem.id
  );
  let incorrectSubjIDs = reviewsByResult.incorrect.map(
    (reviewItem: any) => reviewItem.id
  );

  const {
    isLoading: correctReviewSubjLoading,
    data: correctReviewSubjData,
    error: correctReviewSubjErr,
  } = useSubjectsByIDs(correctSubjIDs);

  const {
    isLoading: correctReviewAssignmentsLoading,
    data: correctReviewAssignmentsData,
    error: correctReviewAssignmentsErr,
  } = useAssignmentsBySubjIDs(correctSubjIDs);

  const {
    isLoading: incorrectReviewSubjLoading,
    data: incorrectReviewSubjData,
    error: incorrectReviewSubjErr,
  } = useSubjectsByIDs(incorrectSubjIDs);

  const {
    isLoading: incorrectReviewAssignmentsLoading,
    data: incorrectReviewAssignmentsData,
    error: incorrectReviewAssignmentsErr,
  } = useAssignmentsBySubjIDs(incorrectSubjIDs);

  let percentageCorrect = Math.ceil(100 * (numCorrect / reviewData.length));
  // *testing

  let reviewSummaryDataLoading =
    correctReviewSubjLoading ||
    correctReviewSubjErr ||
    correctReviewAssignmentsLoading ||
    correctReviewAssignmentsErr ||
    incorrectReviewSubjLoading ||
    incorrectReviewSubjErr ||
    incorrectReviewAssignmentsLoading ||
    incorrectReviewAssignmentsErr;
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
              <CardTitle>{numWrong} Answered Incorrectly</CardTitle>
            </IncorrectItemsHeader>
            {!reviewSummaryDataLoading ? (
              <CardContent>
                <IonRow>
                  <SubjNameAndCharacterList
                    subjList={incorrectReviewSubjData}
                    assignmentList={incorrectReviewAssignmentsData}
                  />
                </IonRow>
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
                <IonRow>
                  <SubjNameAndCharacterList
                    subjList={correctReviewSubjData}
                    assignmentList={correctReviewAssignmentsData}
                  />
                </IonRow>
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
};
