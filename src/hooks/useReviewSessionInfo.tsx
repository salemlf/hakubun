import { useEffect, useState } from "react";
import { useStorage } from "./useStorage";
import { Assignment } from "../types/Assignment";
import { Subject } from "../types/Subject";

export interface Session {
  assignments: Assignment[];
  subjects: Subject[];
}

export const useReviewSessionInfo = () => {
  const [reviewSession, setSession] = useState<Session | null>(null);
  const [reviewSessionLoading, setReviewSessionLoading] =
    useState<boolean>(true);

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
      }
      setReviewSessionLoading(false);
    });
  }, []);

  const addReviewSession = (reviewSession: Session) => {
    setSession(reviewSession);
    setItem("reviewSession", reviewSession);
  };

  const removeReviewSession = () => {
    setSession(null);
    removeItem("reviewSession");
  };

  return {
    reviewSession,
    reviewSessionLoading,
    addReviewSession,
    removeReviewSession,
  };
};
