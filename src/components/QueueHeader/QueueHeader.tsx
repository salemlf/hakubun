import { IonHeader, IonToolbar, IonButtons } from "@ionic/react";
import { useNavigate } from "react-router-dom";
import { useAssignmentQueueStore } from "../../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
import Button from "../Button/Button";
import SvgIcon from "../SvgIcon";
import HomeIconColor from "../../images/home-color.svg?react";
import styled from "styled-components";

const SessionHeader = styled(IonHeader)`
  box-shadow: none;

  button::part(native) {
    padding-inline-start: 0;
    padding-inline-end: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

// TODO: change so not using IonToolbar
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
  const assignmentQueue = useAssignmentQueueStore(
    (state) => state.assignmentQueue
  );
  const currQueueIndex = useAssignmentQueueStore(
    (state) => state.currQueueIndex
  );

  let currentQueueItem = assignmentQueue[currQueueIndex];

  let numUniqueItemsInQueue = currentQueueItem
    ? calculateNumItemsInQueue(assignmentQueue)
    : undefined;

  return (
    <SessionHeader>
      <Toolbar>
        <IonButtons slot="start">
          <HomeBtn
            onPress={() => navigate("/", { replace: true })}
            aria-label="Home page"
          >
            <SvgIcon icon={<HomeIconColor />} width="3em" height="3em" />
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
