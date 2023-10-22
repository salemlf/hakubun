import { useEffect, useState } from "react";
// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import AnimatedPage from "../components/AnimatedPage";
import { useNavigate } from "react-router-dom";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore";
import { useLessonPaginatorStore } from "../stores/useLessonPaginatorStore";
import { AssignmentQueueItem } from "../types/AssignmentQueueTypes";
import LessonCards from "../components/LessonCards";
import Button from "../components/Button";
import HomeIconColor from "../images/home-color.svg";
import styled from "styled-components";

const Page = styled(AnimatedPage)`
  background-color: var(--dark-greyish-purple);
`;

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
  const lessonQueue = useAssignmentQueueStore.use.assignmentQueue();
  const [uniqueLessonQueue, setUniqueLessonQueue] = useState<
    AssignmentQueueItem[]
  >([]);
  const resetLessonPaginator = useLessonPaginatorStore.use.reset();

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

  return (
    <Page>
      {uniqueLessonQueue.length !== 0 && (
        <>
          <HomeBtn onPress={() => navigate("/", { replace: true })}>
            <HomeIconStyled icon={HomeIconColor}></HomeIconStyled>
          </HomeBtn>
          <LessonCards
            lessons={uniqueLessonQueue}
            onStartLessonBtnClick={onStartLessonBtnClick}
          />
        </>
      )}
    </Page>
  );
}

export default LessonSession;
