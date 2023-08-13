import { IonContent, IonRow } from "@ionic/react";
import AnimatedPage from "../components/AnimatedPage";
import { useLocation } from "react-router-dom";
import { shuffleArray } from "../services/MiscService";
import {
  createAssignmentQueueItems,
  getSubjectColor,
} from "../services/SubjectAndAssignmentService";
import { useSubjectsByIDs } from "../hooks/useSubjectsByIDs";
import { useStudyMaterialsBySubjIDs } from "../hooks/useStudyMaterialsBySubjIDs";
import { AssignmentBatch, TabData } from "../types/MiscTypes";
import { Assignment } from "../types/Assignment";
import { useEffect, useState } from "react";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import {
  Kanji,
  Radical,
  Subject,
  SubjectType,
  Vocabulary,
} from "../types/Subject";
import styled from "styled-components";
import SubjectChars from "../components/SubjectChars";
import SwipeableTabs from "../components/SwipeableTabs";
import SubjectMeanings from "../components/SubjectMeanings";
import RadicalNameMnemonic from "../components/RadicalNameMnemonic";
import RadicalCombination from "../components/RadicalCombination";
import KanjiMeaningMnemonic from "../components/KanjiMeaningMnemonic";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../styles/SubjectDetailsStyled";
import ReadingsForKanji from "../components/ReadingsForKanji";
import KanjiReadingMnemonic from "../components/KanjiReadingMnemonic";
import PartsOfSpeech from "../components/PartsOfSpeech";
import VocabMeaningExplanation from "../components/VocabMeaningExplanation";
import ContextSentences from "../components/ContextSentences";
import KanjiUsedInVocab from "../components/KanjiUsedInVocab";
import VocabReadings from "../components/VocabReadings";
import VocabReadingExplanation from "../components/VocabReadingExplanation";
import VocabDetailTabs from "../components/VocabDetailTabs/VocabDetailTabs";
import KanjiDetailTabs from "../components/KanjiDetailTabs/KanjiDetailTabs";
import RadicalDetailTabs from "../components/RadicalDetailTabs/RadicalDetailTabs";

const Page = styled(AnimatedPage)`
  background-color: var(--dark-greyish-purple);
`;

type HeaderProps = {
  subjType: SubjectType;
};

const LessonSessionHeader = styled.header<HeaderProps>`
  background-color: ${({ subjType }) => getSubjectColor(subjType)};
`;

const ReadingHeading = styled(SubjDetailSubHeading)`
  margin-bottom: 0;
`;

const VocabReadingSection = styled(SubjDetailSection)`
  margin-bottom: 0;
`;

const getTabsForVocab = (lessonItem: ReviewQueueItem) => {
  let isKanaVocab = lessonItem.object === "kana_vocabulary";
  const tabInCommon: TabData[] = [
    {
      id: "meaning",
      label: "Meaning",
      tabContents: (
        <div>
          <SubjectMeanings
            subject={lessonItem as Subject}
            showPrimaryMeaning={true}
          />
          <div>
            <PartsOfSpeech vocab={lessonItem as Vocabulary} />
          </div>
          <VocabMeaningExplanation vocab={lessonItem as Vocabulary} />
          {isKanaVocab && lessonItem.context_sentences && (
            <ContextSentences sentences={lessonItem.context_sentences} />
          )}
        </div>
      ),
    },
  ];

  let breakdown: TabData = {
    id: "breakdown",
    label: "Breakdown",
    tabContents: (
      <div>
        <KanjiUsedInVocab
          kanjiIDs={lessonItem.component_subject_ids!}
          displayQuestionTxt={true}
        />
      </div>
    ),
  };

  let reading: TabData = {
    id: "reading",
    label: "Reading",
    tabContents: (
      <div>
        <VocabReadingSection>
          <ReadingHeading>Vocab Reading</ReadingHeading>
          <VocabReadings
            vocab={lessonItem as Vocabulary}
            hideReadingTxt={true}
          />
        </VocabReadingSection>
        <VocabReadingExplanation vocab={lessonItem as Vocabulary} />
        {lessonItem.context_sentences && (
          <ContextSentences sentences={lessonItem.context_sentences} />
        )}
      </div>
    ),
  };

  if (isKanaVocab) {
    return [...tabInCommon];
  }

  return [breakdown, ...tabInCommon, reading];
};

function LessonSession() {
  const location = useLocation();
  const [lessonQueue, setLessonQueue] = useState<ReviewQueueItem[]>([]);
  const [currLessonIndex, setCurrLessonIndex] = useState<number>(0);
  let selectedTabColor = "var(--darkest-purple)";
  let tabsBgColor = "var(--offwhite-color)";

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
    useStudyMaterialsBySubjIDs(subjIDs, queriesEnabled);

  const currLesson = lessonQueue[currLessonIndex];

  useEffect(() => {
    if (
      !subjectsLoading &&
      !studyMaterialsLoading &&
      subjectsData.length !== 0 &&
      studyMaterialsData !== undefined
    ) {
      let lessonsToLearn = createAssignmentQueueItems(
        assignmentBatchToLearn,
        subjectsData,
        studyMaterialsData
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
  }, [subjectsLoading, studyMaterialsLoading]);

  return (
    <Page>
      {subjectsLoading || (studyMaterialsLoading && <h1>Loading...</h1>)}
      {lessonQueue.length !== 0 && (
        <>
          <LessonSessionHeader subjType={currLesson.object}>
            <p>HOME BUTTON HERE</p>
            <SubjectChars
              subject={currLesson as Subject}
              fontSize="4rem"
              withBgColor={true}
            />
          </LessonSessionHeader>
          <IonContent>
            {currLesson.object == "radical" && (
              <RadicalDetailTabs radical={currLesson} scrollToDefault={false} />
            )}
            {currLesson.object == "kanji" && (
              <KanjiDetailTabs kanji={currLesson} scrollToDefault={false} />
            )}
            {(currLesson.object == "vocabulary" ||
              currLesson.object == "kana_vocabulary") && (
              <VocabDetailTabs vocab={currLesson} scrollToDefault={false} />
            )}
          </IonContent>
        </>
      )}
    </Page>
  );
}

export default LessonSession;
