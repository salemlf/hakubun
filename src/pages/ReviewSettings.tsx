import { useEffect, useState } from "react";
import useUserSettingsStoreFacade from "../stores/useUserSettingsStore/useUserSettingsStore.facade";
import useUserInfoStoreFacade from "../stores/useUserInfoStore/useUserInfoStore.facade";
import { AssignmentSettingsProvider } from "../contexts/AssignmentSettingsContext";
import { useReviews } from "../hooks/assignments/useReviews";
import AssignmentSettings from "../components/AssignmentSettings/AssignmentSettings";
import LoadingDots from "../components/LoadingDots";
import PageHeader from "../components/PageHeader";
import FloatingHomeButton from "../components/FloatingHomeButton";
import LogoExclamation from "../images/logo-exclamation.svg";
import {
  FixedCenterContainer,
  MainContent,
} from "../styles/BaseStyledComponents";
import styled from "styled-components";

const NoAssignmentsContainer = styled.div`
  width: 100%;
  margin: 20px 5px;
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 16px;
  text-align: center;
  z-index: 5;

  img {
    height: 100%;
  }
`;

const NoReviewsTxt = styled.h2`
  margin: 0 0 25px 0;
  width: 100%;
`;

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

  const { reviewBatchSize, reviewSortOrderOption, reviewBackToBackOption } =
    useUserSettingsStoreFacade();

  return (
    <AssignmentSettingsProvider
      batchSize={reviewBatchSize}
      backToBackChoice={reviewBackToBackOption}
      sortOption={reviewSortOrderOption}
      settingsType="review"
    >
      <PageHeader title="Review Settings" bgColor="var(--wanikani-review)" />
      <MainContent>
        {availForReviewLoading && (
          <FixedCenterContainer>
            <LoadingDots />
          </FixedCenterContainer>
        )}
        {!availForReviewLoading &&
          !availForReviewErr &&
          (!availForReviewData || availForReviewData.length === 0) && (
            <>
              <NoAssignmentsContainer>
                <LogoContainer>
                  <NoReviewsTxt>
                    No reviews available right now, come back later!
                  </NoReviewsTxt>
                  <img
                    src={LogoExclamation}
                    alt="Unhappy crabigator looking upwards"
                  />
                </LogoContainer>
              </NoAssignmentsContainer>
              <FloatingHomeButton />
            </>
          )}
        {!availForReviewLoading && availForReviewErr && (
          <div>{`Error: ${availForReviewErr}`}</div>
        )}
        {!availForReviewLoading &&
          !availForReviewErr &&
          availForReviewData &&
          availForReviewData.length > 0 && (
            <AssignmentSettings assignmentData={availForReviewData} />
          )}
      </MainContent>
    </AssignmentSettingsProvider>
  );
};
