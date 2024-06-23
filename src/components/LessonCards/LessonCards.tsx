import { AnimatePresence } from "framer-motion";
import {
  convertQueueItemsToSubjects,
  getSubjectColor,
} from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import useLessonPaginatorStoreFacade from "../../stores/useLessonPaginatorStore/useLessonPaginatorStore.facade";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
import { SubjectType } from "../../types/Subject";
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
  const itemAsSubj = convertQueueItemsToSubjects([lesson])[0];

  return (
    <>
      <LessonSessionHeader subjType={lesson.subject_type}>
        <SubjectChars
          subject={itemAsSubj}
          fontSize="4rem"
          withBgColor={true}
          alignText="center"
        />
      </LessonSessionHeader>
      <LessonContent data-testid="lesson-session-content">
        {lesson.object == "radical" && (
          <RadicalDetailTabs radical={itemAsSubj} />
        )}
        {lesson.object == "kanji" && (
          <KanjiDetailTabs
            kanji={itemAsSubj}
            reviewType={lesson.review_type}
            defaultTabKey="radicals"
          />
        )}
        {(lesson.object == "vocabulary" ||
          lesson.object == "kana_vocabulary") && (
          <VocabDetailTabs
            vocab={itemAsSubj}
            reviewType={lesson.review_type}
            selectFirstTab={true}
          />
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

  const isLastPage = currentLessonPage === lessonPages.length - 1;

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
