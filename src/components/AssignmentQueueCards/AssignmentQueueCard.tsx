import { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  useMotionValue,
  useTransform,
  AnimatePresence,
  useAnimation,
} from "framer-motion";
import { toHiragana } from "wanakana";
import { isUserAnswerValid } from "../../services/AssignmentQueueService";
import { useQueueStore } from "../../stores/useQueueStore";
import { useKeyDown } from "../../hooks/useKeyDown";
import { SubjectType } from "../../types/Subject";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
import { ToastType } from "../Toast/types";
import AssignmentCharAndType from "./AssignmentCharAndType";
import AssignmentAnswerInput from "./AssignmentAnswerInput";
import ReviewItemBottomSheet from "../ReviewItemBottomSheet";
import Emoji from "../Emoji";
import Toast from "../Toast";
import RetryIcon from "../../images/retry.svg";
import NextIcon from "../../images/next-item.svg";
import {
  NextCardOverlay,
  RetryCardOverlay,
  AssignmentCardStyled,
  SwipeIconAndText,
  Retry,
  Next,
  RetryTxt,
  NextTxt,
} from "./AssignmentQueueCardsStyled";
import styled from "styled-components";

const SwipeMeHint = styled.p`
  font-size: 0.9rem;
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 0;
`;

const queueCardVariants = {
  submit: () => ({
    x: 500,
    transition: {
      duration: 0.5,
    },
  }),
  center: {
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.5,
      duration: 1,
    },
  },
  retry: {
    x: -500,
    transition: {
      type: "spring",
      bounce: 0.5,
      duration: 1,
    },
  },
  hideVisibility: {
    scale: 0.33,
    opacity: 0,
    x: 0,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.1,
    },
  },
  fadeForward: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 1,
    },
  },
};

type CardProps = {
  currentReviewItem: AssignmentQueueItem;
  handleNextCard: (
    currentReviewItem: AssignmentQueueItem,
    userAnswer: string,
    setUserAnswer: (userAnswer: string) => void
  ) => void;
  handleRetryCard: (
    currentReviewItem: AssignmentQueueItem,
    userAnswer: string,
    setUserAnswer: (userAnswer: string) => void
  ) => void;
};

