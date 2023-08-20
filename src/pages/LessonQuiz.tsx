import { useEffect, useState } from "react";
import { IonContent, IonGrid } from "@ionic/react";
import { useLocation, useNavigate } from "react-router-dom";
// TODO: instead add a module declaration file for react-router-prompt
// @ts-ignore: Could not find a declaration file for module
import ReactRouterPrompt from "react-router-prompt";
import { shuffleArray } from "../services/MiscService";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import AnimatedPage from "../components/AnimatedPage";
import ReviewCards from "../components/ReviewCards";
import QueueHeader from "../components/QueueHeader";
import styled from "styled-components";
import { blockUserLeavingPage } from "../services/ReviewService";
import { useQueueStore } from "../stores/useQueueStore";
import Dialog from "../components/Dialog";
import { useStartAssignment } from "../hooks/useStartAssignment";

const Page = styled(AnimatedPage)`
  background-color: var(--dark-greyish-purple);
`;

const Grid = styled(IonGrid)`
  padding-inline-start: 0;
  padding-inline-end: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin: 10px;
`;

// TODO: add ReactRouterPrompt and account for user trying to navigate away from page
function LessonQuiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const resetQueueStore = useQueueStore.use.resetAll();
  const resetAssignmentQueue = useAssignmentQueueStore.use.resetAll();
  const assignmentQueue = useAssignmentQueueStore.use.assignmentQueue();
  const setAssignmentQueueData =
    useAssignmentQueueStore.use.setAssignmentQueueData();
  const { mutateAsync: startAssignmentAsync } = useStartAssignment();

  let lessonQueueFromSession: ReviewQueueItem[] = location.state;

  useEffect(() => {
    if (location.state) {
      const shuffledLessons = shuffleArray(lessonQueueFromSession);
      //   *testing
      console.log(
        "🚀 ~ file: LessonQuiz.tsx:52 ~ useEffect ~ shuffledLessons:",
        shuffledLessons
      );
      //   *testing

      setAssignmentQueueData(shuffledLessons);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [location.state]);

  const endLessonQuiz = () => {
    resetQueueStore();
    resetAssignmentQueue();
  };

  // TODO: start assignments and redirect to lesson summary page
  const submitLessonQuiz = (queueData: ReviewQueueItem[]) => {
    // *testing
    console.log("submitLessonQuiz NOT IMPLEMENTED YET");
    // *testing
    // TODO: change to actually catch errors
    let promises = queueData.map(function (lessonItem) {
      return startAssignmentAsync({
        assignmentID: lessonItem.assignment_id,
      })
        .then(function (results) {
          // *testing
          console.log("🚀 ~ file: LessonQuiz.tsx:77 ~ results:", results);
          // *testing
          return results;
          // return results.resources_updated.assignment;
        })
        .catch((err) => {
          // *testing
          console.log(
            "🚀 ~ file: ReviewSessionQueue.tsx:96 ~ promises ~ err:",
            err
          );
          // *testing
        });
    });
    Promise.all(promises).then(function (results) {
      // *testing
      console.log(results);
      // *testing

      let lessonInfo = {
        lessonResponses: results,
      };
      navigate("/lessons/summary", { state: lessonInfo, replace: true });
    });
  };

  return (
    <Page>
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
            <Dialog
              uncontrolledSettings={{ defaultOpen: isActive }}
              title="End review session?"
              confirmText="End Session"
              cancelText="Cancel"
              onConfirmClick={onConfirm}
              onCancelClick={onCancel}
            />
          )
        }
      </ReactRouterPrompt>
      {!isLoading && assignmentQueue.length !== 0 && <QueueHeader />}
      <IonContent>
        <Grid>
          {isLoading && <p>Loading...</p>}
          {!isLoading && assignmentQueue.length !== 0 && (
            <ReviewCards submitItems={submitLessonQuiz} />
          )}
        </Grid>
      </IonContent>
    </Page>
  );
}

export default LessonQuiz;
