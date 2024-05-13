import { useNavigate } from "react-router-dom";
import { useAssignmentQueueStore } from "../../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
import Button from "../Button/Button";
import SvgIcon from "../SvgIcon";
import HomeIconColor from "../../images/home-color.svg?react";
import { Header } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

const SessionHeader = styled(Header)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 5px;
`;

const HomeButtonAndNumReviewsLeftContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
  border: 1px solid black;
`;

const calculateNumItemsInQueue = (queue: AssignmentQueueItem[]) => {
  const notReviewed = queue.filter(
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

  const currentQueueItem = assignmentQueue[currQueueIndex];

  const numUniqueItemsInQueue = currentQueueItem
    ? calculateNumItemsInQueue(assignmentQueue)
    : undefined;

  return (
    <SessionHeader bgcolor="var(--foreground-color)">
      <HomeButtonAndNumReviewsLeftContainer>
        <HomeBtn
          backgroundColor="var(--ion-color-primary)"
          onPress={() => navigate("/", { replace: true })}
          aria-label="Home page"
        >
          <SvgIcon icon={<HomeIconColor />} width="3em" height="3em" />
        </HomeBtn>
        {numUniqueItemsInQueue !== undefined && (
          <NumReviewsLeftContainer>
            <NumReviewsLeftText>{numUniqueItemsInQueue}</NumReviewsLeftText>
          </NumReviewsLeftContainer>
        )}
      </HomeButtonAndNumReviewsLeftContainer>
    </SessionHeader>
  );
}

export default QueueHeader;
