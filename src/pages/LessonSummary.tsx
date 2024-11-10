import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { groupDataByProperty } from "../utils";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import useQueueStoreFacade from "../stores/useQueueStore/useQueueStore.facade";
import useAssignmentSubmitStoreFacade from "../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import { getCompletedAssignmentQueueData } from "../services/AssignmentQueueService/AssignmentQueueService";
import { Subject } from "../types/Subject";
import Card from "../components/Card/Card";
import SubjCharacterList from "../components/SubjCharacterList";
import SummaryLayout from "../components/SummaryLayout";
import ErrorCard from "../components/SummaryErrorCard";
import LessonsIcon from "../images/lessons.svg?react";
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

type SubjectsGroupedByType = {
  radical?: Subject[];
  kanji?: Subject[];
  vocabulary?: Subject[];
  kana_vocabulary?: Subject[];
};

function LessonSummary() {
  const navigate = useNavigate();
  const { submittedAssignmentQueueItems, submittedAssignmentsWithErrs } =
    useAssignmentSubmitStoreFacade();
  const [showButtons] = useState(true);

  const allSubmitted = [
    ...submittedAssignmentQueueItems,
    ...submittedAssignmentsWithErrs.map((item) => item.queueItem),
  ];

  const { resetAll: resetQueueStore } = useQueueStoreFacade();
  const resetAssignmentQueue = useAssignmentQueueStore(
    (state) => state.resetAll
  );

  // combine queue items so reading and meaning aren't separate anymore
  const completedLessons = getCompletedAssignmentQueueData(allSubmitted);
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
      <SummaryLayout
        showButtons={showButtons}
        onMorePress={() => navigate("/lessons/settings", { replace: true })}
        moreButtonText="Do More Lessons!"
        moreButtonIcon={<LessonsIcon />}
      >
        {submittedAssignmentsWithErrs.length > 0 && (
          <ErrorCard
            errorCount={submittedAssignmentsWithErrs.length}
            errors={submittedAssignmentsWithErrs}
            type="lesson"
          />
        )}
        <Card
          title={`${((lessonsBySubjType.radical as Subject[]) ?? []).length} Radicals Learned`}
          headerBgColor="var(--wanikani-radical)"
          headerTextColor="white"
        >
          <SubjCharacterList
            subjList={(lessonsBySubjType.radical as Subject[]) ?? []}
            justify="flex-start"
          />
        </Card>
        <Card
          title={`${((lessonsBySubjType.kanji as Subject[]) ?? []).length} Kanji Learned`}
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
            [
              ...((lessonsBySubjType.vocabulary as Subject[]) ?? []),
              ...((lessonsBySubjType.kana_vocabulary as Subject[]) ?? []),
            ].length
          } Vocabulary Learned`}
          headerBgColor="var(--wanikani-vocab)"
          headerTextColor="white"
        >
          <SubjCharacterList
            subjList={[
              ...((lessonsBySubjType.vocabulary as Subject[]) ?? []),
              ...((lessonsBySubjType.kana_vocabulary as Subject[]) ?? []),
            ]}
            justify="flex-start"
          />
        </Card>
      </SummaryLayout>
    </>
  );
}

export default LessonSummary;
