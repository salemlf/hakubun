import { useEffect, useState } from "react";
// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import { useNavigate } from "react-router-dom";
// TODO: instead add a module declaration file for react-router-prompt
// @ts-ignore: Could not find a declaration file for module
import ReactRouterPrompt from "react-router-prompt";
import useQueueStoreFacade from "../stores/useQueueStore/useQueueStore.facade";
import useLessonPaginatorStoreFacade from "../stores/useLessonPaginatorStore/useLessonPaginatorStore.facade";
import useAssignmentQueueStoreFacade from "../stores/useAssignmentQueueStore/useAssignmentQueueStore.facade";
import { blockUserLeavingPage } from "../services/AssignmentQueueService";
import { AssignmentQueueItem } from "../types/AssignmentQueueTypes";
import LessonCards from "../components/LessonCards";
import Button from "../components/Button";
import AlertModal from "../components/AlertModal";
import HomeIconColor from "../images/home-color.svg";
import styled from "styled-components";

// TODO: extract into HomeButton component
const HomeBtn = styled(Button)`
  position: fixed;
  top: 10px;
  left: 10px;
  border-radius: 10px;
  padding: 0 6px;
  z-index: 10;
`;

const HomeIconStyled = styled(IonIcon)`
  width: 3em;
  height: 3em;
`;

function LessonSession() {
  const navigate = useNavigate();
  // const lessonQueue = useAssignmentQueueStore((state) => state.assignmentQueue);
  const [uniqueLessonQueue, setUniqueLessonQueue] = useState<
    AssignmentQueueItem[]
  >([]);
  const { resetAll: resetQueueStore } = useQueueStoreFacade();
  const { resetAll: resetAssignmentQueue, assignmentQueue: lessonQueue } =
    useAssignmentQueueStoreFacade();

  const { reset: resetLessonPaginator } = useLessonPaginatorStoreFacade();

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
          <ReactRouterPrompt
            when={blockUserLeavingPage}
            beforeConfirm={() => {
              endLessonSession();
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
                <AlertModal open={isActive}>
                  <AlertModal.Content
                    isOpen={isActive}
                    title="End Lesson Session?"
                    confirmText="End Session"
                    description="Are you sure you want to leave? You'll lose all progress from this lesson session."
                    cancelText="Cancel"
                    onConfirmClick={onConfirm}
                    onCancelClick={onCancel}
                  />
                </AlertModal>
              )
            }
          </ReactRouterPrompt>
          <HomeBtn onPress={() => navigate("/", { replace: true })}>
            <HomeIconStyled icon={HomeIconColor}></HomeIconStyled>
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
