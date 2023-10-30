import { useEffect, useState } from "react";
import { groupDataByProperty } from "../utils";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore";
import { useQueueStore } from "../stores/useQueueStore";
import useAssignmentSubmitStoreFacade from "../stores/useAssignmentSubmitStore.facade";
import { useSubjectsByIDs } from "../hooks/useSubjectsByIDs";
import { AssignmentQueueItem } from "../types/AssignmentQueueTypes";
import { Subject } from "../types/Subject";
import Card from "../components/Card/Card";
import AnimatedPage from "../components/AnimatedPage";
import FloatingHomeButton from "../components/FloatingHomeButton/FloatingHomeButton";
import SubjCharacterList from "../components/ReviewResults/SubjCharacterList";
import LoadingDots from "../components/LoadingDots";
import {
  ContentWithTabBar,
  FixedCenterContainer,
  FullWidthGridDiv,
} from "../styles/BaseStyledComponents";
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

const Grid = styled(FullWidthGridDiv)`
  margin-top: 10px;
`;

const WarningMsg = styled.p`
  margin: 16px;
`;

type SubjectsGroupedByType = {
  radical?: Subject[];
  kanji?: Subject[];
  vocabulary?: Subject[];
  kana_vocabulary?: Subject[];
};

function LessonSummary() {
  const { submittedAssignmentQueueItems, submittedAssignmentsWithErrs } =
    useAssignmentSubmitStoreFacade();

  const allSubmitted = [
    ...submittedAssignmentQueueItems,
    ...submittedAssignmentsWithErrs,
  ];

  const resetQueueStore = useQueueStore((state) => state.resetAll);
  const resetAssignmentQueue = useAssignmentQueueStore(
    (state) => state.resetAll
  );
  const [subjectsByType, setSubjectsByType] = useState<SubjectsGroupedByType>(
    {} as SubjectsGroupedByType
  );

  let lessonSubjIDs = allSubmitted.map(
    (reviewItem: AssignmentQueueItem) => reviewItem.id
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
    return () => {
      // TODO: call resetAll on submit store?
    };
  }, []);

  return (
    <Page>
      <LessonSummaryHeader>
        <LessonSummaryHeadingTxt>Lesson Summary</LessonSummaryHeadingTxt>
      </LessonSummaryHeader>
      <ContentWithTabBar>
        {lessonSubjectsLoading && (
          <FixedCenterContainer>
            <LoadingDots />
          </FixedCenterContainer>
        )}
        <Grid>
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
          {submittedAssignmentsWithErrs.length > 0 && (
            <WarningMsg>
              Oh no, looks like we weren't able to start all your lessons for
              some reason... {submittedAssignmentsWithErrs.length} had errors!
            </WarningMsg>
          )}
        </Grid>
        <FloatingHomeButton />
      </ContentWithTabBar>
    </Page>
  );
}

export default LessonSummary;
