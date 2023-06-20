import { useState, useEffect } from "react";
import {
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonCol,
  IonHeader,
  IonButton,
  IonBackButton,
  IonButtons,
  IonToolbar,
  IonTitle,
} from "@ionic/react";

import { useTabBarContext } from "../contexts/TabBarContext";
import { useAssignmentsAvailForReview } from "../hooks/useAssignmentsAvailForReview";

import { BasicCard } from "../components/cards/BasicCard";
import { BatchSizeOption } from "../components/reviews/BatchSizeOption";
import { AssignmentTypeSelector } from "../components/reviews/AssignmentTypeSelector";
import { StartReviewBtn } from "../components/reviews/StartReviewBtn";

import styled from "styled-components/macro";
import { Assignment, AssignmentType } from "../types/Assignment";
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
  background: var(--wanikani-review);
  --ion-toolbar-background: var(--wanikani-review);
  padding: 10px 0;
  box-shadow: none;
`;

const Title = styled(IonTitle)`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 90px 1px;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const ButtonCol = styled(IonCol)`
  display: flex;
  justify-content: center;
`;

// TODO: change name to review settings
export const Reviews = () => {
  const { setShowTabBar } = useTabBarContext();
  useEffect(() => {
    setShowTabBar(false);

    return () => {
      setShowTabBar(true);
    };
  });

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

  const onStartReviewBtnClick = () => {
    let allAssignmentsToReview = filterAssignmentsByType(
      availForReviewData,
      Array.from(selectedAssignmentTypes)
    );

    let assignmentsToReview = allAssignmentsToReview.slice(0, batchSize);
    console.log(
      "🚀 ~ file: Reviews.tsx:112 ~ onButtonClick ~ assignmentsToReview:",
      assignmentsToReview
    );

    // TODO: send filtered and batched assignments to next page
  };

  return (
    <Page>
      <HeaderContainer>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <Title>Review</Title>
        </IonToolbar>
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
                        availForReviewData={availForReviewData as Assignment[]}
                        onSelectedAssignTypeChange={onSelectedAssignTypeChange}
                      />
                    </BasicCard>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <StartReviewBtn
                    onStartReviewBtnClick={onStartReviewBtnClick}
                  />
                </IonRow>
              </>
            )}
        </IonGrid>
      </IonContent>
    </Page>
  );
};
