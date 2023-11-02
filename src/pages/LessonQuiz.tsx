import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// TODO: instead add a module declaration file for react-router-prompt
// @ts-ignore: Could not find a declaration file for module
import ReactRouterPrompt from "react-router-prompt";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import {
  blockUserLeavingPage,
  getCompletedAssignmentQueueData,
} from "../services/AssignmentQueueService";
import useQueueStoreFacade from "../stores/useQueueStore/useQueueStore.facade";
import { useStartAssignment } from "../hooks/useStartAssignment";
import { useSubmittedQueueUpdate } from "../hooks/useSubmittedQueueUpdate";
import {
  AssignmentQueueItem,
  AssignmentSubmitInfo,
} from "../types/AssignmentQueueTypes";
import { PreFlattenedAssignment } from "../types/Assignment";
import AssignmentQueueCards from "../components/AssignmentQueueCards";
import QueueHeader from "../components/QueueHeader";
import AlertDialog from "../components/AlertDialog";
import KeyboardShortcuts from "../components/KeyboardShortcuts";
import { MainContent } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const MainContentWithMargin = styled(MainContent)`
  margin: 10px;
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
    let submittedLessonInfo = await submitLessonBatch(queueData);
    updateSubmitted(submittedLessonInfo);
    navigate("/lessons/summary", { replace: true });
  };

  const submitLessonBatch = (queueData: AssignmentQueueItem[]) => {
    let completedLessonData = getCompletedAssignmentQueueData(queueData);

    // TODO: change to actually catch errors
    let promises = completedLessonData.map(function (lessonItem) {
      return startAssignmentAsync({
        assignmentID: lessonItem.assignment_id,
      })
        .then(function (results) {
          return results;
        })
        .catch((err) => {
          // *testing
          console.log("🚀 ~ file: LessonQuiz.tsx:72 ~ promises ~ err:", err);
          // *testing
        });
    });
    return Promise.all(promises).then(function (results) {
      // *testing
      console.log("🚀 ~ file: LessonQuiz.tsx:82 ~ results:", results);
      // *testing

      let unableToUpdate: AssignmentQueueItem[] = [];
      let lessonResponses: PreFlattenedAssignment[] = [];

      results.forEach((response, index) => {
        if (response === undefined) {
          unableToUpdate.push(completedLessonData[index]);
        } else {
          lessonResponses.push(response);
        }
      });

      let lessonInfo: AssignmentSubmitInfo = {
        assignmentData: completedLessonData,
        submitResponses: lessonResponses,
        errors: unableToUpdate,
      };

      return lessonInfo;
    });
  };

  return (
    <>
      <ReactRouterPrompt
        when={blockUserLeavingPage}
        beforeConfirm={() => {
          endLessonQuiz();
        }}
      >
        {({
          isActive,
          onConfirm,
          onCancel,
        }: {
          isActive: boolean;
          onConfirm: () => void;
          onCancel: () => void;
        }) =>
          isActive && (
            <AlertDialog
              uncontrolledSettings={{ defaultOpen: isActive }}
              title="End Lesson Quiz?"
              confirmText="End Quiz"
              cancelText="Cancel"
              onConfirmClick={onConfirm}
              onCancelClick={onCancel}
            />
          )
        }
      </ReactRouterPrompt>
      {assignmentQueue.length !== 0 && <QueueHeader />}
      <MainContentWithMargin>
        {assignmentQueue.length !== 0 && (
          <AssignmentQueueCards
            submitItems={submitAndRedirect}
            submitBatch={submitLessonBatch}
            updateSubmitted={updateSubmitted}
          />
        )}
      </MainContentWithMargin>
      <KeyboardShortcuts />
    </>
  );
}

export default LessonQuiz;
