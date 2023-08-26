// TODO: change so not relying on IonIcon
import { IonHeader, IonToolbar, IonButtons, IonIcon } from "@ionic/react";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
import HomeIconColor from "../../images/home-color.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { useAssignmentQueueStore } from "../../stores/useAssignmentQueueStore";

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

const HomeBtn = styled(Button)`
  border-radius: 10px;
  margin-left: 10px;
  padding: 0 6px;
`;

const HomeIconStyled = styled(IonIcon)`
  width: 3em;
  height: 3em;
`;

const calculateNumItemsInQueue = (queue: AssignmentQueueItem[]) => {
  let notReviewed = queue.filter(
    (reviewItem) => reviewItem.is_reviewed === false
  );

  return [
    ...new Map(
      notReviewed.map((unreviewedCard) => [unreviewedCard.id, unreviewedCard])
    ).values(),
  ].length;
};

function QueueHeader() {
  const navigate = useNavigate();
  const assignmentQueue = useAssignmentQueueStore.use.assignmentQueue();
  const currQueueIndex = useAssignmentQueueStore.use.currQueueIndex();

  let currentQueueItem = assignmentQueue[currQueueIndex];

  let numUniqueItemsInQueue = currentQueueItem
    ? calculateNumItemsInQueue(assignmentQueue)
    : undefined;

  return (
    <SessionHeader>
      <Toolbar>
        <IonButtons slot="start">
          <HomeBtn onPress={() => navigate("/", { replace: true })}>
            <HomeIconStyled icon={HomeIconColor}></HomeIconStyled>
          </HomeBtn>
        </IonButtons>
        {numUniqueItemsInQueue !== undefined && (
          <NumReviewsLeftContainer>
            <NumReviewsLeftText>{numUniqueItemsInQueue}</NumReviewsLeftText>
          </NumReviewsLeftContainer>
        )}
      </Toolbar>
    </SessionHeader>
  );
}

export default QueueHeader;
