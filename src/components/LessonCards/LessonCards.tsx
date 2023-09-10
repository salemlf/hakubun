import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { getSubjectColor } from "../../services/SubjectAndAssignmentService";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
import { TabData } from "../../types/MiscTypes";
import { Subject, SubjectType } from "../../types/Subject";
import SubjectChars from "../SubjectChars";
import RadicalDetailTabs from "../RadicalDetailTabs";
import KanjiDetailTabs from "../KanjiDetailTabs";
import VocabDetailTabs from "../VocabDetailTabs";
import SwipeableTabs from "../SwipeableTabs";
import StartSessionButton from "../StartSessionButton";
import styled from "styled-components";

type HeaderProps = {
  subjType: SubjectType;
};

const LessonSessionHeader = styled.header<HeaderProps>`
  background-color: ${({ subjType }) => getSubjectColor(subjType)};
  padding: 75px 10px;
`;

const LessonContent = styled.div`
  margin: 10px 20px 25px;
`;

type CardProps = {
  lesson: AssignmentQueueItem;
};

function LessonCard({ lesson }: CardProps) {
  return (
    <>
      <LessonSessionHeader subjType={lesson.object}>
        <SubjectChars
          subject={lesson as Subject}
          fontSize="4rem"
          withBgColor={true}
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

// TODO: scrolls to last item by default for some reason, using temporary fix in meantime
function LessonCards({ lessons, onStartLessonBtnClick }: Props) {
  let defaultTabKey = lessons[0].id.toString();
  // *testing
  console.log(
    "🚀 ~ file: LessonCards.tsx:66 ~ LessonCards ~ defaultTabKey:",
    defaultTabKey
  );
  // *testing
  const [selectedTabKey, setSelectedTabKey] = useState<string>(defaultTabKey);
  // *testing
  console.log(
    "🚀 ~ file: LessonCards.tsx:67 ~ LessonCards ~ selectedTabKey:",
    selectedTabKey
  );
  // *testing

  const isLastIndex =
    selectedTabKey === lessons[lessons.length - 1].id.toString();

  let lessonTabs: TabData[] = lessons.map((lesson) => {
    return {
      id: lesson.id.toString(),
      label: lesson.id.toString(),
      tabContents: <LessonCard lesson={lesson} />,
    };
  });

  return (
    <>
      <SwipeableTabs
        selectedTabKey={selectedTabKey}
        setSelectedTabKey={setSelectedTabKey}
        tabs={lessonTabs}
        blobs={true}
        scrollToDefault={true}
        defaultValue={defaultTabKey}
      />
      <AnimatePresence>
        {isLastIndex && (
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
