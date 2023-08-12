import { useState } from "react";
import { IonButtons, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import { useNavigate } from "react-router-dom";
import {
  compareAssignmentsByAvailableDate,
  filterAssignmentsByType,
  getSubjIDsFromAssignments,
} from "../services/SubjectAndAssignmentService";
import { useLessons } from "../hooks/useLessons";
import { INITIAL_ASSIGNMENT_TYPES } from "../constants";
import { AssignmentType } from "../types/Assignment";
import AnimatedPage from "../components/AnimatedPage";
import ShiftBy from "../components/ShiftBy";
import SwipeableTabs from "../components/SwipeableTabs";
import AdvancedAssignmentSettings from "../components/AdvancedAssignmentSettings";
import BasicAssignmentSettings from "../components/BasicAssignmentSettings";
import StartSessionButton from "../components/StartSessionButton/StartSessionButton";
import BackButton from "../components/BackButton/BackButton";
import { SettingsTitle } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Page = styled(AnimatedPage)`
  background-color: var(--dark-greyish-purple);
`;

const HeaderContainer = styled(IonHeader)`
  background: var(--wanikani-lesson);
  --ion-toolbar-background: var(--wanikani-lesson);
  padding: 10px 0;
  box-shadow: none;
`;

// TODO: combine common parts of ReviewSettings and LessonSettings into components
function LessonSettings() {
  const navigate = useNavigate();
  const {
    isLoading: lessonsLoading,
    data: lessonsData,
    error: lessonsErr,
  } = useLessons();

  // TODO: change to use user setting for default batch size once settings are implemented
  let defaultBatchSize = 5;
  const [selectedAssignmentTypes, setSelectedAssignmentTypes] = useState<
    Set<AssignmentType>
  >(new Set(INITIAL_ASSIGNMENT_TYPES));
  // !added
  // needs to be string type for selector, so subject IDs will be converted to number on submit
  const [selectedAdvancedSubjIDs, setSelectedAdvancedSubjIDs] = useState<
    string[]
  >([]);
  // !added
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

  const onStartLessonBtnClick = () => {
    let lessonsToChooseFrom = filterAssignmentsByType(
      lessonsData,
      Array.from(selectedAssignmentTypes)
    );

    //TODO: sort by available date ascending as default (oldest to newest), add other sort options
    let sortedLessons = lessonsToChooseFrom.sort(
      compareAssignmentsByAvailableDate
    );

    // TODO: change back, temporarily changing batch size to 2 for testing
    // let assignmentBatchToReview = sortedToReview.slice(0, batchSize);
    let assignmentBatchOfLessons = sortedLessons.slice(0, 1);
    // *testing
    console.log(
      "🚀 ~ file: Reviews.tsx:112 ~ onButtonClick ~ assignmentBatchOfLessons:",
      assignmentBatchOfLessons
    );
    // *testing

    let subjIDs = getSubjIDsFromAssignments(assignmentBatchOfLessons);

    // TODO: pass data to lesson session page once created, use replace: true
    // navigate("/lessons/session");
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
          <SettingsTitle>Lesson Settings</SettingsTitle>
        </IonToolbar>
      </HeaderContainer>
      <IonContent>
        {lessonsLoading && <h1>Loading...</h1>}
        {!lessonsLoading && lessonsErr && <div>{`Error: ${lessonsErr}`}</div>}
        {!lessonsLoading && !lessonsErr && lessonsData && (
          <>
            <SwipeableTabs
              tabBgColor="var(--wanikani-lesson)"
              tabSelectionColor="black"
              roundedContainer={false}
              tabs={[
                {
                  id: "basic",
                  label: "Basic",
                  tabContents: (
                    <BasicAssignmentSettings
                      assignmentData={lessonsData}
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
                      showMeaning={true}
                      assignmentData={lessonsData}
                    />
                  ),
                },
              ]}
              defaultValue="basic"
              scrollToDefault={false}
            />
            <StartSessionButton
              onStartBtnClick={onStartLessonBtnClick}
              buttonType="lessons"
            />
          </>
        )}
      </IonContent>
    </Page>
  );
}

export default LessonSettings;
