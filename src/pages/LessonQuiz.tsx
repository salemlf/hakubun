import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import { getCompletedAssignmentQueueData } from "../services/AssignmentQueueService/AssignmentQueueService";
import useQueueStoreFacade from "../stores/useQueueStore/useQueueStore.facade";
import { useStartAssignment } from "../hooks/assignments/useStartAssignment";
import { useSubmittedQueueUpdate } from "../hooks/assignments/useSubmittedQueueUpdate";
import {
  AssignmentQueueItem,
  AssignmentSubmitInfo,
} from "../types/AssignmentQueueTypes";
import { PreFlattenedAssignment } from "../types/Assignment";
import AssignmentQueueCards from "../components/AssignmentQueueCards";
import QueueHeader from "../components/QueueHeader";
import LeaveSessionPrompt from "../components/LeaveSessionPrompt";
import KeyboardShortcuts from "../components/KeyboardShortcuts";
import { MainContent } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Content = styled(MainContent)`
  height: 100svh;
  display: grid;
  grid-template-rows: auto auto;
  align-content: space-between;
`;

function LessonQuiz() {
  const navigate = useNavigate();
  const { resetAll: resetQueueStore } = useQueueStoreFacade();
  const resetAssignmentQueue = useAssignmentQueueStore(
    (state) => state.resetAll
  );
  const assignmentQueue = useAssignmentQueueStore(
    (state) => state.assignmentQueue
  );
  const updateSubmitted = useSubmittedQueueUpdate();
  const { mutateAsync: startAssignmentAsync } = useStartAssignment();

  useEffect(() => {
    if (assignmentQueue.length === 0) {
      // TODO: redirect to home page, shouldn't be here with no lessons!
    }
  }, []);

  const endLessonQuiz = () => {
    resetQueueStore();
    resetAssignmentQueue();
  };

  const submitAndRedirect = async (queueData: AssignmentQueueItem[]) => {
    const submittedLessonInfo = await submitLessonBatch(queueData);
    updateSubmitted(submittedLessonInfo);
    navigate("/lessons/summary", { replace: true });
  };

  const submitLessonBatch = (queueData: AssignmentQueueItem[]) => {
    const completedLessonData = getCompletedAssignmentQueueData(queueData);

    // TODO: retry starting assignments that failed?
    const promises = completedLessonData.map(function (lessonItem) {
      return startAssignmentAsync({
        assignmentID: lessonItem.assignment_id,
      })
        .then(function (results) {
          return results;
        })
        .catch((err) => {
          console.error(`An error occured when starting an assignment: ${err}`);
        });
    });
    return Promise.all(promises).then(function (results) {
      const unableToUpdate: AssignmentQueueItem[] = [];
      const lessonResponses: PreFlattenedAssignment[] = [];

      results.forEach((response, index) => {
        if (response === undefined) {
          unableToUpdate.push(completedLessonData[index]);
        } else {
          lessonResponses.push(response);
        }
      });

      const lessonInfo: AssignmentSubmitInfo = {
        assignmentData: completedLessonData,
        submitResponses: lessonResponses,
        errors: unableToUpdate,
      };

      return lessonInfo;
    });
  };

  return (
    <>
      <LeaveSessionPrompt
        modalID="end-lesson-quiz-alert-modal"
        title="End Lesson Quiz?"
        confirmText="End Quiz"
        onConfirmClick={endLessonQuiz}
      />
      {assignmentQueue.length !== 0 && <QueueHeader />}
      <Content>
        {assignmentQueue.length !== 0 && (
          <AssignmentQueueCards
            submitItems={submitAndRedirect}
            submitBatch={submitLessonBatch}
            updateSubmitted={updateSubmitted}
          />
        )}
      </Content>
      <KeyboardShortcuts />
    </>
  );
}

export default LessonQuiz;
