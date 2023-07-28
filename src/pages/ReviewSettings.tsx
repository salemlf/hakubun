import { useState } from "react";
import {
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonHeader,
  IonBackButton,
  IonButtons,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import { Item } from "react-stately";
import {
  compareAssignmentsByAvailableDate,
  filterAssignmentsByType,
  getSubjIDsFromAssignments,
} from "../services/SubjectAndAssignmentService";
import { useAssignmentsAvailForReview } from "../hooks/useAssignmentsAvailForReview";
import { useReviewQueue } from "../hooks/useReviewQueue";
import { Assignment, AssignmentType } from "../types/Assignment";
import BatchSizeOption from "../components/BatchSizeOption/BatchSizeOption";
import AssignmentTypeSelector from "../components/AssignmentTypeSelector/AssignmentTypeSelector";
import StartReviewBtn from "../components/StartReviewBtn/StartReviewBtn";
import Tabs from "../components/Tabs/Tabs";
import Card from "../components/Card/Card";
import AssignmentSelector from "../components/AssignmentSelector/AssignmentSelector";
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
  const { createNewReviewSession } = useReviewQueue();
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

    // TODO: change back, temporarily changing batch size to 2 for testing
    // let assignmentBatchToReview = sortedToReview.slice(0, batchSize);
    let assignmentBatchToReview = sortedToReview.slice(0, 2);
    // *testing
    console.log(
      "🚀 ~ file: Reviews.tsx:112 ~ onButtonClick ~ assignmentBatchToReview:",
      assignmentBatchToReview
    );
    // *testing

    let subjIDs = getSubjIDsFromAssignments(assignmentBatchToReview);

    createNewReviewSession(assignmentBatchToReview, subjIDs);
    router.push("/review/session");
  };

  return (
    <Page>
      <HeaderContainer>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <Title>Review Settings</Title>
        </IonToolbar>
      </HeaderContainer>
      <IonContent>
        <IonGrid>
          {availForReviewLoading && <h1>Loading...</h1>}
          {!availForReviewLoading && availForReviewErr && (
            <div>{`Error: ${availForReviewErr}`}</div>
          )}
          {!availForReviewLoading &&
            !availForReviewErr &&
            availForReviewData && (
              <>
                <Tabs aria-label="History of Ancient Rome">
                  <Item
                    key="basic"
                    title="Basic"
                    aria-label="Basic Review Settings"
                  >
                    <Card>
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
                    </Card>
                  </Item>
                  <Item
                    key="adv"
                    title="Advanced"
                    aria-label="Advanced Review Settings"
                  >
                    <Card>
                      <AssignmentSelector
                        assigmentsReadyToReview={availForReviewData}
                      ></AssignmentSelector>
                      <p>Nothing here rn :p</p>
                    </Card>
                  </Item>
                </Tabs>
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
