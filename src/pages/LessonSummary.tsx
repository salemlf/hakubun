import { useEffect, useState } from "react";
import { IonContent } from "@ionic/react";
import { useLocation } from "react-router-dom";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore";
import { useQueueStore } from "../stores/useQueueStore";
import { flattenData } from "../services/MiscService";
import { groupDataByProperty } from "../services/ReviewService";
import { useSubjectsByIDs } from "../hooks/useSubjectsByIDs";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import { Assignment } from "../types/Assignment";
import { Subject } from "../types/Subject";
import Card from "../components/Card/Card";
import AnimatedPage from "../components/AnimatedPage";
import HomeButton from "../components/HomeButton";
import SubjCharacterList from "../components/ReviewResults/SubjCharacterList";
import { FullWidthGrid } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Page = styled(AnimatedPage)`
  background-color: var(--dark-greyish-purple);
`;

const LessonSummaryHeader = styled.header`
  background-color: var(--wanikani-lesson);
  color: white;
  text-align: center;
`;

const LessonSummaryHeadingTxt = styled.h1`
  font-size: 1.75rem;
  margin: 20px 0;
`;

const SubjectCard = styled(Card)`
  display: flex;
`;

type SubjectsGroupedByType = {
  radical?: Subject[];
  kanji?: Subject[];
  vocabulary?: Subject[];
  kana_vocabulary?: Subject[];
};

function LessonSummary() {
  const location = useLocation();
  const resetQueueStore = useQueueStore.use.resetAll();
  const resetAssignmentQueue = useAssignmentQueueStore.use.resetAll();
  const lessonsStartedData: ReviewQueueItem[] = location.state.lessonResponses;
  const [subjectsByType, setSubjectsByType] = useState<SubjectsGroupedByType>(
    {} as SubjectsGroupedByType
  );

  const flattenedAssignmentData: Assignment[] = flattenData(
    lessonsStartedData,
    false
  );
  let lessonSubjIDs = flattenedAssignmentData.map(
    (reviewItem: any) => reviewItem.subject_id
  );

  const { isLoading: lessonSubjectsLoading, data: lessonSubjectsData } =
    useSubjectsByIDs(lessonSubjIDs);

  useEffect(() => {
    if (!lessonSubjectsLoading && lessonSubjectsData) {
      let groupedBySubjectType = groupDataByProperty(
        lessonSubjectsData,
        "object"
      );

      setSubjectsByType(groupedBySubjectType);
    }
  }, [lessonSubjectsLoading]);

  useEffect(() => {
    resetQueueStore();
    resetAssignmentQueue();
  }, []);

  return (
    <Page>
      <LessonSummaryHeader>
        <LessonSummaryHeadingTxt>Lesson Summary</LessonSummaryHeadingTxt>
      </LessonSummaryHeader>
      <IonContent className="ion-padding">
        <FullWidthGrid>
          {lessonSubjectsLoading && <p>Loading...</p>}
          {Object.keys(subjectsByType).length !== 0 && (
            <>
              <SubjectCard
                title={`${
                  (subjectsByType.radical ?? []).length
                } Radicals Learned`}
                headerBgColor="var(--wanikani-radical)"
              >
                <SubjCharacterList
                  subjList={subjectsByType.radical ?? []}
                  justify="flex-start"
                />
              </SubjectCard>
              <SubjectCard
                title={`${(subjectsByType.kanji ?? []).length} Kanji Learned`}
                headerBgColor="var(--wanikani-kanji)"
              >
                <SubjCharacterList
                  subjList={subjectsByType.kanji ?? []}
                  justify="flex-start"
                />
              </SubjectCard>
              <SubjectCard
                title={`${
                  (
                    [
                      ...(subjectsByType.vocabulary ?? []),
                      ...(subjectsByType.kana_vocabulary ?? []),
                    ] ?? []
                  ).length
                } Vocabulary Learned`}
                headerBgColor="var(--wanikani-vocab)"
              >
                <SubjCharacterList
                  subjList={
                    [
                      ...(subjectsByType.vocabulary ?? []),
                      ...(subjectsByType.kana_vocabulary ?? []),
                    ] ?? []
                  }
                  justify="flex-start"
                />
              </SubjectCard>
            </>
          )}
        </FullWidthGrid>
        <HomeButton />
      </IonContent>
    </Page>
  );
}

export default LessonSummary;