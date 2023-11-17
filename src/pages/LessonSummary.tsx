import { useEffect } from "react";
import { groupDataByProperty } from "../utils";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import useQueueStoreFacade from "../stores/useQueueStore/useQueueStore.facade";
import useAssignmentSubmitStoreFacade from "../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import { getCompletedAssignmentQueueData } from "../services/AssignmentQueueService";
import { Subject } from "../types/Subject";
import Card from "../components/Card/Card";
import FloatingHomeButton from "../components/FloatingHomeButton/FloatingHomeButton";
import SubjCharacterList from "../components/SubjCharacterList";
import {
  ContentWithTabBar,
  FullWidthGridDiv,
} from "../styles/BaseStyledComponents";
import styled from "styled-components";

const LessonSummaryHeader = styled.header`
  background-color: var(--wanikani-lesson);
  color: white;
  text-align: center;
`;

const LessonSummaryHeadingTxt = styled.h1`
  font-size: 1.75rem;
  margin: 20px 0;
  color: white;
`;

const Grid = styled(FullWidthGridDiv)`
  margin-top: 10px;
`;

const WarningMsg = styled.p`
  margin: 16px;
`;

// TODO: move this to Summary type file
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

  const { resetAll: resetQueueStore } = useQueueStoreFacade();
  const resetAssignmentQueue = useAssignmentQueueStore(
    (state) => state.resetAll
  );

  // combine queue items so reading and meaning aren't separate anymore
  let completedLessons = getCompletedAssignmentQueueData(allSubmitted);

  const lessonsBySubjType: SubjectsGroupedByType = groupDataByProperty(
    completedLessons,
    "object"
  );

  useEffect(() => {
    resetQueueStore();
    resetAssignmentQueue();
  }, []);

  return (
    <>
      <LessonSummaryHeader>
        <LessonSummaryHeadingTxt>Lesson Summary</LessonSummaryHeadingTxt>
      </LessonSummaryHeader>
      <ContentWithTabBar>
        <Grid>
          <Card
            title={`${
              ((lessonsBySubjType.radical as Subject[]) ?? []).length
            } Radicals Learned`}
            headerBgColor="var(--wanikani-radical)"
            headerTextColor="white"
          >
            <SubjCharacterList
              subjList={(lessonsBySubjType.radical as Subject[]) ?? []}
              justify="flex-start"
            />
          </Card>
          <Card
            title={`${
              ((lessonsBySubjType.kanji as Subject[]) ?? []).length
            } Kanji Learned`}
            headerBgColor="var(--wanikani-kanji)"
            headerTextColor="white"
          >
            <SubjCharacterList
              subjList={(lessonsBySubjType.kanji as Subject[]) ?? []}
              justify="flex-start"
            />
          </Card>
          <Card
            title={`${
              (
                [
                  ...((lessonsBySubjType.vocabulary as Subject[]) ?? []),
                  ...((lessonsBySubjType.kana_vocabulary as Subject[]) ?? []),
                ] ?? []
              ).length
            } Vocabulary Learned`}
            headerBgColor="var(--wanikani-vocab)"
            headerTextColor="white"
          >
            <SubjCharacterList
              subjList={
                [
                  ...((lessonsBySubjType.vocabulary as Subject[]) ?? []),
                  ...((lessonsBySubjType.kana_vocabulary as Subject[]) ?? []),
                ] ?? []
              }
              justify="flex-start"
            />
          </Card>
          {submittedAssignmentsWithErrs.length > 0 && (
            <WarningMsg>
              Oh no, looks like we weren't able to start all your lessons for
              some reason... {submittedAssignmentsWithErrs.length} had errors!
            </WarningMsg>
          )}
        </Grid>
        <FloatingHomeButton />
      </ContentWithTabBar>
    </>
  );
}

export default LessonSummary;
