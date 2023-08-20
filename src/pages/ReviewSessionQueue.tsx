import { useEffect, useState } from "react";
import { IonContent, IonGrid } from "@ionic/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
// TODO: instead add a module declaration file for react-router-prompt
// @ts-ignore: Could not find a declaration file for module
import ReactRouterPrompt from "react-router-prompt";
import { useCreateReview } from "../hooks/useCreateReview";
import {
  createReviewPostData,
  getCompletedReviewSessionData,
} from "../services/ReviewService";
import { ReviewQueueItem } from "../types/ReviewSessionTypes";
import { Assignment } from "../types/Assignment";
import {
  AssignmentBatch,
  HistoryAction,
  StudyMaterial,
} from "../types/MiscTypes";
import QueueHeader from "../components/QueueHeader/QueueHeader";
import ReviewCards from "../components/ReviewCards/ReviewCards";
import AnimatedPage from "../components/AnimatedPage";
import Dialog from "../components/Dialog/Dialog";
import styled from "styled-components";
import { useQueueStore } from "../stores/useQueueStore";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore";
import { useSubjectsByIDs } from "../hooks/useSubjectsByIDs";
import { useStudyMaterialsBySubjIDs } from "../hooks/useStudyMaterialsBySubjIDs";
import { createAssignmentQueueItems } from "../services/SubjectAndAssignmentService";

const Page = styled(AnimatedPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);

  ion-select::part(icon) {
    color: white;
    opacity: 1;
  }
`;

const Grid = styled(IonGrid)`
  padding-inline-start: 0;
  padding-inline-end: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin: 10px;
`;

// TODO: improve "Loading..." text
// TODO: add button to abandon session
// TODO: redirect to home if user somehow ends up on this screen without data passed
export const ReviewSessionQueue = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const resetQueueStore = useQueueStore.use.resetAll();
  const resetAssignmentQueue = useAssignmentQueueStore.use.resetAll();
  const setAssignmentQueueData =
    useAssignmentQueueStore.use.setAssignmentQueueData();
  const assignmentQueue = useAssignmentQueueStore.use.assignmentQueue();
  const [isLoading, setIsLoading] = useState(true);

  const { mutateAsync: createReviewsAsync } = useCreateReview();
  let stateFromReviewSettings: AssignmentBatch = location.state;
  let assignmentBatchToReview: Assignment[] =
    stateFromReviewSettings.assignmentBatch;
  let subjIDs: number[] = stateFromReviewSettings.subjIDs;

  let queriesEnabled = stateFromReviewSettings !== undefined;
  const { data: subjectsData, isLoading: subjectsLoading } = useSubjectsByIDs(
    subjIDs,
    queriesEnabled
  );
  const { data: studyMaterialsData, isLoading: studyMaterialsLoading } =
    useStudyMaterialsBySubjIDs(subjIDs, queriesEnabled, false);

  useEffect(() => {
    if (
      location.state &&
      !subjectsLoading &&
      !studyMaterialsLoading &&
      subjectsData.length !== 0 &&
      studyMaterialsData !== undefined
    ) {
      let reviews = createAssignmentQueueItems(
        assignmentBatchToReview,
        subjectsData,
        studyMaterialsData as StudyMaterial[]
      );

      setIsLoading(false);
      setAssignmentQueueData(reviews);
    } else {
      setIsLoading(true);
    }
  }, [subjectsLoading, studyMaterialsLoading, location.state]);

  useEffect(() => {
    if (assignmentQueue.length !== 0) {
      // *testing
      console.log("INSIDE IF in [] useEffect");
      // *testing
    } else {
      // *testing
      console.log("INSIDE ELSE in [] useEffect");
      // *testing
      createNewReviewSession();
    }
  }, []);

  // TODO: make sure this actually reloads everything
  const createNewReviewSession = () => {
    // *testing
    console.log("createNewReviewSession called!");
    // *testing
    endReviewSession();
    queryClient.invalidateQueries([
      "study-materials-by-subj-ids",
      "subjects-by-ids",
    ]);
  };

  const endReviewSession = () => {
    resetQueueStore();
    resetAssignmentQueue();
  };

  const submitReviews = (queueData: ReviewQueueItem[]) => {
    let reviewData = getCompletedReviewSessionData(queueData);
    let reviewPostData = createReviewPostData(reviewData);

    // TODO: change to catch errors
    let promises = reviewPostData.map(function (reviewItem) {
      return createReviewsAsync({
        reviewSessionData: reviewItem,
      })
        .then(function (results) {
          return results.resources_updated.assignment;
        })
        .catch((err) => {
          // *testing
          // TODO: actually catch errors
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

      let reviewResponses = results;
      let reviewInfo = {
        reviewData,
        reviewResponses,
      };
      navigate("/reviews/summary", { state: reviewInfo, replace: true });
    });
  };

  // TODO: move into service file so lesson quiz can use it too
  const blockUserLeavingPage = ({
    currentLocation,
    nextLocation,
    historyAction,
  }: {
    currentLocation: Location;
    nextLocation: Location;
    historyAction: HistoryAction;
  }) => {
    // allowing user to view subjects pages during reviews and to review summary page
    let subjDetailsRegex = new RegExp("/subjects/*");
    if (
      subjDetailsRegex.test(nextLocation.pathname) ||
      nextLocation.pathname === "/reviews/summary"
    ) {
      return false;
    }
    return true;
  };

  // TODO: on confirm/before leaving page (for realzies), call endReviewSession()
  return (
    <Page>
      <ReactRouterPrompt
        when={blockUserLeavingPage}
        beforeConfirm={() => {
          endReviewSession();
        }}
      >
        {
          ({
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
          // )
        }
      </ReactRouterPrompt>
      {!isLoading && assignmentQueue.length !== 0 && <QueueHeader />}
      <IonContent>
        <Grid>
          {isLoading && <p>Loading...</p>}
          {!isLoading && assignmentQueue.length !== 0 && (
            <ReviewCards submitItems={submitReviews} />
          )}
        </Grid>
      </IonContent>
    </Page>
  );
};
