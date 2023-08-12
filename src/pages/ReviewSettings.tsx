import { useState } from "react";
import { IonContent, IonHeader, IonButtons, IonToolbar } from "@ionic/react";
import { useNavigate } from "react-router-dom";
import {
  compareAssignmentsByAvailableDate,
  filterAssignmentsByType,
  getSubjIDsFromAssignments,
} from "../services/SubjectAndAssignmentService";
import { useAssignmentsAvailForReview } from "../hooks/useAssignmentsAvailForReview";
import { INITIAL_ASSIGNMENT_TYPES } from "../constants";
import { Assignment, AssignmentType } from "../types/Assignment";
import { AssignmentBatch } from "../types/MiscTypes";
import StartSessionButton from "../components/StartSessionButton/StartSessionButton";
import SwipeableTabs from "../components/SwipeableTabs/SwipeableTabs";
import BasicAssignmentSettings from "../components/BasicAssignmentSettings/BasicAssignmentSettings";
import AdvancedAssignmentSettings from "../components/AdvancedAssignmentSettings/AdvancedAssignmentSettings";
import AnimatedPage from "../components/AnimatedPage";
import ShiftBy from "../components/ShiftBy/ShiftBy";
import BackButton from "../components/BackButton/BackButton";
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

export const ReviewSettings = () => {
  const navigate = useNavigate();
  const {
    isLoading: availForReviewLoading,
    data: availForReviewData,
    error: availForReviewErr,
  } = useAssignmentsAvailForReview();

  // needs to be string type for selector, so subject IDs will be converted to number on submit
  const [selectedAdvancedSubjIDs, setSelectedAdvancedSubjIDs] = useState<
    string[]
  >([]);

  // TODO: change to use user setting for default batch size once settings are implemented
  let defaultBatchSize = 5;
  const [selectedAssignmentTypes, setSelectedAssignmentTypes] = useState<
    Set<AssignmentType>
  >(new Set(INITIAL_ASSIGNMENT_TYPES));
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

  const submitWithAdvancedSettings = (): AssignmentBatch => {
    let assignmentBatch = availForReviewData.filter(
      (assignment: Assignment) => {
        return selectedAdvancedSubjIDs.includes(
          assignment.subject_id.toString()
        );
      }
    );

    let subjIDs = selectedAdvancedSubjIDs.map((subjID) => parseInt(subjID));
    return {
      assignmentBatch,
      subjIDs,
    };
  };

  const submitWithBasicSettings = (): AssignmentBatch => {
    let allAssignmentsToReview = filterAssignmentsByType(
      availForReviewData,
      Array.from(selectedAssignmentTypes)
    );

    //TODO: sort by available date ascending as default (oldest to newest), add other sort options
    let sortedToReview = allAssignmentsToReview.sort(
      compareAssignmentsByAvailableDate
    );

    let assignmentBatch = sortedToReview.slice(0, batchSize);
    let subjIDs = getSubjIDsFromAssignments(assignmentBatch);

    return {
      assignmentBatch,
      subjIDs,
    };
  };

  const onStartReviewBtnClick = () => {
    let reviewSessionData =
      selectedAdvancedSubjIDs.length === 0
        ? submitWithBasicSettings()
        : submitWithAdvancedSettings();

    navigate("/reviews/session", { state: reviewSessionData, replace: true });
  };

  return (
    <Page>
      <HeaderContainer>
        <IonToolbar>
          <ShiftBy x={10}>
            <IonButtons slot="start">
              <BackButton />
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
                      selectedAdvancedSubjIDs={selectedAdvancedSubjIDs}
                      setSelectedAdvancedSubjIDs={setSelectedAdvancedSubjIDs}
                      showMeaning={false}
                      assignmentData={availForReviewData}
                    />
                  ),
                },
              ]}
              defaultValue="basic"
              scrollToDefault={false}
            />
            <StartSessionButton
              onStartBtnClick={onStartReviewBtnClick}
              buttonType="reviews"
            />
          </>
        )}
      </IonContent>
    </Page>
  );
};
