import { useEffect, useState } from "react";
import { IonHeader, IonButtons, IonToolbar } from "@ionic/react";
import { useUserSettingsStore } from "../stores/useUserSettingsStore";
import { useUserInfoStore } from "../stores/useUserInfoStore";
import { useAssignmentsAvailForReview } from "../hooks/useAssignmentsAvailForReview";
import AnimatedPage from "../components/AnimatedPage";
import ShiftBy from "../components/ShiftBy/ShiftBy";
import BackButton from "../components/BackButton/BackButton";
import AssignmentSettings from "../components/AssignmentSettings/AssignmentSettings";
import LoadingDots from "../components/LoadingDots";
import {
  FixedCenterContainer,
  MainContent,
  SettingsTitle,
} from "../styles/BaseStyledComponents";
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
  const userInfo = useUserInfoStore.use.userInfo();
  const [isEnabled, setIsEnabled] = useState(false);
  let currUserLevel = userInfo?.level;

  useEffect(() => {
    if (userInfo && userInfo.level) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [userInfo]);

  const {
    isLoading: availForReviewLoading,
    data: availForReviewData,
    error: availForReviewErr,
  } = useAssignmentsAvailForReview(currUserLevel, isEnabled);

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
      <MainContent>
        {availForReviewLoading && (
          <FixedCenterContainer>
            <LoadingDots />
          </FixedCenterContainer>
        )}
        {!availForReviewLoading && availForReviewErr && (
          <div>{`Error: ${availForReviewErr}`}</div>
        )}
        {!availForReviewLoading && !availForReviewErr && availForReviewData && (
          <AssignmentSettings
            settingsType="review"
            assignmentData={availForReviewData}
            defaultBatchSize={reviewBatchSize}
          />
        )}
      </MainContent>
    </Page>
  );
};