export const AssignmentQueueCard = ({
  currentReviewItem,
  handleNextCard,
  handleRetryCard,
}: CardProps) => {
  const savedUserAnswer = useQueueStore((state) => state.savedUserAnswer);
  const setSavedUserAnswer = useQueueStore((state) => state.setSavedUserAnswer);
  const isSubmittingAnswer = useQueueStore((state) => state.isSubmittingAnswer);
  let initialUserAnswer =
    !isSubmittingAnswer || savedUserAnswer === null ? "" : savedUserAnswer;
  const [userAnswer, setUserAnswer] = useState(initialUserAnswer);

  type ToastInfo = {
    toastType: ToastType;
    title: string;
    content: string;
  };
  const initialToastValue: ToastInfo = {
    toastType: "info",
    title: "",
    content: "",
  };
  const [toastInfo, setToastInfo] = useState<ToastInfo>(initialToastValue);
  const [displayToast, setDisplayToast] = useState<boolean>(false);

  useKeyDown(() => attemptToAdvance(), ["F12"]);
  useKeyDown(() => retryTriggered(), ["F6"]);

  const controls = useAnimation();
  const dragX = useMotionValue(0);
  const opacityLeft = useTransform(dragX, [-100, 1], [1, 0]);
  const opacityRight = useTransform(dragX, [0, 100], [0, 1]);
  const rotate = useTransform(dragX, [-250, 0, 250], [-20, 0, 20]);
  const [shakeInputTrigger, setShakeInputTrigger] = useState(0);
  const exitTimeMs = 600;

  useEffect(() => {
    // slightly delaying so user has time to see screen before card appears
    setTimeout(() => {
      hideAndMoveCenter();
      fadeForward();
    }, 500);
  }, []);

  // TODO: sometimes on retry drag motion value somehow becomes NaN (maybe somehow gets cancelled?) and...
  // TODO: ...freezes up the dragging. Tough bug to fix, may be a library issue
  const retryTriggered = () => {
    setDisplayToast(false);
    let strippedUserAnswer = userAnswer.trim();

    if (isSubmittingAnswer) {
      controls.start("retry");
      handleRetryCard(currentReviewItem, strippedUserAnswer, setUserAnswer);
      controls.start("center");
    } else {
      let cantRetryMsg =
        strippedUserAnswer === ""
          ? "Input is empty, you can't retry this item!"
          : "You haven't submitted your answer, you can't retry this item!";

      setToastInfo({
        toastType: "warning",
        title: "Can't Retry!",
        content: cantRetryMsg,
      });
      setDisplayToast(true);
      controls.start("center");
    }
  };

  const attemptToAdvance = () => {
    setDisplayToast(false);
    let strippedUserAnswer = userAnswer.trim();
    currentReviewItem.review_type === "reading" &&
      setUserAnswer(toHiragana(strippedUserAnswer));

    let isValidInfo = isUserAnswerValid(currentReviewItem, strippedUserAnswer);
    if (isValidInfo.isValid === false) {
      setToastInfo({
        toastType: "warning",
        title: "Invalid Answer",
        content: isValidInfo.message,
      });
      setDisplayToast(true);
      setShakeInputTrigger((shakeInputTrigger) => shakeInputTrigger + 1);
    } else {
      setSavedUserAnswer(strippedUserAnswer);
      controls.start("submit");

      setTimeout(() => {
        hideAndMoveCenter();
        fadeForward();
        handleNextCard(currentReviewItem, strippedUserAnswer, setUserAnswer);
        // TODO: check if answer was correct or not, then show toast
      }, exitTimeMs);
    }
  };

  const hideAndMoveCenter = async () => {
    await controls.set("hideVisibility");
    await controls.start("center");
  };

  const fadeForward = async () => {
    controls.start("fadeForward");
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent, info: any) => {
    const xOffsetTrigger = 150;
    const xMinOffset = 100;
    const xMinVelocity = 350;
    if (
      info.offset.x > xOffsetTrigger ||
      (info.offset.x > xMinOffset && info.velocity.x > xMinVelocity)
    ) {
      attemptToAdvance();
    } else if (
      info.offset.x < -xOffsetTrigger ||
      (info.offset.x < -xMinOffset && info.velocity.x < -xMinVelocity)
    ) {
      retryTriggered();
    } else {
      console.log("DIDN'T MEET DRAG THRESHOLD");
      controls.start("center");
    }
  };

  return (
    <AnimatePresence>
      {currentReviewItem && (
        <>
          <AssignmentCardStyled
            subjtype={currentReviewItem.object as SubjectType}
            initial="hideVisibility"
            animate={controls}
            variants={queueCardVariants}
            style={{
              x: dragX,
              rotate,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: "grabbing" }}
            dragElastic={0.5}
          >
            <AssignmentCharAndType
              currentReviewItem={currentReviewItem}
              disableTextSelection={true}
            />
            <AssignmentAnswerInput
              shakeInputTrigger={shakeInputTrigger}
              currentReviewItem={currentReviewItem}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
              nextBtnClicked={attemptToAdvance}
            />
            <RetryCardOverlay
              style={{
                opacity: opacityLeft,
              }}
            >
              <SwipeIconAndText>
                <Retry>
                  <IonIcon icon={RetryIcon}></IonIcon>
                </Retry>
                <RetryTxt>Retry</RetryTxt>
              </SwipeIconAndText>
            </RetryCardOverlay>
            <NextCardOverlay
              style={{
                opacity: opacityRight,
              }}
            >
              <SwipeIconAndText>
                <Next>
                  <IonIcon icon={NextIcon}></IonIcon>
                </Next>
                <NextTxt>Next</NextTxt>
              </SwipeIconAndText>
            </NextCardOverlay>
            <SwipeMeHint>
              Swipe me <Emoji symbol="🙂" label="Smiling face" />
            </SwipeMeHint>
          </AssignmentCardStyled>
          <Toast
            toastType={toastInfo.toastType}
            open={displayToast}
            setOpen={setDisplayToast}
            title={toastInfo.title}
            content={toastInfo.content}
            distanceFromBottom="inherit"
            distanceFromTop="0"
          ></Toast>
          <ReviewItemBottomSheet currentReviewItem={currentReviewItem} />
        </>
      )}
    </AnimatePresence>
  );
};
