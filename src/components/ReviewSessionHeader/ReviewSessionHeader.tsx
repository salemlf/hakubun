import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import { useReviewQueue } from "../../hooks/useReviewQueue";
import {
  ReviewQueueItem,
  ReviewSessionDataState,
} from "../../types/ReviewSessionTypes";

import HomeIcon from "../../images/home.svg";
import styled from "styled-components/macro";

const SessionHeader = styled(IonHeader)`
  box-shadow: none;

  button::part(native) {
    padding-inline-start: 0;
    padding-inline-end: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const Toolbar = styled(IonToolbar)`
  padding: 5px 0;
  --ion-safe-area-top: 5px;
  padding-top: var(--ion-safe-area-top, 5px);
`;

const NumReviewsLeftContainer = styled.div`
  text-align: end;
  padding-right: 22px;
`;

const NumReviewsLeftText = styled.p`
  font-size: 1.5rem;
  margin: 0;
`;

const HomeBtn = styled(IonButton)`
  border-radius: 10px;
  --border-radius: 10px;
  padding: 2px 0;

  ion-icon {
    font-size: 32px;
  }
`;

const HomeIconStyled = styled(IonIcon)`
  .sc-ion-buttons-md-s ion-icon[slot="icon-only"] {
    font-size: 64px;
  }
`;

const calculateNumItemsInQueue = (queueDataState: ReviewSessionDataState) => {
  let notReviewed = queueDataState.reviewQueue.filter(
    (reviewItem) => reviewItem.is_reviewed === false
  );

  return [
    ...new Map(
      notReviewed.map((unreviewedCard) => [unreviewedCard.id, unreviewedCard])
    ).values(),
  ].length;
};

type Props = {
  currentReviewItem: ReviewQueueItem;
};

function ReviewSessionHeader({ currentReviewItem }: Props) {
  const router = useIonRouter();

  const { queueDataState } = useReviewQueue();

  let numUniqueItemsInQueue = currentReviewItem
    ? calculateNumItemsInQueue(queueDataState)
    : undefined;

  return (
    <SessionHeader>
      <Toolbar>
        <IonButtons slot="start">
          <HomeBtn onClick={() => router.push("/home", "root", "replace")}>
            <HomeIconStyled icon={HomeIcon}></HomeIconStyled>
          </HomeBtn>
        </IonButtons>
        {numUniqueItemsInQueue && (
          <NumReviewsLeftContainer>
            <NumReviewsLeftText>{numUniqueItemsInQueue}</NumReviewsLeftText>
          </NumReviewsLeftContainer>
        )}
      </Toolbar>
    </SessionHeader>
  );
}

export default ReviewSessionHeader;
