import React, { createContext, useContext } from "react";
import { useReviewSessionInfo, Session } from "../hooks/useReviewSessionInfo";

type ReviewSessionContextData = {
  reviewSession: Session | null;
  reviewSessionLoading: boolean;
  addReviewSession: (reviewSession: Session) => void;
  removeReviewSession: () => void;
};

const ReviewSessionContext = createContext<ReviewSessionContextData>(
  {} as ReviewSessionContextData
);

type ProviderProps = {
  children?: React.ReactNode;
};

const ReviewSessionProvider = ({ children }: ProviderProps) => {
  const {
    reviewSession,
    reviewSessionLoading,
    addReviewSession,
    removeReviewSession,
  } = useReviewSessionInfo();

  return (
    <ReviewSessionContext.Provider
      value={{
        reviewSession,
        reviewSessionLoading,
        addReviewSession,
        removeReviewSession,
      }}
    >
      {children}
    </ReviewSessionContext.Provider>
  );
};

const useReviewSession = () => {
  const context = useContext(ReviewSessionContext);

  if (!context) {
    throw new Error(
      "useReviewSession must be used within a ReviewSessionProvider"
    );
  }

  return context;
};

export { ReviewSessionContext, ReviewSessionProvider, useReviewSession };
