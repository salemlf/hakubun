import { useUserSettingsStore } from "../stores/useUserSettingsStore";
import { useLessons } from "../hooks/useLessons";
import AnimatedPage from "../components/AnimatedPage";
import AssignmentSettings from "../components/AssignmentSettings";
import LoadingDots from "../components/LoadingDots";
import PageHeader from "../components/PageHeader";
import {
  FixedCenterContainer,
  MainContent,
} from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Page = styled(AnimatedPage)`
  background-color: var(--dark-greyish-purple);
`;

function LessonSettings() {
  const {
    isLoading: lessonsLoading,
    data: lessonsData,
    error: lessonsErr,
  } = useLessons();

  const lessonBatchSize = useUserSettingsStore.use.lessonBatchSize();
  const lessonSortOrderOption =
    useUserSettingsStore.use.lessonSortOrderOption();

  return (
    <Page>
      <PageHeader title="Lesson Settings" bgColor="var(--wanikani-lesson)" />
      <MainContent>
        {lessonsLoading && (
          <FixedCenterContainer>
            <LoadingDots />
          </FixedCenterContainer>
        )}
        {!lessonsLoading && lessonsErr && <div>{`Error: ${lessonsErr}`}</div>}
        {!lessonsLoading && !lessonsErr && lessonsData && (
          <AssignmentSettings
            settingsType="lesson"
            assignmentData={lessonsData}
            defaultBatchSize={lessonBatchSize}
            defaultSortOrder={lessonSortOrderOption}
          />
        )}
      </MainContent>
    </Page>
  );
}

export default LessonSettings;
