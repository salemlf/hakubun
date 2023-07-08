import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  useIonRouter,
} from "@ionic/react";

import HomeIcon from "../../images/home.svg";
import styled from "styled-components/macro";
import { SubjectType } from "../../types/Subject";
import { useReviewQueue } from "../../hooks/useReviewQueue";
import { ReviewQueueItem } from "../../types/ReviewSessionTypes";

type HeaderStyleProps = {
  subjType: SubjectType;
};

const SessionHeader = styled(IonHeader)<HeaderStyleProps>`
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

type Props = {
  currentReviewItem: ReviewQueueItem;
};

// TODO: change so just neutral bg color, not based on review type
export const ReviewSessionHeader = ({ currentReviewItem }: Props) => {
  const router = useIonRouter();
  const { queueDataState } = useReviewQueue();
  let currItemSubjType = currentReviewItem.object as SubjectType;

  let notReviewed = queueDataState.reviewQueue.filter(
    (reviewItem) => reviewItem.is_reviewed === false
  );

  // TODO: calculate some other way, this is showing wrong #
  let numUniqueItemsInQueue = [
    ...new Map(
      notReviewed.map((unreviewedCard) => [unreviewedCard.id, unreviewedCard])
    ).values(),
  ].length;

  return (
    <SessionHeader subjType={currItemSubjType}>
      <Toolbar>
        <IonButtons slot="start">
          <HomeBtn onClick={() => router.push("/home")}>
            <HomeIconStyled icon={HomeIcon}></HomeIconStyled>
          </HomeBtn>
        </IonButtons>
        <NumReviewsLeftContainer>
          <NumReviewsLeftText>{numUniqueItemsInQueue}</NumReviewsLeftText>
        </NumReviewsLeftContainer>
      </Toolbar>
    </SessionHeader>
  );
};
