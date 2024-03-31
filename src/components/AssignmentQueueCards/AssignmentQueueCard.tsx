import { useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useTransform,
  AnimatePresence,
  useAnimation,
  PanInfo,
} from "framer-motion";
import { toHiragana } from "wanakana";
import useQueueStoreFacade from "../../stores/useQueueStore/useQueueStore.facade";
import { isUserAnswerValid } from "../../services/AssignmentQueueService/AssignmentQueueService";
import { closeAllToasts, displayToast } from "../Toast/Toast.service";
import { useKeyDown } from "../../hooks/useKeyDown";
import { SubjectType } from "../../types/Subject";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
import AssignmentCharAndType from "./AssignmentCharAndType";
import AssignmentAnswerInput from "./AssignmentAnswerInput";
import ReviewItemBottomSheet from "../ReviewItemBottomSheet";
import Emoji from "../Emoji";
import SvgIcon from "../SvgIcon";
import RetryIcon from "../../images/retry.svg?react";
import NextIcon from "../../images/next-item.svg?react";
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
  color: white;
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
  const { savedUserAnswer, setSavedUserAnswer, isSubmittingAnswer } =
    useQueueStoreFacade();
  const initialUserAnswer =
    !isSubmittingAnswer || savedUserAnswer === null ? "" : savedUserAnswer;
  const [userAnswer, setUserAnswer] = useState(initialUserAnswer);

  useKeyDown(() => attemptToAdvance(), ["F12"]);
  useKeyDown(() => retryTriggered(), ["F6"]);

  const controls = useAnimation();
  const dragX = useMotionValue(0);
  const opacityLeft = useTransform(dragX, [-100, 1], [1, 0]);
  const opacityRight = useTransform(dragX, [0, 100], [0, 1]);
  const rotate = useTransform(dragX, [-250, 0, 250], [-20, 0, 20]);
  const [shakeInputTrigger, setShakeInputTrigger] = useState(0);
  const exitTimeMs = 600;

  const cardEnterTimerId = useRef<number | null>(null);
  const cardExitTimerId = useRef<number | null>(null);

  const removeTimeouts = () => {
    if (cardEnterTimerId.current) {
      clearTimeout(cardEnterTimerId.current);
      cardEnterTimerId.current = null;
    }
    if (cardExitTimerId.current) {
      clearTimeout(cardExitTimerId.current);
      cardExitTimerId.current = null;
    }
  };

  useEffect(() => {
    removeTimeouts();
    // slightly delaying so user has time to see screen before card appears
    cardEnterTimerId.current = window.setTimeout(() => {
      hideAndMoveCenter();
      fadeForward();
    }, 500);

    currentReviewItem.readingAudios?.forEach((readingAudio) => {
      readingAudio.audioFile.load();
    });
    return () => {
      currentReviewItem.readingAudios?.forEach((readingAudio) => {
        readingAudio.audioFile.unload();
      });
      removeTimeouts();
    };
  }, []);

  // TODO: sometimes on retry drag motion value somehow becomes NaN (maybe somehow gets cancelled?) and...
  // TODO: ...freezes up the dragging. Tough bug to fix, may be a library issue
  const retryTriggered = () => {
    const strippedUserAnswer = userAnswer.trim();

    if (isSubmittingAnswer) {
      controls.start("retry");
      handleRetryCard(currentReviewItem, strippedUserAnswer, setUserAnswer);
      controls.start("center");
    } else {
      const cantRetryMsg =
        strippedUserAnswer === ""
          ? "Input is empty, you can't retry this item!"
          : "You haven't submitted your answer, you can't retry this item!";

      displayToast({
        toastType: "warning",
        title: "Can't Retry!",
        content: cantRetryMsg,
        timeout: 10000,
      });
      controls.start("center");
    }
  };

  const attemptToAdvance = () => {
    closeAllToasts();
    const strippedUserAnswer = userAnswer.trim();
    currentReviewItem.review_type === "reading" &&
      setUserAnswer(toHiragana(strippedUserAnswer));

    const isValidInfo = isUserAnswerValid(
      currentReviewItem,
      strippedUserAnswer
    );
    if (isValidInfo.isValid === false) {
      displayToast({
        toastType: "warning",
        title: "Invalid Answer",
        content: isValidInfo.message,
        timeout: 10000,
      });
      setShakeInputTrigger((shakeInputTrigger) => shakeInputTrigger + 1);
    } else {
      setSavedUserAnswer(strippedUserAnswer);
      controls.start("submit");

      removeTimeouts();
      cardExitTimerId.current = window.setTimeout(() => {
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

  const handleDragEnd = (_event: MouseEvent | TouchEvent, info: PanInfo) => {
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
                  <SvgIcon icon={<RetryIcon />} width="85px" height="85px" />
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
                  <SvgIcon icon={<NextIcon />} width="85px" height="85px" />
                </Next>
                <NextTxt>Next</NextTxt>
              </SwipeIconAndText>
            </NextCardOverlay>
            <SwipeMeHint>
              Swipe me <Emoji symbol="🙂" label="Smiling face" />
            </SwipeMeHint>
          </AssignmentCardStyled>
          <ReviewItemBottomSheet currentReviewItem={currentReviewItem} />
        </>
      )}
    </AnimatePresence>
  );
};
