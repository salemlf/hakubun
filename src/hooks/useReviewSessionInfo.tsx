import { useEffect, useState } from "react";
import { useStorage } from "./useStorage";
import { Assignment } from "../types/Assignment";
import { Subject } from "../types/Subject";

export interface Session {
  reviewAssignments: Assignment[];
  reviewSubjects: Subject[];
}

export const useReviewSessionInfo = () => {
  const [reviewSession, setSession] = useState<Session | null>(null);
  const [reviewSessionInProgress, setReviewSessionInProgress] =
    useState<boolean>(false);

  const { getItem, setItem, removeItem } = useStorage();

  useEffect(() => {
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

  // TODO: add functions to begin review session and wrap up review session

  const startReviewSession = (assignmentsToReview: Assignment[]) => {
    // TODO: use the subject IDs from assignmentsToReview passed in to get the subject data
    //  TODO: after getting that data, then will call addReviewSession with all the review session info (reviewAssignments, reviewSubjects)
    console.log("Unimplemented startReviewSession called!");
  };

  // TODO: actually implement
  const endReviewSession = () => {
    // TODO: use removeReviewSession
    console.log("Unimplemented endReviewSession called!");
  };

  return {
    reviewSession,
    reviewSessionInProgress,
    startReviewSession,
    endReviewSession,
  };
};
