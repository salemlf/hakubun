// TODO: change so not relying on IonIcon
import { IonContent, IonIcon } from "@ionic/react";
import AnimatedPage from "../components/AnimatedPage";
import { useLocation, useNavigate } from "react-router-dom";
import { shuffleArray } from "../services/MiscService";
import {
  createAssignmentQueueItems,
  getSubjectColor,
} from "../services/SubjectAndAssignmentService";
import { useSubjectsByIDs } from "../hooks/useSubjectsByIDs";
import { useStudyMaterialsBySubjIDs } from "../hooks/useStudyMaterialsBySubjIDs";
import { AssignmentBatch, StudyMaterial } from "../types/MiscTypes";
import { Assignment } from "../types/Assignment";
import { useEffect, useState } from "react";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import { Subject, SubjectType } from "../types/Subject";
import SubjectChars from "../components/SubjectChars";
import VocabDetailTabs from "../components/VocabDetailTabs/VocabDetailTabs";
import KanjiDetailTabs from "../components/KanjiDetailTabs/KanjiDetailTabs";
import RadicalDetailTabs from "../components/RadicalDetailTabs/RadicalDetailTabs";
import Button from "../components/Button";
import HomeIconColor from "../images/home-color.svg";
import styled from "styled-components";

const Page = styled(AnimatedPage)`
  background-color: var(--dark-greyish-purple);
`;

type HeaderProps = {
  subjType: SubjectType;
};

const LessonSessionHeader = styled.header<HeaderProps>`
  background-color: ${({ subjType }) => getSubjectColor(subjType)};
  padding: 15px 10px;
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
  margin: 10px;
`;

function LessonSession() {
  const location = useLocation();
  const navigate = useNavigate();
  const [lessonQueue, setLessonQueue] = useState<ReviewQueueItem[]>([]);
  const [currLessonIndex, setCurrLessonIndex] = useState<number>(0);

  let stateFromReviewSettings: AssignmentBatch = location.state;
  let assignmentBatchToLearn: Assignment[] =
    stateFromReviewSettings.assignmentBatch;
  let subjIDs: number[] = stateFromReviewSettings.subjIDs;

  let queriesEnabled = stateFromReviewSettings !== undefined;
  const { data: subjectsData, isLoading: subjectsLoading } = useSubjectsByIDs(
    subjIDs,
    queriesEnabled
  );
  const { data: studyMaterialsData, isLoading: studyMaterialsLoading } =
    useStudyMaterialsBySubjIDs(subjIDs, queriesEnabled, false);

  const currLesson = lessonQueue[currLessonIndex];

  useEffect(() => {
    if (
      location.state &&
      !subjectsLoading &&
      !studyMaterialsLoading &&
      subjectsData.length !== 0 &&
      studyMaterialsData !== undefined
    ) {
      let lessonsToLearn = createAssignmentQueueItems(
        assignmentBatchToLearn,
        subjectsData,
        studyMaterialsData as StudyMaterial[]
      );

      const shuffledLessons = shuffleArray(lessonsToLearn);
      // *testing
      console.log(
        "🚀 ~ file: LessonSession.tsx:81 ~ useEffect ~ shuffledLessons:",
        shuffledLessons
      );
      // *testing

      setLessonQueue(shuffledLessons);
    }
  }, [subjectsLoading, studyMaterialsLoading, location.state]);

  return (
    <Page>
      {subjectsLoading || (studyMaterialsLoading && <h1>Loading...</h1>)}
      {lessonQueue.length !== 0 && (
        <>
          <LessonSessionHeader subjType={currLesson.object}>
            <HomeBtn onPress={() => navigate("/home")}>
              <HomeIconStyled icon={HomeIconColor}></HomeIconStyled>
            </HomeBtn>
            <SubjectChars
              subject={currLesson as Subject}
              fontSize="4rem"
              withBgColor={true}
            />
          </LessonSessionHeader>
          <IonContent>
            <LessonContent>
              {currLesson.object == "radical" && (
                <RadicalDetailTabs
                  radical={currLesson}
                  scrollToDefault={false}
                />
              )}
              {currLesson.object == "kanji" && (
                <KanjiDetailTabs kanji={currLesson} scrollToDefault={false} />
              )}
              {(currLesson.object == "vocabulary" ||
                currLesson.object == "kana_vocabulary") && (
                <VocabDetailTabs vocab={currLesson} scrollToDefault={false} />
              )}
            </LessonContent>
          </IonContent>
        </>
      )}
    </Page>
  );
}

export default LessonSession;
