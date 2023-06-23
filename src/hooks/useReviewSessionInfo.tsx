import { useEffect, useState } from "react";
import { useStorage } from "./useStorage";
import { Assignment } from "../types/Assignment";
import { Subject } from "../types/Subject";
import { getSubjIDsFromAssignments } from "../services/SubjectAndAssignmentService";

export interface Session {
  reviewAssignments: Assignment[];
  reviewSubjects: Subject[];
}

export const useReviewSessionInfo = () => {
  const [reviewSession, setSession] = useState<Session | null>(null);
  const [reviewSessionInProgress, setReviewSessionInProgress] =
    useState<boolean>(false);

  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const { getItem, setItem, removeItem } = useStorage();

  useEffect(() => {
    getItem("assignmentsToReview").then((assignmentsToReview) => {
      if (assignmentsToReview) {
        //* testing
        console.log("Found assignmentsToReview in storage!");
        console.log(
          "🚀 ~ file: useReviewSessionInfo.tsx:40 ~ getItem ~ assignmentsToReview:",
          assignmentsToReview
        );

        //* testing
        setAssignments(assignmentsToReview);
      }
    });

    getItem("reviewSession").then((reviewSession) => {
      if (reviewSession) {
        //* testing
        console.log("Found reviewSession in storage!");
        console.log(
          "🚀 ~ file: useReviewSession.tsx:22 ~ getItem ~ reviewSession:",
          reviewSession
        );
        //* testing
        addReviewSession(reviewSession);
        setSession(reviewSession);
        setReviewSessionInProgress(true);
      }
      setReviewSessionInProgress(false);
    });
  }, []);

  const addReviewSession = (reviewSession: Session) => {
    setSession(reviewSession);
    setItem("reviewSession", reviewSession);
    setReviewSessionInProgress(true);
  };

  const removeReviewSession = () => {
    setSession(null);
    removeItem("reviewSession");
    setReviewSessionInProgress(false);
  };

  const getSessionAssignmentsAndSubjIDs = () => {
    let subjIDs = getSubjIDsFromAssignments(assignments);
    return { assignments, subjIDs };
  };

  const setSessionAssignments = (assignmentsToReview: Assignment[]) => {
    setAssignments(assignmentsToReview);
    setItem("assignmentsToReview", assignmentsToReview);
  };

  const startReviewSession = (subjectsToReview: Subject[]) => {
    let session: Session = {
      reviewAssignments: assignments,
      reviewSubjects: subjectsToReview,
    };
    addReviewSession(session);
  };

  const endReviewSession = () => {
    removeReviewSession();
    removeItem("assignmentsToReview");
  };

  return {
    reviewSession,
    reviewSessionInProgress,
    getSessionAssignmentsAndSubjIDs,
    setSessionAssignments,
    startReviewSession,
    endReviewSession,
  };
};
