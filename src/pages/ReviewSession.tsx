import { useEffect } from "react";
import { IonContent, IonGrid, IonPage } from "@ionic/react";

import { useSubjectsByIDs } from "../hooks/useSubjectsByIDs";
import { useTabBarContext } from "../contexts/TabBarContext";
import { useReviewSession } from "../contexts/ReviewSessionContext";
import styled from "styled-components/macro";

const Page = styled(IonPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);

  ion-select::part(icon) {
    color: white;
    opacity: 1;
  }
`;

// TODO: redirect to home if user somehow ends up on this screen without data passed
// TODO: add a button to return home
export const ReviewSession = () => {
  const {
    getSessionAssignmentsAndSubjIDs,
    reviewSession,
    reviewSessionInProgress,
    startReviewSession,
    endReviewSession,
  } = useReviewSession();

  let { assignments, subjIDs } = getSessionAssignmentsAndSubjIDs();

  const {
    isLoading: subjReviewLoading,
    data: subjReviewData,
    error: subjReviewErr,
  } = useSubjectsByIDs(subjIDs);

  // *testing
  console.log(
    "🚀 ~ file: ReviewSession.tsx:37 ~ ReviewSession ~ subjReviewData:",
    subjReviewData
  );
  console.log(
    "🚀 ~ file: ReviewSession.tsx:31 ~ ReviewSession ~ assignments:",
    assignments
  );
  // *testing

  const { setShowTabBar } = useTabBarContext();
  useEffect(() => {
    setShowTabBar(false);

    return () => {
      setShowTabBar(true);
    };
  });

  return (
    <Page>
      <IonContent>
        <IonGrid>
          <h1>Review Session</h1>
          {subjReviewLoading && <p>Loading...</p>}
          {!subjReviewLoading && subjReviewErr && (
            <div>{`Error: ${subjReviewErr}`}</div>
          )}
          {!subjReviewLoading && !subjReviewErr && subjReviewData && <>BLEH</>}
        </IonGrid>
      </IonContent>
    </Page>
  );
};
