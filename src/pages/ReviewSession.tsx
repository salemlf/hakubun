import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// TODO: instead add a module declaration file for react-router-prompt
// @ts-ignore: Could not find a declaration file for module
import ReactRouterPrompt from "react-router-prompt";
import { motion, useAnimation } from "framer-motion";
import { useQueueStore } from "../stores/useQueueStore";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore";
import {
  blockUserLeavingPage,
  createReviewPostData,
  getCompletedAssignmentQueueData,
} from "../services/AssignmentQueueService";
import { useCreateReview } from "../hooks/useCreateReview";
import { AssignmentQueueItem } from "../types/AssignmentQueueTypes";
import { PreFlattenedAssignment } from "../types/Assignment";
import QueueHeader from "../components/QueueHeader/QueueHeader";
import AssignmentQueueCards from "../components/AssignmentQueueCards/AssignmentQueueCards";
import AnimatedPage from "../components/AnimatedPage";
import AlertDialog from "../components/AlertDialog";
import KeyboardShortcuts from "../components/KeyboardShortcuts";
import FinishFlagIcon from "../images/finish-flag.svg";
import { MainContent } from "../styles/BaseStyledComponents";
import styled from "styled-components";

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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 16px;
  text-align: center;

  img {
    height: 200px;
  }
`;

const WrappingUpTxt = styled.h4`
  width: 100%;
  font-size: 1.5rem;
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
      bounce: 0.4,
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

const Page = styled(AnimatedPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);

  ion-select::part(icon) {
    color: white;
    opacity: 1;
  }
`;

// TODO: redirect to home if user somehow ends up on this screen without data passed
export const ReviewSession = () => {
  const navigate = useNavigate();
  const resetQueueStore = useQueueStore.use.resetAll();
  const resetAssignmentQueue = useAssignmentQueueStore.use.resetAll();
  const assignmentQueue = useAssignmentQueueStore.use.assignmentQueue();
  const currQueueIndex = useAssignmentQueueStore.use.currQueueIndex();
  const updateAssignmentQueueData =
    useAssignmentQueueStore.use.updateAssignmentQueueData();
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

  const wrapUpReviewSession = (cancelPageLeave: () => void) => {
    let reviewedItems = assignmentQueue.filter((item) => {
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
    cancelPageLeave();
    // TODO: display "wrapping up" message

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

  const submitReviews = (queueData: AssignmentQueueItem[]) => {
    let reviewData = getCompletedAssignmentQueueData(queueData);
    let reviewPostData = createReviewPostData(reviewData);

    // TODO: change to actually catch errors
    let promises = reviewPostData.map(function (reviewItem) {
      return createReviewsAsync({
        reviewSessionData: reviewItem,
      })
        .then(function (results) {
          return results.resources_updated.assignment;
        })
        .catch((err) => {
          // *testing
          console.log("🚀 ~ file: ReviewSession.tsx:96 ~ promises ~ err:", err);
          // *testing
        });
    });

    Promise.all(promises).then(function (results) {
      // *testing
      console.log(results);
      // *testing
      let unableToUpdate: AssignmentQueueItem[] = [];
      let reviewResponses: PreFlattenedAssignment[] = [];

      results.forEach((response, index) => {
        if (response === undefined) {
          unableToUpdate.push(reviewData[index]);
        } else {
          reviewResponses.push(response);
        }
      });

      let reviewInfo = {
        reviewData,
        reviewResponses,
        errors: unableToUpdate,
      };

      navigate("/reviews/summary", { state: reviewInfo, replace: true });
    });
  };

  return (
    <Page>
      <ReactRouterPrompt
        when={blockUserLeavingPage}
        beforeConfirm={() => {
          endReviewSession();
        }}
      >
        {({
          isActive,
          onConfirm,
          onCancel,
        }: {
          isActive: boolean;
          onConfirm: () => void;
          onCancel: () => void;
        }) =>
          isActive && (
            <AlertDialog
              uncontrolledSettings={{ defaultOpen: isActive }}
              title="End Review Session?"
              confirmText="End Session"
              description={<Description />}
              cancelText="Cancel"
              onConfirmClick={onConfirm}
              onCancelClick={onCancel}
              showAddtlAction={true}
              addtlActionText="Wrap Up"
              onAddtlActionClick={() => {
                wrapUpReviewSession(onCancel);
              }}
            />
          )
        }
      </ReactRouterPrompt>
      {assignmentQueue.length !== 0 && <QueueHeader />}
      <MainContent>
        <>
          {assignmentQueue.length !== 0 && (
            <AssignmentQueueCards submitItems={submitReviews} />
          )}
          <WrapUpFlagContainer
            variants={finishFlagBgVariants}
            animate={bgControls}
            initial="hidden"
          >
            <motion.div
              variants={flagImgAndTxtVariants}
              animate={flgImgAndTxtControls}
              initial="hideAbove"
            >
              <img src={FinishFlagIcon} />
              <WrappingUpTxt>Wrapping Up!</WrappingUpTxt>
            </motion.div>
          </WrapUpFlagContainer>
        </>
      </MainContent>
      <KeyboardShortcuts />
    </Page>
  );
};
