import { useEffect } from "react";
import { AssignmentSettingsProvider } from "../contexts/AssignmentSettingsContext";
import useUserSettingsStoreFacade from "../stores/useUserSettingsStore/useUserSettingsStore.facade";
import useLessonPaginatorStoreFacade from "../stores/useLessonPaginatorStore/useLessonPaginatorStore.facade";
import { useLessons } from "../hooks/assignments/useLessons";
import AssignmentSettings from "../components/AssignmentSettings";
import LoadingDots from "../components/LoadingDots";
import PageHeader from "../components/PageHeader";
import {
  FixedCenterContainer,
  MainContent,
} from "../styles/BaseStyledComponents";

function LessonSettings() {
  const {
    isLoading: lessonsLoading,
    data: lessonsData,
    error: lessonsErr,
  } = useLessons();
  const { lessonBatchSize, lessonSortOrderOption, reviewBackToBackOption } =
    useUserSettingsStoreFacade();

  const { reset: resetLessonPaginator } = useLessonPaginatorStoreFacade();

  useEffect(() => {
    resetLessonPaginator();
  }, []);

  return (
    <AssignmentSettingsProvider
      batchSize={lessonBatchSize}
      backToBackChoice={reviewBackToBackOption}
      sortOption={lessonSortOrderOption}
      settingsType="lesson"
    >
      <PageHeader title="Lesson Settings" bgColor="var(--wanikani-lesson)" />
      <MainContent>
        {lessonsLoading && (
          <FixedCenterContainer>
            <LoadingDots />
          </FixedCenterContainer>
        )}
        {!lessonsLoading && lessonsErr && <div>{`Error: ${lessonsErr}`}</div>}
        {!lessonsLoading && !lessonsErr && lessonsData && (
          <AssignmentSettings assignmentData={lessonsData} />
        )}
      </MainContent>
    </AssignmentSettingsProvider>
  );
}

export default LessonSettings;
