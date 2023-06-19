import {
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonCol,
  IonHeader,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import { useAssignmentsAvailForReview } from "../hooks/useAssignmentsAvailForReview";
import { Assignment, assignmentBatchSizes } from "../types/Assignment";
import { BasicCard } from "../components/cards/BasicCard";
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

type SettingProps = {
  availForReview: Assignment[];
};

const SettingOptions = ({ availForReview }: SettingProps) => {
  // *testing
  console.log(
    "🚀 ~ file: Reviews.tsx:56 ~ Settings ~ availForReview:",
    availForReview
  );
  // *testing
  let availBatchSizes = assignmentBatchSizes.filter(
    (batchSize) => batchSize <= availForReview.length
  );
  // TODO: select default num for batch

  return (
    <>
      <IonList>
        <IonItem>
          <IonSelect aria-label="batch-size" label="Batch Size">
            {availBatchSizes.map((batchSize: number) => {
              return (
                <IonSelectOption key={`batch_${batchSize}`} value={batchSize}>
                  {batchSize}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
      </IonList>
      <AssignmentTypeSelector />
    </>
  );
};

// TODO: hide tab bar on this page
// TODO: add button to start review
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
                    <SettingOptions availForReview={availForReviewData} />
                  </BasicCard>
                )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </Page>
  );
};
