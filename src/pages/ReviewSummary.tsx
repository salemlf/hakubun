import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { getReviewsGroupedByResult } from "../services/AssignmentQueueService/AssignmentQueueService";
import { getCompletedAssignmentQueueData } from "../services/AssignmentQueueService/AssignmentQueueService";
import { useQueueStore } from "../stores/useQueueStore/useQueueStore";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import useAssignmentSubmitStoreFacade from "../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import ReviewResults from "../components/ReviewResults";
import ResultsHeader from "../components/ReviewResults/ResultsHeader";
import Card from "../components/Card";
import SvgIcon from "../components/SvgIcon";
import ColorHomeIcon from "../images/home-color.svg?react";
import ReviewsIcon from "../images/reviews.svg?react";
import {
  FloatingButton,
  FloatingButtonContainer,
  FullWidthGridDiv,
  MainContent,
} from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Content = styled(MainContent)`
  padding-bottom: 20px;
`;

const ButtonsContainer = styled(FloatingButtonContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const WarningMsg = styled.p`
  margin: 10px 0;
  color: var(--text-color);
`;

const ErrorsContainer = styled.div`
  padding: 10px;
  background-color: var(--secondary-foreground-color);
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;

  pre {
    white-space: pre-wrap;

    &::selection {
      background-color: var(--ion-color-primary);
      color: black;
    }

    &::-moz-selection {
      background-color: var(--ion-color-primary);
      color: black;
    }
  }

  hr {
    background-color: #000;
  }
`;

const ResultsContainer = styled(FullWidthGridDiv)`
  overflow-y: auto;
`;

const NavButton = styled(FloatingButton)`
  justify-content: center;
`;

const BtnTxt = styled.p`
  margin: 0;
  text-transform: capitalize;
`;

// TODO: make sure to attempt to resubmit reviews that had errors
function ReviewSummary() {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const { scrollY } = useScroll({
    container: contentRef,
  });
  const [showButtons, setShowButtons] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prevScrollY = scrollY.getPrevious();
    latest > prevScrollY ? setShowButtons(true) : setShowButtons(false);
  });

  const { submittedAssignmentQueueItems, submittedAssignmentsWithErrs } =
    useAssignmentSubmitStoreFacade();

  const queueItemsThatHadErrors = submittedAssignmentsWithErrs.map(
    (item) => item.queueItem
  );

  const itemErrors = submittedAssignmentsWithErrs.map((item) => item.error);

  const allSubmitted = [
    ...submittedAssignmentQueueItems,
    ...queueItemsThatHadErrors,
  ];

  const resetQueueStore = useQueueStore((state) => state.resetAll);
  const resetAssignmentQueue = useAssignmentQueueStore(
    (state) => state.resetAll
  );

  useEffect(() => {
    resetQueueStore();
    resetAssignmentQueue();
  }, []);

  // combine queue items so reading and meaning aren't separate anymore
  const completedReviews = getCompletedAssignmentQueueData(allSubmitted);
  const groupedReviewItems = getReviewsGroupedByResult(completedReviews);

  const totalNumSubmitted =
    groupedReviewItems.correct.length + groupedReviewItems.incorrect.length;
  const totalCorrect = groupedReviewItems.correct.length;

  return (
    <>
      <ResultsHeader numCorrect={totalCorrect} numReviews={totalNumSubmitted} />
      <Content ref={contentRef}>
        <ResultsContainer>
          {submittedAssignmentsWithErrs.length > 0 && (
            <Card
              title={`Oh no, looks like we weren't able to submit all your reviews for
            some reason...`}
              headerBgColor="var(--ion-color-danger)"
              headerFontSize="1.25rem"
              headerTextColor="white"
            >
              <WarningMsg>
                {submittedAssignmentsWithErrs.length} review(s) had errors when
                submitting!
              </WarningMsg>
              <ErrorsContainer>
                {submittedAssignmentsWithErrs.map((itemWithErr, idx) => (
                  <Fragment key={itemWithErr.queueItem.assignment_id}>
                    <pre>
                      Error for subject ID {itemWithErr.queueItem.subject_id}:
                      {"\n"}
                      {itemWithErr.error}
                    </pre>
                    {idx >= 0 && idx !== itemErrors.length - 1 && <hr />}
                  </Fragment>
                ))}
              </ErrorsContainer>
            </Card>
          )}
          <ReviewResults groupedReviewItems={groupedReviewItems} />
        </ResultsContainer>
        <AnimatePresence>
          {showButtons && (
            <ButtonsContainer
              distancefrombottom="35px"
              transition={{ type: "spring", delay: 0.5, bounce: 0.25 }}
              initial={{ scale: 0, opacity: 0, x: "-50%" }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <NavButton
                backgroundColor="var(--ion-color-primary)"
                color="black"
                onPress={() =>
                  navigate({ to: "/reviews/settings", replace: true })
                }
              >
                <SvgIcon
                  icon={<ReviewsIcon />}
                  width="1.75em"
                  height="1.75em"
                />
                <BtnTxt>Do More Reviews!</BtnTxt>
              </NavButton>
              <NavButton
                backgroundColor="var(--ion-color-tertiary)"
                color="black"
                onPress={() => navigate({ to: "/", replace: true })}
              >
                <SvgIcon
                  icon={<ColorHomeIcon />}
                  width="1.5em"
                  height="1.5em"
                />
                <BtnTxt>Home</BtnTxt>
              </NavButton>
            </ButtonsContainer>
          )}
        </AnimatePresence>
      </Content>
    </>
  );
}

export default ReviewSummary;
