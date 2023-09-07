import { IonContent, IonHeader, IonButtons, IonToolbar } from "@ionic/react";
import { useAssignmentsAvailForReview } from "../hooks/useAssignmentsAvailForReview";
import AnimatedPage from "../components/AnimatedPage";
import ShiftBy from "../components/ShiftBy/ShiftBy";
import BackButton from "../components/BackButton/BackButton";
import styled from "styled-components";
import AssignmentSettings from "../components/AssignmentSettings/AssignmentSettings";
import { SettingsTitle } from "../styles/BaseStyledComponents";
import { useUserSettingsStore } from "../stores/useUserSettingsStore";

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
  const {
    isLoading: availForReviewLoading,
    data: availForReviewData,
    error: availForReviewErr,
  } = useAssignmentsAvailForReview();

  const reviewBatchSize = useUserSettingsStore.use.reviewBatchSize();

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
          <AssignmentSettings
            settingsType="reviews"
            assignmentData={availForReviewData}
            defaultBatchSize={reviewBatchSize}
          />
        )}
      </IonContent>
    </Page>
  );
};
