import { useState } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import AnimatedPage from "../components/AnimatedPage";
import ShiftBy from "../components/ShiftBy";
import BackArrowIcon from "../images/back-arrow.svg";
import styled from "styled-components";
import { useLessons } from "../hooks/useLessons";
import SwipeableTabs from "../components/SwipeableTabs";
import { AssignmentType } from "../types/Assignment";
import AdvancedAssignmentSettings from "../components/AdvancedAssignmentSettings";
import BasicAssignmentSettings from "../components/BasicAssignmentSettings";

const Page = styled(AnimatedPage)`
  background-color: var(--dark-greyish-purple);
`;

const HeaderContainer = styled(IonHeader)`
  background: var(--wanikani-lesson);
  --ion-toolbar-background: var(--wanikani-lesson);
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

const BackButton = styled(Button)`
  margin-left: 5px;
`;

// TODO: hide tab bar on this page
function LessonSettings() {
  const navigate = useNavigate();
  const {
    isLoading: lessonsLoading,
    data: lessonsData,
    error: lessonsErr,
  } = useLessons();

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
                <IonIcon src={BackArrowIcon} />
              </BackButton>
            </IonButtons>
          </ShiftBy>
          <Title>Lesson Settings</Title>
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
              tabSelectionColorRGBA="rgba(0, 0, 0, .8)"
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
                      showMeaning={true}
                      assignmentData={lessonsData}
                    />
                  ),
                },
              ]}
              defaultValue="basic"
              scrollToDefault={false}
            />
            {/* <StartReviewBtn onStartReviewBtnClick={onStartReviewBtnClick} /> */}
          </>
        )}
      </IonContent>
    </Page>
  );
}

export default LessonSettings;
