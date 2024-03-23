import { useEffect, useState } from "react";
import useUserSettingsStoreFacade from "../stores/useUserSettingsStore/useUserSettingsStore.facade";
import useUserInfoStoreFacade from "../stores/useUserInfoStore/useUserInfoStore.facade";
import { useReviews } from "../hooks/useReviews";
import AssignmentSettings from "../components/AssignmentSettings/AssignmentSettings";
import LoadingDots from "../components/LoadingDots";
import PageHeader from "../components/PageHeader";
import {
  FixedCenterContainer,
  MainContent,
} from "../styles/BaseStyledComponents";

export const ReviewSettings = () => {
  const { userInfo } = useUserInfoStoreFacade();
  const [isEnabled, setIsEnabled] = useState(false);

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
  } = useReviews(isEnabled);

  const { reviewBatchSize, reviewSortOrderOption } =
    useUserSettingsStoreFacade();

  return (
    <>
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
    </>
  );
};
