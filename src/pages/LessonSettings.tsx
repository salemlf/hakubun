import { IonButtons, IonContent, IonHeader, IonToolbar } from "@ionic/react";
import { useLessons } from "../hooks/useLessons";
import AnimatedPage from "../components/AnimatedPage";
import ShiftBy from "../components/ShiftBy";
import BackButton from "../components/BackButton/BackButton";
import { SettingsTitle } from "../styles/BaseStyledComponents";
import styled from "styled-components";
import AssignmentSettings from "../components/AssignmentSettings";

const Page = styled(AnimatedPage)`
  background-color: var(--dark-greyish-purple);
`;

const HeaderContainer = styled(IonHeader)`
  background: var(--wanikani-lesson);
  --ion-toolbar-background: var(--wanikani-lesson);
  padding: 10px 0;
  box-shadow: none;
`;

function LessonSettings() {
  const {
    isLoading: lessonsLoading,
    data: lessonsData,
    error: lessonsErr,
  } = useLessons();

  // TODO: change to use user setting for default lesson batch size once settings are implemented
  let defaultBatchSize = 1;

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
          <AssignmentSettings
            settingsType="lessons"
            assignmentData={lessonsData}
            defaultBatchSize={defaultBatchSize}
          />
        )}
      </IonContent>
    </Page>
  );
}

export default LessonSettings;
