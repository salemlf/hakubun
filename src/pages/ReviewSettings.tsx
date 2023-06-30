import { useState, useEffect } from "react";
import {
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonCol,
  IonHeader,
  IonBackButton,
  IonButtons,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import { useAssignmentsAvailForReview } from "../hooks/useAssignmentsAvailForReview";

import { BasicCard } from "../components/cards/BasicCard";
import { BatchSizeOption } from "../components/reviews/BatchSizeOption";
import { AssignmentTypeSelector } from "../components/reviews/AssignmentTypeSelector";
import { StartReviewBtn } from "../components/reviews/StartReviewBtn";

import styled from "styled-components/macro";
import { Assignment, AssignmentType } from "../types/Assignment";
import {
  compareAssignmentsByAvailableDate,
  filterAssignmentsByType,
  getSubjIDsFromAssignments,
} from "../services/SubjectAndAssignmentService";

import {
  useReviewSession,
  createReviewItems,
} from "../contexts/ReviewSessionContext";

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

export const ReviewSettings = () => {
  const { dispatch } = useReviewSession();
  const router = useIonRouter();

  const {
    isLoading: availForReviewLoading,
    data: availForReviewData,
    error: availForReviewErr,
  } = useAssignmentsAvailForReview();

  let initialAssignTypes = [
    "radical" as AssignmentType,
    "kanji" as AssignmentType,
    "vocabulary" as AssignmentType,
    "kana_vocabulary" as AssignmentType,
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

    //TODO: sort by available date ascending as default (oldest to newest), add other sort options
    let sortedToReview = allAssignmentsToReview.sort(
      compareAssignmentsByAvailableDate
    );

    let assignmentBatchToReview = sortedToReview.slice(0, batchSize);
    // *testing
    console.log(
      "🚀 ~ file: Reviews.tsx:112 ~ onButtonClick ~ assignmentBatchToReview:",
      assignmentBatchToReview
    );
    // *testing

    let subjIDs = getSubjIDsFromAssignments(assignmentBatchToReview);
    createReviewItems(assignmentBatchToReview, subjIDs, dispatch);
    router.push("/review/session");
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
