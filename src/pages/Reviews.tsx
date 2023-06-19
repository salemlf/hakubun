import {
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonCol,
  IonHeader,
} from "@ionic/react";

import { useAssignmentsAvailForReview } from "../hooks/useAssignmentsAvailForReview";
import { BasicCard } from "../components/cards/BasicCard";
import { BatchSizeOption } from "../components/reviews/BatchSizeOption";
import { AssignmentTypeSelector } from "../components/reviews/AssignmentTypeSelector";
import styled from "styled-components/macro";

const Page = styled(IonPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);

  ion-select::part(icon) {
    color: white;
    opacity: 1;
  }
`;

const HeaderContainer = styled(IonHeader)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--wanikani-review);

  padding: 10px 0;
  box-shadow: none;
`;

const Row = styled(IonRow)`
  display: flex;
  align-items: center;

  padding-top: var(--ion-padding, 5px);
  padding-bottom: var(--ion-padding, 5px);
`;

const Title = styled.h1`
  text-align: center;
`;

// TODO: hide tab bar on this page
// TODO: add button to start review
// TODO: change name to review settings
export const Reviews = () => {
  const {
    isLoading: availForReviewLoading,
    data: availForReviewData,
    error: availForReviewErr,
  } = useAssignmentsAvailForReview();

  return (
    <Page>
      <HeaderContainer>
        <Row>
          <Title>Review</Title>
        </Row>
      </HeaderContainer>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              {availForReviewLoading && (
                <BasicCard isLoading={true}></BasicCard>
              )}
              {!availForReviewLoading && availForReviewErr && (
                <div>{`Error: ${availForReviewErr}`}</div>
              )}
              {!availForReviewLoading &&
                !availForReviewErr &&
                availForReviewData && (
                  <BasicCard isLoading={false}>
                    <BatchSizeOption availForReview={availForReviewData} />
                    <AssignmentTypeSelector />
                  </BasicCard>
                )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </Page>
  );
};
