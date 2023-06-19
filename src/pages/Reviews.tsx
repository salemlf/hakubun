import {
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonCol,
  IonHeader,
  IonButton,
} from "@ionic/react";

import { useAssignmentsAvailForReview } from "../hooks/useAssignmentsAvailForReview";
import { BasicCard } from "../components/cards/BasicCard";
import { BatchSizeOption } from "../components/reviews/BatchSizeOption";
import { AssignmentTypeSelector } from "../components/reviews/AssignmentTypeSelector";
import styled from "styled-components/macro";
import { useState } from "react";
import { AssignmentType } from "../types/Assignment";
import { filterAssignmentsByType } from "../services/SubjectAndAssignmentService";

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

const ButtonCol = styled(IonCol)`
  display: flex;
  justify-content: center;
`;

// TODO: hide tab bar on this page
// TODO: change name to review settings
export const Reviews = () => {
  const {
    isLoading: availForReviewLoading,
    data: availForReviewData,
    error: availForReviewErr,
  } = useAssignmentsAvailForReview();

  let initialAssignTypes = [
    "radical" as AssignmentType,
    "kanji" as AssignmentType,
    "vocabulary" as AssignmentType,
  ];
  // TODO: change to use user setting for default batch size once settings are implemented
  let defaultBatchSize = 5;

  const [selectedAssignmentTypes, setSelectedAssignmentTypes] = useState<
    Set<AssignmentType>
  >(new Set(initialAssignTypes));
  const [batchSize, setBatchSize] = useState<number>(defaultBatchSize);

  const onSelectedAssignTypeChange = (
    assignmentTypeUpdated: AssignmentType
  ) => {
    let updatedAssignTypes = selectedAssignmentTypes;

    if (!updatedAssignTypes.has(assignmentTypeUpdated)) {
      updatedAssignTypes.add(assignmentTypeUpdated);
    } else {
      updatedAssignTypes.delete(assignmentTypeUpdated);
    }

    setSelectedAssignmentTypes(updatedAssignTypes);
  };

  const onButtonClick = () => {
    // *testing
    console.log("selectedAssignmentTypes: ", selectedAssignmentTypes);
    // *testing
    let assignmentsToReview = filterAssignmentsByType(
      availForReviewData,
      Array.from(selectedAssignmentTypes)
    );
    // *testing
    console.log(
      "🚀 ~ file: Reviews.tsx:93 ~ onButtonClick ~ assignmentsToReview:",
      assignmentsToReview
    );
    console.log("batchSize: ", batchSize);
    // *testing
    // TODO: restrict to batch size and send assignments to next page
  };

  return (
    <Page>
      <HeaderContainer>
        <Row>
          <Title>Review</Title>
        </Row>
      </HeaderContainer>
      <IonContent>
        <IonGrid>
          {availForReviewLoading && <BasicCard isLoading={true}></BasicCard>}
          {!availForReviewLoading && availForReviewErr && (
            <div>{`Error: ${availForReviewErr}`}</div>
          )}
          {!availForReviewLoading &&
            !availForReviewErr &&
            availForReviewData && (
              <>
                <IonRow>
                  <IonCol>
                    <BasicCard isLoading={false}>
                      <BatchSizeOption
                        availForReview={availForReviewData}
                        defaultSize={defaultBatchSize}
                        onBatchSizeChange={(updatedBatchSize) =>
                          setBatchSize(updatedBatchSize)
                        }
                      />
                      <AssignmentTypeSelector
                        onSelectedAssignTypeChange={onSelectedAssignTypeChange}
                      />
                    </BasicCard>
                  </IonCol>
                </IonRow>
                <IonRow>
                  {/* TODO: add icon to button */}
                  <ButtonCol>
                    <IonButton onClick={onButtonClick}>Begin Review</IonButton>
                  </ButtonCol>
                </IonRow>
              </>
            )}
        </IonGrid>
      </IonContent>
    </Page>
  );
};
