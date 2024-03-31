import { motion } from "framer-motion";
import { getSubjectColor } from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import { SubjectType } from "../../types/Subject";
import styled from "styled-components";

export const AssignmentCardContainer = styled(motion.div)`
  border-radius: 10px;
  margin: 10px;
  display: flex;
  max-width: 1400px;
  will-change: "transform";
  touch-action: none;
`;

type ReviewItemProps = {
  subjtype: SubjectType;
};

export const AssignmentCardStyled = styled(motion.div)<ReviewItemProps>`
  position: relative;
  padding: 80px 0 125px 0;
  border-radius: 10px;
  width: 100%;
  background-color: ${({ subjtype }) => {
    return getSubjectColor(subjtype);
  }};
  will-change: "transform";
  cursor: grab;
  touch-action: none;
`;

export const SwipeOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 10px;
  pointer-events: none;
  flex-grow: 1;
  touch-action: none;
  opacity: 0;
`;

export const SwipeIconAndText = styled.div`
  position: absolute;
  padding: 20px;
  border-radius: 50%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const SwipeIcon = styled(motion.div)`
  padding: 20px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  ion-icon {
    width: 85px;
    height: 85px;
  }

  color: white;
  border: 2px solid white;
`;

export const SwipeTxt = styled.p`
  color: white;
  font-size: 1.75rem;
  font-weight: 500;
  margin: 16px 0;
  text-transform: uppercase;
`;

export const NextCardOverlay = styled(SwipeOverlay)`
  /* background-color: var(--ion-color-tertiary); */
  background-color: #0077b3;
`;

export const RetryCardOverlay = styled(SwipeOverlay)`
  background-color: var(--ion-color-secondary);
`;
