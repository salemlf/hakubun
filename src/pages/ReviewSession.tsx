import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import useQueueStoreFacade from "../stores/useQueueStore/useQueueStore.facade";
import useAssignmentQueueStoreFacade from "../stores/useAssignmentQueueStore/useAssignmentQueueStore.facade";
import {
  createReviewPostData,
  getCompletedAssignmentQueueData,
} from "../services/AssignmentQueueService/AssignmentQueueService";
import { useCreateReview } from "../hooks/assignments/useCreateReview";
import { useSubmittedQueueUpdate } from "../hooks/assignments/useSubmittedQueueUpdate";
import {
  AssignmentQueueItem,
  AssignmentSubmitInfo,
} from "../types/AssignmentQueueTypes";
import { PreFlattenedAssignment } from "../types/Assignment";
import QueueHeader from "../components/QueueHeader/QueueHeader";
import AssignmentQueueCards from "../components/AssignmentQueueCards/AssignmentQueueCards";
import KeyboardShortcuts from "../components/KeyboardShortcuts";
import LeaveSessionPrompt from "../components/LeaveSessionPrompt";
import FinishFlagIcon from "../images/finish-flag.svg";
import { MainContent } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Content = styled(MainContent)`
  height: 100svh;
  display: grid;
  grid-template-rows: auto auto;
  align-content: space-between;
`;

const WrapUpFlagContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
  touch-action: none;
  z-index: 12;
  width: 100%;
  background-color: var(--dark-greyish-purple-overlay);

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 0 16px;
  text-align: center;

  img {
    height: 100%;
  }
`;

const FlagAndTxtContainer = styled(motion.div)`
  padding-top: 12vh;
`;

const WrappingUpTxt = styled.h4`
  width: 100%;
  font-size: 1.5rem;
  color: white;
`;

const animationDuration = 1.5;
const exitDuration = 0.5;

const finishFlagBgVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
};

const flagImgAndTxtVariants = {
  visible: {
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: animationDuration,
    },
  },
  hideBelow: {
    scale: 0,
    y: "100%",
    transition: {
      type: "spring",
      duration: exitDuration,
    },
  },

  hideAbove: {
    scale: 0,
    x: 0,
    y: "-100%",
    duration: 0.1,
  },
};

const AlertDialogDescription = styled.span`
  margin: 0;
  line-height: 1.75;
`;

const Description = () => {
  return (
    <AlertDialogDescription>
      <strong>
        Ending the session will remove any progress you've made this session.
      </strong>
      <br />
      To finish the reviews you've already started, you can use <em>
        Wrap Up
      </em>{" "}
      instead!
    </AlertDialogDescription>
  );
};

// TODO: redirect to home if user somehow ends up on this screen without data passed
function ReviewSession() {
  const navigate = useNavigate();
  const { resetAll: resetQueueStore } = useQueueStoreFacade();
  const {
    resetAll: resetAssignmentQueue,
    assignmentQueue,
    currQueueIndex,
    updateAssignmentQueueData,
  } = useAssignmentQueueStoreFacade();

  const updateSubmitted = useSubmittedQueueUpdate();

  const { mutateAsync: createReviewsAsync } = useCreateReview();

  const bgControls = useAnimation();
  const flgImgAndTxtControls = useAnimation();

  useEffect(() => {
    if (assignmentQueue.length === 0) {
      // TODO: redirect to home page, shouldn't be here with no reviews!
    }
  }, []);

  const endReviewSession = () => {
    resetQueueStore();
    resetAssignmentQueue();
  };

  const wrapUpReviewSession = () => {
    const reviewedItems = assignmentQueue.filter((item) => {
      return (
        item.is_reviewed === true ||
        assignmentQueue.some((otherItem) => {
          return (
            otherItem.assignment_id === item.assignment_id &&
            otherItem.is_reviewed === true &&
            otherItem.itemID !== item.itemID
          );
        }) ||
        assignmentQueue.indexOf(item) === currQueueIndex ||
        assignmentQueue.some((otherItem) => {
          return (
            otherItem.assignment_id === item.assignment_id &&
            assignmentQueue.indexOf(otherItem) === currQueueIndex
          );
        })
      );
    });

    updateAssignmentQueueData(reviewedItems);
    playFinishFlagAnimation();
  };

  const playFinishFlagAnimation = async () => {
    console.log("playFinishFlagAnimation called!");

    // animating in
    await bgControls.start("visible");
    await flgImgAndTxtControls.start("visible");
    // animating out and hiding above again
    await flgImgAndTxtControls.start("hideBelow");
    await flgImgAndTxtControls.start("hideAbove");
    await bgControls.start("hidden");
  };

  // TODO: add to submit store and just use data from that on summary pages
  const submitAndRedirect = async (queueData: AssignmentQueueItem[]) => {
    const reviewInfo = await submitReviewBatch(queueData);
    updateSubmitted(reviewInfo);
    navigate("/reviews/summary", { replace: true });
  };

  const submitReviewBatch = (queueData: AssignmentQueueItem[]) => {
    const reviewData = getCompletedAssignmentQueueData(queueData);
    // *testing
    console.log(
      "🚀 ~ file: ReviewSession.tsx:224 ~ submitBatch ~ reviewData:",
      reviewData
    );
    // *testing
    const reviewPostData = createReviewPostData(reviewData);

    // TODO: change to actually catch errors
    const promises = reviewPostData.map(function (reviewItem) {
      return createReviewsAsync({
        reviewSessionData: reviewItem,
      })
        .then(function (results) {
          return results?.resources_updated.assignment;
        })
        .catch((err) => {
          // *testing
          console.log("🚀 ~ file: ReviewSession.tsx:96 ~ promises ~ err:", err);
          // *testing
        });
    });

    return Promise.all(promises).then(function (results) {
      // *testing
      console.log(results);
      // *testing
      const unableToUpdate: AssignmentQueueItem[] = [];
      const reviewResponses: PreFlattenedAssignment[] = [];

      results.forEach((response, index) => {
        if (response === undefined) {
          unableToUpdate.push(reviewData[index]);
        } else {
          reviewResponses.push(response);
        }
      });

      const reviewInfo: AssignmentSubmitInfo = {
        assignmentData: reviewData,
        submitResponses: reviewResponses,
        errors: unableToUpdate,
      };

      return reviewInfo;
    });
  };

  return (
    <>
      <LeaveSessionPrompt
        modalID="end-review-session-alert-modal"
        title="End Review Session?"
        confirmText="End Session"
        description={<Description />}
        showAddtlAction={true}
        onAddtlActionClick={wrapUpReviewSession}
        onConfirmClick={endReviewSession}
      />
      <QueueHeader />
      <Content data-testid="review-session-content">
        {assignmentQueue.length !== 0 && (
          <AssignmentQueueCards
            submitItems={submitAndRedirect}
            submitBatch={submitReviewBatch}
            updateSubmitted={updateSubmitted}
          />
        )}
        <WrapUpFlagContainer
          variants={finishFlagBgVariants}
          animate={bgControls}
          initial="hidden"
        >
          <FlagAndTxtContainer
            variants={flagImgAndTxtVariants}
            animate={flgImgAndTxtControls}
            initial="hideAbove"
          >
            <img title="Checkered Flag" src={FinishFlagIcon} />
            <WrappingUpTxt>Wrapping Up!</WrappingUpTxt>
          </FlagAndTxtContainer>
        </WrapUpFlagContainer>
        <KeyboardShortcuts />
      </Content>
    </>
  );
}

export default ReviewSession;
