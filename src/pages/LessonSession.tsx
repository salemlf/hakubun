import { useEffect, useState } from "react";
import { useBlocker, useNavigate } from "react-router-dom";
import useQueueStoreFacade from "../stores/useQueueStore/useQueueStore.facade";
import useLessonPaginatorStoreFacade from "../stores/useLessonPaginatorStore/useLessonPaginatorStore.facade";
import useAssignmentQueueStoreFacade from "../stores/useAssignmentQueueStore/useAssignmentQueueStore.facade";
import { useIsBottomSheetOpen } from "../contexts/BottomSheetOpenContext";
import { shouldBlock } from "../services/AssignmentQueueService/AssignmentQueueService";
import { AssignmentQueueItem } from "../types/AssignmentQueueTypes";
import LessonCards from "../components/LessonCards";
import Button from "../components/Button";
import AlertModal from "../components/AlertModal";
import SvgIcon from "../components/SvgIcon";
import HomeIconColor from "../images/home-color.svg?react";
import styled from "styled-components";

// TODO: extract into HomeButton component
const HomeBtn = styled(Button)`
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 10px;
  padding: 0 6px;
  z-index: 10;
`;

function LessonSession() {
  const navigate = useNavigate();
  const [uniqueLessonQueue, setUniqueLessonQueue] = useState<
    AssignmentQueueItem[]
  >([]);
  const { resetAll: resetQueueStore } = useQueueStoreFacade();
  const { resetAll: resetAssignmentQueue, assignmentQueue: lessonQueue } =
    useAssignmentQueueStoreFacade();
  const { reset: resetLessonPaginator } = useLessonPaginatorStoreFacade();

  const blocker = useBlocker(shouldBlock);
  const { isBottomSheetOpen, setIsBottomSheetOpen } = useIsBottomSheetOpen();

  useEffect(() => {
    if (blocker.state === "blocked" && isBottomSheetOpen) {
      blocker.reset();
      setIsBottomSheetOpen(false);
    }
  }, [blocker.state, isBottomSheetOpen]);

  useEffect(() => {
    if (lessonQueue.length === 0) {
      // TODO: redirect to home page, shouldn't be here with no lessons!
    } else {
      let uniqueLessonsToLearn = lessonQueue.filter(
        (lesson, index, self) =>
          index === self.findIndex((l) => l.id === lesson.id)
      );
      setUniqueLessonQueue(uniqueLessonsToLearn);
    }
  }, []);

  const onStartLessonBtnClick = () => {
    navigate("/lessons/quiz", { replace: true });
    resetLessonPaginator();
  };

  const endLessonSession = () => {
    resetQueueStore();
    resetAssignmentQueue();
  };

  return (
    <>
      {uniqueLessonQueue.length !== 0 && (
        <>
          {blocker.state === "blocked" && (
            <AlertModal open={blocker.state === "blocked"}>
              <AlertModal.Content
                modalID="end-lesson-session-alert-modal"
                isOpen={blocker.state === "blocked"}
                title="End Lesson Session?"
                confirmText="End Session"
                description="Are you sure you want to leave? You'll lose all progress from this lesson session."
                cancelText="Cancel"
                onConfirmClick={() => {
                  endLessonSession();
                  blocker.proceed();
                }}
                onCancelClick={() => blocker.reset()}
              />
            </AlertModal>
          )}
          <HomeBtn
            aria-label="Home page"
            onPress={() => navigate("/", { replace: true })}
          >
            <SvgIcon icon={<HomeIconColor />} width="3em" height="3em" />
          </HomeBtn>
          <LessonCards
            lessons={uniqueLessonQueue}
            onStartLessonBtnClick={onStartLessonBtnClick}
          />
        </>
      )}
    </>
  );
}

export default LessonSession;
