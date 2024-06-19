import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import useQueueStoreFacade from "../stores/useQueueStore/useQueueStore.facade";
import { QueueItemAndErr } from "../stores/useAssignmentSubmitStore/useAssignmentSubmitStore";
import { getCompletedAssignmentQueueData } from "../services/AssignmentQueueService/AssignmentQueueService";
import { displayToast } from "../components/Toast/Toast.service";
import { useStartAssignment } from "../hooks/assignments/useStartAssignment";
import { determine401Msg } from "../services/ApiQueryService/ApiQueryService";
import { useSubmittedQueueUpdate } from "../hooks/assignments/useSubmittedQueueUpdate";
import {
  AssignmentQueueItem,
  AssignmentSubmitInfo,
  AssignmentSubmitOutcome,
} from "../types/AssignmentQueueTypes";
import { PreFlattenedAssignment } from "../types/Assignment";
import AssignmentQueueCards from "../components/AssignmentQueueCards";
import QueueHeader from "../components/QueueHeader";
import LeaveSessionPrompt from "../components/LeaveSessionPrompt";
import KeyboardShortcuts from "../components/KeyboardShortcuts";
import { MainContent } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Content = styled(MainContent)`
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
  const [hasShown404, setHasShown404] = useState(false);

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
    navigate({ to: "/lessons/summary", replace: true });
  };

  const submitLessonBatch = (queueData: AssignmentQueueItem[]) => {
    const completedLessonData = getCompletedAssignmentQueueData(queueData);

    const submitOutcomePromises: Promise<AssignmentSubmitOutcome>[] =
      completedLessonData.map((lessonItem) => {
        return startAssignmentAsync(
          {
            assignmentID: lessonItem.assignment_id,
          },
          {
            onError: (error) => {
              if (error instanceof AxiosError) {
                if (error.response?.status === 401 && !hasShown404) {
                  const msg401 = determine401Msg(error.response);
                  displayToast({
                    toastType: "error",
                    title: "Oh no, an API Error!",
                    content: msg401,
                    timeout: 10000,
                  });

                  setHasShown404(true);
                }
              }
            },
          }
        )
          .then((response: PreFlattenedAssignment) => {
            return {
              assignmentID: lessonItem.assignment_id,
              response,
              queueItem: lessonItem,
            };
          })
          .catch((err) => {
            console.error(
              `An error occured when starting a lesson: ${JSON.stringify(err)}`
            );
            const errMsg = `${err?.response?.data?.code} - ${err?.response?.data?.error}\n${err.name} - ${err.message}`;
            return {
              assignmentID: lessonItem.assignment_id,
              error: errMsg,
            };
          });
      });
    return Promise.all(submitOutcomePromises).then((submitOutcomes) => {
      const unableToUpdate: QueueItemAndErr[] = [];
      const lessonResponses: PreFlattenedAssignment[] = [];

      submitOutcomes.forEach((outcome, index) => {
        if (outcome.response === undefined) {
          unableToUpdate.push({
            queueItem: completedLessonData[index],
            error: outcome.error ?? "Unknown error",
          });
        } else {
          lessonResponses.push(outcome.response);
        }
      });

      const lessonInfo: AssignmentSubmitInfo = {
        assignmentData: completedLessonData,
        submitResponses: lessonResponses,
        assignmentsWithErrs: unableToUpdate,
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
        <KeyboardShortcuts />
      </Content>
    </>
  );
}

export default LessonQuiz;
