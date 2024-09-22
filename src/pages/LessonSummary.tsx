import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { groupDataByProperty } from "../utils";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import useQueueStoreFacade from "../stores/useQueueStore/useQueueStore.facade";
import useAssignmentSubmitStoreFacade from "../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import { getCompletedAssignmentQueueData } from "../services/AssignmentQueueService/AssignmentQueueService";
import { Subject } from "../types/Subject";
import Card from "../components/Card/Card";
import SubjCharacterList from "../components/SubjCharacterList";
import SvgIcon from "../components/SvgIcon";
import {
  ContentWithTabBar,
  FullWidthGridDiv,
  FloatingButton,
  FloatingButtonContainer,
} from "../styles/BaseStyledComponents";
import ColorHomeIcon from "../images/home-color.svg?react";
import LessonsIcon from "../images/lessons.svg?react";

import styled from "styled-components";

const ButtonsContainer = styled(FloatingButtonContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

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
  margin: 10px 0;
  color: var(--text-color);
`;

const NavButton = styled(FloatingButton)`
  justify-content: center;
`;

const BtnTxt = styled.p`
  margin: 0;
  text-transform: capitalize;
`;

const ErrorsContainer = styled.div`
  padding: 10px;
  background-color: var(--secondary-foreground-color);
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;

  pre {
    white-space: pre-wrap;

    &::selection {
      background-color: var(--ion-color-primary);
      color: black;
    }

    &::-moz-selection {
      background-color: var(--ion-color-primary);
      color: black;
    }
  }

  hr {
    background-color: #000;
  }
`;

// TODO: move this to Summary type file
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
  const [showButtons, _] = useState(true);

  const itemErrors = submittedAssignmentsWithErrs.map((item) => item.error);
  const queueItemsThatHadErrors = submittedAssignmentsWithErrs.map(
    (item) => item.queueItem
  );

  const allSubmitted = [
    ...submittedAssignmentQueueItems,
    ...queueItemsThatHadErrors,
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
      <ContentWithTabBar>
        <Grid>
          {submittedAssignmentsWithErrs.length > 0 && (
            <Card
              title={`Oh no, looks like we weren't able to start all your lessons for
            some reason...`}
              headerBgColor="var(--ion-color-danger)"
              headerFontSize="1.25rem"
              headerTextColor="white"
            >
              <WarningMsg>
                {submittedAssignmentsWithErrs.length} lesson(s) had errors when
                starting!
              </WarningMsg>
              <ErrorsContainer>
                {submittedAssignmentsWithErrs.map((itemWithErr, idx) => (
                  <Fragment key={itemWithErr.queueItem.assignment_id}>
                    <pre>
                      Error for subject ID {itemWithErr.queueItem.subject_id}:
                      {"\n"}
                      {itemWithErr.error}
                    </pre>
                    {idx >= 0 && idx !== itemErrors.length - 1 && <hr />}
                  </Fragment>
                ))}
              </ErrorsContainer>
            </Card>
          )}
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
        </Grid>
        <AnimatePresence>
          {showButtons && (
            <ButtonsContainer
              distancefrombottom="35px"
              transition={{ type: "spring", delay: 0.5, bounce: 0.25 }}
              initial={{ scale: 0, opacity: 0, x: "-50%" }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <NavButton
                backgroundColor="var(--ion-color-primary)"
                color="black"
                onPress={() => navigate("/lessons/settings", { replace: true })}
              >
                <SvgIcon
                  icon={<LessonsIcon />}
                  width="1.75em"
                  height="1.75em"
                />
                <BtnTxt>Do More Lessons!</BtnTxt>
              </NavButton>
              <NavButton
                backgroundColor="var(--ion-color-tertiary)"
                color="black"
                onPress={() => navigate("/", { replace: true })}
              >
                <SvgIcon
                  icon={<ColorHomeIcon />}
                  width="1.5em"
                  height="1.5em"
                />
                <BtnTxt>Home</BtnTxt>
              </NavButton>
            </ButtonsContainer>
          )}
        </AnimatePresence>
      </ContentWithTabBar>
    </>
  );
}

export default LessonSummary;
