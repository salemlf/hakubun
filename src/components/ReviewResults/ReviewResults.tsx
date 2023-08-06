import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
// import styled from "styled-components/macro";
import styled from "styled-components";

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

// TODO: change to use custom Card component
function ReviewResults() {
  return (
    <IonCard>
      <IncorrectItemsHeader>
        {/* <CardTitle>{numWrong} Answered Incorrectly</CardTitle> */}
      </IncorrectItemsHeader>
      {/* {!reviewSummaryDataLoading ? (
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
    )} */}
    </IonCard>
  );
}

export default ReviewResults;
