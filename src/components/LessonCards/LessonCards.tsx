import { useState } from "react";
import { useNavigate } from "react-router";
// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import Button from "../Button";
import { Subject, SubjectType } from "../../types/Subject";
import { getSubjectColor } from "../../services/SubjectAndAssignmentService";
import { ReviewQueueItem } from "../../types/ReviewSessionTypes";
import SubjectChars from "../SubjectChars";
import RadicalDetailTabs from "../RadicalDetailTabs";
import KanjiDetailTabs from "../KanjiDetailTabs";
import VocabDetailTabs from "../VocabDetailTabs";
import HomeIconColor from "../../images/home-color.svg";
import { TabData } from "../../types/MiscTypes";
import SwipeableTabs from "../SwipeableTabs";
import styled from "styled-components";

type HeaderProps = {
  subjType: SubjectType;
};

const LessonSessionHeader = styled.header<HeaderProps>`
  background-color: ${({ subjType }) => getSubjectColor(subjType)};
  padding: 30px 10px 75px;
`;

// TODO: extract into HomeButton component
const HomeBtn = styled(Button)`
  border-radius: 10px;
  padding: 0 6px;
`;

const HomeIconStyled = styled(IonIcon)`
  width: 3em;
  height: 3em;
`;

const LessonContent = styled.div`
  margin: 10px 20px;
`;

type CardProps = {
  lesson: ReviewQueueItem;
};

// TODO: move home button into lesson session component, will be fixed to top left
function LessonCard({ lesson }: CardProps) {
  const navigate = useNavigate();

  return (
    <>
      <LessonSessionHeader subjType={lesson.object}>
        <HomeBtn onPress={() => navigate("/home")}>
          <HomeIconStyled icon={HomeIconColor}></HomeIconStyled>
        </HomeBtn>
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
  lessons: ReviewQueueItem[];
};

function LessonCards({ lessons }: Props) {
  const [currLessonIndex, setCurrLessonIndex] = useState<number>(0);

  // TODO: if on last index, show button to go to lesson review session
  let lessonTabs: TabData[] = lessons.map((lesson) => {
    return {
      id: lesson.id.toString(),
      label: lesson.id.toString(),
      tabContents: <LessonCard lesson={lesson} />,
    };
  });

  return (
    <SwipeableTabs
      defaultValue={lessons[0].id.toString()}
      tabs={lessonTabs}
      blobs={true}
    />
  );
}

export default LessonCards;
