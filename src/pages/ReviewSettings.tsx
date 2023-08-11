import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonButtons,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import { useNavigate } from "react-router-dom";
import {
  compareAssignmentsByAvailableDate,
  filterAssignmentsByType,
  getSubjIDsFromAssignments,
} from "../services/SubjectAndAssignmentService";
import { useAssignmentsAvailForReview } from "../hooks/useAssignmentsAvailForReview";
import { useReviewQueue } from "../hooks/useReviewQueue";
import { AssignmentType } from "../types/Assignment";
import StartReviewBtn from "../components/StartReviewBtn/StartReviewBtn";
import SwipeableTabs from "../components/SwipeableTabs/SwipeableTabs";
import BasicAssignmentSettings from "../components/BasicAssignmentSettings/BasicAssignmentSettings";
import AdvancedAssignmentSettings from "../components/AdvancedAssignmentSettings/AdvancedAssignmentSettings";
import AnimatedPage from "../components/AnimatedPage";
import Button from "../components/Button/Button";
import BackArrowIcon from "../images/back-arrow.svg";
import ShiftBy from "../components/ShiftBy/ShiftBy";
import { SettingsTitle } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Page = styled(AnimatedPage)`
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

const BackButton = styled(Button)`
  margin-left: 5px;
  padding: 8px;
  border-radius: 10px;
`;

const BackIcon = styled(IonIcon)`
  width: 1.5em;
  height: 1.5em;
`;

// TODO: change so using react router to pass data to next page instead of context
export const ReviewSettings = () => {
  const { createNewReviewSession } = useReviewQueue();
  const navigate = useNavigate();

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

    createNewReviewSession(assignmentBatchToReview, subjIDs);
    // TODO: pass data to next page instead of caching in context?
    navigate("/reviews/session");
  };

  return (
    <Page>
      <HeaderContainer>
        <IonToolbar>
          <ShiftBy x={10}>
            <IonButtons slot="start">
              <BackButton
                backgroundColor="var(--darkest-purple)"
                onPress={() => navigate("/home")}
              >
                <BackIcon src={BackArrowIcon} />
              </BackButton>
            </IonButtons>
          </ShiftBy>
          <SettingsTitle>Review Settings</SettingsTitle>
        </IonToolbar>
      </HeaderContainer>
      <IonContent>
        {availForReviewLoading && <h1>Loading...</h1>}
        {!availForReviewLoading && availForReviewErr && (
          <div>{`Error: ${availForReviewErr}`}</div>
        )}
        {!availForReviewLoading && !availForReviewErr && availForReviewData && (
          <>
            <SwipeableTabs
              tabBgColor="var(--wanikani-review)"
              tabSelectionColor="black"
              tabSelectionColorRGBA="rgba(0, 0, 0, .8)"
              roundedContainer={false}
              tabs={[
                {
                  id: "basic",
                  label: "Basic",
                  tabContents: (
                    <BasicAssignmentSettings
                      assignmentData={availForReviewData}
                      defaultBatchSize={defaultBatchSize}
                      setBatchSize={setBatchSize}
                      onSelectedAssignTypeChange={onSelectedAssignTypeChange}
                    />
                  ),
                },
                {
                  id: "advanced",
                  label: "Advanced",
                  tabContents: (
                    <AdvancedAssignmentSettings
                      showMeaning={false}
                      assignmentData={availForReviewData}
                    />
                  ),
                },
              ]}
              defaultValue="basic"
              scrollToDefault={false}
            />
            <StartReviewBtn onStartReviewBtnClick={onStartReviewBtnClick} />
          </>
        )}
      </IonContent>
    </Page>
  );
};
