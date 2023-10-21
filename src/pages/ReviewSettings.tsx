import { useEffect, useState } from "react";
import { useUserSettingsStore } from "../stores/useUserSettingsStore";
import { useUserInfoStore } from "../stores/useUserInfoStore";
import { useAssignmentsAvailForReview } from "../hooks/useAssignmentsAvailForReview";
import AnimatedPage from "../components/AnimatedPage";
import AssignmentSettings from "../components/AssignmentSettings/AssignmentSettings";
import LoadingDots from "../components/LoadingDots";
import PageHeader from "../components/PageHeader";
import {
  FixedCenterContainer,
  MainContent,
} from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Page = styled(AnimatedPage)`
  background-color: var(--dark-greyish-purple);

  ion-select::part(icon) {
    color: white;
    opacity: 1;
  }
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
  const reviewSortOrderOption =
    useUserSettingsStore.use.reviewSortOrderOption();

  return (
    <Page>
      <PageHeader title="Review Settings" bgColor="var(--wanikani-review)" />
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
            defaultSortOrder={reviewSortOrderOption}
          />
        )}
      </MainContent>
    </Page>
  );
};
