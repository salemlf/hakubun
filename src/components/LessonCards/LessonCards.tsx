import { AnimatePresence } from "framer-motion";
import { getSubjectColor } from "../../services/SubjectAndAssignmentService";
import useLessonPaginatorStoreFacade from "../../stores/useLessonPaginatorStore/useLessonPaginatorStore.facade";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
import { Subject, SubjectType } from "../../types/Subject";
import SubjectChars from "../SubjectChars";
import RadicalDetailTabs from "../RadicalDetailTabs";
import KanjiDetailTabs from "../KanjiDetailTabs";
import VocabDetailTabs from "../VocabDetailTabs";
import StartSessionButton from "../StartSessionButton";
import Paginator from "../Paginator";
import styled from "styled-components";

type HeaderProps = {
  subjType: SubjectType;
};

const LessonSessionHeader = styled.header<HeaderProps>`
  background-color: ${({ subjType }) => getSubjectColor(subjType)};
  padding: 40px 10px;
  text-align: center;
`;

const LessonContent = styled.div`
  margin: 10px 20px 25px;
  height: 100%;
`;

type CardProps = {
  lesson: AssignmentQueueItem;
};

// TODO: persist selected tab so doesn't reset when leaving page and coming back
function LessonCard({ lesson }: CardProps) {
  return (
    <>
      <LessonSessionHeader subjType={lesson.object}>
        <SubjectChars
          subject={lesson as Subject}
          fontSize="4rem"
          withBgColor={true}
          alignText="center"
        />
      </LessonSessionHeader>
      <LessonContent>
        {lesson.object == "radical" && (
          <RadicalDetailTabs radical={lesson} scrollToDefault={false} />
        )}
        {lesson.object == "kanji" && (
          <KanjiDetailTabs kanji={lesson} scrollToDefault={false} />
        )}
        {(lesson.object == "vocabulary" ||
          lesson.object == "kana_vocabulary") && (
          <VocabDetailTabs vocab={lesson} scrollToDefault={false} />
        )}
      </LessonContent>
    </>
  );
}

type Props = {
  lessons: AssignmentQueueItem[];
  onStartLessonBtnClick: () => void;
};

function LessonCards({ lessons, onStartLessonBtnClick }: Props) {
  const lessonPages = lessons.map((lesson) => <LessonCard lesson={lesson} />);
  const { currentLessonPage, currentLessonDir, setCurrentLessonPageAndDir } =
    useLessonPaginatorStoreFacade();

  let isLastPage = currentLessonPage === lessonPages.length - 1;

  return (
    <>
      <Paginator
        showNavigationButtons={true}
        pageArr={lessonPages}
        currentPage={currentLessonPage}
        direction={currentLessonDir}
        setCurrentPage={setCurrentLessonPageAndDir}
      />
      <AnimatePresence>
        {isLastPage && (
          <StartSessionButton
            buttonType="quiz"
            onStartBtnClick={onStartLessonBtnClick}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default LessonCards;
